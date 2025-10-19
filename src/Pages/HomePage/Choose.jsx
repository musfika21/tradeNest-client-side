import React from 'react';
import { FaShieldAlt, FaPercentage, FaChartLine, FaCheckCircle } from 'react-icons/fa';
import useAuth from '../../CustomHooks/UseAuth';

const features = [
    {
        id: 1,
        icon: FaShieldAlt,
        title: "Verified Suppliers",
        description: "Only vetted and trusted suppliers to ensure secure, reliable transactions.",
        color: "#22c55e",
        gradient: "from-green-400 to-emerald-600"
    },
    {
        id: 2,
        icon: FaPercentage,
        title: "Bulk Order Discounts",
        description: "Save more when you buy more—optimized for wholesale pricing structures.",
        color: "#3b82f6",
        gradient: "from-blue-400 to-indigo-600"
    },
    {
        id: 3,
        icon: FaChartLine,
        title: "Smart Dashboard",
        description: "Manage orders, track performance, and grow your business from one place.",
        color: "#f59e0b",
        gradient: "from-amber-400 to-orange-600"
    }
];

const stats = [
    { value: "500+", label: "Active Suppliers" },
    { value: "10K+", label: "Products Listed" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Support Available" }
];

const Choose = () => {
    const { theme } = useAuth();

    return (
        <section className="pt-20 pb-16 px-4 md:px-10 lg:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className={`h-px w-8 ${theme ? "bg-[#7D8D86]" : "bg-[#BCA88D]"}`}></div>
                        <span className={`text-sm uppercase tracking-wider font-semibold ${theme ? "text-[#7D8D86]" : "text-[#BCA88D]"}`}>
                            Our Advantages
                        </span>
                        <div className={`h-px w-8 ${theme ? "bg-[#7D8D86]" : "bg-[#BCA88D]"}`}></div>
                    </div>

                    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${theme ? "text-[#3E3F29]" : "text-[#BCA88D]"}`}>
                        Why Choose Trade Nest?
                    </h2>

                    <p className={`text-base md:text-lg max-w-3xl mx-auto leading-relaxed ${theme ? "text-gray-600" : "text-gray-400"}`}>
                        Trade Nest is built for wholesalers, suppliers, and retailers who want a smarter way to connect and trade. We simplify B2B commerce with powerful tools and a trusted network.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={feature.id}
                                className={`group relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-3 ${
                                    theme 
                                        ? "bg-white shadow-lg hover:shadow-2xl border border-gray-100" 
                                        : "bg-[#2a2a2a] shadow-xl hover:shadow-2xl border border-[#3a3a3a]"
                                }`}
                                style={{
                                    animationDelay: `${index * 150}ms`,
                                }}
                            >
                                {/* Icon Container with Gradient Background */}
                                <div className="relative mb-6">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl`}></div>
                                    <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feature.gradient} shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                        <IconComponent className="text-white" size={28} />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className={`text-xl md:text-2xl font-bold mb-3 ${theme ? "text-gray-900" : "text-gray-100"}`}>
                                    {feature.title}
                                </h3>

                                <p className={`text-sm md:text-base leading-relaxed ${theme ? "text-gray-600" : "text-gray-400"}`}>
                                    {feature.description}
                                </p>

                                {/* Bottom Accent */}
                                <div className={`absolute bottom-0 left-0 w-full h-1 rounded-b-2xl bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>

                                {/* Corner Decoration */}
                                <div className={`absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                                    <FaCheckCircle className={theme ? "text-green-500" : "text-green-400"} size={20} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Stats Section */}
                <div className={`relative rounded-3xl p-8 md:p-12 overflow-hidden ${
                    theme 
                        ? "bg-gradient-to-br from-[#f9f4f4] to-white shadow-xl border border-gray-100" 
                        : "bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] shadow-2xl border border-[#3a3a3a]"
                }`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle, ${theme ? '#7D8D86' : '#BCA88D'} 1px, transparent 1px)`,
                            backgroundSize: '30px 30px'
                        }}></div>
                    </div>

                    <div className="relative z-10">
                        <h3 className={`text-2xl md:text-3xl font-bold text-center mb-8 ${theme ? "text-[#3E3F29]" : "text-[#BCA88D]"}`}>
                            Trusted by Thousands of Businesses
                        </h3>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div 
                                    key={index} 
                                    className="text-center group"
                                >
                                    <div className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r ${
                                        theme 
                                            ? "from-[#7D8D86] to-[#3E3F29]" 
                                            : "from-[#BCA88D] to-[#7D8D86]"
                                    } bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block`}>
                                        {stat.value}
                                    </div>
                                    <div className={`text-sm md:text-base font-medium ${theme ? "text-gray-600" : "text-gray-400"}`}>
                                        {stat.label}
                                    </div>
                                    {/* Separator Line */}
                                    {index < stats.length - 1 && (
                                        <div className={`hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 ${
                                            theme ? "bg-gray-300" : "bg-gray-700"
                                        }`}></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12">
                    <p className={`text-sm md:text-base ${theme ? "text-gray-500" : "text-gray-400"}`}>
                        Join thousands of satisfied businesses today
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Choose;