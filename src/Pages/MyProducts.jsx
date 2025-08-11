import React, { useEffect, useState } from 'react';
import useAuth from '../CustomHooks/UseAuth';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import CommonButton from '../Shared/CommonButton';

const MyProducts = () => {

    const { theme, user, loading } = useAuth();
    const userEmail = user?.email;
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const accessToken = user.accessToken;
    console.log(accessToken)

    useEffect(() => {
        if (!user || !user.email || !user.accessToken) return;

        axios.get(`${import.meta.env.VITE_SERVER_API}/my-Products?email=${user.email}`)
            .then((data) => {
                setProducts(data.data);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to fetch products.");
            });

    }, [user]);

    // delete product from database
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
                        console.log('after delete', data);
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Product has been deleted.",
                                icon: "success",
                            });
                            // removing the coffee from the UI
                            const remainingProduct = products.filter((prod) => prod._id !== id);
                            setProducts(remainingProduct);
                        }
                    })
            }
        });
    }

    return (
        <div className="container mx-auto px-4 pt-15 min-h-[calc(100vh-325px)] pb-5">
            <h2 className="text-3xl font-bold text-center mb-8">
                My Products
            </h2>

            {loading && (
                <div className="text-center">
                    <p className="text-lg">Loading products...</p>
                </div>
            )}

            {error && (
                <div className="text-center text-red-500">
                    <p>Error: {error}</p>
                </div>
            )}

            {!loading && !error && products.length === 0 && (
                <div className="text-center">
                    <p className={`text-lg ${theme ? "text-gray-600" : "text-gray-300"}`}>No products found.</p>
                    <Link to='add-Product'>
                        <CommonButton className='mt-5'>Add Product</CommonButton>
                    </Link>
                </div>
            )}
            
            {!loading && !error && products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-200"
                        >
                            {/* Image */}
                            {product.photo ? (
                                <div className="w-full h-60 bg-white flex items-center justify-center overflow-hidden">
                                    <img
                                        src={product.photo}
                                        alt={product.name}
                                        className="h-full object-contain transition-transform duration-300 hover:scale-105"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-60 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                                    No Image Available
                                </div>
                            )}


                            {/* Product Info */}
                            <div className="p-5">
                                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
                                    {product.name || 'Unnamed Product'}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                                    {product.description || 'No description available.'}
                                </p>

                                <div className="text-md font-semibold text-green-600 mb-4">
                                    ${product.price?.toFixed(2) || '0.00'}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-between items-center gap-3">
                                    <Link to={`/update-Product/${product._id}`}>
                                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition">
                                            Update
                                        </button>
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyProducts;