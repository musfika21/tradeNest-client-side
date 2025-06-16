import axios from 'axios';
import React, { useState } from 'react';
import useAuth from '../CustomHooks/UseAuth';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const Cart = () => {

    const { theme, user, loading } = useAuth();
    const userEmail = user?.email;
    const [products, setProducts] = useState([]);
        const { _id, name, photo, main_quantity, minimum_selling_quantity, brand, price, category, description, rating } = product;
        const [error, setError] = useState(null);
    
    

    axios.get(`${import.meta.env.VITE_SERVER_API}/my-Purchase?email=${userEmail}`)
        .then((data) => {
            setProducts(data.data);
        });

        const handleAddCart = async () => {

        const purchaseProduct = {
            email: user.email,
            purchasedProduct: _id,
            purchaseAmount: buyQuantity,
            name, photo, brand, price, category, description, rating
        };

        // posting the purchase product in the database
        axios.post(`${import.meta.env.VITE_SERVER_API}/purchase`, purchaseProduct)
            .then(data =>{
                if (data.data.insertedId) {
                    console.log(buyQuantity)
                     axios.patch(`${import.meta.env.VITE_SERVER_API}/products/${_id}`, {buyQuantity : -buyQuantity})
                        .then((data) =>{
                        console.log(data.data)
            })
                    Swal.fire({
                        position: "top-end",
                            icon: "success",
                            title: "Product Added Successfully",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        // navigate("/cart");
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Failed to add Product in cart",
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

           
            
    }

    return (
        <div className="container mx-auto px-4 pt-15 bg-[#fef1f1] min-h-[calc(100vh-325px)]">
            <h2 className="text-3xl font-bold text-center mb-8">
                My cart
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

export default Cart;