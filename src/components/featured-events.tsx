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
        delay: 5000,
        pauseOnMouseEnter: true,
      }}
      modules={[Pagination, Autoplay]}
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
          <Card className='flex rounded-2xl overflow-hidden relative w-full h-[500px] mx-auto'>
            <CardContent
              style={{
                backgroundImage: `url(${item})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              className='w-[75%]'
            >
              <span className='absolute text-xs font-medium px-3 pt-2 py-1 left-2 top-2 bg-white border border-white rounded-full'>
                Teatro
              </span>
            </CardContent>

            <CardFooter className='bg-primary text-white py-8 flex justify-between items-start flex-col gap-4 w-[25%]'>
              <div className='flex flex-col gap-4'>
                <span className='w-full text-lg font-semibold line-clamp-1'>
                  Evento {index + 1}
                </span>

                <div className='w-full text-md'>30 de novembro</div>
              </div>

              <Button className='bg-white w-full text-primary flex justify-center items-center gap-1 hover:bg-white active:scale-95 transition'>
                <span className='text-md font-semibold'>Ver mais</span>
                <ArrowUpRight className='w-[20px] h-[20px]' />
              </Button>
            </CardFooter>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
