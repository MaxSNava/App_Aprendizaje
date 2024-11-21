import { Link } from "react-router-dom";
import { Users, BarChart2 } from 'lucide-react';

export const AdminHomePage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Bienvenido, Administrador
      </h1>
      <p className="text-gray-600 text-lg">
        Aquí puedes gestionar usuarios, ver estadísticas y administrar la aplicación.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/auth/administracion"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <Users size={40} className="text-blue-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Gestión de Usuarios</h2>
              <p className="text-gray-600 mt-2">
                Agrega, edita o elimina usuarios de la plataforma.
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/auth/dashboard"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <BarChart2 size={40} className="text-green-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Dashboard de Resultados</h2>
              <p className="text-gray-600 mt-2">
                Analiza resultados de los instrumentos por individuo, grupo o total.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resumen de Actividad</h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800">Usuarios Totales</h3>
            <p className="text-3xl font-bold text-blue-600">1,234</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800">Tests Completados</h3>
            <p className="text-3xl font-bold text-green-600">5,678</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};