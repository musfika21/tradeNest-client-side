import React from 'react';
import { FaArrowRight, FaStar } from "react-icons/fa";
import { Link } from 'react-router';
import useAuth from '../../CustomHooks/UseAuth';
import CommonButton from '../../Shared/CommonButton';

const ProductCard = ({ product }) => {
    const { theme } = useAuth();
    const { _id, photo, name, category, brand, price, rating, description } = product;

    return (
        <Link to={`/product-Details/${_id}`}>
            <div className={`group relative rounded-xl overflow-hidden ${theme ? "bg-white border border-gray-200" : "bg-[#343434] border-gray-700"} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                {/* Image Container - Smaller */}
                <div className="relative overflow-hidden h-32 sm:h-36 bg-gray-100">
                    <img
                        src={photo}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                        <CommonButton className="flex items-center gap-1.5">
                            View
                            <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                        </CommonButton>
                    </div>

                    {/* Category Badge - Smaller */}
                    {category && (
                        <div className="absolute top-2 left-2">
                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${theme ? 'bg-[#3E3F29] text-white' : 'bg-[#BCA88D] text-gray-900'}`}>
                                {category}
                            </span>
                        </div>
                    )}
                </div>

                {/* Content - Compact */}
                <div className="p-3 space-y-2">
                    {/* Product Name - Smaller */}
                    <h3 className={`font-bold text-xs line-clamp-2 min-h-[32px] leading-tight ${theme ? 'text-[#3E3F29]' : 'text-white'}`}>
                        {name}
                    </h3>

                    {/* Brand - Smaller */}
                    {brand && (
                        <p className={`text-[10px] ${theme ? 'text-gray-600' : 'text-gray-400'}`}>
                            <span className="font-semibold">{brand}</span>
                            <p>{description}</p>
                        </p>
                    )}

                    {/* Rating & Price Row - Compact */}
                    <div className="flex items-center justify-between pt-1.5 border-t ${theme ? 'border-gray-200' : 'border-gray-700'}">
                        {/* Rating */}
                        {rating && (
                            <div className="flex items-center gap-1">
                                <FaStar className="text-yellow-400 text-[10px]" />
                                <span className={`text-[10px] font-semibold ${theme ? 'text-gray-700' : 'text-gray-300'}`}>
                                    {rating}
                                </span>
                            </div>
                        )}

                        {/* Price */}
                        {price && (
                            <p className={`text-sm font-bold ${theme ? 'text-[#3E3F29]' : 'text-[#BCA88D]'}`}>
                                ${price}
                            </p>
                        )}
                    </div>
                </div>

                {/* Hover Border Effect */}
                <div className={`absolute inset-0 rounded-xl border-2 ${theme ? 'border-[#3E3F29]' : 'border-[#BCA88D]'} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
            </div>
        </Link>
    );
};

export default ProductCard;