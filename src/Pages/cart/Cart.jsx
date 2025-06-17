import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../CustomHooks/UseAuth';
import { Link } from 'react-router';
import Card from './Card';

const Cart = () => {
    const { theme, user, loading } = useAuth();
    const userEmail = user?.email;
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
    if (!user || !user.email || !user.accessToken) return;

    axios.get(`${import.meta.env.VITE_SERVER_API}/my-Purchase?email=${user.email}`)
    .then(res => {
        setProducts(res.data);
    })
    .catch(err => {
        console.error(err);
        setError("Failed to fetch purchase data.");
    });

}, [user]);
    return (
        <div className="container mx-auto px-4 pt-15 bg-[#fef1f1] min-h-[calc(100vh-325px)]">
            <h2 className="text-3xl font-bold text-center mb-8">My Cart</h2>

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

            {!loading && products.length === 0 && (
                <div className="text-center">
                    <p className="text-lg">No products found.</p>
                    <Link to="/all-Products">
                        <button className="mt-6 bg-[#6F0E18] hover:bg-[#8a0a19] text-white text-xs sm:text-sm py-2 px-4 rounded-sm font-medium text-center cursor-pointer">
                            Add Product
                        </button>
                    </Link>
                </div>
            )}

            {!loading && products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => {
                        return (
                            <Card
                                key={product._id}
                                product={product}
                            />
                        )
                    }

                    )}
                </div>
            )}

        </div>
    );
};

export default Cart;