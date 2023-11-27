'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Loader2, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'

type ApproveAlertDialogProps = {
  event: any
  open: boolean
  openChange: (open: boolean) => void
}

export default function ApproveAlertDialog({
  event,
  open,
  openChange,
}: ApproveAlertDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [highlight, setHighlight] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setHighlight(event?.highlight ?? false)
  }, [event])

  const handleApprove = async () => {
    try {
      setIsLoading(true)

      const url = qs.stringifyUrl({
        url: `/api/events/${event.id}`,
        query: { eventId: event.id },
      })

      await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ highlight }),
      })

      router.refresh()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      openChange(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true)

      const url = qs.stringifyUrl({
        url: `/api/events/${event.id}`,
        query: { eventId: event.id },
      })

      await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })

      router.refresh()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      openChange(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={openChange}>
      {event && (
        <AlertDialogContent className='overflow-y-scroll h-[95%]'>
          <AlertDialogHeader className='flex flex-col gap-2'>
            <AlertDialogTitle className='flex justify-between items-center'>
              <p>{event.name}</p>

              <button
                className='text-muted-foreground'
                onClick={() => openChange(false)}
              >
                <X className='w-6 h-6' />
              </button>
            </AlertDialogTitle>

            <div>
              <Image
                src={event.imageUrl}
                alt={event.name}
                width={500}
                height={300}
                className='rounded-xl'
              />
            </div>

            <div className='flex gap-2'>
              <Switch
                id='highlight'
                checked={highlight}
                onCheckedChange={setHighlight}
              />

              <Label className='text-base' htmlFor='highlight'>
                Evento em destaque
              </Label>
            </div>

            <div>
              <Label className='font-semibold text-sm uppercase'>
                Descrição
              </Label>
              <p className='text-muted-foreground'>
                {event.description || 'Sem descrição'}
              </p>
            </div>

            <div className='columns-2'>
              <div>
                <Label className='font-semibold text-sm uppercase'>
                  Data do evento
                </Label>
                <p className='text-muted-foreground'>
                  {format(event.date, 'PPP', { locale: ptBR })}
                </p>
              </div>

              <div>
                <Label className='font-semibold text-sm uppercase'>
                  Horário
                </Label>
                <p className='text-muted-foreground'>{event.time}</p>
              </div>
            </div>

            <div>
              <Label className='font-semibold text-sm uppercase'>Local</Label>
              <p className='text-muted-foreground'>{event.address.location}</p>
            </div>

            <div>
              <Label className='font-semibold text-sm uppercase'>
                Endereço
              </Label>
              <p className='text-muted-foreground'>{`${event.address.street}, ${event.address.number} - ${event.address.city} - ${event.address.state}`}</p>
            </div>

            <div>
              <Label className='font-semibold text-sm uppercase'>
                Categoria
              </Label>
              <p className='text-muted-foreground'>{event.category}</p>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDelete} disabled={isLoading}>
              Excluir
            </AlertDialogCancel>

            <AlertDialogAction
              className='px-8 text-white font-semibold uppercase'
              disabled={isLoading}
              onClick={handleApprove}
            >
              {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Publicar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  )
}
