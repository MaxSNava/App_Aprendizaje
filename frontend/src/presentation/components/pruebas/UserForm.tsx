import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ErrorMessage } from "../ErrorMessage";
import { UserFormData, Grupo } from "../../../types";
import { createUser, getGroups } from "../../../api";
import { useNavigate } from "react-router-dom";

export const UserForm = () => {
  const navigate = useNavigate()

  const initialValues: UserFormData = {
    nombre: "",
    email: "",
    grupos: [],
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const { data: groups, isLoading: isLoadingGroups } = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
  });

  const { mutate: createUserMutation } = useMutation({
    mutationFn: createUser,
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Error al crear el usuario"
      );
    },
    onSuccess: (data) => {
      navigate("/");
      toast.success(`Usuario creado exitosamente: ${data.nombre}`);
    },
  });

  const handleFormSubmit = (formData: UserFormData) => {
    createUserMutation(formData);
  };

  return (
    <form className="p-4" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="mb-5">
        <label htmlFor="userName" className="text-sm uppercase font-bold">
          Nombre del Usuario
        </label>
        <input
          id="userName"
          className="w-full p-3 border border-gray-200 rounded"
          type="text"
          placeholder="Nombre del Usuario"
          {...register("nombre", {
            required: "El nombre del usuario es obligatorio",
          })}
        />
        {errors.nombre && (
          <ErrorMessage>{errors.nombre.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="emailName" className="text-sm uppercase font-bold">
          Email
        </label>
        <input
          id="emailName"
          className="w-full p-3 border border-gray-200 rounded"
          type="email"
          placeholder="Email del Usuario"
          {...register("email", {
            required: "El email del usuario es obligatorio",
          })}
        />
        {errors.email && (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5">
        <p className="font-bold text-lg mb-2">Selecciona grupos para el usuario:</p>
        {isLoadingGroups ? (
          <p className="text-gray-500">Cargando grupos...</p>
        ) : (
          <div className="relative">
            <select
              className="w-full p-3 border border-gray-300 rounded-md"
              multiple
              {...register("grupos")}
            >
              {groups?.map((group: Grupo) => (
                <option key={group.nombre} value={group.id}>
                  {group.nombre} - {group.descripcion}
                </option>
              ))}
            </select>
          </div>
        )}
        {errors.grupos && (
          <ErrorMessage>{errors.grupos.message}</ErrorMessage>
        )}
      </div>

      <button
        className="bg-cyan-600 hover:bg-cyan-700 w-full p-3 text-white uppercase font-bold rounded transition-colors"
        type="submit"
      >
        Crear Usuario
      </button>
    </form>
  );
};
