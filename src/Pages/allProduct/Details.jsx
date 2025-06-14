
import Modal from 'react-modal';
Modal.setAppElement('#root');
import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuth from '../../CustomHooks/UseAuth';

const Details = () => {
    const product = useLoaderData();
    console.log(product)
    const { user } = useAuth();

    const [isOpen, setIsOpen] = useState(false);
    const [buyQuantity, setBuyQuantity] = useState(1);

    const {
        _id,
        name,
        brand,
        category,
        photo,
        description,
        rating,
        price,
        main_quantity,
        minimum_selling_quantity,
    } = product;

    const toggleModal = () => setIsOpen(!isOpen);

    const handleQuantity = (type) => {
        setBuyQuantity(prev =>
            type === 'inc' ? prev + 1 : Math.max(1, prev - 1)
        );
    };

    const handleBuy = async () => {
        if (buyQuantity < minimum_selling_quantity) {
            return Swal.fire({
                icon: 'error',
                title: 'Minimum Quantity Required',
                text: `You must buy at least ${minimum_selling_quantity} units.`,
            });
        }

        if (buyQuantity > main_quantity) {
            return Swal.fire({
                icon: 'error',
                title: 'Insufficient Stock',
                text: `Only ${main_quantity} units available.`,
            });
        }

        try {
            await axios.patch(`${import.meta.env.VITE_SERVER_API}/products/${_id}`, {
                quantity: buyQuantity,
            });
            Swal.fire('Success', 'Purchase completed!', 'success');
            toggleModal();
        } catch (err) {
            Swal.fire('Error', 'Purchase failed. Try again.', 'error');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
            <div className="grid md:grid-cols-2 gap-8">
                <img src={photo} alt={name} className="w-full h-auto rounded-lg" />
                <div>
                    <h2 className="text-3xl font-bold">{name}</h2>
                    <p className="text-gray-600 mt-2">{description}</p>
                    <p className="mt-4"><strong>Brand:</strong> {brand}</p>
                    <p><strong>Category:</strong> {category}</p>
                    <p><strong>Rating:</strong> {rating} / 5</p>
                    <p><strong>Price:</strong> ${price}</p>
                    <p><strong>Available Quantity:</strong> {main_quantity}</p>
                    <p><strong>Minimum Purchase:</strong> {minimum_selling_quantity}</p>
                    <button
                        onClick={toggleModal}
                        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Buy Now
                    </button>
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="Buy Product Modal"
                className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg outline-none"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
            >
                <h3 className="text-xl font-bold mb-4">Checkout</h3>

                <div className="mb-4">
                    <label className="font-medium">Name</label>
                    <input
                        type="text"
                        value={user?.displayName || ''}
                        disabled
                        className="w-full border p-2 rounded bg-gray-100"
                    />
                </div>

                <div className="mb-4">
                    <label className="font-medium">Email</label>
                    <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full border p-2 rounded bg-gray-100"
                    />
                </div>

                <div className="mb-4">
                    <label className="font-medium">Quantity</label>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleQuantity('dec')}
                            className="px-3 py-1 bg-red-500 text-white rounded"
                        >
                            -
                        </button>
                        <span className="px-4">{buyQuantity}</span>
                        <button
                            onClick={() => handleQuantity('inc')}
                            className="px-3 py-1 bg-green-500 text-white rounded"
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={toggleModal}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleBuy}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Confirm Purchase
                    </button>
                </div>
            </Modal>

        </div>
    );
};

export default Details;
