import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import ImageWithFullscreen from '../../components/Fullscreen/Fulllscreen';

const Tickectpopup = ({ item, isModalShow, setIsModalShow }) => {
  const closeModal = () => setIsModalShow(false);

  const navigate = useNavigate();
  const translateVerificationType = (type: string) => {
    switch (type) {
      case 'Identity Document':
        return 'بطاقة الهوية';
      case 'Freelancer Document':
        return 'وثيقة المستقل';
      case 'Commercial Register':
        return 'السجل التجاري';
      default:
        return type;
    }
  };
  const handleClickName = (customerId: number) => {
    navigate(`/profile/${customerId}`);
  };
  return (
    <div>
      {isModalShow && (
        <div
          id={`popup-modal_add_${item.verification_request_id}`}
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-screen bg-TheadBorder-light bg-opacity-20"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={closeModal}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
                  rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 
                 dark:hover:text-white"
              >
                <IoClose className="text-lg" onClick={closeModal} />
                {/* <span className="sr-only">Close modal</span> */}
              </button>
              <div className="text-center m-5">
                <h3 className="text-xl font-semibold text-text-light dark:text-text-dark m-5">
                  تحرير تذكرة القسم
                  <span className=" mx-4">
                    RD-{item.verification_request_id}
                  </span>
                </h3>
                <h3
                  onClick={() => handleClickName(item.customer_id)}
                  className="cursor-pointer text-xl m-3 font-semibold dark:text-TextGreen text-TextBlue"
                >
                  {item.customer_name}
                </h3>

                <div className="grid grid-cols-3 gap-2 w-full">
                  <div className="bg-primaryBG-light dark:bg-primaryBG-dark text-text-light dark:text-text-dark border border-Input-border p-2 rounded-lg">
                    <span className="block text-lg">بواسطة</span>
                    <span className="text-lg ">{item.verified_by}</span>
                  </div>
                  <div className="text-text-light dark:text-text-dark bg-primaryBG-light dark:bg-primaryBG-dark p-2 border border-Input-border rounded-lg">
                    <span className="block text-lg">الجهة</span>
                    <span className="text-lg ">
                      {/* {item.verification_type} */}
                      {translateVerificationType(item.verification_type)}
                    </span>
                  </div>
                  <div className="text-text-light dark:text-text-dark bg-primaryBG-light dark:bg-primaryBG-dark p-2 border border-Input-border rounded-lg">
                    <span className="block text-lg">رقم الجهة</span>
                    <span className="text-sm ">
                      {item.verification_type_number}
                    </span>
                  </div>
                  {/* <div className="bg-primaryBG-light dark:bg-primaryBG-dark text-text-light dark:text-text-dark border border-Input-border p-2 rounded-lg">
                    <span className="block text-lg">رقم التذكرة</span>
                    <span className="text-lg font-bold">
                      RD-{item.verification_request_id}
                    </span>
                  </div> */}
                </div>
                <div className="mt-4 flex justify-center p-2">
                  <div className="flex gap-2  rounded-lg">
                    <div className="border border-Input-border rounded-lg">
                      <span className="block text-lg text-text-light dark:text-text-dark mb-2">
                        صورة الجهة
                      </span>
                      <ImageWithFullscreen
                        src={`${item.verification_type_image}`}
                        alt="Transaction"
                        className="w-32 h-30 object-cover mx-auto my-2 rounded-md full-screen-image"
                      />
                    </div>
                    <div className="border border-Input-border rounded-lg">
                      <span className="block text-lg text-text-light dark:text-text-dark mb-2">
                        صورة التحويل
                      </span>
                      <ImageWithFullscreen
                        src={`${item.transaction_image}`}
                        alt="Transaction"
                        className="w-32 h-30 object-cover mx-auto my-2 rounded-md full-screen-image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tickectpopup;
