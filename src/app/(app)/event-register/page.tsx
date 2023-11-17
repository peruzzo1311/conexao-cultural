import imageCard from '@/assets/image-card.jpg'
import Carousel from '@/components/carousel'
import NewEvents from '@/components/carousel/new-events'

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
        <Carousel
          title='Eventos publicados'
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
