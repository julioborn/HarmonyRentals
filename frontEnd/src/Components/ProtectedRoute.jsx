import React, { useContext } from 'react'
// import { AuthContext } from '../Context/AuthContext'
import { GlobalContext } from '../Context/GlobalContext';
import { Navigate, Outlet } from 'react-router-dom';


export const ProtectedRoute = () => {

    const { state } = useContext(GlobalContext);
    return state?.isLogged ? <Outlet /> : <Navigate to='/login' />

}

