import { Button } from './ui/button'

export default function EventsEmpty() {
  return (
    <div className='w-full max-w-lg border border-input flex flex-col justify-center items-center py-12 px-4 gap-8 shadow'>
      <p className='text-lg text-center'>
        Você ainda não cadastrou nenhum evento. Deseja cadastrar?
      </p>

      <Button size={'lg'}>
        <p className='text-white text-lg'>Cadastrar evento</p>
      </Button>
    </div>
  )
}
