import { Link } from "react-router-dom";
import { Users, BarChart2 } from "lucide-react";
import { useDashboardData } from "../../../hooks/useDashboardData";

export const AdminHomePage = () => {
  const { totalUsuarios, totalTests, loading, error } = useDashboardData();

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>Ocurrió un error al cargar los datos: {error.message}</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Bienvenido, Administrador
      </h1>
      <p className="text-gray-600 text-base md:text-lg">
        Aquí puedes gestionar usuarios, ver estadísticas y administrar la
        aplicación.
      </p>

      <div className="grid grid-cols-1 gap-6">
        <Link
          to="/auth/administracion"
          className="block p-4 md:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <Users size={32} className="text-blue-600" />
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                Gestión de Administracion
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-2">
                Agrega, edita o elimina Administradores de la plataforma.
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/auth/dashboard"
          className="block p-4 md:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <BarChart2 size={32} className="text-green-600" />
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                Dashboard de Resultados
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-2">
                Analiza resultados de los instrumentos por individuo, grupo o
                total.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-8 bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          Resumen de Actividad
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="text-base md:text-lg font-semibold text-blue-800">
              Usuarios Totales
            </h3>
            <p className="text-2xl md:text-3xl font-bold text-blue-600">
              {totalUsuarios ?? 0}
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-base md:text-lg font-semibold text-green-800">
              Tests Completados
            </h3>
            <p className="text-2xl md:text-3xl font-bold text-green-600">
              VARK: {totalTests?.vark ?? 0}, MBTI: {totalTests?.mbti ?? 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
