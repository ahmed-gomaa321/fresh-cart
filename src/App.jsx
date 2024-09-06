import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Categories from './components/Categories/Categories'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Products from './components/Products/Products'
import Notfound from './components/Notfound/Notfound'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import { UserContextProvider } from './Context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import WishList from './components/WishList/WishList'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import Checkout from './components/Checkout/Checkout'
import AllOrders from './components/AllOrders/AllOrders'
import WishlistContextprovider from './Context/WishlistContext'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import ForgetCode from './components/ForgetCode/ForgetCode'
import ResetePassword from './components/ResetePassword/ResetePassword'


let routes = createBrowserRouter([
  {
    path: "/", element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "home", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "wishlist", element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "checkout", element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "productdetails/:id/:category", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "register", element: <Register /> },
      { path: "forgetcode", element: <ForgetCode /> },
      { path: "resetepassword", element: <ResetePassword /> },
      { path: "login", element: <Login /> },
      { path: "forgetpassword", element: <ForgetPassword /> },
      { path: "*", element: <Notfound /> }
    ]
  }
])

function App() {

  return <CartContextProvider>
    <UserContextProvider>
      <WishlistContextprovider>
        <RouterProvider router={routes}></RouterProvider>
      </WishlistContextprovider>
      <Toaster />
    </UserContextProvider>
  </CartContextProvider >
}

export default App
