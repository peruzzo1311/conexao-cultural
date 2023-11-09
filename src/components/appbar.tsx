/* eslint-disable @next/next/no-img-element */
import logo from '@/assets/logo.png'
import { Button } from '@/components/ui/button'
import { Menu, Search } from 'lucide-react'
import Image from 'next/image'
import { Input } from './ui/input'

export default function Appbar() {
  return (
    <header className='w-full flex justify-between items-center px-4 py-2'>
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

      <div className='hidden w-full max-w-xs md:flex gap-2 items-center rounded-md border border-input bg-background px-4'>
        <Search className='w-5 h-5 text-gray-400' />

        <Input
          className='focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-0 p-0 text-sm'
          placeholder='Pesquisar'
        />
      </div>

      <div className='hidden md:flex justify-center items-center gap-4'>
        <Button
          variant={'ghost'}
          className='hover:ring-1 hover:ring-primary-500 active:scale-90 transition'
        >
          Filtros
        </Button>

        <Button
          variant={'ghost'}
          className='hover:ring-1 hover:ring-primary-500 active:scale-95 transition'
        >
          Sobre
        </Button>

        <Button
          variant={'ghost'}
          className='hover:ring-1 hover:ring-primary-500 active:scale-95 transition'
        >
          Cadastrar eventos
        </Button>
      </div>

      <Button
        className='md:hidden hover:ring-1 hover:ring-primary-500 active:scale-95 transition'
        variant={'ghost'}
        size={'icon'}
      >
        <Menu className='w-7 h-7' />
      </Button>
    </header>
  )
}
