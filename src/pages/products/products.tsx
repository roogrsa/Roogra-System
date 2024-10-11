import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import MainTable from '../../components/lastnews/MainTable';
import useAllProducts from '../../hooks/useAllProducts'; // Updated hook
import useBanProduct from '../../hooks/useBanProduct';

const NotBannedIconSrc = './../../../public/unblock.svg';
const EditIconSrc = './../../../public/Edit.svg';
const BannedIconSrc = './../../../public/block.svg';
const CheckboxIconSrc = './../../../public/checkbox.svg';

const Products: React.FC = () => {
  const { products, loading, error } = useAllProducts();
  const { banProduct, loadingPrdBan, banPrdError } = useBanProduct();
  const navigate = useNavigate();

  // Handle loading and error states for fetching products
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error}</p>;

  const handleBanClick = async (productId: number) => {
    const reason = prompt('Enter the reason for banning the product:');
    if (reason) {
      try {
        await banProduct(productId, reason);
        alert(`Product ${productId} has been banned for: ${reason}`);
        window.location.reload();
      } catch (err) {
        alert(`Failed to ban product: ${banPrdError}`);
      }
    }
  };

  // Handle the click on the edit icon to navigate to the product edit page
  const handleEditClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  // Transform the product data to fit the format that MainTable expects
  const logs = products.map((product) => {
    const createdAtDate = new Date(product.date);
    const datePart = createdAtDate.toLocaleDateString();
    const timePart = createdAtDate.toLocaleTimeString();

    return {
      id: product.id,
      type: 2,
      columns: [
        {
          key: 'id',
          content: product.id,
          className: 'flex justify-center',
        },
        {
          key: 'author',
          content: product.author.split(' ').slice(0, 2).join(' ').slice(0, 12),
          className: 'text-TextBlue dark:text-TextGreen',
        },
        { key: 'created_at_date', content: datePart, className: 'date-class' },
        { key: 'created_at_time', content: timePart, className: 'time-class' },
        {
          key: 'category',
          content: product.category_name,
          className: 'flex justify-center',
        },
        {
          key: 'product_name',
          content: product.product_name
            .split(' ')
            .slice(0, 2)
            .join(' ')
            .slice(0, 12),
          className: 'flex justify-center',
        },
        {
          key: 'thumbnail',
          content: (
            <img
              src={product.thumbnail}
              alt={product.product_name}
              className="w-10 h-10 object-cover"
            />
          ),
          className: 'flex justify-center',
        },
        {
          key: 'Edit',
          content: (
            <div className="bg-EditIconBg rounded-md">
              <img
                src={EditIconSrc}
                className="w-6 h-6 text-center p-1 cursor-pointer"
                onClick={() => handleEditClick(product.id)}
              />
            </div>
          ),
          className: 'flex justify-center',
        },
        {
          key: 'isBanned',
          content: (
            <img
              src={product.is_banned === 0 ? NotBannedIconSrc : BannedIconSrc}
              alt={product.is_banned === 0 ? 'Not Banned' : 'Banned'}
              className={`w-6 h-6 text-center cursor-pointer ${
                loadingPrdBan ? 'opacity-50' : ''
              }`}
              onClick={() => !loadingPrdBan && handleBanClick(product.id)}
            />
          ),
          className: 'flex justify-center',
        },
        {
          key: 'remove',
          content: (
            <img
              src={CheckboxIconSrc}
              alt="Remove"
              className={`w-5 h-5 text-center cursor-pointer ${
                loadingPrdBan ? 'opacity-50' : ''
              }`}
              // onClick={() => handleDelete(product.id)}
            />
          ),
          className: 'flex justify-center',
        },
      ],
    };
  });

  const headers = [
    { key: 'id', content: 'رقم الاعلان', className: 'text-center' },
    { key: 'name', content: 'أسم المعلن', className: 'text-center' },
    { key: 'alias', content: 'التاريخ', className: 'text-center' },
    { key: 'type', content: 'الوقت', className: 'text-center' },
    { key: 'regDate', content: 'القسم', className: 'text-center' },
    { key: 'mobileconfirm', content: 'أسم الاعلان', className: 'text-center' },
    { key: 'emailleconfirm', content: 'الصورة', className: 'text-center' },
    { key: 'emailleconfirm', content: 'تحرير', className: 'text-center' },
    { key: 'BanStatus', content: 'الحالة', className: 'text-center' },
    {
      key: 'removeStatus',
      content: (
        <img
          src={CheckboxIconSrc}
          alt="Remove"
          className={`w-5 h-5 text-center cursor-pointer ${
            loadingPrdBan ? 'opacity-50' : ''
          }`}
          // onClick={() => handleDelete(product.id)}
        />
      ),
      className: 'text-center flex justify-center',
    },
  ];

  return (
    <>
      {banPrdError && <p>Error banning product: {banPrdError}</p>}
      <MainTable logs={logs} headers={headers} />
    </>
  );
};

export default Products;
