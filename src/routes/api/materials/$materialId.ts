import { createFileRoute } from '@tanstack/react-router'
import { getUser } from '@netlify/identity'
import { getDeployStore } from '@netlify/blobs'
import { eq } from 'drizzle-orm'
import { db } from '../../../../db/index.js'
import { purchases } from '../../../../db/schema.js'
import courses from '@/data/courses'

const privateHeaders = { 'Cache-Control': 'private, no-store', Vary: 'Cookie' }

export const Route = createFileRoute('/api/materials/$materialId')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const user = await getUser()
        if (!user?.email) {
          return new Response('Sign in to download study materials.', { status: 401, headers: privateHeaders })
        }
        const [purchase] = await db.select().from(purchases)
          .where(eq(purchases.email, user.email)).limit(1)
        if (!purchase?.paid) {
          return new Response('Paid access is required to download study materials.', { status: 403, headers: privateHeaders })
        }
        const material = courses.flatMap((course) => course.materials ?? [])
          .find((item) => item.id === params.materialId)
        if (!material) {
          return new Response('Material not found.', { status: 404, headers: privateHeaders })
        }
        const file = await getDeployStore().get(`materials/${material.id}`, { type: 'stream' })
        if (!file) {
          return new Response('This material is temporarily unavailable. Please try again later.', { status: 503, headers: privateHeaders })
        }
        return new Response(file, {
          headers: {
            ...privateHeaders,
            'Content-Type': material.format === 'PDF' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'Content-Disposition': `attachment; filename="${material.id}"`,
            'X-Content-Type-Options': 'nosniff',
          },
        })
      },
    },
  },
})
