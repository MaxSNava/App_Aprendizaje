import { useState, useEffect } from 'react';
import { authUserSchema } from '../../../types';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: authUserSchema) => void;
  auth?: authUserSchema;
};

export const AuthModal = ({ isOpen, onClose, onSave, auth }: AuthModalProps) => {
  const [formData, setFormData] = useState<authUserSchema>(
    auth || {
      id: '',
      nickname: '',
      fullName: '',
      roles: [],
      isActive: true,
    }
  );

  useEffect(() => {
    if (auth) {
      setFormData(auth);
    } else {
      setFormData({
        id: '',
        nickname: '',
        fullName: '',
        roles: [],
        isActive: true,
      });
    }
  }, [auth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">{auth ? 'Editar Usuario' : 'Agregar Usuario'}</h3>
        <div className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Nombre Completo"
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="Nombre de Usuario"
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {/* Agrega más campos según sea necesario */}
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancelar
          </button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}
