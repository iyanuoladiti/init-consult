import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import courses, { type Course } from '@/data/courses'
import { useIdentity } from '@/lib/identity-context'
import { getAccessStatus } from '@/lib/access'
import { AccessButton } from '@/components/AccessButton'

export const Route = createFileRoute('/courses/$courseId')({
  component: CoursePage,
  loader: async ({ params }) => {
    const course = courses.find((c) => c.id === params.courseId)
    if (!course) throw new Error('Course not found')
    return course
  },
})

function CoursePage() {
  const course: Course = Route.useLoaderData()
  const { user, ready } = useIdentity()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)

  useEffect(() => {
    let active = true
    setHasAccess(null)
    if (!ready) return
    if (!user) {
      setHasAccess(false)
      return
    }
    getAccessStatus()
      .then((res) => { if (active) setHasAccess(res.hasAccess) })
      .catch(() => { if (active) setHasAccess(false) })
    return () => { active = false }
  }, [ready, user])

  const unlocked = !!user && hasAccess === true

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <Link
        to="/courses"
        className="font-sans text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
      >
        ← All courses
      </Link>

      <p className="font-sans text-xs tracking-[0.2em] uppercase text-[var(--ember)] mt-6 mb-3">
        {course.code}
      </p>
      <h1 className="font-display text-4xl mb-4">{course.title}</h1>
      <p className="font-sans text-lg text-[var(--ink-soft)] max-w-2xl mb-12">
        {course.description}
      </p>

      {course.materials && (
        <section aria-labelledby="materials-heading" className="mb-12">
          <div className="flex items-baseline justify-between gap-4 mb-5">
            <h2 id="materials-heading" className="font-display text-2xl">Past questions &amp; study resources</h2>
            <span className="font-sans text-xs text-[var(--ink-soft)]">{course.materials.length} files</span>
          </div>
          <p className="font-sans text-sm text-[var(--ink-soft)] mb-6">
            Original past papers and study resources. PDF files open in a PDF reader; Word documents require a compatible app.
          </p>
          <div className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {course.materials.map((material) => (
              <div key={material.id} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-sans text-xs tracking-widest text-[var(--ember)]">{material.format}</span>
                  <h3 className="font-display text-xl mt-1">{material.title}</h3>
                </div>
                {unlocked ? (
                  <a href={`/api/materials/${encodeURIComponent(material.id)}`} className="font-sans text-sm rounded-full border border-[var(--ember)] px-5 py-2 hover:bg-[var(--ember)]/10 focus-visible:outline-2 focus-visible:outline-offset-4 shrink-0" aria-label={`Download ${material.title}`}>
                    Download {material.format} ↓
                  </a>
                ) : (
                  <span className="font-sans text-xs text-[var(--ink-soft)]">{!ready || hasAccess === null ? 'Checking access…' : 'Available after payment'}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="space-y-4">
        {course.lessons.map((lesson, i) => (
          <div
            key={lesson.id}
            className="border border-[var(--rule)] rounded-2xl p-6 bg-white/40"
          >
            <div className="flex items-center justify-between gap-4 mb-2">
              <h3 className="font-display text-xl">
                {i + 1}. {lesson.title}
              </h3>
              <span className="font-sans text-xs text-[var(--ink-soft)] shrink-0">
                {lesson.duration}
              </span>
            </div>
            {unlocked ? (
              <p className="font-sans text-sm text-[var(--ink-soft)] leading-relaxed">
                {lesson.content}
              </p>
            ) : (
              <p className="font-sans text-sm text-[var(--ink-soft)]/60 italic">
                Unlock full access to read this lesson.
              </p>
            )}
          </div>
        ))}
      </div>

      {ready && !unlocked && (
        <div className="rise mt-10 border border-[var(--ember)]/40 bg-[var(--ember)]/5 rounded-2xl p-8 text-center">
          <h2 className="font-display text-2xl mb-2">
            Unlock {course.title} and everything else.
          </h2>
          <p className="font-sans text-sm text-[var(--ink-soft)] mb-6">
            One ₦15,000 payment gives you lifetime access to every INIT course, lesson, and
            study document.
          </p>
          <AccessButton />
        </div>
      )}
    </main>
  )
}
