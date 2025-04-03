import React, { useEffect } from 'react'
import { createBrowserRouter, Navigate, Router, RouterProvider } from 'react-router-dom'
import HomeLayout from './components/HomeLayout'
import Landing from './pages/Landing'
import { useAuthStore} from './store/useAuthStore'
import { LoaderPinwheel } from 'lucide-react'
import { LoginPage, SignUpPage, ProfilePage } from './pages/index.js'
import { Toaster } from 'react-hot-toast'



const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  console.log(onlineUsers);

  useEffect(() => {
    checkAuth();
  }, [checkAuth])
  console.log(authUser);

  if (isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <LoaderPinwheel className='size-10 animate-spin' />
    </div>
  )

  const router = createBrowserRouter([


    {
      path: '/',
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: authUser ? <Landing /> : <Navigate to='/login' />
        },
        {
          path: 'login',
          element: !authUser ? <LoginPage /> : <Navigate to='/' />
        },
        {
          path: 'signup',
          element: !authUser ? <SignUpPage /> : <Navigate to='/' />
        },
        {
          path: 'profile',
          element: authUser ? <ProfilePage /> : <Navigate to='/login' />
        }
      ]
    }
  ])




  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
