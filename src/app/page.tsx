import Appbar from '@/components/appbar'
import Filter from '@/components/filter'

export default async function Home() {
  return (
    <main>
      <Appbar />

      <div className='flex md:hidden p-2'>
        <Filter />
      </div>
    </main>
  )
}
