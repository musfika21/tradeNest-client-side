import React from 'react';
import useAuth from '../../CustomHooks/UseAuth';

const Choose = () => {

    const {theme} = useAuth();

    return (
        <section className="py-16 px-4 md:px-10 lg:px-20">
            <div className="text-center">
                <h2 className={`text-3xl md:text-4xl font-bold ${theme? "text-[#3E3F29]" : "text-[#BCA88D]"} mb-6`}>Why Choose Trade Nest?</h2>
                <p className={`${theme ? "text-gray-600" : "text-gray-300"} max-w-2xl mx-auto mb-12`}>
                    Trade Nest is built for wholesalers, suppliers, and retailers who want a smarter way to connect and trade. We simplify B2B commerce with powerful tools and a trusted network.
                </p>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-left">
                    <div className={`${theme ? "bg-[#f9f4f4]" : "bg-[#343434]"} p-6 rounded shadow hover:shadow-md`}>
                        <h3 className="text-xl font-semibold text-[#7D8D86] mb-2">Verified Suppliers</h3>
                        <p className={`${theme ? "text-gray-600" : "text-gray-300"}`}>Only vetted and trusted suppliers to ensure secure, reliable transactions.</p>
                    </div>
                    <div className={`${theme ? "bg-[#f9f4f4]" : "bg-[#343434]"} p-6 rounded shadow hover:shadow-md`}>
                        <h3 className="text-xl font-semibold text-[#7D8D86] mb-2">Bulk Order Discounts</h3>
                        <p className={`${theme ? "text-gray-600" : "text-gray-300"}`}>Save more when you buy more—optimized for wholesale pricing structures.</p>
                    </div>
                    <div className={`${theme ? "bg-[#f9f4f4]" : "bg-[#343434]"} p-6 rounded shadow hover:shadow-md`}>
                        <h3 className="text-xl font-semibold text-[#7D8D86] mb-2">Smart Dashboard</h3>
                        <p className={`${theme ? "text-gray-600" : "text-gray-300"}`}>Manage orders, track performance, and grow your business from one place.</p>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Choose;