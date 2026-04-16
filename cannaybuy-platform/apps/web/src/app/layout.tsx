import type { Metadata } from 'next'
import './globals.css'
import { ClubProvider } from '../components/context/ClubContext'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME ?? 'CannaBuy',
  description: 'Cannabis Club Management — Manage. Comply. Grow.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClubProvider>
          {children}
        </ClubProvider>
      </body>
    </html>
  )
}
