import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core'

export const purchases = pgTable('purchases', {
  id: serial().primaryKey(),
  email: text().notNull().unique(),
  stripeSessionId: text('stripe_session_id'),
  paid: boolean().notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
})
