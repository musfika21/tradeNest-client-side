import React from "react";
import CustomizedButton from "../Shared/CustomizedButton";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../CustomHooks/UseAuth";

const categories = [
    {
        name: "Electronics & Gadgets",
        slug: 'electronics_&_gadgets',
    },
    {
        name: "Home & Kitchen Appliances",
        slug: 'home_&_kitchen_appliances',
    },
    {
        name: "Fashion & Apparel",
        slug: 'fashion_&_apparel',

    },
    {
        name: "Industrial Machinery & Tools",
        slug: 'industrial_machinery_&_tools',

    },
    {
        name: "Health & Beauty",
        slug: 'health_&_beauty',
    },
    {
        name: "Automotive Parts & Accessories",
        slug: 'automotive_parts_&_accessories',
    },
    {
        name: "Office Supplies & Stationery",
        slug: 'office_supplies_&_stationery',
    },
    {
        name: "Sports & Outdoor Equipment",
        slug: 'sports_&_outdoor_equipment',
    },
    {
        name: "Toys, Games & Hobbies",
        slug: 'toys_&_games_&_hobbies',
    },
    {
        name: "Food & Beverages",
        slug: 'food_&_beverages',
    },
    {
        name: "Construction Materials & Hardware",
        slug: 'construction_materials_&_hardware',
    },
    {
        name: "Agriculture & Farming Supplies",
        slug: 'agriculture_&_farming_supplies',
    },
    {
        name: "Pet Supplies & Accessories",
        slug: 'pet_supplies_&_accessories',
    },
    {
        name: "Medical Supplies & Equipment",
        slug: 'medical_supplies_&_equipment',
    },
    {
        name: "Art, Crafts & DIY Materials",
        slug: 'art_&_crafts_&_diy_materials',
    },
    {
        name: "Travel & Luggage",
        slug: 'travel_&_luggage',
    }

];

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
        const rating = parseFloat(e.target.rating.value);
        const category = categories.find(category => category.slug === e.target.category_slug.value).name;

        // Sending email in the database
        const productWithEmail = {
            ...newProduct, main_quantity, minimum_selling_quantity, price, rating,
            email: user?.email || "unknown@domain.com", category: category
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
        <div className="py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-xl shadow-md">
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
                            name="category_slug"
                            required
                            className="w-full px-3 py-1.5  md:px-4 md:py-3 rounded-md bg-white/20 border border-[#8a0a196f] focus:border-[#6F0E18] focus:outline-none"
                        >
                            <option value="">Select Category</option>
                            {
                                categories.map((category) => (
                                    <option key={category.slug} value={category.slug}>
                                        {category.name}
                                    </option>
                                ))
                            }

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
