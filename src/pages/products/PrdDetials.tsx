// import React from 'react';
// import AdvertisementForm from '../../components/products/AdvertisementForm';
// import useProduct from '../../hooks/useGetProduct';
// import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

// const PrdDetials: React.FC = () => {
//   const { product, loading, error } = useProduct();

//   return (
//     <div>
//       <div className="flex justify-between ">
//         <Breadcrumb pageName="تحرير" product={product} />
//       </div>
//       {product && <AdvertisementForm product={product} />}
//     </div>
//   );
// };

// export default PrdDetials;
import React from 'react';
import AdvertisementForm from '../../components/products/AdvertisementForm';
import useProduct from '../../hooks/useGetProduct';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const PrdDetials: React.FC = () => {
  const { product, loading, error } = useProduct();

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error loading product: {error}</p>;
  const breadcrumbLinks = [{ label: 'الاعلانات/', path: '/' }];
  return (
    <div>
      <Breadcrumb
        breadcrumbLinks={breadcrumbLinks}
        pageName="تحرير"
        product={product}
      />

      {/*  */}
      {product && <AdvertisementForm product={product} />}
    </div>
  );
};

export default PrdDetials;
