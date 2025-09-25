import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Components/MainLayout'
import FeedPage from './Pages/FeedPage'
import Profile from './Pages/Profile'
import PostDetails from './Pages/PostDetails'
import AuthLayout from './Components/AuthLayout'
import Register from './Pages/Register'
import Login from './Pages/Login'
import ProtectedRoute from './Components/ProtectedRoute'
import AuthProtectedRoute from './Components/AuthProtectedRoute'



export default function App() {

  const router = createBrowserRouter([
    {path:'', element : <MainLayout />, children: [
      {index:true, element: <ProtectedRoute><FeedPage /></ProtectedRoute>},
      {path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute>},
      {path: 'post/:id', element: <ProtectedRoute><PostDetails /></ProtectedRoute>}
  ]    
    },

    {path: '', element: <AuthLayout/> , children: [
      {path: 'login', element: <AuthProtectedRoute><Login/></AuthProtectedRoute>},
      {path: 'register', element: <AuthProtectedRoute><Register/></AuthProtectedRoute>},

    ]}
  ]

  )

  return <>

  <RouterProvider router={router} />
  </>
}
