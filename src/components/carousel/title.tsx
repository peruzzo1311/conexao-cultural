import { NextSlide, PrevSlide } from './carousel-control'

export default function CarouselTitle({ title }: { title: string }) {
  return (
    <div className='flex justify-between items-center absolute top-0 left-0 w-full mt-1'>
      <span className='text-lg font-medium'>{title}</span>

      <div className='hidden md:flex justify-center items-center gap-2 pr-4'>
        <PrevSlide />

        <NextSlide />
      </div>
    </div>
  )
}
