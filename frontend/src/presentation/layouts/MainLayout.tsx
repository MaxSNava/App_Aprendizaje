import { Outlet } from 'react-router-dom'
import { HeaderCon, FooterContact } from '../components'

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderCon />

      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <FooterContact />
    </div>
  )
}
