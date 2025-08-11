import React from "react";
import { FaRegStar } from "react-icons/fa";
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
        <section
            className={`pt-16 px-4 transition-colors`}
        >
            <div className="max-w-11/12 mx-auto text-center">
                <h2
                    className={`text-3xl sm:text-4xl font-bold mb-2 ${theme ? "text-[#3E3F29]" : "text-[#BCA88D]"
                        }`}
                >
                    What Our Clients Say
                </h2>
                <p
                    className={`mb-12 ${theme ? "text-gray-600" : "text-gray-300"
                        }`}
                >
                    See how TradeNest is helping businesses grow with reliable wholesale
                    solutions.
                </p>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className={`rounded-2xl p-6 text-left hover:shadow-xl transition-shadow ${theme ? "bg-[#f9f4f4]" : "bg-[#343434]"
                                }`}
                        >
                            <div className="flex items-center mb-4">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full object-cover mr-4"
                                />
                                <div>
                                    <h3
                                        className={`text-lg font-semibold ${theme ? "text-gray-800" : "text-gray-200"
                                            }`}
                                    >
                                        {review.name}
                                    </h3>
                                    <p
                                        className={`text-sm ${theme ? "text-gray-500" : "text-gray-400"
                                            }`}
                                    >
                                        {review.role}
                                    </p>
                                </div>
                            </div>

                            <div className="flex mb-3">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                    <FaRegStar
                                        key={i}
                                        size={18}
                                        className="text-yellow-400 fill-yellow-400"
                                    />
                                ))}
                            </div>

                            <p
                                className={`${theme ? "text-gray-600" : "text-gray-300"
                                    }`}
                            >
                                {review.review}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
