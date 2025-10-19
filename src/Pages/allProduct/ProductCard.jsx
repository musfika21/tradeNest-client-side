import React from 'react';
import { FaArrowRight, FaStar, FaHeart } from "react-icons/fa";
import { Link } from 'react-router';
import useAuth from '../../CustomHooks/UseAuth';
import CommonButton from '../../Shared/CommonButton';

const ProductCard = ({ product }) => {
    const { theme } = useAuth();
    const { _id, photo, name, category, brand, price, rating, description } = product;

    return (
        <Link to={`/product-Details/${_id}`}>
            <div className={`group relative rounded-2xl overflow-hidden ${
                theme 
                ? "bg-gradient-to-br from-white to-gray-50 border border-gray-200" 
                : "bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border border-gray-700"
            } hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm`}>
                
                {/* Image Container with Glassmorphism Effect */}
                <div className="relative overflow-hidden h-48 sm:h-52">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <img
                        src={photo}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700 ease-out"
                    />
                    
                    {/* Floating Category Badge */}
                    {category && (
                        <div className="absolute top-3 left-3 z-20">
                            <span className={`px-3 py-1.5 text-xs font-bold rounded-full backdrop-blur-md ${
                                theme 
                                ? 'bg-white/90 text-[#3E3F29] shadow-lg' 
                                : 'bg-[#BCA88D]/90 text-gray-900 shadow-lg'
                            } border ${theme ? 'border-white/50' : 'border-[#BCA88D]/30'}`}>
                                {category}
                            </span>
                        </div>
                    )}

                    {/* Wishlist Button */}
                    <button className={`absolute top-3 right-3 z-20 p-2.5 rounded-full backdrop-blur-md ${
                        theme ? 'bg-white/90 hover:bg-red-500' : 'bg-gray-800/90 hover:bg-red-500'
                    } transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg`}>
                        <FaHeart className="text-sm text-gray-400 hover:text-white transition-colors" />
                    </button>

                    {/* Quick View Button - Appears on Hover */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <CommonButton className="flex items-center gap-2 shadow-2xl backdrop-blur-md">
                            Quick View
                            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                        </CommonButton>
                    </div>

                    {/* Animated Corner Accent */}
                    <div className={`absolute bottom-0 right-0 w-20 h-20 ${
                        theme ? 'bg-[#3E3F29]' : 'bg-[#BCA88D]'
                    } opacity-10 rounded-tl-full transform translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500`}></div>
                </div>

                {/* Content Section with Modern Layout */}
                <div className="p-4 space-y-3 relative">
                    {/* Brand Tag */}
                    {brand && (
                        <div className="flex items-center gap-2">
                            <div className={`h-1 w-8 rounded-full ${theme ? 'bg-[#3E3F29]' : 'bg-[#BCA88D]'}`}></div>
                            <span className={`text-xs font-semibold uppercase tracking-wider ${
                                theme ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                                {brand}
                            </span>
                        </div>
                    )}

                    {/* Product Name */}
                    <h3 className={`font-bold text-sm line-clamp-2 min-h-[40px] leading-snug ${
                        theme ? 'text-[#3E3F29]' : 'text-white'
                    } group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${
                        theme ? 'group-hover:from-[#3E3F29] group-hover:to-[#5a6040]' : 'group-hover:from-[#BCA88D] group-hover:to-[#d4c4a8]'
                    } transition-all duration-300`}>
                        {name}
                    </h3>

                    {/* Description */}
                    {description && (
                        <p className={`text-xs line-clamp-2 ${
                            theme ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                            {description}
                        </p>
                    )}

                    {/* Divider Line with Gradient */}
                    <div className={`h-px bg-gradient-to-r ${
                        theme 
                        ? 'from-transparent via-gray-300 to-transparent' 
                        : 'from-transparent via-gray-700 to-transparent'
                    }`}></div>

                    {/* Rating & Price Section - Modern Grid */}
                    <div className="flex items-center justify-between pt-2">
                        {/* Rating with Animation */}
                        {rating && (
                            <div className="flex items-center gap-1.5 group/rating">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar 
                                            key={i}
                                            className={`text-xs transition-all duration-200 ${
                                                i < Math.floor(rating) 
                                                ? 'text-yellow-400 group-hover/rating:scale-110' 
                                                : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className={`text-xs font-bold ${
                                    theme ? 'text-gray-700' : 'text-gray-300'
                                }`}>
                                    {rating}
                                </span>
                            </div>
                        )}

                        {/* Price with Modern Styling */}
                        {price && (
                            <div className="flex items-baseline gap-1">
                                <span className={`text-xs font-medium ${
                                    theme ? 'text-gray-500' : 'text-gray-400'
                                }`}>
                                    $
                                </span>
                                <span className={`text-xl font-black tracking-tight ${
                                    theme ? 'text-[#3E3F29]' : 'text-[#BCA88D]'
                                } group-hover:scale-110 transition-transform duration-300 inline-block`}>
                                    {price}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Animated Border Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                    style={{
                        boxShadow: theme 
                            ? '0 0 20px rgba(62, 63, 41, 0.3), inset 0 0 20px rgba(62, 63, 41, 0.1)' 
                            : '0 0 20px rgba(188, 168, 141, 0.3), inset 0 0 20px rgba(188, 168, 141, 0.1)'
                    }}>
                </div>

                {/* Corner Decorative Elements */}
                <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden pointer-events-none">
                    <div className={`absolute -top-8 -left-8 w-16 h-16 rounded-full ${
                        theme ? 'bg-[#3E3F29]' : 'bg-[#BCA88D]'
                    } opacity-5 group-hover:scale-150 transition-transform duration-700`}></div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;