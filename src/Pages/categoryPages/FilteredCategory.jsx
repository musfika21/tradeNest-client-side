import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const FilteredCategory = () => {
  const { categoryName } = useParams();
  console.log(categoryName)
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_API}/products/category`)
      .then((res) => {
        const filtered = res.data.filter(
          (product) => product.category === (categoryName)
        );
        setProducts(filtered);
      });
  }, [categoryName]);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">
        Products in "{(categoryName)}"
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product._id} className="bg-white p-4 shadow rounded-md">
            <img src={product.photo} alt={product.name} className="h-40 object-cover mb-3" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.brand}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilteredCategory;
