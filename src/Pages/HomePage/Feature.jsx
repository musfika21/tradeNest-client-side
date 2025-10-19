import React from "react";
import { Link } from "react-router";
import { FaArrowRight, FaShippingFast, FaShieldAlt, FaHandshake } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import useAuth from "../../CustomHooks/UseAuth";

const Feature = () => {
    const { theme } = useAuth();

    return (
        <div className={`min-h-screen ${theme ? 'bg-gradient-to-br from-[#F1F0E4] via-[#E8E6D5] to-[#BCA88D]' : 'bg-gradient-to-br from-[#1a1a1a] via-[#202124] to-[#2d2d2d]'} pt-20 overflow-hidden`}>
            <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                {/* Main Hero Content */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
                        <div className="space-y-4">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme ? 'bg-[#3E3F29]/20 text-[#3E3F29]' : 'bg-[#7D8D86]/20 text-[#7D8D86]'} backdrop-blur-sm border ${theme ? 'border-[#3E3F29]/30' : 'border-[#7D8D86]/30'}`}>
                                <MdVerified className="text-xl" />
                                <span className="text-sm font-semibold">Trusted B2B Platform</span>
                            </div>

                            <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight ${theme ? 'text-[#3E3F29]' : 'text-white'}`}>
                                Connect, Trade, <br />
                                <span className={`${theme ? 'text-[#BCA88D]' : 'text-[#7D8D86]'}`}>Grow Together</span>
                            </h1>

                            <p className={`text-lg sm:text-xl ${theme ? 'text-gray-700' : 'text-gray-300'} max-w-xl`}>
                                Your premier B2B marketplace connecting manufacturers, wholesalers, and retailers worldwide. Discover quality products, competitive prices, and reliable partners.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Link to="/all-Products">
                                <button className={`group px-8 py-4 rounded-xl font-bold ${theme ? 'bg-[#BCA88D] hover:bg-[#BCA88D]/70 text-black' : 'bg-[#7D8D86] hover:bg-[#8d9e97] text-white'} transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer`}>
                                    Browse Products
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>

                            <Link to="/add-Product">
                                <button className={`px-8 py-4 rounded-xl font-bold ${theme ? 'bg-[#3E3F29] text-white hover:bg-[#4e4f39]/60' : 'bg-white/10 text-white hover:bg-white/20'} backdrop-blur-sm border ${theme ? 'border-[#3E3F29]' : 'border-white/20'} transition-all duration-300 transform hover:-translate-y-1 cursor-pointer`}>
                                    List Your Products
                                </button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8">
                            <div className="space-y-2">
                                <h3 className={`text-3xl sm:text-4xl font-bold ${theme ? 'text-[#3E3F29]' : 'text-[#BCA88D]'}`}>10K+</h3>
                                <p className={`text-sm ${theme ? 'text-gray-600' : 'text-gray-400'}`}>Active Suppliers</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className={`text-3xl sm:text-4xl font-bold ${theme ? 'text-[#3E3F29]' : 'text-[#BCA88D]'}`}>50K+</h3>
                                <p className={`text-sm ${theme ? 'text-gray-600' : 'text-gray-400'}`}>Products Listed</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className={`text-3xl sm:text-4xl font-bold ${theme ? 'text-[#3E3F29]' : 'text-[#BCA88D]'}`}>100+</h3>
                                <p className={`text-sm ${theme ? 'text-gray-600' : 'text-gray-400'}`}>Countries</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Floating Cards */}
                    <div className="relative h-[500px] lg:h-[600px] animate-in fade-in slide-in-from-right duration-700 delay-200">
                        {/* Background Decoration */}
                        <div className={`absolute inset-0 ${theme ? 'bg-[#BCA88D]/30' : 'bg-[#7D8D86]/20'} rounded-full blur-3xl`}></div>

                        {/* Floating Feature Cards */}
                        <div className="relative h-full">
                            <div className={`absolute top-0 right-0 w-64 p-6 ${theme ? 'bg-white/80' : 'bg-[#343434]'} backdrop-blur-xl rounded-2xl shadow-2xl border ${theme ? 'border-gray-200/50' : 'border-gray-700/50'} transform hover:scale-105 transition-all duration-300`}>
                                <FaShippingFast className={`text-4xl ${theme ? 'text-[#3E3F29]' : 'text-[#BCA88D]'} mb-3`} />
                                <h3 className={`font-bold text-lg mb-2 ${theme ? 'text-[#3E3F29]' : 'text-white'}`}>Fast Shipping</h3>
                                <p className={`text-sm ${theme ? 'text-gray-600' : 'text-gray-300'}`}>Global logistics network for timely delivery</p>
                            </div>

                            <div className={`absolute top-32 left-0 w-64 p-6 ${theme ? 'bg-white/80' : 'bg-[#343434]'} backdrop-blur-xl rounded-2xl shadow-2xl border ${theme ? 'border-gray-200/50' : 'border-gray-700/50'} transform hover:scale-105 transition-all duration-300`}>
                                <FaShieldAlt className={`text-4xl ${theme ? 'text-[#3E3F29]' : 'text-[#BCA88D]'} mb-3`} />
                                <h3 className={`font-bold text-lg mb-2 ${theme ? 'text-[#3E3F29]' : 'text-white'}`}>Secure Payments</h3>
                                <p className={`text-sm ${theme ? 'text-gray-600' : 'text-gray-300'}`}>Protected transactions with escrow services</p>
                            </div>

                            <div className={`absolute bottom-20 right-10 w-64 p-6 ${theme ? 'bg-white/80' : 'bg-[#343434]'} backdrop-blur-xl rounded-2xl shadow-2xl border ${theme ? 'border-gray-200/50' : 'border-gray-700/50'} transform hover:scale-105 transition-all duration-300`}>
                                <FaHandshake className={`text-4xl ${theme ? 'text-[#3E3F29]' : 'text-[#BCA88D]'} mb-3`} />
                                <h3 className={`font-bold text-lg mb-2 ${theme ? 'text-[#3E3F29]' : 'text-white'}`}>Verified Sellers</h3>
                                <p className={`text-sm ${theme ? 'text-gray-600' : 'text-gray-300'}`}>All suppliers thoroughly vetted and verified</p>
                            </div>

                            {/* Decorative Elements */}
                            <div className={`absolute top-1/4 right-1/4 w-20 h-20 ${theme ? 'bg-[#3E3F29]/20' : 'bg-[#BCA88D]/20'} rounded-full blur-2xl animate-pulse`}></div>
                            <div className={`absolute bottom-1/3 left-1/3 w-32 h-32 ${theme ? 'bg-[#3E3F29]/20' : 'bg-[#7D8D86]/20'} rounded-full blur-3xl animate-pulse delay-700`}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave Divider */}
            <div className={`${theme ? 'text-[#F1F0E4]' : 'text-[#1a1a1a]'} transform translate-y-1`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
                    <path fill="currentColor" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
                </svg>
            </div>
        </div>
    );
};

export default Feature;