import { Navigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { data: authData, isError, isLoading } = useAuth();
  if (isLoading) return <div>Cargando...</div>;
  if (isError || !authData) {
    console.error("Error en la autenticación o datos no válidos.");
    return <Navigate to="/auth/login" />;
  }

  return children;
};
