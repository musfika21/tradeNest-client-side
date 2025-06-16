import React, { useEffect, useState } from 'react';
import useAuth from '../CustomHooks/UseAuth';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';

const MyProducts = () => {

    const { theme, user, loading } = useAuth();
    const userEmail = user?.email;
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    axios.get(`${import.meta.env.VITE_SERVER_API}/my-Products?email=${userEmail}`)
        .then((data) => {
            setProducts(data.data);
        });

    // delete product from database
    const handleDelete = (id) => {
        // console.log(id)
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
        <div className="container mx-auto px-4 pt-15 bg-[#fef1f1] min-h-[calc(100vh-325px)]">
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
                    <p className="text-lg">No products found.</p>
                    <Link to='add-Product'>
                        <button
                            className="mt-6 bg-[#6F0E18] hover:bg-[#8a0a19] text-white text-xs sm:text-sm py-2 px-4 rounded-sm font-medium text-center cursor-pointer"
                        >
                            Add Product
                        </button>
                    </Link>
                </div>
            )}

            {!loading && !error && products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            {product.image && (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/150';
                                    }}
                                />
                            )}
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">
                                    {product.name || 'Unnamed Product'}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {product.description || 'No description available.'}
                                </p>
                                <p className="text-lg font-bold text-green-600">
                                    ${product.price}
                                </p>
                                <div className="mt-4 flex justify-between">
                                    <Link to={`/update-Product/${product._id}`}>
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
                                            Update
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
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