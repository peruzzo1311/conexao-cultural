import { initialProfile } from '@/lib/initial-profile'
import { redirect } from 'next/navigation'

export default async function AdminPanel() {
  const profile = await initialProfile()

  if (!profile) {
    return redirect('/')
  }

  if (!profile.admin) {
    return redirect('/my-account')
  }

  return (
    <section className='container flex-1 flex flex-col'>admin panel</section>
  )
}
