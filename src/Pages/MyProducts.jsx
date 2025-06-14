import React, { useEffect, useState } from 'react';
import useAuth from '../CustomHooks/UseAuth';

const MyProducts = () => {

     const { theme, user, loading } = useAuth();
    const userEmail = user?.email;
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    // load specific category according careLevel
    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_API}/my-Products?email=${userEmail}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            });
    }, [setProducts, userEmail]);

    return (
        <div className="container mx-auto p-4">
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
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                        Edit
                                    </button>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
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