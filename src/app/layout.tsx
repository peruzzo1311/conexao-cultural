import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Epilogue as FontSans } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <head />
      <body
        className={cn('bg-background font-sans antialiased', fontSans.variable)}
      >
        {children}
      </body>
    </html>
  )
}
