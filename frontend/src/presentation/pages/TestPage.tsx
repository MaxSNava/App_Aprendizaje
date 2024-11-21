import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, UserPlus, ChevronDown } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast, ToastContainer  } from 'react-toastify';
import { ErrorMessage, UserForm } from '../components';
import { PruebaFormData, User } from '../../types';
import { createTest, getUsers } from '../../api';

export const TestPage = () => {
  const [showNewUserForm, setShowNewUserForm] = useState(false);

  const navigate = useNavigate();

  const initialValues: PruebaFormData = {
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

  const handleForm = (formData: PruebaFormData) => mutate(formData);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
    <h1 className="text-3xl md:text-5xl font-black mb-4">Crear Test</h1>
    <p className="text-xl md:text-2xl font-light text-gray-500 mb-6">
      Selecciona el usuario o añade uno nuevo para crear una prueba.
    </p>

    <Link 
      className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors mb-8"
      to='/'
    >
      <ArrowLeft className="mr-2" />
      Volver a Home
    </Link>

    <form
      className="bg-white shadow-lg p-6 md:p-10 rounded-lg mb-8"
      onSubmit={handleSubmit(handleForm)}
      noValidate
    >
      <div className="mb-8">
        <p className="font-bold text-lg mb-4">Selecciona el tipo de prueba:</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 text-xl">
          <label className="inline-flex items-center">
            <input
              className="form-radio text-blue-600"
              type="radio"
              value="vark"
              {...register('tipoPrueba', {
                required: 'Selecciona un tipo de prueba' 
              })}
            />
            <span className="ml-2">VARK</span>
          </label>
          <label className="inline-flex items-center">
            <input
              className="form-radio text-blue-600"
              type="radio"
              value="mbti"
              {...register('tipoPrueba', {
                required: 'Selecciona un tipo de prueba'
              })}
            />
            <span className="ml-2">MBTI</span>
          </label>
        </div>
        {errors.tipoPrueba && (
          <ErrorMessage>{errors.tipoPrueba.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-8">
        <p className="font-bold text-lg mb-2">Selecciona un usuario:</p>
        {isLoading ? (
          <p className="text-gray-500">Cargando usuarios...</p>
        ) : (
          <div className="relative">
            <select
              className="w-full p-3 pr-10 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('usuarioId', { required: 'Selecciona un usuario' })}
            >
              <option value="">-- Selecciona un usuario --</option>
              {users?.map((user: User) => (
                <option key={user.id} value={user.id}>
                  {user.nombre} - {user.email}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        )}
        {errors.usuarioId && (
          <ErrorMessage>{errors.usuarioId.message}</ErrorMessage>
        )}
      </div>

      <button
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-md transition-colors"
        type="submit"
      >
        Crear Prueba
      </button>
    </form>

    <div className="bg-slate-100 shadow-lg p-6 md:p-10 rounded-lg">
      <button
        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-md transition-colors mb-5 flex items-center justify-center"
        type="button"
        onClick={() => setShowNewUserForm(!showNewUserForm)}
      >
        <UserPlus className="mr-2" />
        {showNewUserForm ? 'Ocultar Formulario Nuevo Usuario' : 'Agregar Nuevo Usuario'}
      </button>
      {showNewUserForm && <UserForm />}
    </div>

    <ToastContainer position="bottom-right" />
  </div>
  );
};
