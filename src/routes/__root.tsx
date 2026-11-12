import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'

import { IdentityProvider, useIdentity } from '../lib/identity-context'
import { CallbackHandler } from '../components/CallbackHandler'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'INIT Educational Consultant — Nigerian Student Study Community' },
      {
        name: 'description',
        content:
          'Past questions, explained answers, and course notes for Nigerian students. Unlock the INIT study library for a one-time payment of ₦15,000.',
      },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Source+Serif+4:wght@400;500;600&family=Archivo:wght@400;500;600;700&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG">
      <head>
        <HeadContent />
      </head>
      <body>
        <IdentityProvider>
          <CallbackHandler>
            <SiteNav />
            {children}
            <SiteFooter />
          </CallbackHandler>
        </IdentityProvider>
        <div className="paper-grain" />
        <Scripts />
      </body>
    </html>
  )
}

function SiteNav() {
  const { user, ready, logout } = useIdentity()

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--rule)] bg-[var(--paper)]/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 min-w-0" aria-label="INIT Educational Consultant home">
          <img src="/brand/init-logo.png" alt="" width="56" height="40" className="w-14 h-10 object-cover rounded" />
          <span className="font-sans font-bold text-[var(--ember)] leading-tight">INIT<span className="block text-[10px] sm:text-xs font-medium tracking-wide text-[var(--ink-soft)]">Educational Consultant</span></span>
        </Link>
        <nav className="font-sans text-sm flex items-center gap-3 sm:gap-6">
          <Link
            to="/courses"
            className="text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
          >
            Study library
          </Link>
          {ready && user ? (
            <button
              onClick={() => logout()}
              className="px-4 py-2 rounded-full border border-[var(--ink)]/20 hover:border-[var(--ink)] transition-colors"
            >
              Sign out
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-full bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ember-deep)] transition-colors"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-[var(--rule)] mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 font-sans text-sm text-[var(--ink-soft)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© 2026 INIT Educational Consultant. All rights reserved.</span>
        <span>Supporting Nigerian students, one course at a time.</span>
      </div>
    </footer>
  )
}
