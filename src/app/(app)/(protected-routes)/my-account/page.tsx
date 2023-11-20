import GroupTag from '@/components/group-tag'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { initialProfile } from '@/lib/initial-profile'
import { ArrowUpRight, Check, X } from 'lucide-react'

import banner from '@/assets/image-card.jpg'
import { Suspense } from 'react'

export default async function MyAccount() {
  const profile = await initialProfile()

  return (
    <Suspense>
      <section className='container flex-1 flex flex-col'>
        <h1 className='text-xl font-semibold mb-4'>Seus eventos</h1>

        <div className='flex-1 columns-1 sm:columns-2 lg:columns-3 xl:columns-4'>
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <Card
                key={index}
                className='rounded-xl overflow-hidden relative w-full max-w-[300px] mx-auto mb-4'
              >
                <CardContent
                  style={{
                    backgroundImage: `url(${banner.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                  className='h-[250px]'
                >
                  <GroupTag group='Teatro' />

                  <div className='absolute right-2 top-2 flex gap-2'>
                    <div className='p-1 bg-white hover:bg-green-500 hover:text-white rounded-full cursor-pointer transition'>
                      <Check className='w-5 h-5' />
                    </div>

                    <div className='p-1 bg-white hover:bg-red-500 hover:text-white rounded-full cursor-pointer transition'>
                      <X className='w-5 h-5' />
                    </div>
                  </div>
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
            ))}
        </div>
      </section>
    </Suspense>
  )
}
