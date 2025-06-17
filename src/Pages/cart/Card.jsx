import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

const Card = ({ product }) => {
    const { _id, name, photo, purchasedProduct, purchaseAmount, brand, price, category, description, rating } = product;

    const handleCancel = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_SERVER_API}/purchase/${_id}`);

            const patchRes = await axios.patch(`${import.meta.env.VITE_SERVER_API}/products/${purchasedProduct}`, {
                buyQuantity: Number(purchaseAmount),
            });

            console.log('PATCH result:', patchRes.data);

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Product canceled successfully',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Failed to cancel product',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };


    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 max-w-sm mx-auto overflow-hidden border border-gray-200 ">
            {/* Image */}
            <div className="w-full h-56 flex items-center justify-center overflow-hidden">
                <img
                    src={photo}
                    alt={name}
                    className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/300')}
                />
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Product Name */}
                <h2 className="text-xl font-bold text-gray-800  truncate">{name}</h2>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {description || 'No description available.'}
                </p>

                {/* Details */}
                <div className="mt-3 text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium text-gray-800 ">Brand:</span> {brand || 'Unknown'}</p>
                    <p><span className="font-medium text-gray-800 ">Category:</span> {category || 'N/A'}</p>
                    <p><span className="font-medium text-gray-800 ">Purchased Quantity:</span> {purchaseAmount || 0}</p>
                </div>

                {/* Price and Action */}
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">${price}</span>
                </div>

                {/* Delete Button */}
                <div className="mt-5">
                    <button
                        onClick={handleCancel}
                        className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-200">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
