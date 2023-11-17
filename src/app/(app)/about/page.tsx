/* eslint-disable @next/next/no-img-element */
'use client'

import logo from '@/assets/logo.png'

export default function AboutPage() {
  return (
    <div className='flex-1 pb-12 lg:pt-12 flex flex-col lg:flex-row lg:container lg:px-12'>
      <div className='bg-primary-300 overflow-hidden p-4 w-full py-12 lg:rounded-s-3xl'>
        <img src={logo.src} alt='Conexão Cultural' className='w-full' />
      </div>

      <div className='flex flex-col gap-4 -mt-4 px-4 w-full mx-auto md:text-center md:w-[75%] lg:text-left lg:mt-0 xl:mt-12'>
        <p className='text-3xl xl:text-5xl font-semibold xl:-ml-24'>
          Quem somos?
        </p>

        <p className='text-lg xl:mt-12'>
          Um projeto de extensão que reúne em um único lugar os eventos
          culturais que acontecem em Cascavel!
        </p>

        <p className='text-lg'>
          Nosso objetivo é gerar maior visibilidade pra feiras, peças de teatro,
          exposições, apresentações musicais, palestras e demais roles, e também
          conectar a população a cultura local.
        </p>

        <p className='text-lg'>
          Promover de forma gratuita e descomplicada, pra ajudar quem quer expor
          eventos e quem quer descobrir o que fazer pra se divertir.
        </p>
      </div>
    </div>
  )
}
