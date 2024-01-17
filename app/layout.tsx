import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import DefaultNavbar from './_components/Navbars/DefaultNavbar'

import StoreProvider from './_components/Providers/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RGE Online Editor',
  description: 'Play around with RGE.js, online!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <DefaultNavbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
