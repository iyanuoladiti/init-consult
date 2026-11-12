import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/checkout/cancel')({
  component: CheckoutCancel,
})

function CheckoutCancel() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="rise border border-[var(--rule)] rounded-2xl p-12 bg-white/50 text-center max-w-lg">
        <p className="font-display text-5xl text-[var(--ember-deep)] mb-6">✕</p>
        <h1 className="font-display text-3xl mb-4">Checkout cancelled.</h1>
        <p className="font-sans text-[var(--ink-soft)] mb-8">
          Your INIT study library is still here. You can return whenever you’re ready to unlock full access for ₦15,000.
        </p>
        <Link
          to="/"
          className="font-sans inline-block px-7 py-3 rounded-full bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ember-deep)] transition-colors"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}
