import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../CustomHooks/UseAuth';
import { Link } from 'react-router';
import Card from './Card';
import CommonButton from '../../Shared/CommonButton';

const Cart = () => {
    const { theme, user, loading } = useAuth();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user || !user.email || !user.accessToken) return;

        axios.get(`${import.meta.env.VITE_SERVER_API}/my-Purchase?email=${user.email}`)
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                setError("Failed to fetch purchase data.");
            });

    }, [user]);

    const handleDeleteProduct = (productId) => {
        setProducts(products.filter(product => product._id !== productId));
    };

    return (
        <div className="container mx-auto px-4 pt-15 min-h-[calc(100vh-325px)] pb-5">
            <h2 className={`text-3xl font-bold text-center mb-8 ${theme ? "text-[#3E3F29]" : "text-[#BCA88D]"}`}>My Cart</h2>

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
                    <p className={`text-lg ${theme ? "text-gray-600" : "text-gray-300"}`}>No products found.</p>
                    <Link to="/all-Products">
                        <CommonButton className='mt-5'>Add to Cart</CommonButton>
                    </Link>
                </div>
            )}

            {!loading && products.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => {
                        return (
                            <Card
                                key={product._id}
                                product={product}
                                onDelete={handleDeleteProduct}
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