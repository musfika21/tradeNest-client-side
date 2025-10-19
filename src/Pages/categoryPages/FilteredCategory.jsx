import { useLoaderData } from 'react-router';
import ProductCard from '../allProduct/ProductCard';

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
                <>
                <ProductCard key={product._id} product={product}/>
                </>
              ))}
            </div>
          </>
      }
    </div>
  );
};

export default FilteredCategory;
