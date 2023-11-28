import SearchEvents from '@/components/search/events'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { search: string } }) {
  const events = await db.event.findMany({
    where: {
      OR: [
        {
          name: {
            contains: params.search,
          },
        },
        {
          description: {
            contains: params.search,
          },
        },
        {
          address: {
            city: {
              contains: params.search,
            },
          },
        },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      address: true,
    },
  })

  if (!events || events.length === 0) {
    return redirect('/search')
  }

  return (
    <>
      <div className='container flex-1 flex flex-col gap-8'>
        <p className='font-medium text-lg'>Resultados para: {params.search}</p>

        <div className='flex-1 flex flex-wrap gap-2'>
          <SearchEvents events={events} />
        </div>
      </div>
    </>
  )
}
