import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LogOut, User, BarChart2, Menu, X } from 'lucide-react'

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-blue-800 text-white"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition-transform duration-300 ease-in-out
        fixed md:static inset-y-0 left-0 z-10 w-64 bg-blue-800 text-white p-6
        flex flex-col
      `}>
        <nav className="space-y-4 flex-grow">
          <Link to="/auth/home" className="flex items-center space-x-2 hover:text-blue-300" onClick={() => setSidebarOpen(false)}>
            <User size={20} />
            <span>Inicio</span>
          </Link>
          <Link to="/auth/administracion" className="flex items-center space-x-2 hover:text-blue-300" onClick={() => setSidebarOpen(false)}>
            <User size={20} />
            <span>Gestión de Administracion</span>
          </Link>
          <Link to="/auth/dashboard" className="flex items-center space-x-2 hover:text-blue-300" onClick={() => setSidebarOpen(false)}>
            <BarChart2 size={20} />
            <span>Dashboard</span>
          </Link>
        </nav>
        <div className="mt-auto pt-6">
          <Link to="/auth/logout" className="flex items-center space-x-2 hover:text-blue-300" onClick={() => setSidebarOpen(false)}>
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 mt-16 md:mt-0">
        <Outlet />
      </main>

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </div>
  )
}
