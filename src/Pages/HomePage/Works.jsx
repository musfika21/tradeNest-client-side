import React from 'react';

const Works = () => {
    return (
        <section className="bg-[#fef1f1] py-16 px-4 md:px-10 lg:px-20">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#460911ca] mb-6">How It Works</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                    Getting started is easy. Trade Nest is designed to help you connect and scale without complexity.
                </p>
                <div className="flex flex-col md:flex-row justify-center items-start gap-8 text-left">
                    <div className="flex-1 bg-white rounded-lg p-6 shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-[#9b111f] mb-2">1. Create Your Account</h3>
                        <p className="text-gray-600">Sign up as a buyer or supplier and set up your business profile.</p>
                    </div>
                    <div className="flex-1 bg-white rounded-lg p-6 shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-[#9b111f] mb-2">2. Explore & Connect</h3>
                        <p className="text-gray-600">Browse thousands of products and connect directly with verified vendors.</p>
                    </div>
                    <div className="flex-1 bg-white rounded-lg p-6 shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-[#9b111f] mb-2">3. Trade With Confidence</h3>
                        <p className="text-gray-600">Place bulk orders, make secure payments, and track everything in real-time.</p>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Works;