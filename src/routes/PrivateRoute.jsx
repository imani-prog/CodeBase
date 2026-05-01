import { useAuth } from '../hooks/useAuth.jsx';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role) {
    if (Array.isArray(role)) {
      if (!role.includes(user.role)) return <Navigate to="/unauthorized" replace />;
    } else {
      if (user.role !== role) return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default PrivateRoute;