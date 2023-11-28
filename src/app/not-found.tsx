import Appbar from '@/components/appbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Appbar />

      <section className='flex-1 flex flex-col justify-center items-center gap-8'>
        <h1 className='font-semibold text-xl text-gray-500'>
          {`Página não encontrada :(`}
        </h1>

        <Button className='text-white font-semibold'>
          <Link href='/'>Retornar a página inicial</Link>
        </Button>
      </section>

      <Footer />
    </div>
  )
}
