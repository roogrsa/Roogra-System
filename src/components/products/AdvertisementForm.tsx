import React, { useState, useEffect } from 'react';
import { FaTrash, FaSave } from 'react-icons/fa';
import ReusableInput from './ReusableInput';
import ReusableSelect from './ReusableSelectProps';
import useProduct from '../../hooks/useGetProduct';
import { FaMinus } from 'react-icons/fa';

const AdvertisementForm: React.FC = () => {
  const { product, loading, error } = useProduct();
  const [status, setStatus] = useState<string>('Active');
  const [price, setPrice] = useState<number>(0);
  const [adName, setAdName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState<string>('');

  useEffect(() => {
    if (product) {
      console.log('product', product);

      setAdName(product.product_name || 'N/A');
      setPrice(Number(product.price));
      setCategory(product.category_name || 'N/A');
      setDescription(product.oc_product_description_description || '');
      setImages(product.images || []);

      // Check if videos is defined and an array, then set the video
      setVideo(
        Array.isArray(product.videos) && product.videos.length > 0
          ? product.videos[0]
          : '',
      );

      setStatus(product.isActivated === 1 ? 'Active' : 'Inactive');
    }
  }, [product]);

  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error loading product: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto bg-secondaryBG-light dark:bg-secondaryBG-dark p-6 rounded-lg shadow-md">
      {/* Product ID */}
      <ReusableInput
        label="رقم الإعلان"
        type="text"
        value={product?.id?.toString() || 'N/A'} // Ensuring ID is displayed as string
        onChange={() => {}}
        extraClass="bg-Input-gray w-30"
      />

      {/* Category, Name, Price, Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ReusableSelect
          label="القسم"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={[
            { value: 'عطور', label: 'عطور' },
            { value: 'Furniture', label: 'أثاث' },
            { value: 'Electronics', label: 'الكترونيات' },
            { value: 'Clothing', label: 'ملابس' },
          ]}
          extraClass="bg-Input-blue text-black border border-Input-border"
        />
        <ReusableInput
          label="اسم الإعلان"
          type="text"
          value={adName}
          onChange={(e) => setAdName(e.target.value)}
          extraClass="bg-Input-blue"
        />
        <ReusableInput
          label="السعر"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          extraClass="bg-Input-blue"
        />
        <ReusableSelect
          label="حالة الإعلان"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={[
            { value: 'Active', label: 'مفعل' },
            { value: 'Inactive', label: 'غير مفعل' },
          ]}
          extraClass="bg-Input-green text-Input-borderGreen border border-Input-borderGreen"
        />
      </div>

      {/* Description */}
      <div className="mt-6">
        <label className="font-semibold mb-2 block">الوصف</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full p-2 border border-Input-border  dark:bg-secondaryBG-dark rounded-md"
        />
      </div>

      {/* Images Section */}
      {/* <div className="mt-6">
        <h3 className="font-semibold mb-4">الصور</h3>
        <div className="grid grid-cols-4 gap-4">
          {images && images.length > 0 ? (
            images.map((image, index) => (
              <div className="relative" key={index}>
                <img
                  src={image}
                  alt={`img-${index}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  onClick={() => handleDeleteImage(index)}
                >
                  <FaTrash />
                </button>
              </div>
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div> */}
      {/* Images Section */}
      <div className="mt-6">
        <h3 className="font-semibold mb-4">الصور</h3>
        <div className="grid grid-cols-4 gap-4">
          {images && images.length > 0 ? (
            images.map((image, index) => (
              <div className="flex flex-col items-center" key={index}>
                {/* Container for number and minus icon */}
                <div className="flex items-center bg-gray-100 justify-between w-full px-2 py-1 rounded-t-md">
                  {/* Number display */}
                  <div className=" text-center text-black px-2 py-1 text-xs font-bold rounded-full">
                    {index + 1}
                  </div>

                  {/* Delete button (with minus icon) */}
                  <button
                    className="bg-red-500 text-white p-1 -mt-5 rounded-full"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <FaMinus />
                  </button>
                </div>

                {/* Image element */}
                <img
                  src={image}
                  alt={`img-${index}`}
                  className="w-full h-30 -mt-1 object-cover rounded-lg"
                />
              </div>
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div>

      {/* Video Section */}
      <div className="mt-6">
        <h3 className="font-semibold mb-4">الفيديو</h3>
        <div className="grid grid-cols-4 gap-4">
          {video ? (
            <div className="flex flex-col items-center">
              {/* Container for number and minus icon */}
              <div className="flex items-center bg-gray-100 justify-between w-full px-2  rounded-t-md">
                {/* Number display */}
                <div className="text-center text-black px-2 py-1 text-xs font-bold rounded-full">
                  1
                </div>

                {/* Delete button (with minus icon) */}
                <button
                  className="bg-red-500 text-white p-1 -mt-5 rounded-full"
                  onClick={() => setVideo('')} // Removing the video
                >
                  <FaMinus />
                </button>
              </div>

              {/* Video element */}
              <video
                controls
                src={video}
                className="w-full h-30 object-cover  rounded-lg"
              />
            </div>
          ) : (
            <p>No video available</p>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-center ">
        <button className="text-white text-2xl bg-TextGreen py-2 px-6 rounded-lg flex items-center space-x-2">
          {/* <FaSave /> */}
          <img src="./../../../public/save.svg" />
          {/* <span>حفظ</span> */}
        </button>
      </div>
    </div>
  );
};

export default AdvertisementForm;
