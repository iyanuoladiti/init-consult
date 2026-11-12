import { Link, createFileRoute } from '@tanstack/react-router'
import { FULL_ACCESS_PRICE_LABEL } from '@/lib/pricing'
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
            INIT Educational Consultant · Nigerian student community
          </p>
          <h1 className="font-display text-5xl sm:text-6xl leading-[1.05] mb-6">
            Your next exam.
            <br />
            <span className="italic text-[var(--ember)]">Prepare</span> with INIT.
          </h1>
          <p className="font-sans text-lg text-[var(--ink-soft)] max-w-xl mb-8">
            A study space for Nigerian students. Revise BIO 102, CHM 102, CHM 108, PHY 106, and GST 114 with the uploaded past questions, practice papers, and explained answers. Browse the library, then unlock your materials with one payment.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <AccessButton />
            <Link
              to="/courses"
              className="font-sans px-7 py-3 rounded-full border border-[var(--ink)]/25 hover:border-[var(--ink)] transition-colors"
            >
              Explore past questions
            </Link>
          </div>
        </div>
        <div
          className="rise border border-[var(--rule)] rounded-2xl overflow-hidden bg-white/50"
          style={{ animationDelay: '120ms' }}
        >
          <img src="/brand/init-logo.png" alt="INIT Educational Consultant: learning and student support" width="1536" height="1024" className="w-full aspect-[2/1] object-cover" />
          <div className="p-8">
          <p className="font-sans text-xs tracking-[0.15em] uppercase text-[var(--ink-soft)] mb-4">
            One payment, everything unlocked
          </p>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-display text-5xl">{FULL_ACCESS_PRICE_LABEL}</span>
            <span className="font-sans text-sm text-[var(--ink-soft)]">one-time</span>
          </div>
          <ul className="font-sans text-sm text-[var(--ink-soft)] space-y-2 mt-6">
            <li>— 19 course question and study documents</li>
            <li>— PDF and Word downloads, plus general studies lessons</li>
            <li>— Lifetime access, no subscription</li>
          </ul>
          <p className="font-sans text-xs text-[var(--ink-soft)] mt-5">Charged in Nigerian naira (NGN). No recurring fees.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--rule)] bg-[var(--paper-dim)] mb-16" aria-labelledby="study-path">
        <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-[1fr_2fr] gap-8">
          <div><p className="font-sans text-xs uppercase tracking-[0.15em] text-[var(--ember)] mb-3">From questions to revision</p><h2 id="study-path" className="font-display text-3xl">Make study time count.</h2></div>
          <ol className="grid sm:grid-cols-3 gap-6 font-sans text-sm text-[var(--ink-soft)]">
            <li><span className="block text-[var(--ember)] mb-3">01 / FIND</span><strong className="block text-[var(--ink)] mb-2">Choose your course</strong>Preview question titles and see the available resources before paying.</li>
            <li><span className="block text-[var(--ember)] mb-3">02 / UNLOCK</span><strong className="block text-[var(--ink)] mb-2">One payment. Full access.</strong>Create your account and pay ₦15,000 to unlock the entire library.</li>
            <li><span className="block text-[var(--ember)] mb-3">03 / REVISE</span><strong className="block text-[var(--ink)] mb-2">Download and practise</strong>Work through the original question papers and use the available answers to guide revision.</li>
          </ol>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-3xl">Find your course</h2>
          <span className="font-sans text-sm text-[var(--ink-soft)]">
            {courses.length} course &amp; resource collections
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
                {course.materials?.length ?? course.lessons.length} {course.materials ? 'study documents' : 'lessons'}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6" aria-labelledby="study-faq">
        <div className="border-t border-[var(--rule)] pt-10 grid md:grid-cols-[1fr_2fr] gap-8">
          <h2 id="study-faq" className="font-display text-3xl">Before you get started</h2>
          <div className="font-sans text-sm text-[var(--ink-soft)] divide-y divide-[var(--rule)]">
            <details className="py-4"><summary className="cursor-pointer font-semibold text-[var(--ink)]">What does ₦15,000 cover?</summary><p className="pt-3 leading-relaxed">One payment unlocks all courses, lessons, and downloadable study documents in the INIT library. Access does not require a subscription.</p></details>
            <details className="py-4"><summary className="cursor-pointer font-semibold text-[var(--ink)]">Which questions are available?</summary><p className="pt-3 leading-relaxed">The uploaded collections cover BIO 102, CHM 102, CHM 108, PHY 106, and GST 114. Each course lists its original files. General studies lessons and an uploaded exam timetable reference are also included; confirm current exam dates with your department.</p></details>
            <details className="py-4"><summary className="cursor-pointer font-semibold text-[var(--ink)]">How do I get my materials after payment?</summary><p className="pt-3 leading-relaxed">Sign in with the same account used for checkout, open your course, and select a download. Files are supplied in PDF or Word format for use with a compatible reader.</p></details>
          </div>
        </div>
      </section>
    </main>
  )
}
