import { cp, mkdir } from 'node:fs/promises'

// Deploy-scoped Blobs keep the documents out of the public web directory.
await mkdir('.netlify/blobs/deploy/materials', { recursive: true })
await cp('assets/course-materials', '.netlify/blobs/deploy/materials', { recursive: true })
