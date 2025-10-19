import React from "react";
import { FaRegStar, FaStar, FaQuoteLeft } from "react-icons/fa";
import useAuth from "../../CustomHooks/UseAuth";

const reviews = [
    {
        id: 1,
        name: "Rahim Uddin",
        role: "Wholesale Buyer",
        image: "https://i.pravatar.cc/100?img=1",
        rating: 5,
        review:
            "TradeNest has completely streamlined my wholesale purchasing process. The prices are competitive, and the service is top-notch.",
    },
    {
        id: 2,
        name: "Amina Khatun",
        role: "Retail Store Owner",
        image: "https://i.pravatar.cc/100?img=2",
        rating: 4,
        review:
            "Excellent platform with a wide variety of products. I can source all my stock from one place now. Highly recommended!",
    },
    {
        id: 3,
        name: "Karim Hasan",
        role: "Distributor",
        image: "https://i.pravatar.cc/100?img=3",
        rating: 5,
        review:
            "The ordering process is smooth, and the delivery is always on time. TradeNest has earned my trust.",
    },
];

const Reviews = () => {
    const { theme } = useAuth();

    return (
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 transition-colors relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-20 ${theme ? "bg-[#7D8D86]" : "bg-[#BCA88D]"}`}></div>
                <div className={`absolute bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-10 ${theme ? "bg-[#3E3F29]" : "bg-[#7D8D86]"}`}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className={`h-px w-8 ${theme ? "bg-[#7D8D86]" : "bg-[#BCA88D]"}`}></div>
                        <span className={`text-sm uppercase tracking-wider font-semibold ${theme ? "text-[#7D8D86]" : "text-[#BCA88D]"}`}>
                            Testimonials
                        </span>
                        <div className={`h-px w-8 ${theme ? "bg-[#7D8D86]" : "bg-[#BCA88D]"}`}></div>
                    </div>
                    
                    <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${theme ? "text-[#3E3F29]" : "text-[#BCA88D]"}`}>
                        What Our Clients Say
                    </h2>
                    
                    <p className={`text-base sm:text-lg max-w-2xl mx-auto ${theme ? "text-gray-600" : "text-gray-400"}`}>
                        See how TradeNest is helping businesses grow with reliable wholesale solutions
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((review, index) => (
                        <div
                            key={review.id}
                            className={`group relative rounded-2xl p-8 text-left transition-all duration-500 hover:-translate-y-2 ${
                                theme 
                                    ? "bg-white shadow-lg hover:shadow-2xl border border-gray-100" 
                                    : "bg-[#2a2a2a] shadow-xl hover:shadow-2xl border border-[#3a3a3a]"
                            }`}
                            style={{
                                animationDelay: `${index * 100}ms`,
                            }}
                        >
                            {/* Quote Icon */}
                            <div className={`absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300`}>
                                <FaQuoteLeft size={48} className={theme ? "text-[#7D8D86]" : "text-[#BCA88D]"} />
                            </div>

                            {/* Profile Section */}
                            <div className="flex items-start mb-6 relative z-10">
                                <div className="relative">
                                    <img
                                        src={review.image}
                                        alt={review.name}
                                        className="w-16 h-16 rounded-full object-cover ring-4 ring-offset-2 transition-transform duration-300 group-hover:scale-110"
                                        style={{
                                            ringColor: theme ? "#7D8D86" : "#BCA88D",
                                            ringOffsetColor: theme ? "#ffffff" : "#2a2a2a"
                                        }}
                                    />
                                    {/* Online Indicator */}
                                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2"
                                        style={{ borderColor: theme ? "#ffffff" : "#2a2a2a" }}
                                    ></div>
                                </div>
                                
                                <div className="ml-4 flex-1">
                                    <h3 className={`text-lg font-bold ${theme ? "text-gray-900" : "text-gray-100"}`}>
                                        {review.name}
                                    </h3>
                                    <p className={`text-sm ${theme ? "text-[#7D8D86]" : "text-[#BCA88D]"} font-medium`}>
                                        {review.role}
                                    </p>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    i < review.rating ? (
                                        <FaStar
                                            key={i}
                                            size={18}
                                            className="text-yellow-400 drop-shadow-sm transition-transform duration-200 hover:scale-125"
                                        />
                                    ) : (
                                        <FaRegStar
                                            key={i}
                                            size={18}
                                            className={`${theme ? "text-gray-300" : "text-gray-600"}`}
                                        />
                                    )
                                ))}
                                <span className={`ml-2 text-sm font-semibold ${theme ? "text-gray-700" : "text-gray-300"}`}>
                                    {review.rating}.0
                                </span>
                            </div>

                            {/* Review Text */}
                            <p className={`text-sm sm:text-base leading-relaxed ${theme ? "text-gray-600" : "text-gray-300"}`}>
                                "{review.review}"
                            </p>

                            {/* Bottom Accent Line */}
                            <div className={`absolute bottom-0 left-0 w-full h-1 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
                                theme ? "bg-gradient-to-r from-[#7D8D86] to-[#3E3F29]" : "bg-gradient-to-r from-[#BCA88D] to-[#7D8D86]"
                            }`}></div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <p className={`text-sm ${theme ? "text-gray-500" : "text-gray-400"} mb-4`}>
                        Trusted by 500+ businesses worldwide
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar key={star} className="text-yellow-400" size={20} />
                        ))}
                        <span className={`ml-2 font-semibold ${theme ? "text-gray-700" : "text-gray-300"}`}>
                            4.9 out of 5
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;