'use client'

import { usePathname, useRouter } from 'next/navigation'
import AppbarInput from './input'
import logo from '@/assets/logo.png'
import Navigation from './navigation'
import NavigationMobile from './navigation-mobile'
import Image from 'next/image'

export default function Appbar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <header className='w-full flex justify-between items-center p-4 z-50 bg-white container'>
      <div
        className='w-[125px] cursor-pointer'
        onClick={() => router.push('/')}
      >
        <Image src={logo} alt='Conexão Cultural' />
      </div>

      {pathname === '/' && <AppbarInput />}

      <div className='!hidden md:!flex'>
        <Navigation />
      </div>

      <div className='!flex md:!hidden'>
        <NavigationMobile />
      </div>
    </header>
  )
}
