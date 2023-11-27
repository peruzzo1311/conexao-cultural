import { cn } from '@/lib/utils'
import { ptBR } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { ReactNode } from 'react'

import './globals.css'

export const metadata: Metadata = {
  title: 'Conexão cultural',
  description: 'Divulgação de eventos culturais e artísticos',
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
    <ClerkProvider localization={ptBR}>
      <html lang='pt-BR' suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
