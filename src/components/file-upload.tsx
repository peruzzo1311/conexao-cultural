'use client'

import { UploadDropzone } from '@/lib/uploadthing'
import '@uploadthing/react/styles.css'
import { X } from 'lucide-react'
import Image from 'next/image'

interface FileUploadProps {
  onChange: (url?: string) => void
  value: string
}

export default function FileUpload({ onChange, value }: FileUploadProps) {
  const fileType = value?.split('.').pop()

  if (value && fileType !== 'pdf') {
    return (
      <div className='relative w-full max-w-xs mx-auto h-40'>
        <Image
          fill
          src={value}
          quality={100}
          objectFit='cover'
          alt='Upload'
          className='rounded-xl'
        />

        <button
          onClick={() => onChange('')}
          className='absolute -top-2 -right-2 p-1 text-white rounded-full shadow-sm bg-rose-500'
          type='button'
        >
          <X className='w-4 h-4' />
        </button>
      </div>
    )
  }

  return (
    <UploadDropzone
      endpoint={'eventImage'}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        console.log(error)
      }}
    />
  )
}
