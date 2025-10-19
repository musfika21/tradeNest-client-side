import React from 'react';
import { FaUserPlus, FaSearch, FaHandshake, FaArrowRight } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import useAuth from '../../CustomHooks/UseAuth';

const Works = () => {
    const { theme } = useAuth();

    const steps = [
        {
            step: "01",
            icon: FaUserPlus,
            title: "Create Your Account",
            description: "Sign up in minutes as a buyer or supplier. Set up your business profile with verification for added credibility.",
            color: theme ? "from-[#7D8D86] to-[#8d9e97]" : "from-[#BCA88D] to-[#a89880]",
            features: ["Quick registration", "Business verification", "Custom profile"]
        },
        {
            step: "02",
            icon: FaSearch,
            title: "Explore & Connect",
            description: "Browse thousands of quality products from verified vendors worldwide. Use advanced filters to find exactly what you need.",
            color: theme ? "from-[#3E3F29] to-[#4e4f39]" : "from-[#7D8D86] to-[#8d9e97]",
            features: ["50K+ products", "Verified suppliers", "Smart search"]
        },
        {
            step: "03",
            icon: FaHandshake,
            title: "Trade With Confidence",
            description: "Place bulk orders with secure payments and escrow protection. Track shipments and manage everything in one place.",
            color: theme ? "from-[#BCA88D] to-[#a89880]" : "from-[#3E3F29] to-[#4e4f39]",
            features: ["Secure payments", "Order tracking", "24/7 support"]
        }
    ];

    return (
        <section className={`py-20'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme ? 'bg-[#BCA88D]/20 text-[#3E3F29]' : 'bg-[#7D8D86]/20 text-[#7D8D86]'} backdrop-blur-sm border ${theme ? 'border-[#BCA88D]/30' : 'border-[#7D8D86]/30'} mb-4`}>
                        <MdVerified className="text-xl" />
                        <span className="text-sm font-semibold">Simple Process</span>
                    </div>
                    
                    <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme ? "text-[#3E3F29]" : "text-white"}`}>
                        How It Works
                    </h2>
                    
                    <p className={`text-lg ${theme ? "text-gray-600" : "text-gray-400"} max-w-2xl mx-auto`}>
                        Getting started is easy. TradeNest is designed to help you connect and scale without complexity.
                    </p>
                </div>

                {/* Steps Container */}
                <div className="relative">
                    {/* Connection Line - Hidden on mobile */}
                    <div className={`hidden lg:block absolute top-24 left-0 right-0 h-1 ${theme ? 'bg-gradient-to-r from-[#6F0E18] via-[#3E3F29] to-[#BCA88D]' : 'bg-gradient-to-r from-[#BCA88D] via-[#7D8D86] to-[#7D8D86]'} opacity-20`}></div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
                        {steps.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className="relative group"
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    {/* Card */}
                                    <div className={`relative ${theme ? 'bg-white' : 'bg-[#343434]'} rounded-2xl p-8 shadow-xl border ${theme ? 'border-gray-200' : 'bg-[#292525]'} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full`}>
                                        {/* Step Number Badge */}
                                        <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                                            <span className="text-white font-bold text-xl">{item.step}</span>
                                        </div>

                                        {/* Icon Container */}
                                        <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="text-4xl text-white" />
                                        </div>

                                        {/* Content */}
                                        <h3 className={`text-2xl font-bold mb-4 ${theme ? 'text-[#3E3F29]' : 'text-white'}`}>
                                            {item.title}
                                        </h3>

                                        <p className={`${theme ? "text-gray-600" : "text-gray-400"} mb-6 leading-relaxed`}>
                                            {item.description}
                                        </p>

                                        {/* Features List */}
                                        <div className="space-y-3">
                                            {item.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-3">
                                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${item.color}`}></div>
                                                    <span className={`text-sm font-medium ${theme ? 'text-gray-700' : 'text-gray-300'}`}>
                                                        {feature}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Hover Border Effect */}
                                        <div className={`absolute inset-0 rounded-2xl border-2 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}></div>
                                    </div>

                                    {/* Arrow - Hidden on mobile and last item */}
                                    {index < steps.length - 1 && (
                                        <div className="hidden lg:flex absolute top-20 -right-4 z-10">
                                            <div className={`w-8 h-8 rounded-full ${theme ? 'bg-white' : 'bg-gray-800'} border-2 ${theme ? 'border-gray-200' : 'border-gray-700'} flex items-center justify-center shadow-lg`}>
                                                <FaArrowRight className={`text-sm ${theme ? 'text-[#7D8D86]' : 'text-[#BCA88D]'}`} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Works;