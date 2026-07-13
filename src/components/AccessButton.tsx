import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useIdentity } from '@/lib/identity-context'
import { createCheckoutSession, getStripeEnabled } from '@/lib/stripe'

export function AccessButton({ className = '' }: { className?: string }) {
  const { user, ready } = useIdentity()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [stripeEnabled, setStripeEnabled] = useState<boolean | null>(null)

  useEffect(() => {
    getStripeEnabled().then(setStripeEnabled)
  }, [])

  const handleClick = async () => {
    if (!ready) return
    if (!user) {
      navigate({ to: '/login' })
      return
    }
    setLoading(true)
    try {
      const url = await createCheckoutSession()
      if (url) window.location.href = url
    } catch (err) {
      console.error('Checkout error:', err)
      setLoading(false)
    }
  }

  if (stripeEnabled === false) {
    return (
      <button
        disabled
        className={`px-7 py-3 rounded-full border border-[var(--ink)]/20 text-[var(--ink-soft)] ${className}`}
        title="Checkout is not available yet"
      >
        Checkout unavailable
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading || stripeEnabled === null}
      className={`px-7 py-3 rounded-full bg-[var(--ember)] text-[var(--paper)] hover:bg-[var(--ember-deep)] transition-colors disabled:opacity-60 disabled:cursor-wait ${className}`}
    >
      {loading ? 'Redirecting…' : 'Unlock full access — $15'}
    </button>
  )
}
