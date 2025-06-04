import React from 'react';
import logo from '../../assets/logo.png';
import { FaGoogle } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router';
import SocialLogins from '../../Shared/SocialLogins';
import CustomizedButton from '../../Shared/CustomizedButton';
import { IoPerson } from 'react-icons/io5';

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#2D0509] text-white py-6">
            <div className="w-full max-w-sm p-6 space-y-6">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <img className='w-20 h-20 lg:h-25 lg:w-25' src={logo} alt="logo of TradeNest" />
                </div>

                {/* Welcome Text */}
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-semibold">Welcome back</h1>
                    <p className="text-sm">Let's continue your journey.</p>
                </div>

                {/* Google login */}
                <SocialLogins />

                {/* Divider */}
                <div className="flex items-center text-sm">
                    <hr className="flex-grow border-white" />
                    <span className="mx-2">or continue with</span>
                    <hr className="flex-grow border-white" />
                </div>

                {/* login form */}
                <form className='space-y-4'>
                    {/* Email Input */}
                    <div className="relative">
                        <input type="text" name="name" placeholder="Enter Name" className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none" />

                        <IoPerson className="absolute right-5 top-1/2 transform -translate-y-1/2" />

                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                        />
                        <AiOutlineEye className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                    </div>

                    {/* Forgot password */}
                    <div className="text-right text-xs hover:underline cursor-pointer">
                        Forgot password?
                    </div>

                    {/* Sign In Button */}
                    <CustomizedButton text="Login" type="submit" />
                </form>

                {/* Sign Up Link */}
                <p className="text-xs md:text-base text-center sm:px-6">
                    Don’t have an account?{" "}
                    <Link to="/register-user" className="underline hover:text-[#f36c7c]">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
