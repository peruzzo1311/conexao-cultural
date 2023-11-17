interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <section className='flex items-center justify-center w-full h-screen bg-primary'>
      {children}
    </section>
  )
}
