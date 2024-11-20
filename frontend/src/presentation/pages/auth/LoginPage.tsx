import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ErrorMessage } from '../../components'
import { authenticateAuth } from '../../../api'
import { AuthLoginForm } from '../../../types'

export const LoginPage = () => {
  const initialValues: AuthLoginForm = {nickname: '', password: '' }

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({ defaultValues: initialValues })

  const navigate = useNavigate()

  const { mutate } = useMutation ({
    mutationFn: authenticateAuth,
    onError: (error) => {
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
      <h1 className="text-5xl font-black text-white">Iniciar Sesión</h1>
      <p className="text-2xl font-light text-white mt-5">Llena el formulario para<span className=" text-cyan-500 font-bold"> iniciar sesión</span></p>

      <form className="space-y-8 p-10 mt-10 bg-white" onSubmit={handleSubmit(handleLogin)} noValidate >

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Nickname</label>
          <input 
            className="w-full p-3 border-gray-300 border"
            id="nickname" 
            type="text" 
            placeholder="Nickname de Registro" 
            {...register("nickname", {
              required: "El nickname es obligatorio",
            })}
            onChange={handleNicknameChange}
          />
          {errors.nickname && (
            <ErrorMessage>{errors.nickname.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>
          <input 
            className="w-full p-3 border-gray-300 border"
            type="password" 
            placeholder="Password de Registro" 
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input className="bg-cyan-600 hover:bg-cyan-700 w-full p-3  text-white font-black  text-xl cursor-pointer" type="submit" value='Iniciar Sesión' />
      </form>
    </>
  )
}
