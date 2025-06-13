import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import CustomizedButton from '../Shared/CustomizedButton';

const AllProducts = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        axios.get(`/api/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(() => alert("Failed to fetch product details."));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (image) formData.append("image", image);
        for (const key in product) {
            formData.append(key, product[key]);
        }

        try {
            await axios.put(`/api/products/${id}`, formData);
            alert("Product updated successfully!");
            navigate('/products');
        } catch (err) {
            alert("Error updating product.");
        }
    };

    if (!product) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="bg-[#fef1f1] min-h-screen py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-6">Update Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Product Image</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Product Name</label>
                        <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Brand Name</label>
                        <input type="text" name="brand" value={product.brand} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Category</label>
                        <select name="category" value={product.category} onChange={handleChange} className="w-full border p-2 rounded">
                            <option value="">Select Category</option>
                            <option>Electronics & Gadgets</option>
                            <option>Home & Kitchen Appliances</option>
                            <option>Fashion & Apparel</option>
                            <option>Industrial Machinery & Tools</option>
                            <option>Health & Beauty</option>
                            <option>Automotive Parts & Accessories</option>
                            <option>Office Supplies & Stationery</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium">Main Quantity</label>
                            <input type="number" name="main_quantity" value={product.main_quantity} onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Minimum Selling Quantity</label>
                            <input type="number" name="minimum_selling_quantity" value={product.minimum_selling_quantity} onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Rating (1-5)</label>
                        <input type="number" name="rating" min="1" max="5" value={product.rating} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Description</label>
                        <textarea name="description" value={product.description} onChange={handleChange} rows="4" className="w-full border p-2 rounded"></textarea>
                    </div>

                    <CustomizedButton type="submit" text="Update Product" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" />
                </form>
            </div>
        </div>
    );
};

export default AllProducts;
