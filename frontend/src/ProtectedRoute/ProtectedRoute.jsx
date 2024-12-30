import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const user = localStorage.getItem('userId') ? true : false;

  return user ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
