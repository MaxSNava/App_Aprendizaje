import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { createTest, getGroups, createGroup } from "../../../core";

export const VarkPage = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      nombre: "",
      email: "",
      belongsToGroup: false,
      groupId: "",
      newGroupName: "",
      newGroupDescription: "",
    },
  });

  const { data: groups = [], refetch: refetchGroups } = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
  });

  const createGroupMutation = useMutation({
    mutationFn: createGroup,
    onSuccess: (newGroup: { id: string; nombre: string }) => {
      toast.success("Grupo creado exitosamente");
      refetchGroups();
      reset((prev) => ({ ...prev, groupId: newGroup.id }));
    },
    onError: () => toast.error("Error al crear el grupo"),
  });

  const createTestMutation = useMutation({
    mutationFn: createTest,
    onSuccess: () => {
      toast.success("Prueba creada exitosamente");
      navigate(`/vark/test-id`); // Cambia por la lógica de redirección real
    },
    onError: () => toast.error("Error al crear la prueba"),
  });

  const onSubmit = (data: any) => {
    const { nombre, email, groupId } = data;
    createTestMutation.mutate({ nombre, email, groupId });
  };

  const handleCreateGroup = (data: any) => {
    const { newGroupName, newGroupDescription } = data;
    createGroupMutation.mutate({ nombre: newGroupName, descripcion: newGroupDescription });
  };

  const belongsToGroup = watch("belongsToGroup");

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-bold mb-4">Prueba VARK</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Nombre */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Nombre</label>
          <Controller
            name="nombre"
            control={control}
            rules={{ required: "Nombre es requerido" }}
            render={({ field }) => (
              <input {...field} className="w-full px-4 py-2 border rounded-md" />
            )}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Correo Electrónico</label>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Correo electrónico es requerido" }}
            render={({ field }) => (
              <input {...field} type="email" className="w-full px-4 py-2 border rounded-md" />
            )}
          />
        </div>

        {/* Checkbox: Perteneces a un grupo */}
        <div className="mb-4">
          <Controller
            name="belongsToGroup"
            control={control}
            render={({ field }) => (
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
                ¿Perteneces a un grupo?
              </label>
            )}
          />
        </div>

        {/* Selección de grupo */}
        {belongsToGroup && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Selecciona un grupo</label>
            <Controller
              name="groupId"
              control={control}
              render={({ field }) => (
                <select {...field} className="w-full px-4 py-2 border rounded-md">
                  <option value="">-- Seleccionar --</option>
                  {groups?.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.nombre}
                    </option>
                  ))}
                </select>
              )}
            />
            <button
              type="button"
              onClick={() => reset((prev) => ({ ...prev, newGroupName: "", newGroupDescription: "" }))}
              className="mt-2 text-blue-600 hover:underline"
            >
              Crear nuevo grupo
            </button>
          </div>
        )}

        {/* Botón para comenzar la prueba */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
        >
          Comenzar Prueba
        </button>
      </form>

      {/* Formulario para crear grupo */}
      {belongsToGroup && (
        <form onSubmit={handleSubmit(handleCreateGroup)} className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-bold mb-2">Crear Grupo</h3>
          <div className="mb-2">
            <label className="block text-gray-700 mb-1">Nombre del Grupo</label>
            <Controller
              name="newGroupName"
              control={control}
              rules={{ required: "Nombre del grupo es requerido" }}
              render={({ field }) => (
                <input {...field} className="w-full px-4 py-2 border rounded-md" />
              )}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 mb-1">Descripción</label>
            <Controller
              name="newGroupDescription"
              control={control}
              rules={{ required: "Descripción es requerida" }}
              render={({ field }) => (
                <textarea {...field} className="w-full px-4 py-2 border rounded-md" />
              )}
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors"
          >
            Crear Grupo
          </button>
        </form>
      )}
    </div>
  );
};
