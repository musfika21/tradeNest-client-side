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
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 max-w-sm mx-auto overflow-hidden">
            <img
                src={photo}
                alt={name}
                className="w-full h-56 object-cover"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/300')}
            />
            <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 truncate">{name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{description || 'No description available.'}</p>

                <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    <p><span className="font-medium">Brand:</span> {brand || 'Unknown'}</p>
                    <p><span className="font-medium">Category:</span> {category || 'N/A'}</p>
                    <p><span className="font-medium">Purchased Qty:</span> {purchaseAmount || 0}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">

                    <span className="text-lg font-bold text-green-600">${price}</span>
                </div>

                <div className="mt-5">
                    <button
                        onClick={handleCancel}
                        className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
