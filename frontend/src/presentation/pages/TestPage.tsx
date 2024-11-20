import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ErrorMessage, PruebasForm } from '../components';
import { Prueba, User } from '../../types';
import { createTest, getUsers } from '../../api';

export const TestPage = () => {
  const [showNewUserForm, setShowNewUserForm] = useState(false);

  const navigate = useNavigate();

  const initialValues: Prueba = {
    tipoPrueba: '',
    usuarioId: ''
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialValues,
  });

  const { mutate } = useMutation({
    mutationFn: createTest,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(`Prueba creada exitosamente: ${data.tipoPrueba}`);
      if (data.tipoPrueba === 'vark') {
        navigate('/vark', { state: { pruebaId: data.id } });
      } else {
        navigate('/mbti', { state: { pruebaId: data.id } });
      }
    }
  });

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const handleForm = (formData: Prueba) => mutate(formData);

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear Test</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Selecciona el usuario o añade uno nuevo para crear una prueba.
        </p>

        <nav className="my-5">
          <Link className="bg-blue-400 hover:bg-blue-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors" to='/'>Volver a Home</Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          {/* Selección del tipo de prueba */}
          <div className="mb-8">
            <p className="font-bold text-lg mb-2">Selecciona el tipo de prueba:</p>
            <div className="flex items-center justify-center gap-x-4 text-xl">
              <div className="flex items-center">
                <input
                  className="mr-2"
                  type="radio"
                  id="vark"
                  value="vark"
                  {...register('tipoPrueba', {
                    required: 'Selecciona un tipo de prueba' 
                  })}
                />
                <label htmlFor="vark" className="text-gray-700">VARK</label>
              </div>
              <div className="flex items-center">
                <input
                  className="mr-2"
                  type="radio"
                  id="mbti"
                  value="mbti"
                  {...register('tipoPrueba', {
                    required: 'Selecciona un tipo de prueba'
                  })}
                />
                <label htmlFor="mbti" className="text-gray-700">MBTI</label>
              </div>
            </div>
            { errors.tipoPrueba && (
              <ErrorMessage>{errors.tipoPrueba.message}</ErrorMessage>
            )}
          </div>

          {/* Selección del usuario */}
          <div className="mb-8">
            <p className="font-bold text-lg mb-2">Selecciona un usuario:</p>
            {isLoading ? (
              <p>Cargando usuarios...</p>
            ) : (
              <select
                className="w-full p-3 border border-gray-200"
                {...register('usuarioId', { required: 'Selecciona un usuario' })}
              >
                <option value="">-- Selecciona un usuario --</option>
                {users?.map((user: User) => (
                  <option key={user.id} value={user.id}>
                    {user.nombre} - {user.email}
                  </option>
                ))}
              </select>
            )}
            { errors.usuarioId && (
              <ErrorMessage>{errors.usuarioId.message}</ErrorMessage>
            )}
          </div>

          <input
            className="bg-cyan-600 hover:bg-cyan-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
            type="submit"
            value="Crear Prueba"
          />
        </form>

        <div className="mt-10 bg-slate-100 shadow-lg p-10 rounded-lg">
          <button
            className="bg-sky-500 hover:bg-sky-600 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors mb-5"
            type="button"
            onClick={() => setShowNewUserForm(!showNewUserForm)}
          >
            {showNewUserForm ? 'Ocultar Formulario Nuevo Usuario' : 'Agregar Nuevo Usuario'}
          </button>
          {showNewUserForm && <PruebasForm />}
        </div>
      </div>
    </>
  );
};
