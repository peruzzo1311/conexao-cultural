import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type SidebarProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function Sidebar({ open, onOpenChange }: SidebarProps) {
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='text-2xl'>Menu</SheetTitle>

          <SheetDescription className='flex flex-col gap-2'>
            <Link
              href={'/'}
              onClick={() => onOpenChange(false)}
              className={cn(
                'flex justify-start items-center w-full rounded-lg bg-primary-50 px-4 py-2',
                pathname === '/' && 'bg-primary font-semibold'
              )}
            >
              <span className='text-lg text-black'>Início</span>
            </Link>

            <Link
              href={'/about'}
              onClick={() => onOpenChange(false)}
              className={cn(
                'flex justify-start items-center w-full rounded-lg px-4 py-2 bg-primary-50',
                pathname === '/about' && 'bg-primary font-semibold'
              )}
            >
              <span className='text-lg text-black'>Sobre nós</span>
            </Link>

            <Link
              href={'/my-account'}
              onClick={() => onOpenChange(false)}
              className={cn(
                'flex justify-start items-center w-full rounded-lg px-4 py-2 bg-primary-50',
                (pathname === '/my-account' || pathname === '/admin-panel') &&
                  'bg-primary font-semibold'
              )}
            >
              <span className='text-lg text-black'>Minha conta</span>
            </Link>

            {(pathname === '/my-account' || pathname === '/event-register') && (
              <Link
                href={'/event-register'}
                onClick={() => onOpenChange(false)}
                className={cn(
                  'flex justify-start items-center w-full rounded-lg px-4 py-2 bg-primary-50',
                  // @ts-ignore
                  pathname === '/event-register' && 'bg-primary font-semibold'
                )}
              >
                <span className='text-lg text-black'>Cadastrar eventos</span>
              </Link>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
