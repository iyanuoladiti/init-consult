import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import courses from '@/data/courses'
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
  const course = Route.useLoaderData()
  const { user, ready } = useIdentity()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)

  useEffect(() => {
    if (!ready) return
    if (!user) {
      setHasAccess(false)
      return
    }
    getAccessStatus()
      .then((res) => setHasAccess(res.hasAccess))
      .catch(() => setHasAccess(false))
  }, [ready, user])

  const unlocked = hasAccess === true

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
            One payment gives you lifetime access to every course, lesson, and
            practice test.
          </p>
          <AccessButton />
        </div>
      )}
    </main>
  )
}
