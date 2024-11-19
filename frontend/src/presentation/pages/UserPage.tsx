import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { PruebasForm } from '../components'
import { UserFormData } from '../../types'
import { createUser } from '../../api'

export const UserPage = () => {

  const navigate = useNavigate()
  const initialValues: UserFormData = {
    nombre: '',
    email: '',
    grupos: []
  }

  const { register, handleSubmit, formState: { errors } } = useForm({defaultValues: initialValues})

  const {mutate} = useMutation({
    mutationFn: createUser,
    onError: (error) => {
      console.log(error)
      toast.error(error.message)
    },
    onSuccess: (data) => {
      console.log(data.nombre)
      toast.success(data.nombre)
      navigate('/')
    }
  })

  const handleForm = (formData: UserFormData) => mutate(formData)

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear Test</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear una prueba</p>

        <nav className="my-5">
          <Link className="bg-blue-400 hover:bg-blue-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors" to='/'>Volver a Home</Link>
        </nav>

        <form className="mt-10 bg-white shadow-lg p-10 rounded-lg" onSubmit={handleSubmit(handleForm)} noValidate>
          <PruebasForm register={register} errors={errors}/>
          <input className="bg-cyan-600 hover:bg-cyan-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors" type="submit" value="Crear Prueba" />
        </form>
      </div>
    </>
  );
};
