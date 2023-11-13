import imageCard from '@/assets/image-card.jpg'
import Appbar from '@/components/appbar'
import FeaturedEvents from '@/components/carousel/featured-events'
import NearbyEvents from '@/components/carousel/nearby-events'

import Filter from '@/components/filter'
import Footer from '@/components/footer'

export default async function Home() {
  return (
    <section className='min-h-screen flex flex-col gap-8'>
      <Appbar />

      <article className='container'>
        <div className='flex md:hidden'>
          <Filter />
        </div>

        <div className='w-full'>
          <NearbyEvents
            items={[
              imageCard.src,
              imageCard.src,
              imageCard.src,
              imageCard.src,
              imageCard.src,
              imageCard.src,
              imageCard.src,
              imageCard.src,
              imageCard.src,
            ]}
          />
        </div>

        <div className='mt-8 md:my-16'>
          <FeaturedEvents
            items={[imageCard.src, imageCard.src, imageCard.src]}
          />
        </div>
      </article>

      <Footer />
    </section>
  )
}
