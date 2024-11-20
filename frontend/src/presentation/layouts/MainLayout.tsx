import { Link, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Lock } from 'lucide-react'
import { FooterContact } from '../components'
import 'react-toastify/dist/ReactToastify.css'

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link className="text-white" to="/">
            <img className='h-10' src="/academic.svg" alt="Estilos de Aprendizaje y Personalidad"/>
          </Link>
          <h1 className="text-4xl font-bold">Estilos de Aprendizaje y Personalidad</h1>
          <Link className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold flex items-center hover:bg-blue-100 transition-colors" to="/auth/login">
            <Lock className="mr-2 h-4 w-4"/>
            Admin
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <FooterContact />

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </div>
  )
}
