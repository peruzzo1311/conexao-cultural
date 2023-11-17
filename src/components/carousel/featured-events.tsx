/* eslint-disable @next/next/no-img-element */
'use client'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ArrowUpRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'
import GroupTag from '../group-tag'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'
import CarouselTitle from './title'

export default function NearbyEvents({ items }: { items: string[] }) {
  return (
    <Swiper
      slidesPerView={1}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      modules={[Pagination]}
    >
      <CarouselTitle title='Eventos em destaque' />

      {items.map((item, index) => (
        <SwiperSlide key={index} className='mt-14'>
          <Card className='md:flex rounded-2xl overflow-hidden relative w-[90%] md:w-full md:h-[500px] mx-auto'>
            <CardContent
              style={{
                backgroundImage: `url(${item})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              className='h-[300px] md:h-full md:w-[75%]'
            >
              <GroupTag group='Teatro' />
            </CardContent>

            <CardFooter className='bg-primary text-white py-8 flex justify-between items-start flex-col gap-4 w-full md:w-[25%]'>
              <div className='flex flex-col gap-4'>
                <span className='w-full text-xl font-semibold line-clamp-1'>
                  Evento {index + 1}
                </span>

                <div className='w-full text-base'>30 de novembro</div>
              </div>

              <Button className='bg-white w-full text-primary hover:bg-white active:scale-95 transition'>
                <span className='font-semibold align-middle flex justify-center items-center gap-1'>
                  Ver mais
                  <ArrowUpRight />
                </span>
              </Button>
            </CardFooter>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
