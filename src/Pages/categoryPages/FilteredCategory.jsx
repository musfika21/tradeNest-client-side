import { useLoaderData} from 'react-router';

const FilteredCategory = () => {
  const  products = useLoaderData();
  console.log(products)



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
          <div key={product._id} className="bg-white p-4 shadow rounded-md">
            <img src={product.photo} alt={product.name} className="h-40 object-cover mb-3" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.brand}</p>
          </div>
        ))}
      </div>
      </>
      }
    </div>
  );
};

export default FilteredCategory;
