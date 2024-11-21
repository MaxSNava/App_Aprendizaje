import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ErrorMessage } from "../ErrorMessage";
import { GrupoFormData } from "../../../types";
import { createGroup } from "../../../api";

export const GrupoForm = () => {
  const initialValues: GrupoFormData = {
    nombre: "",
    descripcion: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const { mutate: createGroupMutation, reset } = useMutation({
    mutationFn: createGroup,
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Error al crear el grupo"
      );
    },
    onSuccess: (data) => {
      reset();
      toast.success(`Grupo creado exitosamente: ${data.nombre}`);
    },
  });

  const handleFormSubmit = (formData: GrupoFormData) => {
    const { ...data } = formData;
    
    const normalizedData = {
      ...data,
      nombre: data.nombre.toLowerCase(),
    };
    createGroupMutation(normalizedData);
  };

  return (
    <form className="p-4" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="mb-5">
        <label htmlFor="groupName" className="text-sm uppercase font-bold">
          Nombre del Grupo
        </label>
        <input
          id="groupName"
          className="w-full p-3 border border-gray-200 rounded"
          type="text"
          placeholder="Nombre del Grupo"
          {...register("nombre", {
            required: "El nombre del grupo es obligatorio",
          })}
        />
        {errors.nombre && (
          <ErrorMessage>{errors.nombre.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="groupDescription"
          className="text-sm uppercase font-bold"
        >
          Descripción del Grupo
        </label>
        <textarea
          id="groupDescription"
          className="w-full p-3 border border-gray-200 rounded"
          placeholder="Descripción del Grupo"
          {...register("descripcion")}
        />
      </div>

      <button
        className="bg-cyan-600 hover:bg-cyan-700 w-full p-3 text-white uppercase font-bold rounded transition-colors"
        type="submit"
      >
        Crear Grupo
      </button>
    </form>
  );
};
