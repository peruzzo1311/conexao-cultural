'use client'

import 'swiper/css'
import 'swiper/css/pagination'

import { ArrowUpRight } from 'lucide-react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import GroupTag from '../group-tag'
import { Card, CardContent, CardFooter } from '../ui/card'
import CarouselTitle from './title'

export default function PublishedEvents({ items }: { items: string[] }) {
  return (
    <Swiper
      slidesPerView={1}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      modules={[Pagination]}
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
    >
      <CarouselTitle title='Eventos publicados' />

      {items.map((item, index) => (
        <SwiperSlide key={index} className='mt-14'>
          <Card className='rounded-xl overflow-hidden relative w-[90%] md:w-[300px] min-w-[300px] mx-auto'>
            <CardContent
              style={{
                backgroundImage: `url(${item})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              className='h-[250px]'
            >
              <GroupTag group='Teatro' />
            </CardContent>

            <CardFooter className='bg-orange text-white py-4 flex justify-start items-start flex-col gap-4'>
              <span className='w-full text-lg font-semibold line-clamp-1'>
                Evento {index + 1}
              </span>

              <div className='w-full flex justify-between items-center'>
                <span className='text-sm'>30 de novembro</span>

                <ArrowUpRight className='w-6 h-6 inline-block ml-1' />
              </div>
            </CardFooter>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
