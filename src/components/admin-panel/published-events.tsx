'use client'

import GroupTag from '@/components/group-tag'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { Prisma } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowUpRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import DeleteEvent from '../delete-event'

type PublishedEventsProps = {
  events: Prisma.EventGetPayload<{
    include: {
      address: true
    }
  }>[]
}

export default function PublishedEvents({ events }: PublishedEventsProps) {
  const pathname = usePathname()

  return (
    <>
      {events.map((event) => (
        <Card
          key={event.id}
          className='rounded-xl overflow-hidden relative w-full max-w-[275px] xl:max-w-[300px]'
        >
          {pathname === '/admin-panel' && <DeleteEvent eventId={event.id} />}

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
    </>
  )
}
