import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function ProtectedRoute({children}) {
  

   const {isLoggedIn} = useContext(AuthContext);
   return isLoggedIn? children : <Navigate to='/login' />

}
