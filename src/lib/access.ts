import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { purchases } from '../../db/schema.js'
import { requireAuthMiddleware } from '../middleware/identity'

export const getAccessStatus = createServerFn({ method: 'GET' })
  .middleware([requireAuthMiddleware])
  .handler(async ({ context }) => {
    const email = context.user.email
    if (!email) return { hasAccess: false }
    const [purchase] = await db
      .select()
      .from(purchases)
      .where(eq(purchases.email, email))
      .limit(1)

    return { hasAccess: !!purchase?.paid }
  })
