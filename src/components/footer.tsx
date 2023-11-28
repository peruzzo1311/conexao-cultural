import logo from '@/assets/logo-branca.png'
import { Instagram } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='bg-[#242424] text-white w-full px-6 py-12 md:p-12'>
      <div className='w-full flex justify-between items-center border-b-2 border-white pb-8'>
        <div>
          <Image
            src={logo.src}
            alt='Conexão Cultural'
            width={100}
            height={100}
            quality={100}
            priority
            className='w-full h-full'
          />
        </div>

        <div className='flex gap-6 md:gap-8'>
          <Link href={'https://www.instagram.com/conexaoculturalcvel/'}>
            <Instagram className='md:w-8 md:h-8' />
          </Link>
        </div>
      </div>
    </footer>
  )
}
