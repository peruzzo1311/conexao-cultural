'use client'

import logo from '@/assets/logo.png'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import AppbarInput from './input'
import Navigation from './navigation'
import NavigationMobile from './navigation-mobile'

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

      {pathname !== '/about' &&
        pathname !== '/admin-panel' &&
        pathname !== '/event-register' &&
        pathname !== '/my-account' && <AppbarInput />}

      <div className='!hidden md:!flex'>
        <Navigation />
      </div>

      <div className='!flex md:!hidden'>
        <NavigationMobile />
      </div>
    </header>
  )
}
