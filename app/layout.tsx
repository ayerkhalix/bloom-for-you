import React from "react"
import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'

import './globals.css'

const quicksand = Quicksand({ 
  subsets: ['latin'],
  variable: '--font-quicksand'
})

export const metadata: Metadata = {
  title: 'Bloom for You',
  description: 'A Valentine\'s surprise',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
