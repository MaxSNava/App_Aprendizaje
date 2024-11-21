import { useEffect, useState } from 'react'
import { User, Edit, Trash2, Search, Plus } from 'lucide-react'
import { authUserSchema } from '../../../types';
import { getAllAuths, createAuth, updateAuth, deleteAuth } from '../../../api';
import { GrupoForm, AuthModal } from '../../components';

export const AdminAdministracionPage = () => {
  const [auths, setAuths] = useState<authUserSchema[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedAuth, setSelectedAuth] = useState<authUserSchema | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllAuths();
        setAuths(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message || 'Error al obtener Administrion');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este admin?')) {
      try {
        await deleteAuth(userId);
        setAuths((prev) => prev.filter((user) => user.id !== userId));
      } catch (err) {
        if (err instanceof Error) setError(err.message || 'Error al eliminar admin');
      }
    }
  };

  const handleEditAuth = (auth: authUserSchema) => {
    setSelectedAuth(auth);
    setIsModalOpen(true);
  };

  const handleSaveAuth = async (authData: authUserSchema) => {
    try {
      if (authData.id) {
        await updateAuth(authData.id, authData);
        setAuths(auths.map((auth) => (auth.id === authData.id ? authData : auth)));
      } else {
        const newAuth = await createAuth(authData);
        setAuths((prev) => [newAuth, ...prev]);
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message || 'Error al guardar usuario');
    }
  };

  const filteredUsers = auths.filter(auth =>
    auth.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auth.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Gestión de Administracion</h1>

      <div className="flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar Administradores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <button
          onClick={() => {
            setSelectedAuth(undefined);
            setIsModalOpen(true);
          }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Agregar Administradores</span>
        </button>
      </div>

      {loading && <p>Cargando administradores...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((auth) => (
                <tr key={auth.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <User className="h-10 w-10 rounded-full bg-gray-200 p-2" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{auth.fullName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{auth.roles.join(', ')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEditAuth(auth)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <Edit size={20} />
                    </button>
                    <button onClick={() => handleDeleteUser(auth.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <>
        {/* ... código existente ... */}
        <AuthModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveAuth}
          auth={selectedAuth}
        />
      </>


      <GrupoForm />
    </div>
  )
}

