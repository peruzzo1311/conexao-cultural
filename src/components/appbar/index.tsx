'use client'

import { usePathname } from 'next/navigation'
import AppbarInput from './input'
import AppbarLogo from './logo'
import Navigation from './navigation'
import NavigationMobile from './navigation-mobile'

export default function Appbar() {
  const pathname = usePathname()

  return (
    <header className='w-full flex fixed justify-between items-center p-4 z-50 bg-white md:container'>
      <AppbarLogo />

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
