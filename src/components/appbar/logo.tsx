'use client'

import logo from '@/assets/logo.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function AppbarLogo() {
  const router = useRouter()

  return (
    <div className='cursor-pointer' onClick={() => router.push('/')}>
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
  )
}
