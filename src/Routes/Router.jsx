import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/HomePage/Home';
import Login from '../Pages/LoginPage/Login';
import Register from '../Pages/RegisterPage/Register';

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
            }
        ]
    }
])

export default Router;