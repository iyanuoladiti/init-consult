import { createServerFn } from '@tanstack/react-start'
import { requireAuthMiddleware } from '../middleware/identity'

const FULL_ACCESS_PRICE_USD = 15

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
            currency: 'usd',
            product_data: {
              name: 'Full Course Access',
              description:
                'Lifetime access to every tutorial, course, and practice test on the platform.',
            },
            unit_amount: FULL_ACCESS_PRICE_USD * 100,
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

export { FULL_ACCESS_PRICE_USD }
