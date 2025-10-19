import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import Modal from 'react-modal';
import axios from 'axios';
import useAuth from '../../CustomHooks/UseAuth';
import { toast } from 'react-toastify';
import { LuMessageSquareWarning } from "react-icons/lu";
import { FaStar, FaShoppingCart, FaBox } from "react-icons/fa";
import Swal from 'sweetalert2';
import CommonButton from '../../Shared/CommonButton';

Modal.setAppElement('#root');

const Details = () => {
    const product = useLoaderData();
    const { _id, name, photo, main_quantity, minimum_selling_quantity, brand, price, category, description, rating } = product;
    const navigate = useNavigate();
    const { user, theme } = useAuth();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [buyQuantity, setBuyQuantity] = useState(minimum_selling_quantity);

    const handleAddCart = () => {
        if (buyQuantity < minimum_selling_quantity) {
            toast.error(`Cannot buy less than ${minimum_selling_quantity} units!`);
            return;
        }

        const purchaseProduct = {
            email: user.email,
            purchasedProduct: _id,
            purchaseAmount: buyQuantity,
            name, photo, brand, price, category, description, rating
        };

        axios.post(`${import.meta.env.VITE_SERVER_API}/purchase`, purchaseProduct)
            .then(data => {
                if (data.data.insertedId) {
                    axios.patch(`${import.meta.env.VITE_SERVER_API}/products/${_id}`, { buyQuantity: -buyQuantity })
                        .then((data) => {
                        })
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Product Added Successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/cart");
                }
            })
            .catch((error) => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to add Product",
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    }

    return (
        <div className={`min-h-screen py-12 px-4 ${theme ? 'bg-gray-50' : 'bg-[#1a1a1a]'}`}>
            <div className="max-w-6xl mx-auto">
                <div className={`rounded overflow-hidden shadow-xl ${theme ? 'bg-white' : 'bg-[#2a2a2a]'}`}>
                    <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">

                        {/* Image Section */}
                        <div className="relative group">
                            <div className="relative rounded-xl overflow-hidden">
                                <img
                                    src={photo}
                                    alt={name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={`px-4 py-2 text-xs font-bold rounded-full ${theme ? 'bg-[#3E3F29] text-white' : 'bg-[#BCA88D] text-gray-900'} shadow-lg`}>
                                        {category}
                                    </span>
                                </div>

                                {/* Stock Status Badge */}
                                <div className="absolute top-4 right-4">
                                    <span
                                        className={`px-4 py-2 text-xs font-semibold tracking-wide rounded-full border shadow-sm transition-all duration-300 
                                            ${main_quantity < minimum_selling_quantity
                                                ? 'bg-red-100 border-red-600 text-red-700'
                                                : main_quantity <= 10
                                                    ? 'bg-yellow-100 border-yellow-600 text-yellow-700'
                                                    : 'bg-green-100 border-green-600 text-green-700'
                                            }`}
                                    >
                                        {main_quantity < minimum_selling_quantity
                                            ? 'Not in Stock'
                                            : main_quantity <= 10
                                                ? 'Low Stock'
                                                : 'In Stock'}
                                    </span>
                                </div>

                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="flex flex-col justify-between space-y-6">

                            {/* Brand */}
                            <div>
                                <p className={`text-sm font-semibold uppercase tracking-wider mb-3 ${theme ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {brand}
                                </p>

                                {/* Product Name */}
                                <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme ? 'text-[#3E3F29]' : 'text-white'}`}>
                                    {name}
                                </h1>

                                {/* Rating */}
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`${i < Math.floor(rating) ? 'text-yellow-400' : theme ? 'text-gray-300' : 'text-gray-600'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className={`text-sm font-semibold ${theme ? 'text-gray-700' : 'text-gray-300'}`}>
                                        {rating}
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <p className={`text-4xl font-black ${theme ? 'text-[#3E3F29]' : 'text-[#BCA88D]'}`}>
                                        ${price}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className={`p-5 rounded-xl ${theme ? 'bg-gray-50' : 'bg-[#1f1f1f]'}`}>
                                <p className={`text-sm leading-relaxed ${theme ? 'text-gray-700' : 'text-gray-300'}`}>
                                    {description}
                                </p>
                            </div>

                            {/* Specifications */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className={`p-4 rounded-xl ${theme ? 'bg-gray-50' : 'bg-[#1f1f1f]'}`}>
                                    <p className={`text-xs uppercase tracking-wide mb-2 ${theme ? 'text-gray-500' : 'text-gray-400'}`}>
                                        Available Stock
                                    </p>
                                    <p className={`text-xl font-bold flex items-center gap-2 ${theme ? 'text-[#3E3F29]' : 'text-[#BCA88D]'}`}>
                                        <FaBox />
                                        {main_quantity}
                                    </p>
                                </div>

                                <div className={`p-4 rounded-xl ${theme ? 'bg-gray-50' : 'bg-[#1f1f1f]'}`}>
                                    <p className={`text-xs uppercase tracking-wide mb-2 ${theme ? 'text-gray-500' : 'text-gray-400'}`}>
                                        Min. Order
                                    </p>
                                    <p className={`text-xl font-bold flex items-center gap-2 ${theme ? 'text-[#3E3F29]' : 'text-[#BCA88D]'}`}>
                                        <FaShoppingCart />
                                        {minimum_selling_quantity}
                                    </p>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <CommonButton
                                onClick={() => setModalIsOpen(true)}
                                className="w-full py-4 text-base font-bold"
                            >
                                Add to Cart
                            </CommonButton>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Buy Product"
                    className={`w-[90%] max-w-xl mx-auto rounded-2xl p-8 shadow-2xl outline-none ${theme ? 'bg-white' : 'bg-[#2a2a2a]'}`}
                    overlayClassName="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
                >
                    {/* Modal Header */}
                    <div className="mb-6 text-center">
                        <h2 className={`text-2xl font-bold mb-2 ${theme ? 'text-[#3E3F29]' : 'text-white'}`}>
                            {name}
                        </h2>
                        <p className={`text-sm ${theme ? 'text-gray-600' : 'text-gray-400'}`}>
                            Confirm your purchase
                        </p>
                    </div>

                    {/* User Info */}
                    <div className={`p-5 rounded-xl mb-6 ${theme ? 'bg-gray-50' : 'bg-[#1f1f1f]'}`}>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className={`text-sm ${theme ? 'text-gray-600' : 'text-gray-400'}`}>
                                    Name:
                                </span>
                                <span className={`text-sm font-semibold ${theme ? 'text-[#3E3F29]' : 'text-white'}`}>
                                    {user?.displayName || "N/A"}
                                </span>
                            </div>
                            <div className={`h-px ${theme ? 'bg-gray-200' : 'bg-gray-700'}`}></div>
                            <div className="flex justify-between">
                                <span className={`text-sm ${theme ? 'text-gray-600' : 'text-gray-400'}`}>
                                    Email:
                                </span>
                                <span className={`text-sm font-semibold ${theme ? 'text-[#3E3F29]' : 'text-white'}`}>
                                    {user?.email || "N/A"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="mb-6">
                        <p className={`text-center text-sm font-medium mb-4 ${theme ? 'text-gray-600' : 'text-gray-400'}`}>
                            Quantity
                        </p>
                        <div className={`flex items-center justify-center gap-6 p-5 rounded-xl ${theme ? 'bg-gray-50' : 'bg-[#1f1f1f]'}`}>
                            <button
                                onClick={() => {
                                    if (buyQuantity <= minimum_selling_quantity) {
                                        toast.error(`Cannot buy less than ${minimum_selling_quantity} units!`);
                                    } else {
                                        setBuyQuantity((prev) => prev - 1);
                                    }
                                }}
                                className={`w-10 h-10 rounded-lg font-bold text-lg transition-all ${theme ? 'bg-[#3E3F29] text-white hover:bg-[#2e2f1f]' : 'bg-[#BCA88D] text-gray-900 hover:bg-[#a89779] cursor-pointer'}`}
                            >
                                -
                            </button>

                            <span className={`text-3xl font-bold ${theme ? 'text-[#3E3F29]' : 'text-[#BCA88D]'}`}>
                                {buyQuantity}
                            </span>

                            <button
                                onClick={() => setBuyQuantity((prev) => Math.min(prev + 1, main_quantity))}
                                className={`w-10 h-10 rounded-lg font-bold text-lg transition-all ${theme ? 'bg-[#3E3F29] text-white hover:bg-[#2e2f1f]' : 'bg-[#BCA88D] text-gray-900 hover:bg-[#a89779] cursor-pointer'}`}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Warning Message */}
                    <div className={`flex items-start gap-3 p-4 rounded-xl mb-6 ${theme ? 'bg-gray-100' : 'bg-[#1f1f1f]'}`}>
                        <LuMessageSquareWarning className={`text-lg mt-0.5 ${theme ? 'text-gray-600' : 'text-gray-400'}`} />
                        <p className={`text-xs ${theme ? 'text-gray-700' : 'text-gray-300'}`}>
                            Minimum buying quantity: <span className="font-bold">{minimum_selling_quantity} units</span>
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <CommonButton
                            disabled={buyQuantity < minimum_selling_quantity || buyQuantity > main_quantity}
                            onClick={handleAddCart}
                            className="flex-1 py-3 text-sm font-bold"
                        >
                            Confirm
                        </CommonButton>

                        <button
                            onClick={() => setModalIsOpen(false)}
                            className={`px-6 py-3 rounded-lg text-sm font-bold transition-all ${theme ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' : 'bg-[#1f1f1f] hover:bg-[#252525] text-white cursor-pointer'}`}
                        >
                            Cancel
                        </button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default Details;