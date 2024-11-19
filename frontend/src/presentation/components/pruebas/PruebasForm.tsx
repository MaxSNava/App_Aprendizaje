import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { ErrorMessage } from '../ErrorMessage';
import { UserFormData } from '../../../types'

type PruebasFormProps = {
  register: UseFormRegister<UserFormData>;
  errors: FieldErrors<UserFormData>;
};

export const PruebasForm = ({ register, errors }:PruebasFormProps) => {
  return (
    <>
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

    </>
  )
}
