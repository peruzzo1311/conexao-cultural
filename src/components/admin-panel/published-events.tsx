'use client'

import GroupTag from '@/components/group-tag'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { Prisma } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowUpRight, X } from 'lucide-react'
import { useState } from 'react'

type PublishedEventsProps = {
  events: Prisma.EventGetPayload<{
    include: {
      address: true
    }
  }>[]
}

type Event = Prisma.EventGetPayload<{
  include: {
    address: true
  }
}>

export default function PublishedEvents({ events }: PublishedEventsProps) {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event)
    setOpenConfirmDialog(true)
  }

  const handleDelete = async () => {
    console.log(selectedEvent?.name)
  }

  return (
    <>
      {events.map((event) => (
        <div key={event.id} className='relative w-full max-w-[300px]'>
          <Button
            size={'sm'}
            variant={'destructive'}
            className='absolute -top-2 -right-2 rounded-full h-6 w-6 p-0 flex justify-center items-center z-50'
            onClick={() => handleSelectEvent(event)}
          >
            <X className='text-white h-4 w-4' />
          </Button>

          <Card className='rounded-xl overflow-hidden relative w-full'>
            <CardContent
              style={{
                backgroundImage: `url(${event.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              className='h-[250px]'
            >
              <GroupTag group={event.category} />
            </CardContent>

            <CardFooter className='bg-orange text-white py-4 flex justify-start items-start flex-col gap-4'>
              <span className='w-full text-lg font-semibold line-clamp-1'>
                {event.name}
              </span>

              <div className='w-full flex justify-between items-center'>
                <span className='text-sm'>
                  {format(event.date, 'PPP', { locale: ptBR })}
                </span>

                <ArrowUpRight className='w-6 h-6 inline-block ml-1' />
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}

      <AlertDialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>

            <AlertDialogDescription>
              Você tem certeza que deseja excluir este evento? Esta ação é
              irreversível.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            <AlertDialogAction onClick={handleDelete}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
