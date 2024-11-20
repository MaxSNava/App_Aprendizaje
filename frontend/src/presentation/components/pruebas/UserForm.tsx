import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { ErrorMessage } from '../ErrorMessage';
import { GrupoForm } from './GrupoForm';
import { UserFormData } from '../../../types';
import { createUser } from '../../../api';

export const PruebasForm = () => {
  const [showNewGropForm, setShowNewGropForm] = useState(false);

  const navigate = useNavigate();

  const initialValues: UserFormData = {
    nombre: '',
    email: '',
    grupos: []
  };

  const { register, handleSubmit, formState: { errors } } = useForm(
    { defaultValues: initialValues }
  );

  const { mutate } = useMutation({
    mutationFn: createUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(`Usuario creado exitosamente: ${data.nombre}`);
      navigate('/');
    }
  });

  const handleForm = (formData: UserFormData) => mutate(formData);

  return (
    <>
      <form className='p-2' onSubmit={handleSubmit(handleForm)}>
        <div className="mb-5 space-y-3">
          <label htmlFor="userName" className="text-sm uppercase font-bold">
            Nombre del Usuario
          </label>
          <input
            className="w-full p-3  border border-gray-200"
            id="userName"
            type="text"
            placeholder="Nombre del Usuario"
            {...register("nombre", {
              required: "El nombre del Usuario es obligatorio",
            })}
          />

          {errors.nombre && (
            <ErrorMessage>{errors.nombre.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-5 space-y-3">
          <label htmlFor="emailName" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="emailName"
            className="w-full p-3  border border-gray-200"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "El email es obligatorio",
            })}
          />

          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <input
            className="bg-cyan-600 hover:bg-cyan-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
            type="submit"
            value="Crear Usuario"
          />
      </form>

      <div className='flex flex-col justify-center items-center p-1'>
        <button
          className="bg-indigo-500 w-96 hover:bg-indigo-600  p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-xl"
          type="button"
          onClick={() => setShowNewGropForm(!showNewGropForm)}
        >
          {showNewGropForm ? 'Ocultar Formulario Nuevo Grupo' : 'Agregar Nuevo Grupo'}
        </button>
        {showNewGropForm && (
          <GrupoForm />
        )}
      </div>
    </>

  )
}
