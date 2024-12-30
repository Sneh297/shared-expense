import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import MainBoard from './Pages/MainBoard';
import Details from './Pages/Details';
export default function App() {
  const isAuthenticated = localStorage.getItem('userId');

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={isAuthenticated ? <Navigate to='/' /> : <Login />}
          path='/login'
        />
        <Route
          element={isAuthenticated ? <Navigate to='/' /> : <SignUp />}
          path='/sign-up'
        />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainBoard />} path='/' />
          <Route path='/details/:id' element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
