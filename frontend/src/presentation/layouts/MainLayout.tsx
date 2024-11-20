import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Lock, Menu, X } from 'lucide-react'
import { FooterContact } from '../components'
import 'react-toastify/dist/ReactToastify.css'

export const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white py-4 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link className="text-white" to="/">
              <img className='h-8 md:h-10' src="/academic.svg" alt="Estilos de Aprendizaje y Personalidad"/>
            </Link>
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="hidden md:block">
              <h1 className="text-2xl md:text-4xl font-bold">Estilos de Aprendizaje y Personalidad</h1>
            </div>
            <Link className="hidden md:flex bg-white text-blue-600 px-4 py-2 rounded-md font-semibold items-center hover:bg-blue-100 transition-colors" to="/auth/login">
              <Lock className="mr-2 h-4 w-4"/>
              Admin
            </Link>
          </div>
          {isMenuOpen && (
            <div className="mt-4 md:hidden">
              <h1 className="text-xl font-bold mb-4">Estilos de Aprendizaje y Personalidad</h1>
              <Link 
                className="block bg-white text-blue-600 px-4 py-2 rounded-md font-semibold text-center hover:bg-blue-100 transition-colors" 
                to="/auth/login"
                onClick={() => setIsMenuOpen(false)}
              >
                <Lock className="inline-block mr-2 h-4 w-4"/>
                Admin
              </Link>
            </div>
          )}
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
