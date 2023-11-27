'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

export default function EventsEmpty() {
  const router = useRouter()

  return (
    <div className='w-full md:max-w-lg md:border md:border-input flex flex-col justify-center items-center py-12 px-4 gap-8 md:shadow'>
      <p className='text-lg text-center'>
        Você ainda não cadastrou nenhum evento. Deseja cadastrar?
      </p>

      <Button size={'lg'} onClick={() => router.push('/event-register')}>
        <p className='text-white text-lg'>Cadastrar evento</p>
      </Button>
    </div>
  )
}
