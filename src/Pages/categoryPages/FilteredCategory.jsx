import { useLoaderData } from 'react-router';

const FilteredCategory = () => {
  const products = useLoaderData();
  
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {
        products?.length === 0 ?
          <div>
            <h2>there is not product on this category</h2>
          </div>
          :
          <>
            <h2 className="text-2xl font-bold mb-6">
              Products in "{products[0].category}"
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {products.map(product => (
                <div className="bg-white rounded-xl overflow-hidden border border-[#6F0E18] shadow-md hover:shadow-lg transition duration-300 transform hover:scale-[1.02] cursor-pointer">

                  {/* Product Image */}
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={product.photo}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4 bg-white space-y-1.5">
                    <h3 className="text-lg font-bold text-[#6F0E18]">{product.name}</h3>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Brand:</span> {product.brand}</p>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Category:</span> {product.category}</p>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Min Qty:</span> {product.minimum_selling_quantity}</p>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Price:</span> ${product.price}</p>

                    <p className="text-xs text-gray-500 italic mt-2">
                      {product.description?.slice(0, 80)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
      }
    </div>
  );
};

export default FilteredCategory;
