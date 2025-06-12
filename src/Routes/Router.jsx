import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/HomePage/Home';
import Login from '../Pages/LoginPage/Login';
import Register from '../Pages/RegisterPage/Register';
import NotFound from '../Pages/NotFound';
import ResetPassword from '../Pages/ResetPassword';
import PrivateRoutes from './PrivateRoutes';
import Categories from '../Pages/Categories';
import AllProducts from '../Pages/AllProducts';
import AddProduct from '../Pages/AddProduct';
import MyProducts from '../Pages/MyProducts';
import Cart from '../Pages/Cart';

const Router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/login-user',
                Component: Login
            },
            {
                path: '/register-user',
                Component: Register
            },
            {
                path: '/reset-Password',
                Component: ResetPassword
            },
            {
                path: '/categories',
                Component: Categories
            },
            {
                path: '/all-Products',
                element: <PrivateRoutes><AllProducts/></PrivateRoutes>
            },
            {
                path: '/add-Product',
                element: <PrivateRoutes><AddProduct/></PrivateRoutes>
            },
            {
                path: '/my-Products',
                element: <PrivateRoutes><MyProducts/></PrivateRoutes>
            },
            {
                path: '/cart',
                element: <PrivateRoutes><Cart/></PrivateRoutes>
            },
            {
                path: '/*',
                Component: NotFound
            }
        ]
    }
])

export default Router;