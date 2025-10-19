import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../CustomHooks/UseAuth";
import axios from "axios";
import ProductCard from "./ProductCard";
import Loader from "../../Components/Loader";
import { CgNotes } from "react-icons/cg";
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { FaTable } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CommonButton from "../../Shared/CommonButton";

const AllProducts = () => {
    const { setLoading, theme } = useAuth();
    const [products, setProducts] = useState([]);
    const [view, setView] = useState("card");
    const [loading, setLoadingState] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        setLoadingState(true);
        axios
            .get(`${import.meta.env.VITE_SERVER_API}/products`)
            .then((res) => {
                setProducts(res.data);
                setLoadingState(false);
                setLoading(false);
            })
            .catch((err) => {
                setLoadingState(false);
                setLoading(false);
            });
    }, []);

    // Pagination calculations
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className={`min-h-screen `}>
            <div className="px-4 py-8 max-w-7xl mx-auto">
                {/* Top Bar */}
                <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
                    <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold text-center w-full sm:w-auto ${theme ? 'text-[#3E3F29]' : 'text-[#BCA88D]'}`}>
                        All Products
                    </h1>

                    {/* Toggle View */}
                    <div className="flex items-center gap-3">
                        <span className={`hidden md:inline font-semibold text-sm ${theme ? 'text-[#3E3F29]' : 'text-gray-300'}`}>
                            View
                        </span>
                        <div className={`flex rounded-xl p-1 ${theme ? 'bg-gray-100' : 'bg-gray-800'} shadow-inner`}>
                            <button
                                onClick={() => setView("card")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${view === "card"
                                    ? `${theme ? 'border border-[#3E3F29] bg-white text-[#3E3F29]' : 'border border-[#7D8D86] bg-[#7D8D86] text-black'}`
                                    : `${theme ? 'text-[#3E3F29] hover:opacity-80' : 'text-[#7D8D86] hover:opacity-80'}`
                                }`}
                            >
                                <BsGrid3X3GapFill className="text-sm" />
                                <span>Card</span>
                            </button>
                            <button
                                onClick={() => setView("table")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${view === "table"
                                    ? `${theme ? 'border border-[#3E3F29] bg-white text-[#3E3F29]' : 'border border-[#7D8D86] bg-[#7D8D86] text-black'}`
                                    : `${theme ? 'text-[#3E3F29] hover:opacity-80' : 'text-[#7D8D86] hover:opacity-80'}`
                                }`}
                            >
                                <FaTable className="text-sm" />
                                <span>Table</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card View */}
                {view === "card" && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
                            {currentProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>

                        {/* Pagination for Card View */}
                        <div className="flex flex-col items-center gap-4 mt-8">
                            <p className={`${theme ? 'text-[#3E3F29]' : 'text-[#7D8D86]'} font-medium`}>
                                Page {currentPage} of {totalPages}
                            </p>

                            <div className="flex justify-center items-center gap-1 sm:gap-2 flex-wrap">
                                <CommonButton
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm`}
                                >
                                    <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
                                    <span className="hidden sm:inline">Previous</span>
                                </CommonButton>

                                <div className="flex gap-1 flex-wrap justify-center max-w-xs sm:max-w-full">
                                    {totalPages <= 5 ? (
                                        Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => goToPage(page)}
                                                className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-medium transition-all text-xs sm:text-sm border ${
                                                    page === currentPage
                                                        ? theme 
                                                            ? 'border-[#3E3F29] bg-[#3E3F29] text-white' 
                                                            : 'border-[#7D8D86] bg-[#7D8D86] text-black'
                                                        : theme 
                                                            ? 'border-[#3E3F29] text-[#3E3F29] hover:bg-[#3E3F29] hover:text-white' 
                                                            : 'border-[#7D8D86] text-[#7D8D86] hover:bg-[#7D8D86] hover:text-black'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))
                                    ) : (
                                        <>
                                            {currentPage > 2 && (
                                                <button
                                                    onClick={() => goToPage(1)}
                                                    className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-medium transition-all text-xs sm:text-sm border ${
                                                        theme 
                                                            ? 'border-[#3E3F29] text-[#3E3F29] hover:bg-[#3E3F29] hover:text-white' 
                                                            : 'border-[#7D8D86] text-[#7D8D86] hover:bg-[#7D8D86] hover:text-black'
                                                    }`}
                                                >
                                                    1
                                                </button>
                                            )}
                                            {currentPage > 3 && <span className={`px-1 ${theme ? 'text-[#3E3F29]' : 'text-[#7D8D86]'}`}>...</span>}

                                            {[currentPage - 1, currentPage, currentPage + 1].map((page) => {
                                                if (page > 0 && page <= totalPages) {
                                                    return (
                                                        <button
                                                            key={page}
                                                            onClick={() => goToPage(page)}
                                                            className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-medium transition-all text-xs sm:text-sm border ${
                                                                page === currentPage
                                                                    ? theme 
                                                                        ? 'border-[#3E3F29] bg-[#3E3F29] text-white' 
                                                                        : 'border-[#7D8D86] bg-[#7D8D86] text-black'
                                                                    : theme 
                                                                        ? 'border-[#3E3F29] text-[#3E3F29] hover:bg-[#3E3F29] hover:text-white' 
                                                                        : 'border-[#7D8D86] text-[#7D8D86] hover:bg-[#7D8D86] hover:text-black'
                                                            }`}
                                                        >
                                                            {page}
                                                        </button>
                                                    );
                                                }
                                                return null;
                                            })}

                                            {currentPage < totalPages - 2 && <span className={`px-1 ${theme ? 'text-[#3E3F29]' : 'text-[#7D8D86]'}`}>...</span>}
                                            {currentPage < totalPages - 1 && (
                                                <button
                                                    onClick={() => goToPage(totalPages)}
                                                    className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-medium transition-all text-xs sm:text-sm border ${
                                                        theme 
                                                            ? 'border-[#3E3F29] text-[#3E3F29] hover:bg-[#3E3F29] hover:text-white' 
                                                            : 'border-[#7D8D86] text-[#7D8D86] hover:bg-[#7D8D86] hover:text-black'
                                                    }`}
                                                >
                                                    {totalPages}
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>

                                <CommonButton
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm`}
                                >
                                    <span className="hidden sm:inline">Next</span>
                                    <ChevronRight size={16} className="sm:w-5 sm:h-5" />
                                </CommonButton>
                            </div>
                        </div>
                    </>
                )}

                {/* Table View */}
                {view === "table" && (
                    <>
                        <div className={`overflow-x-auto rounded-lg shadow-lg ${theme ? 'bg-white' : 'bg-gray-800'}`}>
                            <table className={`min-w-[600px] w-full ${theme ? 'bg-white' : 'bg-gray-800'}`}>
                                <thead>
                                    <tr className={`${theme ? 'bg-gray-100 text-[#3E3F29] border-b-2 border-[#3E3F29]' : 'bg-gray-700 text-[#7D8D86] border-b-2 border-[#7D8D86]'} text-xs sm:text-sm font-semibold`}>
                                        <th className="p-4 text-left w-20">Photo</th>
                                        <th className="p-4 text-left">Name</th>
                                        <th className="p-4 text-left">Category</th>
                                        <th className="p-4 text-left">Brand</th>
                                        <th className="p-4 text-left">Price</th>
                                        <th className="p-4 text-left">Rating</th>
                                        <th className="p-4 text-left">Action</th>
                                    </tr>
                                </thead>
                                <tbody className={`text-xs sm:text-sm ${theme ? 'text-gray-700' : 'text-gray-300'}`}>
                                    {currentProducts.map((product) => (
                                        <tr
                                            key={product._id}
                                            className={`border-b transition-colors duration-200 ${theme
                                                ? 'border-gray-200 hover:bg-gray-50'
                                                : 'border-gray-700 hover:bg-gray-700'
                                            }`}
                                        >
                                            <td className="p-4 align-middle">
                                                <div className="w-12 sm:w-14 md:w-16 lg:w-18 xl:w-20">
                                                    <img
                                                        src={product.photo}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover rounded-md shadow-sm"
                                                    />
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle font-medium">{product.name}</td>
                                            <td className="p-4 align-middle">{product.category}</td>
                                            <td className="p-4 align-middle">{product.brand}</td>
                                            <td className="p-4 align-middle font-semibold text-green-600">
                                                ${product.price}
                                            </td>
                                            <td className="p-4 align-middle">
                                                <span className={`px-2 py-1 rounded text-xs font-semibold ${theme
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-yellow-900 text-yellow-200'
                                                }`}>
                                                    ⭐ {product.rating}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <div className="flex gap-2 items-center flex-wrap">
                                                    <Link to={`/product-Details/${product._id}`}>
                                                        <CommonButton className="flex items-center gap-2 py-2 px-3 text-xs sm:text-sm">
                                                            <CgNotes className="text-sm" />
                                                            Details
                                                        </CommonButton>
                                                    </Link>
                                                    <Link to={`/update-Product/${product._id}`}>
                                                        <CommonButton className="flex items-center gap-2 py-2 px-3 text-xs sm:text-sm">
                                                            Update
                                                        </CommonButton>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination for Table View */}
                        <div className="flex flex-col items-center gap-4 mt-8">
                            <p className={`${theme ? 'text-[#3E3F29]' : 'text-[#7D8D86]'} font-medium`}>
                                Page {currentPage} of {totalPages}
                            </p>

                            <div className="flex justify-center items-center gap-1 sm:gap-2 flex-wrap">
                                <CommonButton
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm`}
                                >
                                    <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
                                    <span className="hidden sm:inline">Previous</span>
                                </CommonButton>

                                <div className="flex gap-1 flex-wrap justify-center max-w-xs sm:max-w-full">
                                    {totalPages <= 5 ? (
                                        Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => goToPage(page)}
                                                className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-medium transition-all text-xs sm:text-sm border ${
                                                    page === currentPage
                                                        ? theme 
                                                            ? 'border-[#3E3F29] bg-[#3E3F29] text-white' 
                                                            : 'border-[#7D8D86] bg-[#7D8D86] text-black'
                                                        : theme 
                                                            ? 'border-[#3E3F29] text-[#3E3F29] hover:bg-[#3E3F29] hover:text-white' 
                                                            : 'border-[#7D8D86] text-[#7D8D86] hover:bg-[#7D8D86] hover:text-black'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))
                                    ) : (
                                        <>
                                            {currentPage > 2 && (
                                                <button
                                                    onClick={() => goToPage(1)}
                                                    className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-medium transition-all text-xs sm:text-sm border ${
                                                        theme 
                                                            ? 'border-[#3E3F29] text-[#3E3F29] hover:bg-[#3E3F29] hover:text-white' 
                                                            : 'border-[#7D8D86] text-[#7D8D86] hover:bg-[#7D8D86] hover:text-black'
                                                    }`}
                                                >
                                                    1
                                                </button>
                                            )}
                                            {currentPage > 3 && <span className={`px-1 ${theme ? 'text-[#3E3F29]' : 'text-[#7D8D86]'}`}>...</span>}

                                            {[currentPage - 1, currentPage, currentPage + 1].map((page) => {
                                                if (page > 0 && page <= totalPages) {
                                                    return (
                                                        <button
                                                            key={page}
                                                            onClick={() => goToPage(page)}
                                                            className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-medium transition-all text-xs sm:text-sm border ${
                                                                page === currentPage
                                                                    ? theme 
                                                                        ? 'border-[#3E3F29] bg-[#3E3F29] text-white' 
                                                                        : 'border-[#7D8D86] bg-[#7D8D86] text-black'
                                                                    : theme 
                                                                        ? 'border-[#3E3F29] text-[#3E3F29] hover:bg-[#3E3F29] hover:text-white' 
                                                                        : 'border-[#7D8D86] text-[#7D8D86] hover:bg-[#7D8D86] hover:text-black'
                                                            }`}
                                                        >
                                                            {page}
                                                        </button>
                                                    );
                                                }
                                                return null;
                                            })}

                                            {currentPage < totalPages - 2 && <span className={`px-1 ${theme ? 'text-[#3E3F29]' : 'text-[#7D8D86]'}`}>...</span>}
                                            {currentPage < totalPages - 1 && (
                                                <button
                                                    onClick={() => goToPage(totalPages)}
                                                    className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-medium transition-all text-xs sm:text-sm border ${
                                                        theme 
                                                            ? 'border-[#3E3F29] text-[#3E3F29] hover:bg-[#3E3F29] hover:text-white' 
                                                            : 'border-[#7D8D86] text-[#7D8D86] hover:bg-[#7D8D86] hover:text-black'
                                                    }`}
                                                >
                                                    {totalPages}
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>

                                <CommonButton
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm`}
                                >
                                    <span className="hidden sm:inline">Next</span>
                                    <ChevronRight size={16} className="sm:w-5 sm:h-5" />
                                </CommonButton>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AllProducts;