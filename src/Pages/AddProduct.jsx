import React from "react";
import CustomizedButton from "../Shared/CustomizedButton";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../CustomHooks/UseAuth";

const AddProduct = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAddProduct = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newProduct = Object.fromEntries(formData);
        const main_quantity = parseInt(e.target.main_quantity.value);
        const minimum_selling_quantity = parseInt(e.target.minimum_selling_quantity.value);
        const price = parseInt(e.target.price.value);

        // Sending email in the database
        const productWithEmail = {
            ...newProduct, main_quantity, minimum_selling_quantity, price,
            email: user?.email || "unknown@domain.com",
        };

        axios
            .post(`${import.meta.env.VITE_SERVER_API}/products`, productWithEmail)
            .then((data) => {
                if (data.data.insertedId) {
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
                <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

                <form onSubmit={handleAddProduct} className="space-y-6">
                    {/* Product Image */}
                    <div>
                        <label className="block mb-1 font-medium">Product Image URL</label>
                        <input
                            type="url"
                            name="photo"
                            required
                            className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                        />
                    </div>

                    {/* Product Name */}
                    <div>
                        <label className="block mb-1 font-medium">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                        />
                    </div>

                    {/* Main and Min Quantity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium">Main Quantity</label>
                            <input
                                type="number"
                                name="main_quantity"
                                required
                                className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Minimum Selling Quantity
                            </label>
                            <input
                                type="number"
                                name="minimum_selling_quantity"
                                required
                                className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Brand Name */}
                    <div>
                        <label className="block mb-1 font-medium">Brand Name</label>
                        <input
                            type="text"
                            name="brand"
                            required
                            className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block mb-1 font-medium">Category</label>
                        <select
                            name="category"
                            required
                            className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                        >
                            <option value="">Select Category</option>
                            <option value="Electronics_and_Gadgets">
                                Electronics & Gadgets
                            </option>
                            <option value="Home_and_Kitchen_Appliances">
                                Home & Kitchen Appliances
                            </option>
                            <option value="Fashion_Apparel">Fashion & Apparel</option>
                            <option value="Industrial_Machinery_and_Tools">
                                Industrial Machinery & Tools
                            </option>
                            <option value="Health & Beauty">Health & Beauty</option>
                            <option value="Automotive_Parts_and_Accessories">
                                Automotive Parts & Accessories
                            </option>
                            <option value="Office_Supplies_and_Stationery">
                                Office Supplies & Stationery
                            </option>
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1 font-medium">Short Description</label>
                        <textarea
                            name="description"
                            required
                            className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Price and Rating */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium">Price (per unit)</label>
                            <input
                                type="text"
                                name="price"
                                required
                                className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Rating (1-5)</label>
                            <input
                                type="text"
                                name="rating"
                                min="1"
                                max="5"
                                required
                                className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <CustomizedButton
                        text="Add Product"
                        type="submit"
                        className="bg-[#6F0E18] text-white px-4 py-2 rounded hover:bg-[#8a0a19]"
                    />
                </form>

                {/* Static Info */}
                <div className="mt-8 text-sm text-gray-700">
                    <h3 className="font-semibold mb-1">Product Content</h3>
                    <p>
                        Adding a product to our wholesale marketplace ensures it reaches a
                        network of trusted buyers looking for bulk deals. Be clear and
                        concise with your descriptions and use quality images to boost your
                        sales potential.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
