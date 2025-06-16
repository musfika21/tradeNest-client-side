import React from 'react';
import { Link } from 'react-router';

const Card = ({ cat }) => {

    console.log(cat.slug)
    return (
        <>
            <Link to={`/category/${cat.slug}`}>
                <div
            className="bg-white rounded-xl overflow-hidden border border-[#6F0E18] shadow-md hover:shadow-lg transition duration-300 transform hover:scale-[1.02] cursor-pointer"
        >
            <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 bg-white">
                <h3 className=" font-semibold text-center text-gray-800">{cat.name}</h3>
            </div>
        </div>
            </Link>
        </>
    );
};

export default Card;