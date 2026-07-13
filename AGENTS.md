# AGENTS.md

This document describes the project structure for developers and AI agents working on this codebase.

## Project Overview

Vantage Study is a course/tutorial platform modeled after a CBE-style practice portal: students browse a library of
short lessons, but the lesson content and practice material stay locked until they pay a one-time fee for full
access. Built with TanStack Start and deployed on Netlify.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Auth | Netlify Identity (`@netlify/identity`) |
| Database | Netlify Database (Postgres) via Drizzle ORM |
| Payments | Stripe Checkout (one-time payment) |
| Language | TypeScript 5.9 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
├── db
│   ├── schema.ts               # Drizzle schema: `purchases` table (email, paid flag, stripe session id)
│   └── index.ts                # Drizzle client wired to Netlify Database
├── netlify
│   ├── database/migrations     # Auto-generated SQL migrations (never hand-edit applied ones)
│   └── functions
│       └── stripe-webhook.mts  # Verifies Stripe webhook signature, marks a purchase as paid
├── src
│   ├── components
│   │   ├── AccessButton.tsx    # "Unlock full access" button; starts Stripe Checkout for signed-in users
│   │   └── CallbackHandler.tsx # Handles Netlify Identity auth redirect hashes (confirm/recovery/invite/oauth)
│   ├── data
│   │   └── courses.ts          # Course + lesson content (static catalog)
│   ├── lib
│   │   ├── access.ts           # `getAccessStatus` server function — looks up purchase by email
│   │   ├── auth.ts             # `getServerUser` server function
│   │   ├── identity-context.tsx# React context wrapping `@netlify/identity` client state
│   │   └── stripe.ts           # `createCheckoutSession` / `getStripeEnabled` server functions
│   ├── middleware
│   │   └── identity.ts         # `identityMiddleware` / `requireAuthMiddleware` for server functions
│   ├── routes
│   │   ├── __root.tsx          # Root layout: fonts, nav, Identity provider, footer
│   │   ├── index.tsx           # Landing page with pricing + course previews
│   │   ├── login.tsx           # Combined sign-in / sign-up page
│   │   ├── courses
│   │   │   ├── index.tsx       # Course library, shows a paywall banner when locked
│   │   │   └── $courseId.tsx   # Lesson list; lesson body is blurred/hidden until access is unlocked
│   │   └── checkout
│   │       ├── success.tsx
│   │       └── cancel.tsx
│   └── styles.css              # Tailwind import + theme tokens (paper/ink/ember palette)
├── drizzle.config.ts            # Points drizzle-kit at db/schema.ts, outputs to netlify/database/migrations
├── netlify.toml
├── tsconfig.json                 # `@/*` alias → `src/*`
└── vite.config.ts
```

## How access-gating works

1. A visitor can browse `/` and `/courses` freely — titles, taglines, and lesson names are always visible.
2. Reading a lesson's actual content requires the visitor to be signed in (Netlify Identity) **and** have a paid
   `purchases` row for their email.
3. `AccessButton` sends signed-in users through Stripe Checkout (`createCheckoutSession` in `src/lib/stripe.ts`).
4. Stripe calls `netlify/functions/stripe-webhook.mts` on `checkout.session.completed`. The function verifies the
   webhook signature and upserts a `purchases` row with `paid: true` for the customer's email.
5. `getAccessStatus` (`src/lib/access.ts`) is a server function that checks the current signed-in user's email
   against `purchases.paid`. Routes call it client-side after the identity user is known and hide lesson content if
   it returns `false`.

This is intentionally email-keyed rather than tied to a Stripe customer ID, since Netlify Identity users and Stripe
checkout sessions are both identified by email in this flow.

## Environment variables required

```
STRIPE_SECRET_KEY=...        # Required to enable checkout
STRIPE_WEBHOOK_SECRET=...    # Required for the webhook function to verify Stripe signatures
```

Configure a Stripe webhook endpoint pointing at `/api/stripe-webhook` subscribed to `checkout.session.completed`.

Netlify Identity itself needs no secret — it's provisioned automatically once the feature is enabled on the site
(already done via the identity skill's enable script). Note that Identity's `nf_jwt` cookie flow only works on a real
Netlify deploy or `netlify dev`, not a bare Vite dev server.

## Conventions

- Import paths use the `@/` alias for anything under `src/`.
- Course/lesson content lives in `src/data/courses.ts` as a plain array — no CMS.
- Database schema changes go in `db/schema.ts`, followed by `npx drizzle-kit generate` to produce a migration under
  `netlify/database/migrations/`. Migrations are applied automatically by Netlify at deploy time — never run them
  manually.
- Theme tokens (`--paper`, `--ink`, `--ember`, etc.) are defined in `src/styles.css` and referenced via Tailwind's
  arbitrary value syntax (e.g. `text-[var(--ember)]`).

## Development Commands

```bash
npm run dev      # Start Vite dev server (no Netlify Identity locally)
npm run build    # Production build
```
