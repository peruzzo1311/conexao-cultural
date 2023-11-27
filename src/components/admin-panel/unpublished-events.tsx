'use client'

import { cn } from '@/lib/utils'
import { Profile } from '@/types'
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
  profile: Profile
}

export default function UnpublishedEvents({
  events,
  profile,
}: UnpublishedEventsProps) {
  const [openApproveDialog, setOpenApproveDialog] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const handleApprove = async (event: Event) => {
    setSelectedEvent(event)
    setOpenApproveDialog(true)
  }

  return (
    <>
      {events.map((event) => (
        <Card
          key={event.id}
          className={cn(
            'rounded-xl overflow-hidden relative w-full max-w-[300px] mx-auto mb-4',
            profile.admin && 'cursor-pointer',
            !profile.admin && 'opacity-70 select-none'
          )}
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

      {profile.admin && (
        <ApproveDialog
          event={selectedEvent}
          open={openApproveDialog}
          openChange={setOpenApproveDialog}
        />
      )}
    </>
  )
}
