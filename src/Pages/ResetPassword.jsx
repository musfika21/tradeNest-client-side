import React, { useState } from 'react';
import logo from '../assets/logo.png'; // Replace with your actual logo path
import { MdEmail } from 'react-icons/md';
import CustomizedButton from '../Shared/CustomizedButton';
import { Link } from 'react-router';
import toast from 'react-hot-toast';


const ResetPassword = () => {
    const [email, setEmail] = useState('');

    const handleReset = (e) => {
        e.preventDefault();
        toast('We sent you an email to reset your password', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#2D0509] text-white py-6">
            <div className="w-full max-w-sm p-6 space-y-6">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <img className='w-20 h-20 lg:h-25 lg:w-25' src={logo} alt="logo of TradeNest" />
                </div>

                {/* Text */}
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-semibold">Reset Password</h1>
                    <p className="text-sm">Enter your email and we'll send you a reset link.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleReset} className="space-y-4">
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                        />
                        <MdEmail className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white" />
                    </div>
                    <CustomizedButton text="Send Reset Link" type="submit" />
                </form>

                {/* Back to login */}
                <p className="text-xs md:text-base text-center sm:px-6">
                    Remember your password?{" "}
                    <Link to="/login-user" className="underline hover:text-[#f36c7c]">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;
