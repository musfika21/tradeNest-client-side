import React, { useState } from 'react';
import CustomizedButton from '../../Shared/CustomizedButton';
import SocialLogins from '../../Shared/SocialLogins';
import { Link, useLocation, useNavigate } from 'react-router';
import { IoEye, IoEyeOff, IoPerson } from 'react-icons/io5';
import welcome from '../../assets/LottieFiles/welcome.json'
import Lottie from 'react-lottie';
import { MdEmail } from 'react-icons/md';
import { IoMdPhotos } from 'react-icons/io';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAuth from '../../CustomHooks/UseAuth';

const Register = () => {

    const { createUser, updateUserInfo, setUser } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // validation of the password
    const validationOfPassword = (password) => {
        if (!password) {
            return "Password is Required";
        } if (password.length < 6) {
            return "Password must be 6 character"
        } if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter";
        } if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter";
        }
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const { email, password, name, photo, ...userProfile } = Object.fromEntries(formData)

        const validatePassword = validationOfPassword(password);
        if (validatePassword) {
            setErrorMessage(validatePassword);
            return;
        }
        // create user
        createUser(email, password)
            .then((result) => {

                // Update user profile
                updateUserInfo({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser((currentUser) => {
                            console.log(currentUser, name, photo);
                            currentUser.displayName = name;
                            currentUser.photoURL = photo;
                            Swal.fire({
                                title: "Successfully Registered",
                                icon: "success",
                                draggable: true
                            });
                            navigate(location.state || '/');
                        })
                    })
            })
            .catch((error) => {
                setErrorMessage(error.message);
                toast.error(error.message, {
                    position: "top-right",
                    className: "bg-red-100 text-red-800 border border-red-300 font-medium rounded-lg shadow-md px-4 py-3",
                    icon: "❌",
                });
            })
    }

    // lottie files function
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: welcome,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className='bg-image py-20 text-white'>
            <div className='bg-image flex flex-col lg:flex-row justify-between p-6 items-center w-full md:w-10/12 lg:w-11/12 mx-auto shadow-2xl/90 inset-shadow-xl/10'>
                <div className='flex-1 px-3'>
                    <Lottie options={defaultOptions} className='h-10 sm:h-12 md:h-15' />
                    <p className='text-sm md:text-base rounded-md bg-black/20 p-4 w-11/12 sm:w-4/5 text-center mx-auto text-shadow-lg/30 lg:mt-20'>to our Trade Nest — connecting bulk suppliers with retailers and buyers across multiple product categories. Enjoy secure transactions, easy product management, and a seamless buying experience, all in one responsive platform</p>
                </div>
                {/* form */}
                <div className='flex-1 w-full sm:w-10/12 xl:w-4/5 mx-auto'>
                    <div className="p-8 space-y-3 rounded-sm my-4 md:my-10 bg-black/20 ">
                        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-center">Register Now!</h1>
                        <form onSubmit={handleSignUp} className="space-y-4 md:space-y-6">
                            {/* name field */}
                            <div className="space-y-1 text-sm">
                                <label className="block ">Enter Your Name: </label>
                                <div className="relative">
                                    <input type="text" name="name" placeholder="Enter Name" className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none" />

                                    <IoPerson className="absolute right-5 top-1/2 transform -translate-y-1/2" />

                                </div>
                            </div>
                            {/* email field */}
                            <div className="space-y-1 text-sm">
                                <label className="block ">Enter Your Email: </label>
                                <div className="relative">
                                    <input type="email" name="email" placeholder="Enter Email" className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none" />

                                    <MdEmail className="absolute right-5 top-1/2 transform -translate-y-1/2" />

                                </div>
                            </div>
                            {/* photo URL */}
                            <div className="space-y-1 text-sm">
                                <label className="block ">Enter Your Photo URL: </label>
                                <div className="relative">
                                    <input type="url" name="photo" placeholder="Enter Photo URL" className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none" />

                                    <IoMdPhotos className="absolute right-5 top-1/2 transform -translate-y-1/2" />

                                </div>
                            </div>
                            {/* password field */}
                            <div className="space-y-1 text-sm">
                                <label className="block">Enter A Password: </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password" placeholder="Enter Password"
                                        className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none" />
                                    <button onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword ?
                                                <IoEye className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer" /> :
                                                <IoEyeOff className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                                        }
                                    </button>
                                </div>
                            </div>
                            {/* privacy policy */}
                            <label className="flex items-center">
                                <input type="checkbox" className="form-checkbox" />
                                <span class="block ml-2 text-xs lg:text-base font-medium cursor-pointer">Agree to Privacy Policy</span>
                            </label>
                            {
                                errorMessage &&
                                <p className='text-red-500'>{errorMessage}</p>
                            }
                            {/* button */}
                            <div className='flex justify-center'>
                                <CustomizedButton text="Register" type="submit"></CustomizedButton>
                            </div>
                        </form>
                        <div className="flex items-center pt-4 space-x-1">
                            <div className="flex-1 h-px sm:w-16 bg-white"></div>
                            <p className="px-3 text-sm ">OR</p>
                            <div className="flex-1 h-px sm:w-16 bg-white"></div>
                        </div>
                        <SocialLogins />
                        <p className="text-xs md:text-base text-center sm:px-6">Already Have an Account? 😊
                            <Link to='/login-user' className="underline hover:text-[#f36c7c]"> Login</Link>
                        </p>
                    </div>
                </div >
            </div >
        </div >

    );
};

export default Register;