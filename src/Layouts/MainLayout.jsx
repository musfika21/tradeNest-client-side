import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <div className='pt-21 min-h-[calc(100vh-273px)] font'>
                <Outlet/>
                <ToastContainer/>
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;