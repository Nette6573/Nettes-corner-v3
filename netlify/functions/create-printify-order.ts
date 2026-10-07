// Invoke this only after a PayPal order has been captured successfully
// (see src/app/api/paypal/capture-order/route.ts).
// Keep PRINTIFY_API_TOKEN in Netlify environment variables; never send it to the client.
export default async (request: Request) => {
  if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  const token = process.env.PRINTIFY_API_TOKEN; const shopId = process.env.PRINTIFY_SHOP_ID;
  if (!token || !shopId) return Response.json({ error: 'Printify is not configured' }, { status: 503 });
  const order = await request.json();
  const response = await fetch(`https://api.printify.com/v1/shops/${shopId}/orders.json`, { method:'POST', headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'}, body:JSON.stringify(order) });
  return new Response(await response.text(), { status:response.status, headers:{'Content-Type':'application/json'} });
};
