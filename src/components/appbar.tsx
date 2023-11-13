import logo from '@/assets/logo.png'
import { Button } from '@/components/ui/button'
import { Menu, Search } from 'lucide-react'
import Image from 'next/image'
import { Input } from './ui/input'

export default function Appbar() {
  return (
    <header className='w-full flex justify-between items-center p-4'>
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

      <div className='hidden w-full max-w-xs lg:flex gap-2 items-center rounded-md border border-input bg-background pl-3 focus-within:ring-1 focus-within:ring-primary focus-within:bg-primary-50 transition'>
        <label htmlFor='search'>
          <Search className='w-5 h-5 text-gray-400' />
        </label>

        <Input
          id='search'
          className='focus-visible:bg-primary-50 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 p-0 text-sm transition'
          placeholder='Pesquisar'
        />
      </div>

      <div className='hidden md:flex justify-center items-center gap-2'>
        <Button
          variant={'ghost'}
          size={'sm'}
          className='text-md pt-1 hover:bg-primary-50 hover:ring-1 hover:ring-primary-200 active:scale-90 transition'
        >
          Filtros
        </Button>

        <Button
          variant={'ghost'}
          size={'sm'}
          className='text-md pt-1 hover:bg-primary-50 hover:ring-1 hover:ring-primary-200 active:scale-90 transition'
        >
          Sobre
        </Button>

        <Button
          variant={'ghost'}
          size={'sm'}
          className='text-md pt-1 hover:bg-primary-50 hover:ring-1 hover:ring-primary-200 active:scale-90 transition'
        >
          Cadastrar eventos
        </Button>
      </div>

      <Button className='md:hidden ' variant={'ghost'} size={'icon'}>
        <Menu className='w-7 h-7' />
      </Button>
    </header>
  )
}
