import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { ErrorMessage } from '../../components'
import { AuthRegistrationForm } from '../../../types'
import { createAccount } from '../../../api'
import { User, Lock, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false)

  const initialValues = {
    nickname: '',
    fullName: '',
    password: '',
  }

  const { register, handleSubmit, reset, formState: {errors}} = useForm(
    { defaultValues: initialValues }
  );

  const {mutate} = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Cuenta creada con éxito')
      reset()
    },
  });


  const handleRegister = (formData: AuthRegistrationForm) => mutate(formData)

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Crear Cuenta</h2>
      <p className="text-center text-gray-600 mb-8">Llena el formulario para <span className="text-blue-600 font-semibold">crear tu cuenta</span></p>

      <form onSubmit={handleSubmit(handleRegister)} noValidate className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700" htmlFor="nickname">NickName</label>
          <div className="relative">
            <input
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
              id="nickname"
              type="text"
              placeholder="Administrador"
              {...register("nickname", {
                required: "El nickname es obligatorio",
              })}
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          {errors.nickname && (
            <ErrorMessage>{errors.nickname.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700" htmlFor="fullName">Nombre Completo</label>
          <div className="relative">
            <input
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
              id="fullName"
              type="text"
              placeholder="Juan Pérez"
              {...register("fullName", {
                required: "El nombre completo es obligatorio",
              })}
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          {errors.fullName && (
            <ErrorMessage>{errors.fullName.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700" htmlFor="password">Contraseña</label>
          <div className="relative">
            <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="******"
            {...register("password", {
              required: "La contraseña es obligatoria",
              maxLength: {
                value: 6,
                message: 'La contraseña debe tener máximo 6 caracteres'
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6}$/,
                message: 'La contraseña debe tener una mayúscula, una minúscula y un número'
              }
            })}
          />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
          Registrarme
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        ¿Ya tienes una cuenta?{' '}
        <Link to="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
          Iniciar Sesión
        </Link>
      </p>
    </div>
  )
}