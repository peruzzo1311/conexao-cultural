'use client'

import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Drama,
  Medal,
  PartyPopper,
} from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

const SlidePrevButton = ({ className = '' }: { className?: string }) => {
  const swiper = useSwiper()

  return (
    <div onClick={() => swiper.slidePrev()} className={className}>
      <ChevronLeft className='text-black w-6 h-6' />
    </div>
  )
}

const SlideNextButton = ({ className = '' }: { className?: string }) => {
  const swiper = useSwiper()

  return (
    <div onClick={() => swiper.slideNext()} className={className}>
      <ChevronRight className='text-black w-6 h-6' />
    </div>
  )
}

export default function Filter() {
  return (
    <Swiper slidesPerView={3} className='!px-6'>
      <SlidePrevButton className='absolute left-0 top-0 z-50 h-16 flex justify-center items-center' />

      <SwiperSlide>
        <div className='flex justify-center items-center flex-col gap-1'>
          <Button className='rounded-full w-14 h-14' size={'icon'}>
            <Clapperboard className='text-black w-8 h-8' />
          </Button>

          <p className='text-xs'>Cinema</p>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className='flex justify-center items-center flex-col gap-1'>
          <Button className='rounded-full w-14 h-14' size={'icon'}>
            <PartyPopper className='text-black w-8 h-8' />
          </Button>

          <p className='text-xs'>Festas</p>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className='flex justify-center items-center flex-col gap-1'>
          <Button className='rounded-full w-14 h-14' size={'icon'}>
            <Drama className='text-black w-8 h-8' />
          </Button>

          <p className='text-xs'>Teatro</p>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className='flex justify-center items-center flex-col gap-1'>
          <Button className='rounded-full w-14 h-14' size={'icon'}>
            <Medal className='text-black w-8 h-8' />
          </Button>

          <p className='text-xs'>Esportes</p>
        </div>
      </SwiperSlide>

      <SlideNextButton className='absolute right-0 top-0 z-50 h-16 flex justify-center items-center' />
    </Swiper>
  )
}
