# Vantage Study

A course and tutorial platform inspired by CBE-style practice portals: visitors can browse the course library for
free, but lesson content and practice material stay locked behind a one-time payment. Built as a modern replacement
for a bare-bones exam-prep site, with real authentication and a database-backed paywall instead of a client-side gate.

## Key technologies

- **TanStack Start** (React 19 + TanStack Router) for routing, SSR, and server functions
- **Tailwind CSS 4** for styling
- **Netlify Identity** for sign-up / sign-in
- **Netlify Database** (managed Postgres via Drizzle ORM) to record who has paid
- **Stripe Checkout** for the one-time "full access" payment, confirmed via a webhook function

## Running locally

```bash
npm install
npm run dev
```

This starts the Vite dev server on port 3000. Note that Netlify Identity's auth cookie flow does not work against a
bare Vite dev server or `netlify dev` on localhost — sign-in only works once deployed to a Netlify site (production
or a deploy preview). Course browsing and the landing page work fine locally.

To exercise the payment flow, set `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in the site's environment
variables, and point a Stripe webhook at `/api/stripe-webhook` for the `checkout.session.completed` event.

See `AGENTS.md` for the full project layout and how the access-gating logic is wired together.
