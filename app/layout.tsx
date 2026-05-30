import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LearnOS Dashboard',
  description: 'Your personal learning dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#09090b] text-white antialiased">
        {children}
      </body>
    </html>
  )
}