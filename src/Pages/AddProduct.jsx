import React, { useState } from "react";
import CommonButton from "../Shared/CommonButton";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "../CustomHooks/UseAuth";
import toast from "react-hot-toast";

const categories = [
    {
        name: "Electronics & Gadgets",
        slug: 'electronics_&_gadgets',
    },
    {
        name: "Home & Kitchen Appliances",
        slug: 'home_&_kitchen_appliances',
    },
    {
        name: "Fashion & Apparel",
        slug: 'fashion_&_apparel',

    },
    {
        name: "Industrial Machinery & Tools",
        slug: 'industrial_machinery_&_tools',

    },
    {
        name: "Health & Beauty",
        slug: 'health_&_beauty',
    },
    {
        name: "Automotive Parts & Accessories",
        slug: 'automotive_parts_&_accessories',
    },
    {
        name: "Office Supplies & Stationery",
        slug: 'office_supplies_&_stationery',
    }

];

const AddProduct = () => {
    const { user, theme } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "photo":
                if (!value.trim()) {
                    error = "Product image URL is required";
                } else if (!/^https?:\/\/.+\..+/.test(value)) {
                    error = "Please enter a valid URL";
                }
                break;
            case "name":
                if (!value.trim()) {
                    error = "Product name is required";
                } else if (value.trim().length < 3) {
                    error = "Product name must be at least 3 characters";
                }
                break;
            case "main_quantity":
                if (!value) {
                    error = "Main quantity is required";
                } else if (parseInt(value) <= 0) {
                    error = "Main quantity must be greater than 0";
                }
                break;
            case "minimum_selling_quantity":
                if (!value) {
                    error = "Minimum selling quantity is required";
                } else if (parseInt(value) <= 0) {
                    error = "Minimum quantity must be greater than 0";
                }
                break;
            case "brand":
                if (!value.trim()) {
                    error = "Brand name is required";
                }
                break;
            case "category_slug":
                if (!value) {
                    error = "Please select a category";
                }
                break;
            case "description":
                if (!value.trim()) {
                    error = "Description is required";
                } else if (value.trim().length < 10) {
                    error = "Description must be at least 10 characters";
                }
                break;
            case "price":
                if (!value) {
                    error = "Price is required";
                } else if (parseFloat(value) <= 0) {
                    error = "Price must be greater than 0";
                }
                break;
            case "rating":
                if (!value) {
                    error = "Rating is required";
                } else if (parseFloat(value) < 1 || parseFloat(value) > 5) {
                    error = "Rating must be between 1 and 5";
                }
                break;
            default:
                break;
        }

        return error;
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched({ ...touched, [name]: true });
        const error = validateField(name, value);
        setErrors({ ...errors, [name]: error });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors({ ...errors, [name]: error });
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const form = e.target;
        const formData = new FormData(form);

        // Validate all fields
        const newErrors = {};
        const fieldNames = ["photo", "name", "main_quantity", "minimum_selling_quantity", "brand", "category_slug", "description", "price", "rating"];

        fieldNames.forEach(fieldName => {
            const value = formData.get(fieldName);
            const error = validateField(fieldName, value);
            if (error) {
                newErrors[fieldName] = error;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setTouched(fieldNames.reduce((acc, field) => ({ ...acc, [field]: true }), {}));
            setIsLoading(false);
            toast.error("Please fix all errors before submitting", {
                duration: 3000,
                position: 'top-right',
                style: {
                    background: theme ? '#fff' : '#343434',
                    color: theme ? '#3E3F29' : '#BCA88D',
                    border: `1px solid ${theme ? '#7D8D86' : '#BCA88D'}`,
                },
            });
            return;
        }

        const newProduct = Object.fromEntries(formData);
        const main_quantity = parseInt(e.target.main_quantity.value);
        const minimum_selling_quantity = parseInt(e.target.minimum_selling_quantity.value);
        const price = parseFloat(e.target.price.value);
        const rating = parseFloat(e.target.rating.value);

        // Safe category retrieval
        const categoryObj = categories.find(cat => cat.slug === e.target.category_slug.value);

        if (!categoryObj) {
            setIsLoading(false);
            toast.error("Invalid category selected", {
                duration: 3000,
                position: 'top-right',
                style: {
                    background: theme ? '#fff' : '#343434',
                    color: theme ? '#3E3F29' : '#BCA88D',
                    border: `1px solid ${theme ? '#7D8D86' : '#BCA88D'}`,
                },
            });
            return;
        }

        const category = categoryObj.name;

        // Sending email in the database
        const productWithEmail = {
            ...newProduct,
            main_quantity,
            minimum_selling_quantity,
            price,
            rating,
            email: user?.email || "unknown@domain.com",
            category: category
        };
        axios
            .post(`${import.meta.env.VITE_SERVER_API}/products`, productWithEmail)
            .then((response) => {
                setIsLoading(false);

                if (response.data.insertedId) {
                    navigate("/my-Products");
                    toast.success("Product Added Successfully!", {
                        duration: 3000,
                        position: 'top-right',
                        style: {
                            background: theme ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' : 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
                            color: theme ? '#166534' : '#d1fae5',
                            border: `2px solid ${theme ? '#86efac' : '#10b981'}`,
                            padding: '16px',
                            borderRadius: '12px',
                            boxShadow: theme ? '0 4px 12px rgba(34, 197, 94, 0.2)' : '0 4px 12px rgba(16, 185, 129, 0.3)',
                            fontWeight: '600',
                        },
                        iconTheme: {
                            primary: theme ? '#22c55e' : '#10b981',
                            secondary: theme ? '#f0fdf4' : '#064e3b',
                        },
                    });

                    form.reset();
                    setErrors({});
                    setTouched({});
                } else {
                    toast.error("Failed to add Product", {
                        duration: 3000,
                        position: 'top-right',
                        style: {
                            background: theme ? '#fff' : '#343434',
                            color: theme ? '#3E3F29' : '#BCA88D',
                            border: `1px solid ${theme ? '#7D8D86' : '#BCA88D'}`,
                        },
                    });
                }
            })
            .catch((error) => {
                setIsLoading(false);
                const errorMessage = error.response?.data?.message || "Failed to add Product. Please try again.";

                toast.error(errorMessage, {
                    duration: 4000,
                    position: 'top-right',
                    style: {
                        background: theme ? '#fff' : '#343434',
                        color: theme ? '#3E3F29' : '#BCA88D',
                        border: `1px solid ${theme ? '#7D8D86' : '#BCA88D'}`,
                    },
                });
            });
    };
    return (
        <div className="py-5 px-4 sm:px-6 lg:px-8">
            <div className={`max-w-4xl mx-auto ${theme ? "bg-white/10" : "bg-[#343434]"} p-8 sm:p-10 rounded-md shadow-2xl`}>
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h2 className={`xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 ${theme ? "text-[#3E3F29]" : "text-[#BCA88D]"}`}>
                        Add New Product
                    </h2>
                    <div className="flex justify-center mb-4">
                        <div className={`h-1 w-24 rounded-full ${theme ? "bg-[#7D8D86]" : "bg-[#BCA88D]"}`}></div>
                    </div>
                    <p className={`${theme ? "text-gray-600" : "text-gray-300"} max-w-2xl mx-auto text-xs md:text-sm lg:text-base`}>
                        List your wholesale products and reach thousands of potential buyers
                    </p>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Product Image */}
                        <div className="space-y-2">
                            <label className={`text-sm lg:text-base block font-semibold ${theme ? "text-[#3E3F29]" : "text-[#BCA88D]"}`}>
                                Product Image URL
                            </label>
                            <input
                                type="url"
                                name="photo"
                                placeholder="https://example.com/product-image.jpg"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded ${theme
                                    ? "bg-white/20 border text-gray-800"
                                    : "bg-[#2a2a2a] border text-gray-200"
                                    } ${touched.photo && errors.photo
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                        : theme
                                            ? "border-[#7D8D86]/30 focus:border-[#7D8D86]"
                                            : "border-[#BCA88D]/30 focus:border-[#BCA88D]"
                                    } focus:outline-none transition-all duration-300 focus:ring-2 ${touched.photo && errors.photo ? "" : theme ? "focus:ring-[#7D8D86]/20" : "focus:ring-[#BCA88D]/20"
                                    }`}
                            />
                            {touched.photo && errors.photo && (
                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.photo}
                                </p>
                            )}
                        </div>

                        {/* Product Name */}
                        <div className="space-y-2">
                            <label className={`text-sm lg:text-base block font-semibold ${theme ? "text-[#3E3F29]" : "text-[#BCA88D]"}`}>
                                Product Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter product name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded ${theme
                                    ? "bg-white/20 border text-gray-800"
                                    : "bg-[#2a2a2a] border text-gray-200"
                                    } ${touched.name && errors.name
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                        : theme
                                            ? "border-[#7D8D86]/30 focus:border-[#7D8D86]"
                                            : "border-[#BCA88D]/30 focus:border-[#BCA88D]"
                                    } focus:outline-none transition-all duration-300 focus:ring-2 ${touched.name && errors.name ? "" : theme ? "focus:ring-[#7D8D86]/20" : "focus:ring-[#BCA88D]/20"
                                    }`}
                            />
                            {touched.name && errors.name && (
                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.name}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Main and Min Quantity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className={`text-sm lg:text-base block font-semibold ${theme ? "text-[#3E3F29]" : "text-[#BCA88D]"}`}>
                                Main Quantity
                            </label>
                            <input
                                type="number"
                                name="main_quantity"
                                placeholder="1000"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded ${theme
                                    ? "bg-white/20 border text-gray-800"
                                    : "bg-[#2a2a2a] border text-gray-200"
                                    } ${touched.main_quantity && errors.main_quantity
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                        : theme
                                            ? "border-[#7D8D86]/30 focus:border-[#7D8D86]"
                                            : "border-[#BCA88D]/30 focus:border-[#BCA88D]"
                                    } focus:outline-none transition-all duration-300 focus:ring-2 ${touched.main_quantity && errors.main_quantity ? "" : theme ? "focus:ring-[#7D8D86]/20" : "focus:ring-[#BCA88D]/20"
                                    }`}
                            />
                            {touched.main_quantity && errors.main_quantity && (
                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.main_quantity}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className={`text-sm lg:text-base block font-semibold ${theme ? "text-[#3E3F29]" : "text-[#BCA88D]"}`}>
                                Minimum Selling Quantity
                            </label>
                            <input
                                type="number"
                                name="minimum_selling_quantity"
                                placeholder="50"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded ${theme
                                    ? "bg-white/20 border text-gray-800"
                                    : "bg-[#2a2a2a] border text-gray-200"
                                    } ${touched.minimum_selling_quantity && errors.minimum_selling_quantity
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                        : theme
                                            ? "border-[#7D8D86]/30 focus:border-[#7D8D86]"
                                            : "border-[#BCA88D]/30 focus:border-[#BCA88D]"
                                    } focus:outline-none transition-all duration-300 focus:ring-2 ${touched.minimum_selling_quantity && errors.minimum_selling_quantity ? "" : theme ? "focus:ring-[#7D8D86]/20" : "focus:ring-[#BCA88D]/20"
                                    }`}
                            />
                            {touched.minimum_selling_quantity && errors.minimum_selling_quantity && (
                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.minimum_selling_quantity}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Brand and Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className={`lg:text-base text-sm block font-semibold ${theme ? "text-[#3E3F29]" : "text-[#BCA88D]"}`}>
                                Brand Name
                            </label>
                            <input
                                type="text"
                                name="brand"
                                placeholder="Enter brand name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded ${theme
                                    ? "bg-white/20 border text-gray-800"
                                    : "bg-[#2a2a2a] border text-gray-200"
                                    } ${touched.brand && errors.brand
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                        : theme
                                            ? "border-[#7D8D86]/30 focus:border-[#7D8D86]"
                                            : "border-[#BCA88D]/30 focus:border-[#BCA88D]"
                                    } focus:outline-none transition-all duration-300 focus:ring-2 ${touched.brand && errors.brand ? "" : theme ? "focus:ring-[#7D8D86]/20" : "focus:ring-[#BCA88D]/20"
                                    }`}
                            />
                            {touched.brand && errors.brand && (
                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.brand}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className={`text-sm lg:text-base block font-semibold ${theme ? "text-[#3E3F29]" : "text-[#BCA88D]"}`}>
                                Category
                            </label>
                            <div className="relative">
                                <select
                                    name="category_slug"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded appearance-none cursor-pointer ${theme
                                        ? "bg-white/20 border text-gray-800"
                                        : "bg-[#2a2a2a] border text-gray-200"
                                        } ${touched.category_slug && errors.category_slug
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                            : theme
                                                ? "border-[#7D8D86]/30 focus:border-[#7D8D86]"
                                                : "border-[#BCA88D]/30 focus:border-[#BCA88D]"
                                        } focus:outline-none transition-all duration-300 focus:ring-2 ${touched.category_slug && errors.category_slug ? "" : theme ? "focus:ring-[#7D8D86]/20" : "focus:ring-[#BCA88D]/20"
                                        }`}
                                    style={{
                                        backgroundImage: theme
                                            ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%237D8D86'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`
                                            : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23BCA88D'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                        backgroundPosition: 'right 0.75rem center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '1.5rem 1.5rem',
                                        paddingRight: '2.5rem'
                                    }}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.slug} value={category.slug}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {touched.category_slug && errors.category_slug && (
                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.category_slug}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Price and Rating */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className={`text-sm lg:text-base block font-semibold ${theme ? "text-[#3E3F29]" : "text-[#BCA88D]"}`}>
                                Price (per unit)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                placeholder="99.99"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded ${theme
                                    ? "bg-white/20 border text-gray-800"
                                    : "bg-[#2a2a2a] border text-gray-200"
                                    } ${touched.price && errors.price
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                        : theme
                                            ? "border-[#7D8D86]/30 focus:border-[#7D8D86]"
                                            : "border-[#BCA88D]/30 focus:border-[#BCA88D]"
                                    } focus:outline-none transition-all duration-300 focus:ring-2 ${touched.price && errors.price ? "" : theme ? "focus:ring-[#7D8D86]/20" : "focus:ring-[#BCA88D]/20"
                                    }`}
                            />
                            {touched.price && errors.price && (
                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.price}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className={`text-sm lg:text-base block font-semibold ${theme ? "text-[#3E3F29]" : "text-[#BCA88D]"}`}>
                                Rating (1-5)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="rating"
                                min="1"
                                max="5"
                                placeholder="4.5"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded ${theme
                                    ? "bg-white/20 border text-gray-800"
                                    : "bg-[#2a2a2a] border text-gray-200"
                                    } ${touched.rating && errors.rating
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                        : theme
                                            ? "border-[#7D8D86]/30 focus:border-[#7D8D86]"
                                            : "border-[#BCA88D]/30 focus:border-[#BCA88D]"
                                    } focus:outline-none transition-all duration-300 focus:ring-2 ${touched.rating && errors.rating ? "" : theme ? "focus:ring-[#7D8D86]/20" : "focus:ring-[#BCA88D]/20"
                                    }`}
                            />
                            {touched.rating && errors.rating && (
                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.rating}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className={`text-sm lg:text-base block font-semibold ${theme ? "text-[#3E3F29]" : "text-[#BCA88D]"}`}>
                            Short Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Describe your product in detail..."
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded ${theme
                                ? "bg-white/20 border text-gray-800"
                                : "bg-[#2a2a2a] border text-gray-200"
                                } ${touched.description && errors.description
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                    : theme
                                        ? "border-[#7D8D86]/30 focus:border-[#7D8D86]"
                                        : "border-[#BCA88D]/30 focus:border-[#BCA88D]"
                                } focus:outline-none transition-all duration-300 focus:ring-2 ${touched.description && errors.description ? "" : theme ? "focus:ring-[#7D8D86]/20" : "focus:ring-[#BCA88D]/20"
                                } resize-none`}
                            rows="4"
                        ></textarea>
                        {touched.description && errors.description && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <CommonButton type="submit" disabled={isLoading}>
                            <div className="relative z-10 flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Adding Product...
                                    </>
                                ) : (
                                    <>
                                        Add Product
                                        <svg
                                            className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </>
                                )}
                            </div>
                        </CommonButton>
                    </div>
                </form>

                {/* Info Section */}
                <div className={`mt-5 p-6 rounded-xl ${theme ? "bg-white/50" : "bg-[#2a2a2a]/50"} border ${theme ? "border-[#7D8D86]/20" : "border-[#BCA88D]/20"}`}>
                    <h3 className={`font-bold text-lg mb-3 ${theme ? "text-[#3E3F29]" : "text-[#BCA88D]"}`}>
                        📦 Product Listing Tips
                    </h3>
                    <ul className={`space-y-2 ${theme ? "text-gray-600" : "text-gray-300"} text-sm`}>
                        <li className="flex items-start gap-2">
                            <span className={`${theme ? "text-[#7D8D86]" : "text-[#BCA88D]"} font-bold`}>•</span>
                            Use high-quality images to showcase your product effectively
                        </li>
                        <li className="flex items-start gap-2">
                            <span className={`${theme ? "text-[#7D8D86]" : "text-[#BCA88D]"} font-bold`}>•</span>
                            Write clear, detailed descriptions to help buyers make informed decisions
                        </li>
                        <li className="flex items-start gap-2">
                            <span className={`${theme ? "text-[#7D8D86]" : "text-[#BCA88D]"} font-bold`}>•</span>
                            Set competitive pricing to attract more wholesale buyers
                        </li>
                        <li className="flex items-start gap-2">
                            <span className={`${theme ? "text-[#7D8D86]" : "text-[#BCA88D]"} font-bold`}>•</span>
                            Accurate stock quantities ensure smooth order fulfillment
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;