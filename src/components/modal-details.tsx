import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Prisma } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

type ModalDetailsProps = {
  event: Prisma.EventGetPayload<{
    include: {
      address: true
    }
  }>
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ModalDetails({
  event,
  open,
  onOpenChange,
}: ModalDetailsProps) {
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [])

  const handleRedirect = () => {
    const regEx = /^http/

    if (regEx.test(event.link)) {
      window.open(event.link, '_blank')
    } else {
      window.open(`https://${event.link}`, '_blank')
    }
  }

  if (event)
    return (
      <Sheet open={open} onOpenChange={onOpenChange} modal>
        <SheetContent
          side={screenWidth >= 1000 ? 'right' : 'bottom'}
          className='pt-12 flex flex-col max-h-screen overflow-y-auto'
        >
          <div>
            <Image
              src={event.imageUrl}
              alt={event.name}
              width={500}
              height={300}
              className='rounded-xl'
            />
          </div>

          <div>
            <p className='text-2xl font-semibold'>{event.name}</p>

            <p className='text-sm text-muted-foreground md'>
              {event.description}
            </p>
          </div>

          <div className='flex flex-col gap-4 my-4'>
            <div className='w-full flex rounded-2xl overflow-hidden shadow-md'>
              <div className='flex justify-center items-center bg-orange p-2'>
                <Calendar className='text-white w-8 h-8' />
              </div>

              <div className='flex-1 bg-orange/10 px-4 py-2'>
                <p>{format(event.date, 'PPP', { locale: ptBR })}</p>

                <p>Início: {event.time}</p>
              </div>
            </div>

            <div className='w-full flex rounded-2xl overflow-hidden shadow-md'>
              <div className='flex justify-center items-center bg-orange p-2'>
                <MapPin className='text-white w-8 h-8' />
              </div>

              <div className='flex-1 bg-orange/10 px-4 py-2'>
                <p>{`${event.address.street}, ${event.address.number}`}</p>

                <p>{`${event.address.district}, ${event.address.city} - ${event.address.state}`}</p>
              </div>
            </div>
          </div>

          <Button
            className='justify-between h-14 rounded-full'
            onClick={handleRedirect}
          >
            <p className='text-white text-lg font-semibold uppercase'>
              Ingresso
            </p>

            <div className='py-2 px-4 rounded-full bg-white'>
              <ArrowRight className='w-6 h-6' />
            </div>
          </Button>
        </SheetContent>
      </Sheet>
    )
}
