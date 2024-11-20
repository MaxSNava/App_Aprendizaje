import { Navigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { data:authData, isError, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (isError || !authData) return <Navigate to="/auth/login" />;

  return children;
}
