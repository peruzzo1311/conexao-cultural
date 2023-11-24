import PublishedEvents from '@/components/admin-panel/published-events'
import { default as UnpublishedEvents } from '@/components/admin-panel/unpublished-events'
import { db } from '@/lib/db'
import { initialProfile } from '@/lib/initial-profile'
import { Prisma } from '@prisma/client'

import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export default async function AdminPanel() {
  const profile = await initialProfile()

  if (!profile) {
    return redirect('/')
  }

  if (!profile.admin) {
    return redirect('/my-account')
  }

  const unpublishedEvents: Prisma.EventGetPayload<{
    include: {
      address: true
    }
  }>[] = await db.event.findMany({
    where: {
      published: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      address: true,
    },
  })

  const publishedEvents: Prisma.EventGetPayload<{
    include: {
      address: true
    }
  }>[] = await db.event.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      address: true,
    },
  })

  return (
    <section className='container flex-1 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-lg font-semibold'>Eventos para aprovação</h1>

        <div className='ml-4 flex-1 columns-1 sm:columns-2 lg:columns-3 xl:columns-4'>
          <Suspense>
            {unpublishedEvents && (
              <UnpublishedEvents events={unpublishedEvents} />
            )}

            {unpublishedEvents.length === 0 && (
              <div className='text-gray-500'>Nenhum evento para aprovação</div>
            )}
          </Suspense>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <h1 className='text-lg font-semibold'>Eventos publicados</h1>

        <div className='ml-4 flex-1 columns-1 sm:columns-2 lg:columns-3 xl:columns-4'>
          <Suspense>
            {publishedEvents && <PublishedEvents events={publishedEvents} />}

            {publishedEvents.length === 0 && (
              <div className='text-gray-500'>Nenhum evento publicado</div>
            )}
          </Suspense>
        </div>
      </div>
    </section>
  )
}
