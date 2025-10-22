import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useAuth from '../CustomHooks/UseAuth';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {

    const { theme } = useAuth();

    return (
        <div>
            <Navbar />
            <div className={`pt-16 xl:pt-17 min-h-[calc(100vh-273px)] font ${theme ? 'bg-[#F1F0E4] text-black' : 'bg-[#1F1F1F] text-white'}`}>
                <Outlet />
                <Toaster />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;