import Carousel from '@/components/carousel'
import { db } from '@/lib/db'

export default async function Home() {
  const events = await db.event.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      address: true,
    },
  })

  const normalEvents = events.filter(
    (event) => event.published && !event.highlight
  )

  const featuredEvents = events.filter(
    (event) => event.published && event.highlight
  )

  return (
    <section className='container'>
      <div className='w-full'>
        <Carousel
          title='Descubra eventos na sua região'
          breakpoints={{
            768: {
              slidesPerView: 2,
              slidesPerGroup: 1,
            },
            1000: {
              slidesPerView: 3,
              slidesPerGroup: 2,
            },
            1300: {
              slidesPerView: 4,
              slidesPerGroup: 2,
            },
          }}
          events={normalEvents}
        />
      </div>

      <div className='my-8 md:my-16'>
        <Carousel
          title='Eventos em destaque'
          events={featuredEvents}
          featured
        />
      </div>
    </section>
  )
}
