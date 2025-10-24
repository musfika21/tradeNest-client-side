import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { FaStar, FaEye, FaTrash, FaShoppingBag } from 'react-icons/fa';
import useAuth from '../../CustomHooks/UseAuth';

const Card = ({ product, onDelete }) => {
    const { theme } = useAuth();
    const { _id, name, photo, purchasedProduct, purchaseAmount, brand, price, category, description, rating, main_quantity } = product;

    const handleCancel = async () => {
        // Confirmation dialog
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            await axios.delete(`${import.meta.env.VITE_SERVER_API}/purchase/${_id}`);

            const patchRes = await axios.patch(`${import.meta.env.VITE_SERVER_API}/products/${purchasedProduct}`, {
                buyQuantity: Number(purchaseAmount),
            });
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Product deleted successfully',
                showConfirmButton: false,
                timer: 1500,
            });

            // Remove from UI
            if (onDelete) {
                onDelete(_id);
            }
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Failed to delete product',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
            theme 
                ? 'bg-white shadow-lg hover:shadow-2xl' 
                : 'bg-[#343434] shadow-xl hover:shadow-2xl'
        }`}>
            {/* Image Section with Gradient Overlay */}
            <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {photo ? (
                    <img
                        src={photo}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
                        <FaShoppingBag className="text-6xl opacity-30" />
                    </div>
                )}

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                    {category && (
                        <span className={`px-4 py-1.5 text-xs font-bold rounded-full backdrop-blur-md shadow-xl ${
                            theme 
                                ? 'bg-white/90 text-gray-900' 
                                : 'bg-black/50 text-white border border-white/20'
                        }`}>
                            {category}
                        </span>
                    )}
                </div>

                {/* Stock Badge */}
                {main_quantity !== undefined && (
                    <div className="absolute top-4 right-4 z-20">
                        <span className={`px-4 py-1.5 text-xs font-bold rounded-full backdrop-blur-md shadow-xl border ${
                            main_quantity > 10
                                ? 'bg-emerald-500/90 text-white border-emerald-400/50'
                                : main_quantity > 0
                                    ? 'bg-amber-500/90 text-white border-amber-400/50'
                                    : 'bg-red-500/90 text-white border-red-400/50'
                        }`}>
                            {main_quantity > 0 ? `${main_quantity} in stock` : 'Out of stock'}
                        </span>
                    </div>
                )}

                {/* Quick Action Buttons - Visible on Hover */}
                <div className="absolute bottom-4 right-4 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Link to={`/product-Details/${purchasedProduct || _id}`}>
                        <button className="p-3 bg-white/95 hover:bg-white cursor-pointer rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110">
                            <FaEye className="text-gray-900 text-sm" />
                        </button>
                    </Link>
                    <button 
                        onClick={() => handleCancel(_id)}
                        className="p-3 bg-red-500/95 hover:bg-red-600 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                    >
                        <FaTrash className="text-white text-sm" />
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                {/* Brand */}
                {brand && (
                    <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${
                        theme ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                        {brand}
                    </p>
                )}

                {/* Product Name */}
                <h3 className={`text-lg font-bold mb-2 line-clamp-2 min-h-[56px] leading-tight ${
                    theme ? 'text-gray-900' : 'text-white'
                }`}>
                    {name || 'Unnamed Product'}
                </h3>

                 {/* Purchased Amount */}
                {purchaseAmount && (
                    <div className={`mb-3 p-3 rounded-lg ${
                        theme ? 'bg-blue-50 border border-blue-200' : 'bg-blue-900/20 border border-blue-500/30'
                    }`}>
                        <p className={`text-xs font-medium mb-1 ${
                            theme ? 'text-blue-600' : 'text-blue-400'
                        }`}>
                            Purchased Quantity
                        </p>
                        <p className={`text-2xl font-bold ${
                            theme ? 'text-blue-700' : 'text-blue-300'
                        }`}>
                            {purchaseAmount} {purchaseAmount > 1 ? 'units' : 'unit'}
                        </p>
                    </div>
                )}

                {/* Description */}
                <p className={`text-sm mb-4 line-clamp-2 leading-relaxed ${
                    theme ? 'text-gray-600' : 'text-gray-400'
                }`}>
                    {description || 'No description available.'}
                </p>

                {/* Price & Rating Section */}
                <div className="flex items-center justify-between mb-5">
                    {/* Price with Currency Symbol */}
                    <div>
                        <p className={`text-xs font-medium mb-1 ${
                            theme ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                            Price
                        </p>
                        <div className="flex items-baseline gap-1">
                            <span className={`text-3xl font-bold ${
                                theme ? 'text-gray-900' : 'text-white'
                            }`}>
                                ${price?.toFixed(0) || '0'}
                            </span>
                            <span className={`text-lg font-semibold ${
                                theme ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                                .{(price % 1).toFixed(2).slice(2)}
                            </span>
                        </div>
                    </div>

                    {/* Rating */}
                    {rating && (
                        <div className="flex flex-col items-end">
                            <p className={`text-xs font-medium mb-1 ${
                                theme ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                                Rating
                            </p>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400">
                                <FaStar className="text-white text-sm drop-shadow" />
                                <span className="text-sm font-bold text-white">
                                    {rating.toFixed(1)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;