'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Input } from '../ui/input'

export default function AppbarInput() {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSearch = useCallback(() => {
    if (search.length > 0) {
      router.push(`/search/${search}`)
    }
  }, [router, search])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()

        handleSearch()
      }
    }

    document.addEventListener('keydown', down)

    return () => document.removeEventListener('keydown', down)
  }, [handleSearch])

  return (
    <div className='hidden w-full max-w-xs xl:max-w-md lg:flex gap-2 items-center rounded-md border border-input bg-background pl-3 focus-within:ring-1 focus-within:ring-primary focus-within:bg-primary-50 transition'>
      <label htmlFor='search'>
        <Search className='w-5 h-5 text-gray-400' />
      </label>

      <Input
        id='search'
        className='focus-visible:bg-primary-50 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 p-0 text-sm transition'
        placeholder='Pesquisar'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}
