import Appbar from '@/components/appbar'
import Footer from '@/components/footer'
import { Suspense } from 'react'
import Loading from './loading'

type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Appbar />

      <section className='flex-1 flex flex-col my-4'>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </section>

      <Footer />
    </div>
  )
}
