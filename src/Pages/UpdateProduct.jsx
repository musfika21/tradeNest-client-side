import React from 'react';
import Swal from 'sweetalert2';
import { useLoaderData, useNavigate } from 'react-router';
import axios from 'axios';

const UpdateProduct = () => {
    const product = useLoaderData();
    const navigate = useNavigate();
    const { _id, photo, name, brand, category, price, minimum_selling_quantity, main_quantity, description, rating } = product;

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newProduct = Object.fromEntries(formData);
        const main_quantity = parseInt(e.target.main_quantity.value);
        const minimum_selling_quantity = parseInt(e.target.minimum_selling_quantity.value);
        const price = parseInt(e.target.price.value);
        const rating = parseFloat(e.target.rating.value);


        // update product object
        const updateProduct = { ...newProduct, main_quantity, minimum_selling_quantity, price, rating };

        axios.
            put(`${import.meta.env.VITE_SERVER_API}/products/${_id}`, updateProduct)
            .then((data) => {
                if (data.data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Product Added Successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/");
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Failed to add Product",
                        showConfirmButton: false,
                        timer: 1500,
                    });
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
    };

    return (
        <div className="bg-[#fef1f1] py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">🛠️ Update Product</h2>

                <form onSubmit={handleUpdateProduct} className="space-y-6">

                    {/* Product Image */}
                    <div>
                        <label className="block mb-1 font-medium">Product Image URL</label>
                        <input
                            type="text"
                            name="photo"
                            defaultValue={photo}
                            className="w-full px-3 py-1.5 md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                        />
                    </div>

                    {/* Product Name */}
                    <div>
                        <label className="block mb-1 font-medium">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={name}
                            className="w-full px-3 py-1.5 md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                        />
                    </div>

                    {/* Brand Name */}
                    <div>
                        <label className="block mb-1 font-medium">Brand Name</label>
                        <input
                            type="text"
                            name="brand"
                            defaultValue={brand}
                            className="w-full px-3 py-1.5 md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block mb-1 font-medium">Category</label>
                        <select
                            name="category"
                            defaultValue={category}
                            className="w-full px-3 py-1.5 md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                        >
                            <option value="">Select Category</option>
                            <option value="Home & Kitchen Appliances">Home & Kitchen Appliances</option>
                            <option value="Fashion & Apparel">Fashion & Apparel</option>
                            <option value="Industrial Machinery & Tools">Industrial Machinery & Tools</option>
                            <option value="Health & Beauty">Health & Beauty</option>
                            <option value="Automotive Parts & Accessories">Automotive Parts & Accessories</option>
                            <option value="Office Supplies & Stationery">Office Supplies & Stationery</option>
                        </select>
                    </div>

                    {/* Main & Min Quantity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium">Main Quantity</label>
                            <input
                                type="number"
                                name="main_quantity"
                                defaultValue={main_quantity}
                                className="w-full px-3 py-1.5 md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Minimum Selling Quantity</label>
                            <input
                                type="number"
                                name="minimum_selling_quantity"
                                defaultValue={minimum_selling_quantity}
                                className="w-full px-3 py-1.5 md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Price and Rating */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium">Price (USD)</label>
                            <input
                                type="number"
                                name="price"
                                defaultValue={price}
                                className="w-full px-3 py-1.5 md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Rating (1-5)</label>
                            <input
                                type="number"
                                name="rating"
                                min="0"
                                max="5"
                                step="0.1"
                                defaultValue={rating}
                                className="w-full px-3 py-1.5 md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1 font-medium">Product Description</label>
                        <textarea
                            name="description"
                            defaultValue={description}
                            rows="3"
                            className="w-full px-3 py-1.5 md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <input
                        type="submit"
                        value="Update Product"
                        className="w-full mt-4 py-3 rounded-lg font-semibold text-white bg-[#6F0E18] hover:bg-[#8a0a19] cursor-pointer transition"
                    />
                </form>

                {/* Static Info */}
                <div className="mt-8 text-sm text-gray-700">
                    <h3 className="font-semibold mb-1">Product Content</h3>
                    <p>
                        Updating your product ensures accurate information is displayed to buyers. Use clear titles, up-to-date quantities, and honest ratings to maintain trust.
                    </p>
                </div>
            </div>
        </div>

    );
};

export default UpdateProduct;
