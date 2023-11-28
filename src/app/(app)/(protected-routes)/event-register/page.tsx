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
import {
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  Loader2,
} from 'lucide-react'
import InputMask from 'react-input-mask'

import FileUpload from '@/components/file-upload'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Switch } from '@/components/ui/switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { ptBR } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Nome do evento é obrigatório' }),
  description: z.string().min(1, { message: 'Descrição é obrigatória' }),
  date: z.date({ required_error: 'A data do evento é obrigatória.' }),
  time: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .refine((value) => value >= '00:00' && value <= '23:59', {
      message: 'Horário inválido',
    }),
  address: z.object({
    location: z.string().min(1, { message: 'Local é obrigatório' }),
    street: z.string().min(1, { message: 'Rua é obrigatória' }),
    number: z
      .string()
      .min(1, { message: 'Campo obrigatório' })
      .refine((value) => !isNaN(Number(value)), { message: 'Campo inválido' }),
    district: z.string().min(1, { message: 'Bairro é obrigatório' }),
    city: z.string().min(1, { message: 'Cidade é obrigatória' }),
    state: z.string().min(1, { message: 'Estado é obrigatório' }),
    zip: z.string().min(1, { message: 'CEP é obrigatório' }),
  }),
  free: z.boolean().default(false),
  link: z.string(),
  category: z.string().min(1, { message: 'Categoria é obrigatória' }),
  imageUrl: z.string().min(1, { message: 'O banner é obrigatório' }),
})

const categories = [
  'Festa',
  'Show',
  'Teatro',
  'Cinema',
  'Esporte',
  'Cultura',
  'Outro',
] as const

export default function EventRegisterPage() {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
      time: '',
      address: {
        location: '',
        street: '',
        number: '',
        district: '',
        city: '',
        state: '',
        zip: '',
      },
      free: false,
      link: '',
      category: '',
      imageUrl: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      values.description = JSON.stringify(values.description)

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
    <section className='container py-8 flex flex-col justify-center items-center'>
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
                  banner
                </FormLabel>

                <FormControl>
                  <FileUpload value={field.value} onChange={field.onChange} />
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
                  Nome
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
                <FormItem className='flex flex-col flex-1'>
                  <FormLabel className='text-xs font-bold uppercase'>
                    Data
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
                      className='flex h-10 w-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:!ring-primary disabled:cursor-not-allowed disabled:opacity-50'
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
            name='address.location'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel className='text-xs font-bold uppercase'>
                  Local
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

          <div className='flex gap-4'>
            <FormField
              control={form.control}
              name='address.street'
              render={({ field }) => (
                <FormItem className='flex flex-col flex-1'>
                  <FormLabel className='text-xs font-bold uppercase'>
                    Rua
                  </FormLabel>

                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Insira o rua do local do evento'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='address.number'
              render={({ field }) => (
                <FormItem className='flex flex-col w-[100px]'>
                  <FormLabel className='text-xs font-bold uppercase'>
                    Número
                  </FormLabel>

                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='address.district'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel className='text-xs font-bold uppercase'>
                  Bairro
                </FormLabel>

                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder='Insira o bairro do local do evento'
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
              name='address.city'
              render={({ field }) => (
                <FormItem className='flex flex-col flex-1'>
                  <FormLabel className='text-xs font-bold uppercase'>
                    Cidade
                  </FormLabel>

                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Insira a cidade em que ocorrerá o evento'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='address.state'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel className='text-xs font-bold uppercase'>
                    Estado
                  </FormLabel>

                  <FormControl>
                    <InputMask
                      mask='aa'
                      placeholder='PR'
                      className='flex h-10 w-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:!ring-primary disabled:cursor-not-allowed disabled:opacity-50'
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
            name='address.zip'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel className='text-xs font-bold uppercase'>
                  CEP
                </FormLabel>

                <FormControl>
                  <InputMask
                    mask='99999-999'
                    placeholder='00000-000'
                    className='flex h-10 w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:!ring-primary disabled:cursor-not-allowed disabled:opacity-50'
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
            name='category'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel className='text-xs font-bold uppercase'>
                  Categoria do evento
                </FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn(
                          'w-full max-w-xs justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? categories.find(
                              (category) => category === field.value
                            )
                          : 'Selecione uma categoria'}

                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-full max-w-xs p-0'>
                    <Command>
                      <CommandInput placeholder='Procurar categoria...' />
                      <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            key={category}
                            value={category}
                            onSelect={() => {
                              form.setValue('category', category)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                category === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {category}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='free'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel className='text-xs font-bold uppercase'>
                  Evento gratuito
                </FormLabel>

                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {!form.watch('free') && (
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
          )}

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
                    className='h-40'
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
            disabled={isLoading}
          >
            {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {isLoading ? 'Cadastrar...' : 'Cadastrar evento'}
          </Button>
        </form>
      </Form>
    </section>
  )
}
