import { Link, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LogOut, User, BarChart2 } from 'lucide-react'

export const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-6">
        <div className="mb-8">
          <Link to="/">
            <img
              className="h-12 w-auto"
              src="/academic.svg"
              alt="Your Company Logo"
            />
          </Link>
        </div>
        <nav className="space-y-4">
          <Link to="/auth/home" className="flex items-center space-x-2 hover:text-blue-300">
            <User size={20} />
            <span>Inicio</span>
          </Link>
          <Link to="/auth/administracion" className="flex items-center space-x-2 hover:text-blue-300">
            <User size={20} />
            <span>Gestión de Usuarios</span>
          </Link>
          <Link to="/auth/dashboard" className="flex items-center space-x-2 hover:text-blue-300">
            <BarChart2 size={20} />
            <span>Dashboard</span>
          </Link>
        </nav>
        <div className="mt-auto pt-6">
          <Link to="/auth/logout" className="flex items-center space-x-2 hover:text-blue-300">
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}