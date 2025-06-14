import React from 'react';

const Card = ({ cat }) => {
    return (
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
                <h3 className="text-lg font-semibold text-center text-gray-800">{cat.name}</h3>
            </div>
        </div>
    );
};

export default Card;