import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export const AuthLayout = () => {
  return (
    <>
      <div className='bg-blue-800 min-h-screen '>
        <div className='py-10 lg:py-20 mx-auto w-[450px]'>
          <Outlet />
        </div>
      </div>

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}
