/* eslint-disable @next/next/no-img-element */
'use client'

import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter } from './ui/card'

const PrevSlide = () => {
  const swiper = useSwiper()

  return (
    <Button
      size={'icon'}
      variant={'ghost'}
      className='z-50 hover:bg-primary-50 hover:ring-1 hover:ring-primary-200 active:scale-90 transition'
    >
      <ArrowLeft className='w-6 h-6' onClick={() => swiper.slidePrev()} />
    </Button>
  )
}

const NextSlide = () => {
  const swiper = useSwiper()

  return (
    <Button
      size={'icon'}
      variant={'ghost'}
      className='z-50 hover:bg-primary-50 hover:ring-1 hover:ring-primary-200 active:scale-90 transition'
    >
      <ArrowLeft
        className='w-6 h-6 transform rotate-180'
        onClick={() => swiper.slideNext()}
      />
    </Button>
  )
}

export default function NearbyEvents({ items }: { items: string[] }) {
  return (
    <Swiper
      slidesPerView={1}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 3000,
        pauseOnMouseEnter: true,
      }}
      modules={[Pagination, Autoplay]}
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
      <div className='flex justify-between items-center absolute top-0 left-0 w-full mt-1'>
        <span className='text-lg font-medium'>
          Descubra eventos na sua região
        </span>

        <div className='hidden md:flex justify-center items-center gap-2 pr-4'>
          <PrevSlide />

          <NextSlide />
        </div>
      </div>

      {items.map((item, index) => (
        <SwiperSlide key={index} className='mt-14'>
          <Card className='rounded-xl overflow-hidden relative w-[90%] md:w-[300px] min-w-[300px] mx-auto cursor-pointer'>
            <CardContent
              style={{
                backgroundImage: `url(${item})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              className='h-[250px]'
            >
              <span className='absolute text-xs font-medium px-3 pt-2 py-1 left-2 top-2 bg-white border border-white rounded-full'>
                Teatro
              </span>
            </CardContent>

            <CardFooter className='bg-orange text-white py-4 flex justify-start items-start flex-col gap-4'>
              <span className='w-full text-md font-semibold line-clamp-1'>
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
