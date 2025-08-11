import React from 'react';
import useAuth from '../../CustomHooks/UseAuth';

const Works = () => {

    const {theme} = useAuth();

    return (
        <section className="pt-16 px-4 md:px-10 lg:px-20">
            <div className="text-center">
                <h2 className={`text-3xl md:text-4xl font-bold ${theme? "text-[#3E3F29]" : "text-[#BCA88D]"} mb-6`}>How It Works</h2>
                <p className={`${theme ? "text-gray-600" : "text-gray-300"} max-w-2xl mx-auto mb-12`}>
                    Getting started is easy. Trade Nest is designed to help you connect and scale without complexity.
                </p>
                <div className="flex flex-col md:flex-row justify-center items-start gap-8 text-left">
                    <div className={`${theme ? "bg-[#f9f4f4]" : "bg-[#343434]"} p-6 rounded shadow hover:shadow-md flex-1`}>
                        <h3 className="text-xl font-semibold text-[#7D8D86] mb-2">1. Create Your Account</h3>
                        <p className={`${theme ? "text-gray-600" : "text-gray-300"}`}>Sign up as a buyer or supplier and set up your business profile.</p>
                    </div>
                    <div className={`${theme ? "bg-[#f9f4f4]" : "bg-[#343434]"} p-6 rounded shadow hover:shadow-md flex-1`}>
                        <h3 className="text-xl font-semibold text-[#7D8D86] mb-2">2. Explore & Connect</h3>
                        <p className={`${theme ? "text-gray-600" : "text-gray-300"}`}>Browse thousands of products and connect directly with verified vendors.</p>
                    </div>
                    <div className={`${theme ? "bg-[#f9f4f4]" : "bg-[#343434]"} p-6 rounded shadow hover:shadow-md flex-1`}>
                        <h3 className="text-xl font-semibold text-[#7D8D86] mb-2">3. Trade With Confidence</h3>
                        <p className={`${theme ? "text-gray-600" : "text-gray-300"}`}>Place bulk orders, make secure payments, and track everything in real-time.</p>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Works;