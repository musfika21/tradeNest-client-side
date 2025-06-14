import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import Modal from 'react-modal';
import axios from 'axios';
import useAuth from '../../CustomHooks/UseAuth';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const Details = () => {
    const product = useLoaderData();
    const { _id, name, photo, main_quantity, minimum_selling_quantity, brand, price, category, description, rating } = product;
    const navigate = useNavigate();
    const { user } = useAuth();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [buyQuantity, setBuyQuantity] = useState(product.minimum_selling_quantity);

    const handleBuy = async () => {
        if (buyQuantity < product.minimum_selling_quantity) {
            toast.error(`Minimum selling quantity is ${product.minimum_selling_quantity}`);
            return;
        }

        try {
            const res = await axios.patch(`/products/${product._id}`, {
                $inc: { main_quantity: -buyQuantity }
            });

            toast.success('Purchase successful!');
            setModalIsOpen(false);
            navigate('/');
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong.');
        }
    };

    return (
        <div className='bg-[#fef1f1]'>
            <div className="lg:w-5xl xl:w-6xl mx-auto py-10 px-4 border-2 border-gray-100">
                <div className="flex flex-col md:flex-row gap-4 items-center p-5 bg-white rounded-md shadow-lg overflow-hidden">
                    <div className='flex-1'>
                        <img src={product.photo} alt={product.name} className="xl:w-full xl:h-full object-cover" />
                    </div>
                    <div className="lg:p-6 flex-1">
                        <h2 className="md:text-xl lg:text-2xl xl:text-3xl font-bold mb-7">{product.name}</h2>
                        <div className='flex justify-between'>
                            <div>
                                <p className="text-xs md:text-sm lg:text-base mb-2 font-medium">Brand:</p>
                                <p className="text-xs md:text-sm lg:text-base mb-2 font-medium">Category:</p>
                                <p className="text-xs md:text-sm lg:text-base mb-2 font-medium">Rating:</p>
                                <p className="text-xs md:text-sm lg:text-base mb-2 font-medium">Available Quantity:</p>
                                <p className="text-xs md:text-sm lg:text-base mb-4 font-medium">Minimum Selling Quantity:</p>
                            </div>
                            <div className='lg:mr-5'>
                                <p className="text-xs md:text-sm lg:text-base mb-2 font-bold">{product.brand}</p>
                                <p className="text-xs md:text-sm lg:text-base mb-2 font-bold">{product.category}</p>
                                <p className="text-xs md:text-sm lg:text-base mb-2 font-bold">{product.rating}</p>
                                <p className="text-xs md:text-sm lg:text-base mb-2 font-bold">{product.main_quantity}</p>
                                <p className="text-xs md:text-sm lg:text-base mb-4 font-bold">{product.minimum_selling_quantity}</p>
                            </div>
                        </div>
                        <div className='border border-gray-200'></div>
                        <p className="text-xs md:text-sm lg:text-base mt-4">{product.description}</p>
                        <button
                            onClick={() => setModalIsOpen(true)}
                            className="mt-6 bg-[#6F0E18] hover:bg-[#8a0a19] text-white text-xs sm:text-sm py-1 px-4 rounded-sm font-medium text-center cursor-pointer"
                        >
                            Buy
                        </button>
                    </div>
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Buy Product"
                    className="bg-white p-6 max-w-md mx-auto mt-20 rounded-lg shadow-xl outline-none"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                >
                    <h2 className="text-xl font-bold mb-4">Checkout</h2>
                    <p className="mb-2">Name: {user?.displayName}</p>
                    <p className="mb-2">Email: {user?.email}</p>

                    <div className="flex items-center mb-4">
                        <button
                            onClick={() => setBuyQuantity(prev => Math.max(prev - 1, 1))}
                            className="px-3 py-1 bg-gray-200 rounded-l"
                        >-</button>
                        <span className="px-4 py-1 border-t border-b">{buyQuantity}</span>
                        <button
                            onClick={() => setBuyQuantity(prev => prev + 1)}
                            className="px-3 py-1 bg-gray-200 rounded-r"
                        >+</button>
                    </div>

                    <button
                        onClick={handleBuy}
                        className="bg-[#6F0E18] hover:bg-[#590b14] text-white px-4 py-2 rounded"
                    >
                        Confirm Purchase
                    </button>
                </Modal>
            </div>
        </div>
    );
};

export default Details;
