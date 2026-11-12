import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { AuthError, login, signup } from '@netlify/identity'
import { useIdentity } from '@/lib/identity-context'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const { user, ready } = useIdentity()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'pending'>('idle')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  if (ready && user) {
    navigate({ to: '/courses' })
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setNotice('')
    setStatus('pending')
    try {
      if (mode === 'login') {
        await login(email, password)
        navigate({ to: '/courses' })
      } else {
        const created = await signup(email, password, { full_name: name })
        if (created.confirmedAt) {
          navigate({ to: '/courses' })
        } else {
          setNotice(`Confirmation email sent to ${email}. Click the link to finish signing up.`)
        }
      }
    } catch (err) {
      if (err instanceof AuthError) {
        setError(err.message)
      } else {
        setError('Something went wrong. Try again.')
      }
    } finally {
      setStatus('idle')
    }
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rise">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-[var(--ember)] mb-3">
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </p>
        <h1 className="font-display text-4xl mb-8">
          {mode === 'login' ? 'Sign in to study.' : 'Join the INIT community.'}
        </h1>

        <p className="font-sans text-sm text-[var(--ink-soft)] mb-6">Your INIT account keeps your study library in one place. Full access is a one-time ₦15,000 payment after sign-up.</p>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm mb-1.5 text-[var(--ink-soft)]">
                Full name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--rule)] bg-white/60 focus:outline-none focus:border-[var(--ember)]"
                placeholder="Adaeze Nwosu"
              />
            </div>
          )}
          <div>
            <label className="block text-sm mb-1.5 text-[var(--ink-soft)]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-[var(--rule)] bg-white/60 focus:outline-none focus:border-[var(--ember)]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-1.5 text-[var(--ink-soft)]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-lg border border-[var(--rule)] bg-white/60 focus:outline-none focus:border-[var(--ember)]"
              placeholder="At least 6 characters"
            />
          </div>

          {error && <p className="text-sm text-[var(--ember-deep)]">{error}</p>}
          {notice && <p className="text-sm text-[var(--moss)]">{notice}</p>}

          <button
            type="submit"
            disabled={status === 'pending'}
            className="w-full py-3 rounded-lg bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ember-deep)] transition-colors disabled:opacity-60"
          >
            {status === 'pending'
              ? 'Please wait…'
              : mode === 'login'
                ? 'Sign in'
                : 'Create account'}
          </button>
        </form>

        <p className="font-sans text-sm text-[var(--ink-soft)] mt-6 text-center">
          {mode === 'login' ? (
            <>
              New here?{' '}
              <button
                onClick={() => setMode('signup')}
                className="text-[var(--ember)] underline underline-offset-2"
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already registered?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-[var(--ember)] underline underline-offset-2"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </main>
  )
}
