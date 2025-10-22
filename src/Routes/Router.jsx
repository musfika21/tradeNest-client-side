import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/HomePage/Home';
import Login from '../Pages/LoginPage/Login';
import Register from '../Pages/RegisterPage/Register';
import ResetPassword from '../Pages/ResetPassword';
import PrivateRoutes from './PrivateRoutes';
import AddProduct from '../Pages/AddProduct';
import MyProducts from '../Pages/MyProducts';
import Categories from '../Pages/Category/Categories';
import AllProducts from '../Pages/allProduct/AllProducts';
import Details from '../Pages/allProduct/Details';
import Loader from '../components/Loader';
import UpdateProduct from '../Pages/UpdateProduct';
import FilteredCategory from '../Pages/categoryPages/FilteredCategory';
import Cart from '../Pages/cart/Cart';
import NotFound from '../Pages/NotFoundPage';

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
                Component: AllProducts
            },
            {
                path: '/product-Details/:id',
                loader: ({ params }) => fetch(`${import.meta.env.VITE_SERVER_API}/product/${params.id}`),
                hydrateFallbackElement: <Loader />,
                element: <PrivateRoutes><Details /></PrivateRoutes>
            },
            {
                path: '/category/:category',
                loader: ({ params }) => fetch(`${import.meta.env.VITE_SERVER_API}/category/${params.category}`),
                hydrateFallbackElement: <Loader />,
                Component: FilteredCategory
            },

            {
                path: '/add-Product',
                element: <PrivateRoutes><AddProduct /></PrivateRoutes>
            },
            {
                path: '/my-Products',
                element: <PrivateRoutes><MyProducts /></PrivateRoutes>
            },
            {
                path: '/cart',
                element: <PrivateRoutes><Cart /></PrivateRoutes>
            },
            {
                path: "/update-Product/:id",
                loader: ({ params }) => fetch(`${import.meta.env.VITE_SERVER_API}/products/${params.id}`),
                hydrateFallbackElement: <Loader />,
                element: <PrivateRoutes><UpdateProduct /></PrivateRoutes>
            },
            {
                path: '/*',
                Component: NotFound
            }
        ]
    }
])

export default Router;