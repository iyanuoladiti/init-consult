import type { Config } from '@netlify/functions'
import { eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { purchases } from '../../db/schema.js'

export default async (req: Request) => {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secretKey || !webhookSecret) {
    return new Response('Stripe is not configured', { status: 500 })
  }

  const signature = req.headers.get('stripe-signature')
  if (!signature) {
    return new Response('Missing signature', { status: 400 })
  }

  const { default: Stripe } = await import('stripe')
  const stripe = new Stripe(secretKey)
  const body = await req.text()

  let event
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret,
    )
  } catch (err) {
    return new Response(`Webhook signature verification failed`, {
      status: 400,
    })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const email = session.customer_email ?? session.customer_details?.email
    if (email) {
      const [existing] = await db
        .select()
        .from(purchases)
        .where(eq(purchases.email, email))
        .limit(1)

      if (existing) {
        await db
          .update(purchases)
          .set({ paid: true, stripeSessionId: session.id })
          .where(eq(purchases.email, email))
      } else {
        await db.insert(purchases).values({
          email,
          paid: true,
          stripeSessionId: session.id,
        })
      }
    }
  }

  return new Response('ok', { status: 200 })
}

export const config: Config = {
  path: '/api/stripe-webhook',
}
