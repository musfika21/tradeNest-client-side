import React, { useEffect, useState } from 'react';
import useAuth from '../CustomHooks/UseAuth';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import CommonButton from '../Shared/CommonButton';
import Loader from '../components/Loader';
import { FaEdit, FaTrash, FaEye, FaStar } from 'react-icons/fa';

const MyProducts = () => {
    const { theme, user, loading } = useAuth();
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user || !user.email) return;

        setProductsLoading(true);
        axios.get(`${import.meta.env.VITE_SERVER_API}/my-Products?email=${user.email}`)
            .then((data) => {
                setProducts(data.data);
                setProductsLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch products.");
                setProductsLoading(false);
            });

    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_SERVER_API}/products/${id}`, {
                    method: 'DELETE'
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Product has been deleted.",
                                icon: "success",
                            });
                            const remainingProduct = products.filter((prod) => prod._id !== id);
                            setProducts(remainingProduct);
                        }
                    })
            }
        });
    }

    if (loading || productsLoading) {
        return <Loader />;
    }

    return (
        <div className={`min-h-screen py-12 px-4 ${theme ? 'bg-gray-50' : 'bg-[#1a1a1a]'}`}>
            <div className="container mx-auto max-w-7xl">
                <div className="flex items-center justify-between mb-10">
                    <h2 className={`text-3xl font-bold ${theme ? 'text-[#3E3F29]' : 'text-white'}`}>
                        My Products
                    </h2>
                    <Link to='/add-Product'>
                        <CommonButton>Add New Product</CommonButton>
                    </Link>
                </div>

                {error && (
                    <div className="text-center py-10">
                        <p className="text-red-500 text-lg">{error}</p>
                    </div>
                )}

                {!error && products.length === 0 && (
                    <div className={`text-center py-20 rounded-xl ${theme ? 'bg-white' : 'bg-[#2a2a2a]'}`}>
                        <p className={`text-lg mb-6 ${theme ? 'text-gray-600' : 'text-gray-300'}`}>
                            No products found. Start adding your first product!
                        </p>
                        <Link to='/add-Product'>
                            <CommonButton>Add Product</CommonButton>
                        </Link>
                    </div>
                )}
                
                {!error && products.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className={`group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col ${
                                    theme ? 'bg-white border border-gray-200' : 'bg-[#2a2a2a] border border-gray-700'
                                }`}
                            >
                                {/* Image Section */}
                                <div className="relative h-56 overflow-hidden bg-gray-100">
                                    {product.photo ? (
                                        <img
                                            src={product.photo}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                            No Image
                                        </div>
                                    )}

                                    {/* Category Badge */}
                                    {product.category && (
                                        <div className="absolute top-3 left-3">
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg ${
                                                theme ? 'bg-[#3E3F29] text-white' : 'bg-[#BCA88D] text-gray-900'
                                            }`}>
                                                {product.category}
                                            </span>
                                        </div>
                                    )}

                                    {/* Stock Badge */}
                                    {product.main_quantity !== undefined && (
                                        <div className="absolute top-3 right-3">
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg ${
                                                product.main_quantity > 10
                                                ? theme ? 'bg-green-500 text-white' : 'bg-green-600 text-white'
                                                : product.main_quantity > 0
                                                ? 'bg-yellow-500 text-white'
                                                : 'bg-red-500 text-white'
                                            }`}>
                                                {product.main_quantity}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content Section */}
                                <div className="p-4 flex-1 flex flex-col">
                                    {/* Brand */}
                                    {product.brand && (
                                        <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                                            theme ? 'text-gray-500' : 'text-gray-400'
                                        }`}>
                                            {product.brand}
                                        </p>
                                    )}

                                    {/* Product Name */}
                                    <h3 className={`text-base font-bold mb-2 line-clamp-2 min-h-[48px] ${
                                        theme ? 'text-[#3E3F29]' : 'text-white'
                                    }`}>
                                        {product.name || 'Unnamed Product'}
                                    </h3>

                                    {/* Description */}
                                    <p className={`text-sm mb-3 line-clamp-2 ${
                                        theme ? 'text-gray-600' : 'text-gray-400'
                                    }`}>
                                        {product.description || 'No description available.'}
                                    </p>

                                    {/* Price & Rating */}
                                    <div className="flex items-center justify-between mb-4 mt-auto">
                                        <div className={`text-xl font-bold ${
                                            theme ? 'text-[#3E3F29]' : 'text-[#BCA88D]'
                                        }`}>
                                            ${product.price?.toFixed(2) || '0.00'}
                                        </div>

                                        {product.rating && (
                                            <div className="flex items-center gap-1">
                                                <FaStar className="text-yellow-400 text-sm" />
                                                <span className={`text-sm font-semibold ${
                                                    theme ? 'text-gray-700' : 'text-gray-300'
                                                }`}>
                                                    {product.rating}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Divider */}
                                    <div className={`h-px mb-4 ${
                                        theme ? 'bg-gray-200' : 'bg-gray-700'
                                    }`}></div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-3 gap-2">
                                        <Link to={`/product-Details/${product._id}`}>
                                            <button className={`w-full py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                                                theme 
                                                ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' 
                                                : 'bg-[#1f1f1f] hover:bg-[#252525] text-white'
                                            }`}>
                                                <FaEye />
                                                View
                                            </button>
                                        </Link>

                                        <Link to={`/update-Product/${product._id}`}>
                                            <button className={`w-full py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                                                theme 
                                                ? 'bg-[#3E3F29] hover:bg-[#2e2f1f] text-white' 
                                                : 'bg-[#BCA88D] hover:bg-[#a89779] text-gray-900'
                                            }`}>
                                                <FaEdit />
                                                Edit
                                            </button>
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer"
                                        >
                                            <FaTrash />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProducts;