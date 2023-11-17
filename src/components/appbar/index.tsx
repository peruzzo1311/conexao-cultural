import AppbarInput from './input'
import AppbarLogo from './logo'
import AppbarNavigation from './navigation'

export default function Appbar() {
  return (
    <header className='w-full flex fixed justify-between items-center p-4 z-50 bg-white md:container'>
      <AppbarLogo />

      <AppbarInput />

      <AppbarNavigation />
    </header>
  )
}
