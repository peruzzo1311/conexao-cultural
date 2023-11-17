'use client'

import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import { Filter, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'
import Sidebar from './sidebar'

export default function AppbarNavigation() {
  const [open, setOpen] = useState(false)

  const pathname = usePathname()

  return (
    <>
      <div className='hidden md:flex justify-center items-center gap-1'>
        {pathname === '/' && (
          <Button
            variant={'ghost'}
            size={'sm'}
            className={cn(
              'gap-1 p-2 hover:text-orange hover:bg-transparent text-base px-4'
            )}
          >
            Filtros
          </Button>
        )}

        <Button
          asChild
          variant={'ghost'}
          size={'sm'}
          className={cn(
            'hover:text-orange hover:bg-transparent text-base px-4',
            pathname === '/about' &&
              'text-orange font-semibold hover:bg-transparent hover:text-orange'
          )}
        >
          <Link href={'/about'}>Sobre</Link>
        </Button>

        {pathname === '/event-register' && (
          <UserButton
            afterSignOutUrl='/'
            appearance={{
              elements: {
                avatarBox: 'h-[40px] w-[40px]',
              },
            }}
          />
        )}

        {pathname !== '/event-register' && (
          <Button
            asChild
            variant={'ghost'}
            size={'sm'}
            className={cn(
              'hover:text-orange hover:bg-transparent text-base px-4',
              pathname === '/register-event' &&
                'text-orange font-semibold hover:bg-transparent hover:text-orange '
            )}
          >
            <Link href={'/event-register'}>Cadastrar eventos</Link>
          </Button>
        )}
      </div>

      <div className='flex md:hidden'>
        <Button className='md:hidden' variant={'ghost'} size={'icon'}>
          <Filter className='w-[24px] h-[24px]' />
        </Button>

        <Button
          className='md:hidden'
          variant={'ghost'}
          size={'icon'}
          onClick={() => setOpen(true)}
        >
          <Menu className='w-[32px] h-[32px]' />
        </Button>
      </div>

      <Sidebar open={open} onOpenChange={setOpen} />
    </>
  )
}
