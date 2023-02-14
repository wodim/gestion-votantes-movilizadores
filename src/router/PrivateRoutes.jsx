import jwtDecode from 'jwt-decode';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';


const useAuth = () => {
    //decodificar token
    //const token = localStorage.getItem('token');
    //const decodedToken = token ? jwtDecode(token) : null;
    // const { state } = useContext(UserContext);
      const user = true; //localStorage.getItem('token');
  
      return user;
  }

const PrivateRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoutes