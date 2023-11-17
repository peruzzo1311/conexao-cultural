import imageCard from '@/assets/image-card.jpg'
import FeaturedEvents from '@/components/carousel/featured-events'
import NearbyEvents from '@/components/carousel/nearby-events'
import Filter from '@/components/filter'

export default async function Home() {
  return (
    <section className='container'>
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

      <div className='my-8 md:my-16'>
        <FeaturedEvents items={[imageCard.src, imageCard.src, imageCard.src]} />
      </div>
    </section>
  )
}
