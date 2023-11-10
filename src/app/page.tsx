import imageCard from '@/assets/image-card.jpg'
import Appbar from '@/components/appbar'
import FeaturedEvents from '@/components/featured-events'
import Filter from '@/components/filter'
import NearbyEvents from '@/components/nearby-events'

export default async function Home() {
  return (
    <main className='p-2 md:px-4 h-screen'>
      <Appbar />

      <div className='flex md:hidden p-2'>
        <Filter />
      </div>

      <div className='w-full mt-8'>
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

      <div className='mt-16'>
        <FeaturedEvents items={[imageCard.src, imageCard.src, imageCard.src]} />
      </div>
    </main>
  )
}
