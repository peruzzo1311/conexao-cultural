'use client'

import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

export default function Navigation() {
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

        {pathname !== '/my-account' && (
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
            <Link href={'/my-account'}>Meus eventos</Link>
          </Button>
        )}

        {pathname === '/my-account' && (
          <Button
            asChild
            variant={'ghost'}
            size={'sm'}
            className={cn(
              'hover:text-orange hover:bg-transparent text-base px-4'
            )}
          >
            <Link href={'/event-register'}>Criar novo evento</Link>
          </Button>
        )}

        <UserButton
          afterSignOutUrl='/'
          appearance={{
            elements: {
              avatarBox: 'h-[40px] w-[40px]',
            },
          }}
        />
      </div>
    </>
  )
}
