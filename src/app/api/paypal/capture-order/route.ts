import { NextRequest, NextResponse } from 'next/server';
import { getPayPalAccessToken, paypalBaseUrl } from '@/lib/paypal';

export async function POST(request: NextRequest) {
  const { orderID } = (await request.json()) as { orderID: string };
  if (!orderID) return NextResponse.json({ error: 'Missing order ID.' }, { status: 400 });

  try {
    const accessToken = await getPayPalAccessToken();
    const res = await fetch(`${paypalBaseUrl()}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (!res.ok || data.status !== 'COMPLETED') return NextResponse.json({ error: 'Payment could not be completed.' }, { status: 500 });

    // Order paid. This is the place to kick off fulfillment, e.g. forward the
    // order to Printify via netlify/functions/create-printify-order.ts.

    return NextResponse.json({ status: 'COMPLETED', id: data.id });
  } catch {
    return NextResponse.json({ error: 'PayPal is not configured.' }, { status: 503 });
  }
}
