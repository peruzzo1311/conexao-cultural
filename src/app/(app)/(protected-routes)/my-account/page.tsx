import DeleteEvent from '@/components/delete-event'
import EventsEmpty from '@/components/events-empty'
import GroupTag from '@/components/group-tag'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { db } from '@/lib/db'
import { initialProfile } from '@/lib/initial-profile'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowUpRight, Plus } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

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

  return (
    <section className='container flex-1 flex flex-col'>
      <h1 className='text-lg font-semibold mb-4'>Seus eventos</h1>

      <div className='flex-1 columns-1 sm:columns-2 lg:columns-3 xl:columns-4'>
        {events.map((event) => (
          <div key={event.id} className='relative w-full max-w-[300px]'>
            <DeleteEvent eventId={event.id} />

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
