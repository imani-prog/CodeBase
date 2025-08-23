import { useAuth } from '../hooks/useAuth.jsx';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role) {
    if (Array.isArray(role)) {
      if (!role.includes(user.role)) return <Navigate to="/unauthorized" />;
    } else {
      if (user.role !== role) return <Navigate to="/unauthorized" />;
    }
  }
  return children;
};
export default PrivateRoute;
