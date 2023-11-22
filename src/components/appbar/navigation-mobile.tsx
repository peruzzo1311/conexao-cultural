'use client'

import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import Sidebar from './sidebar'

export default function NavigationMobile() {
  const [open, setOpen] = useState(false)

  const openSidebar = () => setOpen(true)

  return (
    <>
      <div className='flex gap-4 sm:hidden'>
        <UserButton
          afterSignOutUrl='/'
          appearance={{
            elements: {
              avatarBox: 'h-[40px] w-[40px]',
            },
          }}
        />

        <Button size={'icon'} onClick={openSidebar} className='bg-muted'>
          <Menu />
        </Button>
      </div>

      <Sidebar open={open} onOpenChange={setOpen} />
    </>
  )
}
