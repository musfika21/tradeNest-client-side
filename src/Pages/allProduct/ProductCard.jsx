import React from 'react';
import { CgNotes } from "react-icons/cg";
import { Link } from 'react-router';
import useAuth from '../../CustomHooks/UseAuth';
import CommonButton from '../../Shared/CommonButton';

const ProductCard = ({ product }) => {

    const { theme } = useAuth();
    const { _id, photo, name} = product;

    return (
        <div className={`rounded shadow-md hover:shadow-xl transition duration-300 p-4 ${theme ? "bg-white" : "bg-[#343434]"}`}>
            {/* Image */}
            <div className='flex justify-center'>
                <img
                    src={photo}
                    alt={name}
                    className="w-15 h-15 sm:w-16 sm:h-16 object-cover mb-4 mx-auto"
                />
            </div>

            {/* Product Info */}
            <div className="space-y-2">
                <h2 className={`text-xs  mt-2 font-semibold text-center ${theme? "text-[#3E3F29]" : "text-[#BCA88D]"}`}>{name}</h2>
            </div>

            {/* Button */}
            <div className='flex justify-between'>
                <Link to={`/product-Details/${_id}`}>
                   <p className={`text-xs mt-3 underline`}>See More</p>
                </Link>
                {/* <Link to={`/update-Product/${product._id}`}>
                    <div className='mt-4 flex justify-end '>
                        <CommonButton>
                            Update
                        </CommonButton>
                    </div>
                </Link> */}
            </div>
        </div>
    );
};

export default ProductCard;
