import { createServerFn } from '@tanstack/react-start'
import { requireAuthMiddleware } from '../middleware/identity'

import { FULL_ACCESS_PRICE_NGN } from './pricing'

export const getStripeEnabled = createServerFn({ method: 'GET' }).handler(
  () => !!process.env.STRIPE_SECRET_KEY,
)

export const createCheckoutSession = createServerFn({ method: 'POST' })
  .middleware([requireAuthMiddleware])
  .handler(async ({ context }) => {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe is not configured')
    }
    const { default: Stripe } = await import('stripe')
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const siteUrl = process.env.URL ?? process.env.SITE_URL ?? 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: context.user.email,
      client_reference_id: context.user.id,
      line_items: [
        {
          price_data: {
            currency: 'ngn',
            product_data: {
              name: 'INIT Educational Consultant — Full Study Access',
              description:
                'Lifetime access to INIT course notes, past questions, answers, and downloadable study materials.',
            },
            unit_amount: FULL_ACCESS_PRICE_NGN * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${siteUrl}/checkout/success`,
      cancel_url: `${siteUrl}/checkout/cancel`,
    })

    return session.url
  })

export { FULL_ACCESS_PRICE_NGN }
