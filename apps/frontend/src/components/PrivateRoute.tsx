import { useAuthStore } from '@/hooks/useAuthStore';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const { authData } = useAuthStore();
  return authData ? <Outlet /> : <Navigate to={`/`} replace />;
};

export default PrivateRoute;
