import GroupTag from '@/components/group-tag'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { db } from '@/lib/db'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowUpRight } from 'lucide-react'
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
    <div className='container flex-1 flex flex-col gap-8'>
      <p className='font-medium text-lg'>Resultados para: {params.search}</p>

      <div className='flex-1 flex flex-wrap gap-2'>
        {events.map((event) => (
          <Card
            key={event.id}
            className='rounded-xl overflow-hidden relative w-full max-w-[275px] xl:max-w-[300px]'
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
      </div>
    </div>
  )
}
