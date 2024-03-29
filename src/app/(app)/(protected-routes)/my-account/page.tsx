import PublishedEvents from '@/components/admin-panel/published-events'
import UnpublishedEvents from '@/components/admin-panel/unpublished-events'
import EventsEmpty from '@/components/events-empty'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { initialProfile } from '@/lib/initial-profile'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export default async function MyAccount() {
  const profile = await initialProfile()

  if (!profile) {
    return redirect('/')
  }

  if (profile.admin) {
    return redirect('/admin-panel')
  }

  const events = await db.event.findMany({
    where: {
      profileId: profile.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      address: true,
    },
  })

  if (events.length === 0) {
    return (
      <section className='flex-1 flex justify-center items-center'>
        <EventsEmpty />
      </section>
    )
  }

  const publishedEvents = events.filter((event) => event.published)

  const unpublishedEvents = events.filter((event) => !event.published)

  return (
    <section className='container flex-1 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-lg font-semibold'>Esperando aprovação</h1>

        <div className='flex-1 flex flex-wrap gap-2'>
          <Suspense>
            {unpublishedEvents && (
              <UnpublishedEvents profile={profile} events={unpublishedEvents} />
            )}

            {unpublishedEvents.length === 0 && (
              <div className='text-gray-500'>Nenhum evento para aprovação</div>
            )}
          </Suspense>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <h1 className='text-lg font-semibold'>Seus eventos</h1>

        <div className='flex-1 flex flex-wrap gap-2'>
          <Suspense>
            {publishedEvents && <PublishedEvents events={publishedEvents} />}

            {publishedEvents.length === 0 && (
              <div className='text-gray-500'>Nenhum evento publicado</div>
            )}
          </Suspense>
        </div>
      </div>

      <Button
        asChild
        size={'icon'}
        className='fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 shadow md:hidden'
      >
        <Link href={'/event-register'}>
          <Plus className='w-8 h-8 text-white' />
        </Link>
      </Button>
    </section>
  )
}
