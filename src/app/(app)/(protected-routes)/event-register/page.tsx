'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import InputMask from 'react-input-mask'

import FileUpload from '@/components/file-upload'
import { zodResolver } from '@hookform/resolvers/zod'
import { ptBR } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Nome do evento é obrigatório' }),
  description: z.string().min(1, { message: 'Descrição é obrigatória' }),
  date: z.date({
    required_error: 'A data do evento é obrigatória.',
  }),
  time: z
    .string()
    .min(1, { message: 'Horário do evento é obrigatório' })
    .refine((value) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value), {
      message: 'Horário inválido',
    }),
  location: z.string().min(1, { message: 'Localização é obrigatória' }),
  link: z.string().min(1, { message: 'Link para ingresso é obrigatório' }),
  category: z.string().min(1, { message: 'Categoria é obrigatória' }),
  imageUrl: z.string().min(1, { message: 'O banner é obrigatório' }),
})

export default function EventRegisterPage() {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
      time: '',
      location: '',
      link: '',
      category: '',
      imageUrl: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(values),
      })

      form.reset()
      router.push('/my-account')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='container mb-8 flex flex-col justify-center items-center '>
      <h1 className='text-lg font-semibold mb-8'>Cadastrar evento</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full max-w-xl space-y-8'
        >
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel className='text-xs font-bold uppercase'>
                  banner do evento
                </FormLabel>

                <FormControl>
                  <FileUpload
                    endpoint='eventImage'
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel className='text-xs font-bold uppercase'>
                  Nome do evento
                </FormLabel>

                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder='Insira o nome do evento'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex gap-4'>
            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem className='flex flex-col w-full md:flex-1'>
                  <FormLabel className='text-xs font-bold uppercase'>
                    Data do evento
                  </FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP', { locale: ptBR })
                          ) : (
                            <span>Escolha uma data</span>
                          )}

                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date('1900-01-01')
                        }
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='time'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel className='text-xs font-bold uppercase'>
                    Horário
                  </FormLabel>

                  <FormControl>
                    <InputMask
                      mask='99:99'
                      placeholder='00:00'
                      className='flex h-10 w-[75px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:!ring-primary disabled:cursor-not-allowed disabled:opacity-50'
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel className='text-xs font-bold uppercase'>
                  Localização
                </FormLabel>

                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder='Insira o local do evento'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='link'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel className='text-xs font-bold uppercase'>
                  Link para compra do ingresso
                </FormLabel>

                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder='Link para ingresso'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel className='text-xs font-bold uppercase'>
                  Categoria do evento
                </FormLabel>

                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder='Qual o categoria do evento?'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel className='text-xs font-bold uppercase'>
                  Descrição
                </FormLabel>

                <FormControl>
                  <Textarea
                    placeholder='Escreva uma pequena descrição sobre o evento'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className='block w-full max-w-md mx-auto shadow'
          >
            Cadastrar evento
          </Button>
        </form>
      </Form>
    </section>
  )
}
