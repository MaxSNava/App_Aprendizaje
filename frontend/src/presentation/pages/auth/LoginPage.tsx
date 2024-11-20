import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ErrorMessage } from '../../components'
import { authenticateAuth } from '../../../api'
import { AuthLoginForm } from '../../../types'
import { User, Eye, EyeOff } from 'lucide-react'

export const LoginPage = () => {
  const initialValues: AuthLoginForm = { nickname: '', password: '' }

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({ defaultValues: initialValues })

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const { mutate } = useMutation({
    mutationFn: authenticateAuth,
    onError: (error: Error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Inicio de sesión exitoso')
      navigate('/auth/home')
    }
  })

  const handleLogin = (formData: AuthLoginForm) => mutate(formData)

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCaseValue = event.target.value.toLowerCase();
    setValue('nickname', lowerCaseValue, { shouldValidate: true });
  };

  return (
    <>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Iniciar Sesión
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Llena el formulario para
        <span className="font-medium text-blue-600 hover:text-blue-500"> iniciar sesión</span>
      </p>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleLogin)} noValidate>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="nickname" className="sr-only">
              Nickname
            </label>
            <div className="relative">
              <input
                id="nickname"
                type="text"
                autoComplete="username"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Nickname"
                {...register("nickname", {
                  required: "El nickname es obligatorio",
                })}
                onChange={handleNicknameChange}
              />
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {errors.nickname && (
              <ErrorMessage>{errors.nickname.message}</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm pr-10"
                placeholder="Password"
                {...register("password", {
                  required: "El Password es obligatorio",
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
          Inicio de Sesión
          </button>
        </div>
      </form>
    </>
  )
}