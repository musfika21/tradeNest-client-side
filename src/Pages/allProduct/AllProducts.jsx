import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../CustomHooks/UseAuth";
import axios from "axios";
import ProductCard from "./ProductCard";

const AllProducts = () => {
    const { setLoading } = useAuth();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // fetch data from API
        axios
            .get(`${import.meta.env.VITE_SERVER_API}/products`)
            .then((res) => {
                setProducts(res.data);      // set response data to state
                setLoading(false);
            })
            .catch((err) => {
                console.error("❌ Error fetching users:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-[#fef1f1]">
            <div className="px-4 py-8 max-w-7xl mx-auto ">
                <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllProducts;