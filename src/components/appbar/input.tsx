'use client'

import { Search } from 'lucide-react'
import { Input } from '../ui/input'

export default function AppbarInput() {
  return (
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
  )
}
