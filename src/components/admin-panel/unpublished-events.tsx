'use client'

import type { Event, Prisma } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import GroupTag from '../group-tag'
import { Card, CardContent, CardFooter } from '../ui/card'
import ApproveDialog from './approve-dialog'

type UnpublishedEventsProps = {
  events: Prisma.EventGetPayload<{
    include: {
      address: true
    }
  }>[]
}

export default function UnpublishedEvents({ events }: UnpublishedEventsProps) {
  const [openApproveDialog, setOpenApproveDialog] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const handleApprove = (event: Event) => {
    setSelectedEvent(event)
    setOpenApproveDialog(true)
  }

  return (
    <>
      {events.map((event) => (
        <Card
          key={event.id}
          className='rounded-xl overflow-hidden relative w-full max-w-[300px] mx-auto mb-4 cursor-pointer'
          onClick={() => handleApprove(event)}
        >
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
      ))}

      <ApproveDialog
        // @ts-ignore
        event={selectedEvent}
        open={openApproveDialog}
        openChange={setOpenApproveDialog}
      />
    </>
  )
}
