import { Link, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const AuthLayout = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl'>
        <div>
          <Link to='/'>
            <img
              className="mx-auto h-12 w-auto"
              src="/academic.svg"
              alt="Your Company Logo"
            />
          </Link>
        </div>
        <Outlet />
      </div>
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </div>
  )
}