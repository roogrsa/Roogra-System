import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import MainTable from '../../components/lastnews/MainTable';
import useAllProducts from '../../hooks/useAllProducts'; // Updated hook
import useBanProduct from '../../hooks/useBanProduct';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import useHandleAction from '../../hooks/useHandleAction';
import Pagination from '../../components/pagination/Pagination';
import axiosInstance from '../../axiosConfig/instanc';
import { useTranslation } from 'react-i18next';
import ImageWithFullscreen from '../../components/Fullscreen/Fulllscreen';

const NotBannedIconSrc = '/unblock.svg';
const BannedIconSrc = '/block.svg';
const CheckboxIconSrc = '/checkbox.svg';
const EditIconSrc = '/Edit.svg';

const Products: React.FC = () => {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(0);
  const { products, loading, error } = useAllProducts(currentPage);
  const { banProduct, loadingPrdBan, banPrdError } = useBanProduct();
  const { handleAction, loading: actionLoading } = useHandleAction();

  const navigate = useNavigate();
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    const fetchProductsCount = async () => {
      try {
        const response = await axiosInstance.get(`/api/products/count`);
        setProductsCount(response.data.data.count / 8);
      } catch (err) {}
    };
    fetchProductsCount();
  }, []);
  const totalPages = Math.ceil(productsCount);
  // console.log(totalPages);

  // console.log(totalPages);

  // Handle loading and error states for fetching products
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error}</p>;

  // Handle the click on the edit icon to navigate to the product edit page
  const handleEditClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const handleClickName = (authorId: number) => {
    navigate(`/profile/${authorId}`);
  };

  // Handle ban/unban action
  const handleBan = (productId: number, isBanned: boolean) => {
    handleAction(productId, isBanned, 'ban', banProduct, {
      confirmButtonClass: 'bg-BlockIconBg',
      cancelButtonClass: 'bg-gray-300',
    });
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
          content: (
            <span
              className="cursor-pointer dark:text-[#32E26B] text-[#0E1FB2]"
              onClick={() => handleClickName(product.author_id)}
            >
              {product.author.split(' ').slice(0, 2).join(' ').slice(0, 12)}
            </span>
          ),
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
            <ImageWithFullscreen
              src={product.thumbnail}
              alt="Transaction"
              className="w-10 h-10 object-cover"
            />
            // <img
            //   src={product.thumbnail}
            //   alt={product.product_name}
            //   className="w-10 h-10 object-cover"
            // />
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
              className={`w-8 h-8 text-center p-1 cursor-pointer ${
                actionLoading ? 'opacity-50' : ''
              }`}
              onClick={() =>
                !actionLoading && handleBan(product.id, product.is_banned === 1)
              }
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
            />
          ),
          className: 'flex justify-center',
        },
      ],
    };
  });
  const headers = [
    { key: 'id', content: t('products.id'), className: 'text-center' },
    { key: 'name', content: t('products.name'), className: 'text-center' },
    { key: 'date', content: t('products.date'), className: 'text-center' },
    { key: 'time', content: t('products.time'), className: 'text-center' },
    {
      key: 'category',
      content: t('products.category'),
      className: 'text-center',
    },
    {
      key: 'ProdName',
      content: t('products.ProdName'),
      className: 'text-center',
    },
    { key: 'photo', content: t('products.photo'), className: 'text-center' },
    { key: 'Edit', content: t('products.Edit'), className: 'text-center' },
    {
      key: 'BanStatus',
      content: t('products.BanStatus'),
      className: 'text-center',
    },
    {
      key: 'removeStatus',
      content: (
        <img
          src={CheckboxIconSrc}
          alt="Remove"
          className={`w-5 h-5 text-center cursor-pointer ${
            loadingPrdBan ? 'opacity-50' : ''
          }`}
        />
      ),
      className: 'text-center flex justify-center',
    },
  ];

  // const headers = [
  //   { key: 'id', content: 'رقم الاعلان', className: 'text-center' },
  //   { key: 'name', content: 'أسم المعلن', className: 'text-center' },
  //   { key: 'alias', content: 'التاريخ', className: 'text-center' },
  //   { key: 'type', content: 'الوقت', className: 'text-center' },
  //   { key: 'regDate', content: 'القسم', className: 'text-center' },
  //   { key: 'mobileconfirm', content: 'أسم الاعلان', className: 'text-center' },
  //   { key: 'emailleconfirm', content: 'الصورة', className: 'text-center' },
  //   { key: 'emailleconfirm', content: 'تحرير', className: 'text-center' },
  //   { key: 'BanStatus', content: 'الحالة', className: 'text-center' },
  //   {
  //     key: 'removeStatus',
  //     content: (
  //       <img
  //         src={CheckboxIconSrc}
  //         alt="Remove"
  //         className={`w-5 h-5 text-center cursor-pointer ${
  //           loadingPrdBan ? 'opacity-50' : ''
  //         }`}
  //       />
  //     ),
  //     className: 'text-center flex justify-center',
  //   },
  // ];

  const breadcrumbLinks = [{ label: t('products.label.label'), path: '/' }];

  return (
    <>
      <Breadcrumb
        breadcrumbLinks={breadcrumbLinks}
        pageName={t('products.label.pageNameAll')}
        // product={product}
      />

      {banPrdError && <p>Error banning product: {banPrdError}</p>}
      <MainTable logs={logs} headers={headers} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default Products;
