import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const { isAuth, role } = useSelector((state) => state.user);
  return isAuth && role?.toLowerCase() === 'admin' ? children : <Navigate to="/" replace />;
}
