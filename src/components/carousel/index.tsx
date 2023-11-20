'use client'

import 'swiper/css'
import 'swiper/css/pagination'

import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SwiperOptions } from 'swiper/types'
import GroupTag from '../group-tag'
import ModalDetails from '../modal-details'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'
import CarouselTitle from './title'

type CarouselProps = {
  title: string
  items: string[]
  breakpoints?:
    | {
        [width: number]: SwiperOptions
        [ratio: string]: SwiperOptions
      }
    | undefined
  featured?: boolean
}

export default function Carousel({
  title,
  items,
  breakpoints,
  featured = false,
}: CarouselProps) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Swiper
        slidesPerView={1}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        breakpoints={breakpoints}
      >
        <CarouselTitle title={title} />

        {!featured &&
          items.map((item, index) => (
            <SwiperSlide key={index} className='mt-16'>
              <Card
                className='rounded-xl overflow-hidden relative w-[90%] md:w-[300px] min-w-[300px] mx-auto cursor-pointer'
                onClick={() => setOpenModal(true)}
              >
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

        {featured &&
          items.map((item, index) => (
            <SwiperSlide key={index} className='mt-14'>
              <Card
                className='md:flex rounded-2xl overflow-hidden relative w-[90%] md:w-full md:h-[500px] mx-auto'
                onClick={() => setOpenModal(true)}
              >
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

      <ModalDetails open={openModal} onOpenChange={setOpenModal} />
    </>
  )
}
