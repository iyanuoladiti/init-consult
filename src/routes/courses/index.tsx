import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import courses from '@/data/courses'
import { useIdentity } from '@/lib/identity-context'
import { getAccessStatus } from '@/lib/access'
import { AccessButton } from '@/components/AccessButton'

export const Route = createFileRoute('/courses/')({
  component: CoursesIndex,
})

function CoursesIndex() {
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

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <p className="font-sans text-xs tracking-[0.2em] uppercase text-[var(--ember)] mb-3">
        Course library
      </p>
      <h1 className="font-display text-4xl mb-4">Every course, one place.</h1>

      {ready && hasAccess === false && (
        <div className="rise border border-[var(--ember)]/40 bg-[var(--ember)]/5 rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-sans text-sm text-[var(--ink-soft)] max-w-md">
            {user
              ? 'Your account does not have full access yet. Unlock every lesson and study document with a one-time payment.'
              : 'Sign in and unlock full access to view lessons and download study documents.'}
          </p>
          <AccessButton />
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, i) => (
          <Link
            key={course.id}
            to="/courses/$courseId"
            params={{ courseId: course.id }}
            className="rise group border border-[var(--rule)] rounded-2xl p-6 bg-white/40 hover:bg-white/70 hover:border-[var(--ember)] transition-colors"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <p className="font-sans text-xs tracking-[0.15em] uppercase text-[var(--ember)] mb-2">
              {course.code}
            </p>
            <h3 className="font-display text-2xl mb-2 group-hover:text-[var(--ember-deep)] transition-colors">
              {course.title}
            </h3>
            <p className="font-sans text-sm text-[var(--ink-soft)]">
              {course.tagline}
            </p>
            <p className="font-sans text-xs text-[var(--ink-soft)] mt-4">
              {course.materials?.length ?? course.lessons.length} {course.materials ? 'study documents' : 'lessons'}
              {hasAccess === false && ' · locked'}
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}
