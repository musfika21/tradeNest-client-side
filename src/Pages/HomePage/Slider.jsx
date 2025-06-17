import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { motion } from 'framer-motion';

import slide1 from '../../assets/bannerImages/slide1.jpg';
import slide2 from '../../assets/bannerImages/slide2.jpg';
import slide3 from '../../assets/bannerImages/slide3.jpg';

const slides = [
    {
        image: slide2,
        title: "Connect with Trusted Suppliers",
        subtitle: "Discover reliable wholesale vendors from around the country."
    },
    {
        image: slide1,
        title: "Expand Your Business Reach",
        subtitle: "Buy and sell products in bulk with ease and security."
    },
    {
        image: slide3,
        title: "Streamlined B2B Trade",
        subtitle: "Manage transactions, track orders, and grow efficiently."
    }
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const Slider = () => {
    return (
        <div className="h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden shadow-xl relative">
            <AwesomeSlider
                className="aws-btn"
                bullets={false}
                organicArrows={true}
                style={{ height: '100%' }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="relative w-full h-full">
                        <img
                            src={slide.image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-6 md:px-16 text-white">
                            <motion.h2
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-md"
                            >
                                {slide.title}
                            </motion.h2>
                            <motion.p
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.4 }}
                                className="text-sm md:text-lg font-medium drop-shadow-md"
                            >
                                {slide.subtitle}
                            </motion.p>
                        </div>
                    </div>
                ))}
            </AwesomeSlider>
        </div>
    );
};

export default Slider;
