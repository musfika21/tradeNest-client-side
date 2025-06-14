import { Button } from '@material-tailwind/react';
import React from 'react';
import { CgNotes } from "react-icons/cg";
import { Link } from 'react-router';

const ProductCard = ({ product }) => {
    const {_id, photo, name, category, rating, brand } = product;

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4">
            {/* Image */}
            <img
                src={photo}
                alt={name}
                className="w-full h-68 object-cover rounded-xl mb-4"
            />

            {/* Product Info */}
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                <p className="text-sm text-gray-600">Category: {category}</p>
                <p className="text-sm text-gray-600">Brand: {brand}</p>
                <p className="text-sm text-yellow-500 font-medium">Rating: ⭐ {rating}/5</p>
            </div>

            {/* Button */}
            <Link to={`/product-Details/${_id}`}>
                <div className="mt-4 flex justify-end text-white">
                    <Button className="bg-[#6F0E18] hover:bg-[#8a0a19] py-3 px-4 rounded-sm font-medium flex items-center gap-3 text-center cursor-pointer"><CgNotes />View Details</Button>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
