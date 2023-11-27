'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { useState } from 'react'

type deleteEventProps = {
  eventId: string
}

export default function DeleteEvent({ eventId }: deleteEventProps) {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

  const router = useRouter()

  const handleDelete = async () => {
    try {
      if (!eventId) return

      const url = qs.stringifyUrl({
        url: `/api/events/${eventId}`,
        query: { eventId },
      })

      await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })

      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Button
        size={'sm'}
        variant={'destructive'}
        className='absolute -top-2 -right-2 rounded-full h-6 w-6 p-0 flex justify-center items-center z-50'
        onClick={() => setOpenConfirmDialog(true)}
      >
        <X className='text-white h-4 w-4' />
      </Button>

      <AlertDialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>

            <AlertDialogDescription>
              Você tem certeza que deseja excluir este evento? Esta ação é
              irreversível.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            <AlertDialogAction onClick={handleDelete}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
