import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import slide1 from '../../assets/bannerImages/slide1.png';
import slide2 from '../../assets/bannerImages/slide2.png';
import slide3 from '../../assets/bannerImages/slide3.png';
import slide4 from '../../assets/bannerImages/slide4.png';
import slide5 from '../../assets/bannerImages/slide5.png';
import slide6 from '../../assets/bannerImages/slide6.png';
import CommonButton from "../../Shared/CommonButton";
import { Link } from "react-router";
import useAuth from "../../CustomHooks/UseAuth";

const Slider = () => {
    
    const {theme} = useAuth();

    const slides = [
        { 
            img: slide1, 
            title: "Welcome to Our Marketplace", 
            subtitle: "Find the best products from trusted vendors",
            text: "Check out Products",
            link: "all-products"
        },
        { 
            img: slide2, 
            title: "Wholesale Clothing Hub", 
            subtitle: "Bulk fashion at unbeatable prices – for retailers, boutiques, and resellers.",
            text: "Explore Collections",
            link: "category/fashion_&_apparel"
        },
        { 
            img: slide3, 
            title: "Home & Kitchen Essentials", 
            subtitle: "Everything you need to cook, clean, and create a cozy home – all in one place.",
            text: "Shop Now",
            link: "category/home_&_kitchen_appliances"
        },
        { 
            img: slide4, 
            title: "Smart Electronics & Gadgets", 
            subtitle: "Latest tech, top quality, and bulk deals for your business.",
            text: "Shop Now",
            link: "category/electronics_&_gadgets"
        },
        { 
            img: slide6, 
            title: "Healthy Living & Natural Beauty", 
            subtitle: "Nourish your body, glow naturally – premium food & beauty products in one place.",
            text: "Shop Now",
            link: "category/health_&_beauty"
        },
        { 
            img: slide5, 
            title: "For More Deals & Offers", 
            subtitle: "Discover exclusive discounts and latest arrivals tailored for your business.",
            text: "See More",
            link: "category/home_&_kitchen_appliances"
        },
    ];

    return (
        <div className="w-11/12 mx-auto">
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[ Pagination, Navigation]}
                className="mySwiper"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="h-[90vh] bg-cover bg-center relative"
                            style={{ backgroundImage: `url(${slide.img})` }}
                        >
                            {/* Full Overlay */}
                            <div className="absolute inset-0 bg-black/40"></div>

                            {/* Text Box */}
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-2 sm:px-4">
                                <div className={`${theme ? "bg-white/60" : "bg-black/60"} rounded-lg py-4 px-4 sm:py-6 sm:px-8 md:py-8 md:px-12 lg:px-16 max-w-[90%] sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-2xl`}>
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold">{slide.title}</h1>
                                    <p className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl xl:text-xl">{slide.subtitle}</p>
                                    <CommonButton className="mt-2 sm:mt-3"><Link to={slide.link}>{slide.text}</Link></CommonButton>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;