import React from 'react';

const Choose = () => {
    return (
        <section className="bg-white py-16 px-4 md:px-10 lg:px-20">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#460911ca] mb-6">Why Choose Trade Nest?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                    Trade Nest is built for wholesalers, suppliers, and retailers who want a smarter way to connect and trade. We simplify B2B commerce with powerful tools and a trusted network.
                </p>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-left">
                    <div className="bg-[#f9f4f4] p-6 rounded-lg shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-[#9b111f] mb-2">Verified Suppliers</h3>
                        <p className="text-gray-600">Only vetted and trusted suppliers to ensure secure, reliable transactions.</p>
                    </div>
                    <div className="bg-[#f9f4f4] p-6 rounded-lg shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-[#9b111f] mb-2">Bulk Order Discounts</h3>
                        <p className="text-gray-600">Save more when you buy more—optimized for wholesale pricing structures.</p>
                    </div>
                    <div className="bg-[#f9f4f4] p-6 rounded-lg shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-[#9b111f] mb-2">Smart Dashboard</h3>
                        <p className="text-gray-600">Manage orders, track performance, and grow your business from one place.</p>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Choose;