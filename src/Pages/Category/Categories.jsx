import React from 'react';
import Card from './Card';

const categories = [
  {
    name: "Electronics & Gadgets",
    image: "https://i.ibb.co/BKFQK9ZH/47-Modern-Small-Living-Room-Styles-to-Inspire-You.jpg"
  },
  {
    name: "Home & Kitchen Appliances",
    image: "https://i.ibb.co/JWjJnB61/Arafed-kitchen-appliances-and-appliances-are-arranged-in-a-row-generative-ai-Premium-AI-generated-im.jpg"
  },
  {
    name: "Fashion & Apparel",
    image: "https://i.ibb.co/Mypy9sn3/download-13.jpg"
  },
  {
    name: "Industrial Machinery & Tools",
    image: "https://i.ibb.co/BKBCrCCn/Free-Robotic-Assembly-Line-Image-Download-at-Stock-Cake.jpg"
  },
  {
    name: "Health & Beauty",
    image: "https://i.ibb.co/VW0ddWkr/download-14.jpg"
  },
  {
    name: "Automotive Parts & Accessories",
    image: "https://i.ibb.co/v408yC27/Automotive-Parts-Clipart-Hd-PNG-Automotive-Engine-Parts-Auto-Parts-Car-Accessories-PNG-Image-For-Fre.jpg"
  },
  {
    name: "Office Supplies & Stationery",
    image: "https://i.ibb.co/ynRNVYTv/Luxury-Office-Supplies-for-Entrepreneurs.jpg"
  }
];

const Categories = () => {
  return (
    <div className="bg-[#fef1f1] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <Card 
              key={index}
              cat={cat}
            ></Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
