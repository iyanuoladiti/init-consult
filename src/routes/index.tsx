import { Link, createFileRoute } from '@tanstack/react-router'
import courses from '@/data/courses'
import { AccessButton } from '@/components/AccessButton'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <main>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-end">
        <div className="rise">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-[var(--ember)] mb-4">
            Practice courses &amp; timed tutorials
          </p>
          <h1 className="font-display text-5xl sm:text-6xl leading-[1.05] mb-6">
            Study with intent.
            <br />
            <span className="italic text-[var(--ember)]">Test</span> with confidence.
          </h1>
          <p className="font-sans text-lg text-[var(--ink-soft)] max-w-xl mb-8">
            Short, structured lessons and timed practice tests for your general
            studies courses. Preview every course for free — unlock the full
            library with a single one-time payment.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <AccessButton />
            <Link
              to="/courses"
              className="font-sans px-7 py-3 rounded-full border border-[var(--ink)]/25 hover:border-[var(--ink)] transition-colors"
            >
              Browse courses
            </Link>
          </div>
        </div>
        <div
          className="rise border border-[var(--rule)] rounded-2xl p-8 bg-white/50"
          style={{ animationDelay: '120ms' }}
        >
          <p className="font-sans text-xs tracking-[0.15em] uppercase text-[var(--ink-soft)] mb-4">
            One payment, everything unlocked
          </p>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-display text-5xl">$15</span>
            <span className="font-sans text-sm text-[var(--ink-soft)]">one-time</span>
          </div>
          <ul className="font-sans text-sm text-[var(--ink-soft)] space-y-2 mt-6">
            <li>— Full lesson library for every course</li>
            <li>— Timed practice tests, no limit</li>
            <li>— Lifetime access, no subscription</li>
          </ul>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-3xl">Course library</h2>
          <span className="font-sans text-sm text-[var(--ink-soft)]">
            {courses.length} courses available
          </span>
        </div>
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
                {course.lessons.length} lessons
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
