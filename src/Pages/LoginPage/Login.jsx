import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import SocialLogins from '../../Shared/SocialLogins';
import CustomizedButton from '../../Shared/CustomizedButton';
import { IoEye, IoEyeOff, IoPerson } from 'react-icons/io5';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAuth from '../../CustomHooks/UseAuth';

const Login = () => {

    const { loginUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const { email, password, ...userProfile } = Object.fromEntries(formData);
        console.log(email)
        loginUser(email, password)
            .then((result) => {
                Swal.fire({
                    title: "Successfully Logged in",
                    icon: "success",
                    draggable: true
                });
                navigate(location.state || "/");
            })

            .catch((error) => {
                toast.error(`Something Wrong${error.message}`, {
                    position: "top-right",
                    className: "bg-red-100 text-red-800 border border-red-300 font-medium rounded-lg shadow-md px-4 py-3",
                    icon: "❌",
                });
            })
    }

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
                <form onSubmit={handleLogin} className='space-y-4'>
                    {/* Email Input */}
                    <div className="relative">
                        <input type="text" name="name" placeholder="Enter Name" className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none" />

                        <IoPerson className="absolute right-5 top-1/2 transform -translate-y-1/2" />

                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                        />
                        <button onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ?
                                    <IoEyeOff className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer" /> :
                                    <IoEye className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                            }
                        </button>
                    </div>
                    {/* Forgot password */}
                    <div className="text-right text-xs hover:underline cursor-pointer">
                        <Link to='/reset-Password'>
                            Forgot password?
                        </Link>
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
