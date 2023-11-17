import imageCard from '@/assets/image-card.jpg'
import Carousel from '@/components/carousel'

export default async function Home() {
  const items = [
    imageCard.src,
    imageCard.src,
    imageCard.src,
    imageCard.src,
    imageCard.src,
    imageCard.src,
    imageCard.src,
    imageCard.src,
  ]
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
          items={items}
        />
      </div>

      <div className='my-8 md:my-16'>
        <Carousel title='Eventos em destaque' items={items} featured />
      </div>
    </section>
  )
}
