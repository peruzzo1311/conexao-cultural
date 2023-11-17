import Appbar from '@/components/appbar'
import Footer from '@/components/footer'

type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Appbar />

      <section className='flex-1 flex flex-col mt-20'>{children}</section>

      <Footer />
    </div>
  )
}
