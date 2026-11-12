import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/checkout/success')({
  component: CheckoutSuccess,
})

function CheckoutSuccess() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="rise border border-[var(--rule)] rounded-2xl p-12 bg-white/50 text-center max-w-lg">
        <p className="font-display text-5xl text-[var(--moss)] mb-6">✓</p>
        <h1 className="font-display text-3xl mb-4">Thank you for choosing INIT.</h1>
        <p className="font-sans text-[var(--ink-soft)] mb-8">
          Your checkout is complete. Once your payment is confirmed, your INIT account can access every course, past-question collection, and study document. Confirmation may take a moment.
        </p>
        <Link
          to="/courses"
          className="font-sans inline-block px-7 py-3 rounded-full bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ember-deep)] transition-colors"
        >
          Open the study library
        </Link>
      </div>
    </main>
  )
}
