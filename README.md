# Nette's Corner

A Next.js 15 storefront for faith, growth and beautiful everyday goods. The legacy static site is retained in `../nettes-corner-main`; this directory is its production-ready redesign.

## Run locally

```bash
npm install
copy .env.example .env.local
npm run dev
```

## Connecting services

- Set `PRINTIFY_API_TOKEN` and `PRINTIFY_SHOP_ID` to use live inventory via `/api/products`. Until then the site shows a curated fallback catalogue.
- Set `STRIPE_SECRET_KEY` to activate the server-only `/api/checkout` endpoint. Your cart UI should POST `{ items: [{ slug, quantity }] }` and redirect to the returned `url`.
- Configure a Stripe webhook for `payment_intent.succeeded` / `checkout.session.completed`, verify its signature, then call `netlify/functions/create-printify-order.ts` with the Printify order payload. This keeps fulfillment dependent on confirmed payment.

Deploy on Netlify with the environment variables above. The included Netlify configuration enables the Next.js runtime.
