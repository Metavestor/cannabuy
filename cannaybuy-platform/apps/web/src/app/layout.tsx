import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '../components/context/AuthContext'
import { ClubProvider } from '../components/context/ClubContext'

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? 'CannaBuy'
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: appName,
    template: `%s · ${appName}`,
  },
  description: 'Cannabis Club Management — Manage. Comply. Grow.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: appName,
    description: 'Cannabis Club Management — Manage. Comply. Grow.',
    url: appUrl,
    siteName: appName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: appName,
    description: 'Cannabis Club Management — Manage. Comply. Grow.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ClubProvider>
            {children}
          </ClubProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
