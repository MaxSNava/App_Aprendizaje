import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ErrorMessage } from '../../components'
import { authenticateAuth } from '../../../api'
import { AuthLoginForm } from '../../../types'
import { User, Lock, Eye, EyeOff } from 'lucide-react'

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
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Iniciar Sesión
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Llena el formulario para <span className="text-blue-600 font-semibold">iniciar sesión</span>
      </p>

      <form className="space-y-6" onSubmit={handleSubmit(handleLogin)} noValidate>
        <div className="space-y-2">
          <label htmlFor="nickname" className="text-sm font-medium text-gray-700">
            Nickname
          </label>
          <div className="relative">
            <input
              id="nickname"
              type="text"
              autoComplete="username"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
              placeholder="Nickname"
              {...register("nickname", {
                required: "El nickname es obligatorio",
              })}
              onChange={handleNicknameChange}
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          {errors.nickname && (
            <ErrorMessage>{errors.nickname.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10"
              placeholder="Contraseña"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Iniciar Sesión
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        ¿No tienes cuenta?{' '}
        <Link to="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
          Crear Una
        </Link>
      </p>
    </div>
  )
}