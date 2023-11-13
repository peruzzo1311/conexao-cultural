import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { useSwiper } from 'swiper/react'
import { Button } from '@/components/ui/button'

export const PrevSlide = () => {
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

export const NextSlide = () => {
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

export const PrevSlideMobile = ({ className = '' }: { className?: string }) => {
  const swiper = useSwiper()

  return (
    <div onClick={() => swiper.slidePrev()} className={className}>
      <ChevronLeft className='text-black w-6 h-6' />
    </div>
  )
}

export const NextSlideMobile = ({ className = '' }: { className?: string }) => {
  const swiper = useSwiper()

  return (
    <div onClick={() => swiper.slideNext()} className={className}>
      <ChevronRight className='text-black w-6 h-6' />
    </div>
  )
}
