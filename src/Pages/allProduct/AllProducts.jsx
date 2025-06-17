import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../CustomHooks/UseAuth";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Button } from "@material-tailwind/react";
import { CgNotes } from "react-icons/cg";

const AllProducts = () => {
    const { setLoading } = useAuth();
    const [products, setProducts] = useState([]);
    const [view, setView] = useState("card");

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_SERVER_API}/products`)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("❌ Error fetching products:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-[#fef1f1] min-h-screen">
            <div className="px-4 py-8 max-w-7xl mx-auto">
                {/* Top Bar */}
                <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center w-full sm:w-auto">
                        All Products
                    </h1>

                    {/* Toggle View */}
                    <div className="flex items-center gap-3">
                        <span className="hidden md:inline font-medium text-sm">View:</span>
                        <div className="flex rounded-lg overflow-hidden border border-gray-300">
                            <button
                                onClick={() => setView("card")}
                                className={`px-3 py-1 text-xs sm:text-sm md:text-base transition cursor-pointer ${view === "card"
                                    ? "bg-[#6F0E18] text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                Card
                            </button>
                            <button
                                onClick={() => setView("table")}
                                className={`px-3 py-1 text-xs sm:text-sm md:text-base transition cursor-pointer ${view === "table"
                                    ? "bg-[#6F0E18] text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                Table
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card View */}
                {view === "card" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}

                {/* Table View */}
                {view === "table" && (
                    <div className="overflow-x-auto rounded-lg shadow">
                        <table className="min-w-[600px] w-full bg-white">
                            <thead className="bg-[#6F0E18] text-white text-xs sm:text-sm">
                                <tr>
                                    <th className="p-3 text-left w-20">Photo</th>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Category</th>
                                    <th className="p-3 text-left">Brand</th>
                                    <th className="p-3 text-left">Price</th>
                                    <th className="p-3 text-left">Rating</th>
                                    <th className="p-3 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs sm:text-sm">
                                {products.map((product) => (
                                    <tr
                                        key={product._id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >
                                        <td className="p-3 align-middle">
                                            <div className="w-12 sm:w-14 md:w-16 lg:w-18 xl:w-20">
                                                <img
                                                    src={product.photo}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover rounded-md"
                                                />
                                            </div>
                                        </td>
                                        <td className="text-[9px] sm:text-[11px] md:text-xs lg:text-[14px] xl:text-sm p-3 align-middle">{product.category}</td>
                                        <td className="text-[9px] sm:text-[11px] md:text-xs lg:text-[14px] xl:text-sm p-3 align-middle">{product.brand}</td>
                                        <td className="text-[9px] sm:text-[11px] md:text-xs lg:text-[14px] xl:text-sm p-3 align-middle">${product.price}</td>
                                        <td className="text-[9px] sm:text-[11px] md:text-xs lg:text-[14px] xl:text-sm p-3 align-middle">{product.rating}</td>
                                        <td className="text-[9px] sm:text-[11px] md:text-xs lg:text-[14px] xl:text-sm p-3 align-middle">{product.name}</td>
                                        <td className="p-3 align-middle">
                                            <div className="flex gap-1 items-center">
                                                <Link to={`/product-Details/${product._id}`}>
                                                    <Button className="bg-[#6F0E18] hover:bg-[#8a0a19] py-3 px-4 rounded-sm font-medium flex items-center gap-3 text-center cursor-pointer">
                                                        <CgNotes className="text-[9px] sm:text-[11px] md:text-xs lg:text-[14px] xl:text-sm" />
                                                        View Details
                                                    </Button>
                                                </Link>
                                                <Link to={`/update-Product/${product._id}`}>
                                                    <div className='flex justify-end text-white'>
                                                        <Button className="bg-[#6F0E18] hover:bg-[#8a0a19] py-3 px-4 rounded-sm font-medium flex items-center gap-3 text-center cursor-pointer">
                                                            Update
                                                        </Button>
                                                    </div>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AllProducts;
