import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import Modal from 'react-modal';
import axios from 'axios';
import useAuth from '../../CustomHooks/UseAuth';
import { toast } from 'react-toastify';
import { LuMessageSquareWarning } from "react-icons/lu";
import { Button } from '@material-tailwind/react';
import Swal from 'sweetalert2';

Modal.setAppElement('#root');

const Details = () => {
    const product = useLoaderData();
    const { _id, name, photo, main_quantity, minimum_selling_quantity, brand, price, category, description, rating } = product;
    const navigate = useNavigate();
    const { user } = useAuth();

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

        // posting the purchase product in the database
        axios.post(`${import.meta.env.VITE_SERVER_API}/purchase`, purchaseProduct)
            .then(data => {
                if (data.data.insertedId) {
                    console.log(buyQuantity)
                    axios.patch(`${import.meta.env.VITE_SERVER_API}/products/${_id}`, { buyQuantity: -buyQuantity })
                        .then((data) => {
                            console.log(data.data)
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
                console.error("Error:", error);
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
        <div className='bg-[#fef1f1]'>
            <div className="lg:w-5xl xl:w-6xl mx-auto py-10 px-4 border-2 border-gray-100">
                <div className="flex flex-col md:flex-row gap-4 items-center p-5 bg-white rounded-md shadow-lg overflow-hidden">
                    <div className='flex-1'>
                        <img src={photo} alt={name} className="xl:w-full xl:h-full object-cover" />
                    </div>
                    <div className="lg:p-6 flex-1">
                        <h2 className="md:text-xl lg:text-2xl xl:text-3xl font-bold mb-7">{name}</h2>
                        <div className='flex justify-between'>
                            <div>
                                <p className="text-xs md:text-sm lg:text-base mb-2 font-medium">Brand:</p>
                                <p className="text-xs md:text-sm lg:text-base mb-2 font-medium">Category:</p>
                                <p className="text-xs md:text-sm lg:text-base mb-2 font-medium">Rating:</p>
                                <p className="text-xs md:text-sm lg:text-base mb-2 font-medium">Price:</p>
                                <p className="text-xs md:text-sm lg:text-base mb-2 font-medium">Available Quantity:</p>
                                <p className="text-xs md:text-sm lg:text-base mb-2 font-medium">Minimum Selling Quantity:</p>
                            </div>
                            <div className='lg:mr-5'>
                                <p className="text-xs md:text-sm lg:text-base mb-2 font-bold">{brand}</p>
                                <p className="text-xs md:text-sm lg:text-base mb-2 font-bold">{category}</p>
                                <p className="text-xs md:text-sm lg:text-base mb-2 font-bold">{rating}</p>
                                <p className="text-xs md:text-sm lg:text-base mb-2 font-bold">{price}</p>
                                <p className="text-xs md:text-sm lg:text-base mb-2 font-bold">{main_quantity}</p>
                                <p className="text-xs md:text-sm lg:text-base mb-4 font-bold">{minimum_selling_quantity}</p>
                            </div>
                        </div>
                        <div className='border border-gray-200'></div>
                        <p className="text-xs md:text-sm lg:text-base mt-4">{description}</p>
                        <div className="mt-4 flex justify-end text-white">
                            <Button
                                onClick={() => setModalIsOpen(true)}
                                className="bg-[#6F0E18] hover:bg-[#8a0a19] py-3 px-4 rounded-sm font-medium flex items-center gap-3 text-center cursor-pointer">Add to Cart</Button>
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Buy Product"
                    className="bg-white w-[90%] max-w-2xl mx-auto rounded-xl p-8 shadow-2xl outline-none relative"
                    overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                >
                    {/* Modal Header */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                        <p className="text-sm text-gray-600 mt-1">Confirm your purchase below</p>
                    </div>

                    {/* User Info */}
                    <div className="space-y-2 mb-6 ">
                        <p className="font-medium">Name: <span className="text-gray-800">{user?.displayName || "N/A"}</span></p>
                        <p className="font-medium">Email: <span className="text-gray-800">{user?.email || "N/A"}</span></p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between w-4/5 mx-auto mb-6 border-t border-b py-1 border-gray-400">
                        <button
                            onClick={() => {
                                if (buyQuantity <= minimum_selling_quantity) {
                                    toast.error(`Cannot buy less than ${minimum_selling_quantity} units!`);
                                } else {
                                    setBuyQuantity((prev) => prev - 1);
                                }
                            }}
                            className="text-lg font-bold px-4 py-2 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-l"
                        >
                            -
                        </button>
                        <span className="text-lg font-semibold px-6">{buyQuantity}</span>
                        <button
                            onClick={() => setBuyQuantity((prev) => Math.min(prev + 1, main_quantity))}
                            className="text-lg font-bold px-4 py-2 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-r"
                        >
                            +
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between space-x-4">
                        <button
                            disabled={buyQuantity < minimum_selling_quantity || buyQuantity > main_quantity}
                            onClick={handleAddCart}
                            className={`px-5 py-2 rounded-md transition ${buyQuantity < minimum_selling_quantity || buyQuantity > main_quantity
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#6F0E18] hover:bg-[#590b14] text-white cursor-pointer"
                                }`}
                        >
                            Confirm Purchase
                        </button>
                        <button
                            onClick={() => setModalIsOpen(false)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-md transition cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                    <p className='flex gap-2 items-center text-xs mt-5 text-orange-300'><LuMessageSquareWarning />You can not buy less then minimum buying quantity of a product</p>
                </Modal>

            </div>
        </div>
    );
}
export default Details;