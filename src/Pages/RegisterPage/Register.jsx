import React from 'react';
import CustomizedButton from '../../Shared/CustomizedButton';
import SocialLogins from '../../Shared/SocialLogins';
import { Link } from 'react-router';
import { IoPerson } from 'react-icons/io5';
import welcome from '../../assets/LottieFiles/welcome.json'
import Lottie from 'react-lottie';

const Register = () => {

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
            <div className='bg-image flex flex-col lg:flex-row justify-between p-4 items-center w-full md:w-10/12 lg:w-11/12 mx-auto shadow-2xl/90 inset-shadow-xl'>
                <div className='flex-1 px-3'>
                    {/* <h1>Welcome!😍</h1> */}
                    <Lottie options={defaultOptions} className='h-10 sm:h-12 md:h-15' />
                    <p className='text-sm md:text-base w-60 sm:w-80 md:w-3/4 text-center mx-auto text-shadow-lg/30 lg:mt-20'>to our Trade Nest — connecting bulk suppliers with retailers and buyers across multiple product categories. Enjoy secure transactions, easy product management, and a seamless buying experience, all in one responsive platform</p>
                </div>
                {/* form */}
                <div className='flex-1'>
                    <div className="w-full mx-auto p-8 space-y-3 rounded-sm my-4 md:my-10 bg-black/20 ">
                        <h1 className="text-xl font-bold text-center">Register Now!</h1>
                        <form className="space-y-4 md:space-y-6">
                            {/* name field */}
                            <div className="space-y-1 text-sm">
                                <label className="block ">Enter Your Name: </label>
                                <input type="text" name="name" placeholder="Enter Name" className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none" /> <IoPerson />
                            </div>
                            {/* email field */}
                            <div className="space-y-1 text-sm">
                                <label className="block ">Enter Your Email: </label>
                                <input type="email" name="email" placeholder="Enter Email" className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none" />
                            </div>
                            {/* photo URL */}
                            <div className="space-y-1 text-sm">
                                <label className="block ">Enter Your Photo URL: </label>
                                <input type="url" name="photo" placeholder="Enter Photo URL" className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none" />
                            </div>
                            {/* password field */}
                            <div className="space-y-1 text-sm">
                                <label className="block">Enter A Password: </label>
                                <input type="password" name="password" placeholder="Enter Password" className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none" />
                            </div>
                            {/* privacy policy */}
                            <label class="flex items-center">
                                <input type="checkbox" class="form-checkbox" />
                                <span class="block ml-2 text-xs font-medium cursor-pointer">Agree to Privacy Policy</span>
                            </label>
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
                        <p className="text-xs text-center sm:px-6">Don't have an account?
                            <Link className="underline hover:text-[#f36c7c]"> Sign up</Link>
                        </p>
                    </div>
                </div >
            </div>
        </div>

    );
};

export default Register;