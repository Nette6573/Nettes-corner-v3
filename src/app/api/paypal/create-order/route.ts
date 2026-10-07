import { NextRequest, NextResponse } from 'next/server';
import { getProduct } from '@/lib/products';
import { getPayPalAccessToken, paypalBaseUrl } from '@/lib/paypal';

export async function POST(request: NextRequest) {
  const { items = [] } = (await request.json()) as { items: { slug: string; quantity: number }[] };
  if (!items.length) return NextResponse.json({ error: 'Your bag is empty.' }, { status: 400 });

  let total = 0;
  const item_total_lines: { name: string; unit_amount: { currency_code: string; value: string }; quantity: string }[] = [];
  for (const { slug, quantity } of items) {
    const product = getProduct(slug);
    if (!product) return NextResponse.json({ error: 'Invalid product in bag.' }, { status: 400 });
    const qty = Math.max(1, Math.min(quantity, 10));
    total += product.price * qty;
    item_total_lines.push({ name: product.title, unit_amount: { currency_code: 'USD', value: product.price.toFixed(2) }, quantity: String(qty) });
  }

  try {
    const accessToken = await getPayPalAccessToken();
    const res = await fetch(`${paypalBaseUrl()}/v2/checkout/orders`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: total.toFixed(2),
              breakdown: { item_total: { currency_code: 'USD', value: total.toFixed(2) } },
            },
            items: item_total_lines,
          },
        ],
      }),
    });
    const data = await res.json();
    if (!res.ok) return NextResponse.json({ error: 'Unable to create PayPal order.' }, { status: 500 });
    return NextResponse.json({ id: data.id });
  } catch {
    return NextResponse.json({ error: 'PayPal is not configured.' }, { status: 503 });
  }
}
