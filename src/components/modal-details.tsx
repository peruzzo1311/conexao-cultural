'use client'

import { Sheet, SheetContent } from '@/components/ui/sheet'
import { ArrowRight, Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

import image from '@/assets/image-card.jpg'

type ModalDetailsProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ModalDetails({
  open,
  onOpenChange,
}: ModalDetailsProps) {
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [])

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal>
      <SheetContent
        side={screenWidth >= 1000 ? 'right' : 'bottom'}
        className='pt-12 flex flex-col max-h-screen overflow-y-auto'
      >
        <div className='w-full overflow-hidden rounded-xl shadow-md'>
          <Image
            src={image.src}
            alt='Nome do evento'
            width={250}
            height={250}
            quality={100}
            priority
            className='h-auto w-full object-contain'
          />
        </div>

        <div>
          <p className='text-2xl font-semibold'>Nome do evento</p>

          <p className='text-sm text-muted-foreground md'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit incidunt accusantium repudiandae velit cum in corrupti
            sed, maxime temporibus dicta nobis veniam at quos ducimus labore
            asperiores dolor ad nihil!
          </p>
        </div>

        <div className='flex flex-col gap-4 my-4'>
          <div className='w-full flex rounded-2xl overflow-hidden shadow-md'>
            <div className='flex justify-center items-center bg-orange p-2'>
              <Calendar className='text-white w-8 h-8' />
            </div>

            <div className='flex-1 bg-orange/10 px-4 py-2'>
              <p>22 de novembro de 2023</p>

              <p>Início: 22:00</p>
            </div>
          </div>

          <div className='w-full flex rounded-2xl overflow-hidden shadow-md'>
            <div className='flex justify-center items-center bg-orange p-2'>
              <MapPin className='text-white w-8 h-8' />
            </div>

            <div className='flex-1 bg-orange/10 px-4 py-2'>
              <p>Rua Fortunato Beber, 987</p>

              <p>Pacaembu, Cascavel - PR</p>
            </div>
          </div>
        </div>

        <Button
          className='font-bold justify-between h-14 rounded-full'
          onClick={() => onOpenChange(false)}
        >
          <p className='text-white text-xl'>Ingresso</p>

          <div className='py-2 px-4 rounded-full bg-white'>
            <ArrowRight className='w-6 h-6' />
          </div>
        </Button>
      </SheetContent>
    </Sheet>
  )
}
