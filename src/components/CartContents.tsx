'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { getProduct } from '@/lib/products';

type Item = { slug: string; quantity: number };

export function CartContents() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  useEffect(() => setItems(JSON.parse(localStorage.getItem('nettes-cart') || '[]')), []);

  const total = items.reduce((sum, item) => sum + (getProduct(item.slug)?.price || 0) * item.quantity, 0);

  if (!items.length) {
    return (
      <div className="py-10 text-center">
        <h1 className="font-display text-5xl">A little empty, for now.</h1>
        <p className="mt-5 text-plum/65">Find a beautiful reminder for your everyday.</p>
        <Link href="/shop" className="btn-primary mt-8">Discover the collection</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-5xl">Your bag</h1>
      <div className="mt-8 divide-y">
        {items.map((item) => {
          const p = getProduct(item.slug);
          return p && (
            <div className="flex justify-between py-5" key={item.slug}>
              <div>
                <p className="font-display text-xl">{p.title}</p>
                <p className="mt-1 text-sm text-plum/60">Quantity {item.quantity}</p>
              </div>
              <p>${(p.price * item.quantity).toFixed(2)}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex justify-between border-t pt-6 text-lg font-semibold">
        <span>Subtotal</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {error && <p className="mt-4 text-sm text-wine">{error}</p>}

      {clientId ? (
        <div className="mt-6">
          <PayPalScriptProvider options={{ clientId, currency: 'USD', intent: 'capture' }}>
            <PayPalButtons
              style={{ layout: 'vertical', color: 'blue', shape: 'pill', label: 'paypal' }}
              createOrder={async () => {
                setError('');
                const res = await fetch('/api/paypal/create-order', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ items }),
                });
                const data = await res.json();
                if (!data.id) { setError(data.error || 'Unable to start checkout.'); throw new Error('create-order failed'); }
                return data.id;
              }}
              onApprove={async (data) => {
                const res = await fetch('/api/paypal/capture-order', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ orderID: data.orderID }),
                });
                const result = await res.json();
                if (result.status === 'COMPLETED') {
                  localStorage.removeItem('nettes-cart');
                  router.push('/success');
                } else {
                  setError(result.error || 'Payment could not be completed.');
                }
              }}
              onError={() => setError('Something went wrong with PayPal. Please try again.')}
            />
          </PayPalScriptProvider>
          <p className="mt-3 text-center text-xs text-plum/55">Payments are securely processed by PayPal.</p>
        </div>
      ) : (
        <p className="mt-6 text-center text-sm text-plum/55">Checkout is being set up, please check back soon.</p>
      )}
    </div>
  );
}
