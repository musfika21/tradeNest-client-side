import React from 'react';
import CustomizedButton from '../../Shared/CustomizedButton';
import SocialLogins from '../../Shared/SocialLogins';
import { Link } from 'react-router';

const Login = () => {
    return (
        <div>
            <div className='flex justify-center bg-image'>
                        <div className="w-full max-w-11/12 mx-auto p-8 space-y-3 rounded-sm my-15 md:my-10 bg-black/20 text-white">
                            <h1 className="text-xl font-bold text-center">Register Now!</h1>
                            <form className="space-y-4 md:space-y-6">
                                {/* name field */}
                                <div className="space-y-1 text-sm">
                                    <label className="block ">Enter Your Name: </label>
                                    <input type="text" name="name" placeholder="Enter Name" className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none" />
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
                            <SocialLogins/>
                            <p className="text-xs text-center sm:px-6">Don't have an account?
                                <Link className="underline hover:text-[#f36c7c]"> Sign up</Link>
                            </p>
                        </div>
                    </div >
        </div>
    );
};

export default Login;