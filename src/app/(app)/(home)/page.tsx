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

  const categories = Array.from(new Set(events.map((event) => event.category)))

  return (
    <section className='container space-y-16 my-4'>
      {featuredEvents.length > 0 && (
        <div className='w-full'>
          <Carousel
            title='Eventos em destaque'
            events={featuredEvents}
            featured
          />
        </div>
      )}

      {categories.map((category) => {
        const eventsByCategory = normalEvents.filter(
          (event) => event.category === category
        )

        if (eventsByCategory.length === 0) return null

        return (
          <div className='w-full' key={category}>
            <Carousel
              title={`${category}`}
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
              events={eventsByCategory}
            />
          </div>
        )
      })}
    </section>
  )
}
