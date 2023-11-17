import imageCard from '@/assets/image-card.jpg'
import NewEvents from '@/components/carousel/new-events'
import PublishedEvents from '@/components/carousel/published-events'

export default function EventRegisterPage() {
  return (
    <section className='container flex flex-col gap-12 mb-12'>
      <div className='w-full'>
        <NewEvents
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

      <div className='w-full'>
        <PublishedEvents
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
    </section>
  )
}
