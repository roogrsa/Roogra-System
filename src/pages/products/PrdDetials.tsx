import React from 'react';
import AdvertisementForm from '../../components/products/AdvertisementForm';
import useProduct from '../../hooks/useGetProduct';
const BlockIcon = './../../../public/unblock.svg';
const { product, loading, error } = useProduct();

const PrdDetials = () => {
  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error loading product: {error}</p>;
  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-xl font-bold text-right ">إعلانات / تحرير</h1>
        <div className="bg-BlockIconBg rounded-md">
          <img
            src={BlockIcon}
            className="w-6 h-6 text-center p-1 m-1  cursor-pointer"
            // onClick={() => handleEditClick(product.id)}
          />
        </div>
      </div>
      <AdvertisementForm product={product} />
    </div>
  );
};

export default PrdDetials;
