import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Link } from 'react-router-dom';
import { CgAddR } from 'react-icons/cg';
import { useTranslation } from 'react-i18next';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axiosInstance from '../../axiosConfig/instanc';
import { FiEdit3 } from 'react-icons/fi';
import { LiaEditSolid } from 'react-icons/lia';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import EditAddPopup from '../../components/popups/EditAddPopup';
import DeletePopup from '../../components/popups/DeletePopup';
import EditAddImgPopup from '../../components/popups/EditAddImgPopup';
import { toast } from 'react-toastify';

interface SubscriptionsCategory {
  parent_id: number;
  category_name: string;
  parent_image: string;
  sub: {
    parent_sort_order: number;
    category_id: number;
    category_name: string;
  }[];
}
interface SubCategory {
  category_id: number;
  category_name: string;
}
type ModalType =
  | 'DeleteParent'
  | 'AddParent'
  | 'EditParent'
  | 'DeleteSub'
  | 'AddSub'
  | 'EditSub'
  | null;
const SubscriptionsCat: React.FC = () => {
  const { t } = useTranslation();
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<SubscriptionsCategory | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);
  const [subscriptionscategories, setSubscriptionscategories] = useState<
    SubscriptionsCategory[]
  >([]);
  const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(
    null,
  );

  // const displaySubscriptionsCat = async () => {
  //   try {
  //     const res = await axiosInstance.get(`/api/categories/extensive`);
  //     setSubscriptionscategories(res.data.data);
  //   } catch (error: any) {
  //     console.error(error);
  //     toast.error(
  //       error?.response?.data?.message || t('categoriesPage.fetchError'),
  //     );
  //   }
  // };
  const displaySubscriptionsCat = async () => {
    try {
      const res = await axiosInstance.get(`/api/categories/extensive`);
      const categories = res.data.data;
  
      // Sort subcategories by parent_sort_order
      const sortedCategories = categories.map((category: SubscriptionsCategory) => ({
        ...category,
        sub: category.sub.sort((a, b) => a.parent_sort_order - b.parent_sort_order),
      }));
  
      setSubscriptionscategories(sortedCategories);
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || t('categoriesPage.fetchError'),
      );
    }
  };
  
  useEffect(() => {
    displaySubscriptionsCat();
  }, []);

  const openModal = (
    type: ModalType,
    category: SubscriptionsCategory | SubCategory | null,
  ) => {
    setModalType(type);
    if ('parent_id' in (category || {})) {
      setSelectedCategory(category as SubscriptionsCategory);
    } else if (!category) {
      setSelectedCategory(null);
    } else {
      setSelectedSubCategory(category as SubCategory);
    }
  };

  const changeOrder = async (categories: { id: number; order: number }[]) => {
    try {
      await axiosInstance.patch(`/api/categories`, { categories });
      toast.success(t('categoriesPage.categoriesToast'));
      displaySubscriptionsCat();
    } catch (error: any) {
      console.error("Error updating category order:", error);
      toast.error(
        error?.response?.data?.message || t('categoriesPage.orderUpdateError'),
      );
    }
  };

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) return;
    const categoryIndex = subscriptionscategories.findIndex(
      (cat) => cat.parent_id === expandedCategoryId,
    );
    if (categoryIndex === -1) return;
    const reorderedSubcategories = Array.from(
      subscriptionscategories[categoryIndex].sub,
    );
    const [movedSubcategory] = reorderedSubcategories.splice(source.index, 1);
    reorderedSubcategories.splice(destination.index, 0, movedSubcategory);
    const updatedCategories = [...subscriptionscategories];
    updatedCategories[categoryIndex].sub = reorderedSubcategories;
    setSubscriptionscategories(updatedCategories);
    const updatedOrders = reorderedSubcategories.map((subcategory, index) => ({
      id: subcategory.category_id,
      order: index + 1
    }));
    changeOrder(updatedOrders);
  };

  const toggleSubcategories = (parentId: number) => {
    setExpandedCategoryId(expandedCategoryId === parentId ? null : parentId);
  };

  const breadcrumbLinks = [
    { label: t('categoriesPage.title'), path: '/categories/main' },
  ];

  return (
    <div className="relative overflow-x-auto">
      <div className="flex justify-between">
        <Breadcrumb
          pageName={t('categoriesPage.catSubscriptions.label')}
          breadcrumbLinks={breadcrumbLinks}
        />
        <Link to={``}>
          <CgAddR
            className="text-3xl text-Input-TextGreen"
            role="button"
            onClick={() => openModal('AddParent', null)}
          />
        </Link>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="supCategories">
          {(provided) => (
            <div className="bg-secondaryBG-light dark:bg-secondaryBG-dark p-6 rounded-sm">
              {subscriptionscategories.map((cat) => (
                <table
                  key={cat.parent_id}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="w-full text-[20px] text-left rtl:text-right mb-7"
                >
                  <thead className="bg-[#EDEDED] dark:bg-[#3E3E46]">
                    <tr className="px-2 py-2 text-[18px] font-[400]">
                      <th
                        scope="col"
                        className="px-2 py-3 text-[18px] font-[400] rounded-s-lg"
                      >
                        {t('categoriesPage.order')}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <img src={cat.parent_image} width={100} alt="" />
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-[18px] font-[400]"
                      >
                        {cat.category_name}
                      </th>
                      <th
                        scope="col"
                        className="py-3"
                        onClick={() => openModal('AddSub', cat)}
                      >
                        <CgAddR
                          className="text-3xl text-Input-TextGreen"
                          role="button"
                        />
                      </th>
                      <th
                        scope="col"
                        className="py-3"
                        onClick={() => openModal('EditParent', cat)}
                      >
                        <LiaEditSolid
                          className="text-3xl text-Input-TextGreen"
                          role="button"
                        />
                      </th>
                      <th
                        scope="col"
                        className=" py-3"
                        onClick={() => openModal('DeleteParent', cat)}
                        role="button"
                      >
                        <RiDeleteBin6Line className="text-3xl text-Input-TextRed" />
                      </th>
                      <th
                        scope="col"
                        className=" py-3 rounded-e-lg"
                        role="button"
                        onClick={() => toggleSubcategories(cat.parent_id)}
                      >
                        {expandedCategoryId === cat.parent_id ? (
                          <IoMdArrowDropdown className="text-3xl" />
                        ) : (
                          <IoMdArrowDropup className="text-3xl" />
                        )}
                      </th>
                    </tr>
                  </thead>
                  {expandedCategoryId === cat.parent_id && (
                    <Droppable droppableId={`droppable-${cat.sub}`}>
                      {(provided) => (
                        <tbody
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {cat.sub.length ? (
                            cat.sub.map((sub, index) => (
                              <Draggable
                                key={`sub-${index}`}
                                draggableId={`sub-${sub.category_id}-${index}`}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <tr
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`${index % 2 !== 0
                                        ? 'dark:bg-MainTableBG-OddDark bg-MainTableBG-OddLight'
                                        : 'dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight'
                                      }
                                        dark:border-secondaryBG-light ${snapshot.isDragging
                                        ? 'bg-header-inputBorder'
                                        : ''
                                      }`}
                                  >
                                    <td className="px-2 py-4 font-[400] text-[17px]">
                                      #{index + 1}
                                    </td>
                                    <td className="px-2 py-4"></td>
                                    <td className="px-6 py-4 font-[400] text-[17px] text-gray-900 whitespace-nowrap dark:text-white">
                                      {sub.category_name}
                                    </td>
                                    <td className="px-2 py-4"></td>
                                    <td
                                      className="py-4"
                                      onClick={() => openModal('EditSub', sub)}
                                    >
                                      <FiEdit3
                                        className="text-xl text-Input-TextGreen"
                                        role="button"
                                      />
                                    </td>
                                    <td
                                      className="py-4"
                                      onClick={() =>
                                        openModal('DeleteSub', sub)
                                      }
                                    >
                                      <RiDeleteBin6Line
                                        className="text-xl text-Input-TextRed"
                                        role="button"
                                      />
                                    </td>
                                    <td className="py-4"></td>
                                  </tr>
                                )}
                              </Draggable>
                            ))
                          ) : (
                            <div className="font-semibold text-xl my-5">
                              {t('categoriesPage.catSubscriptions.noSub')}
                            </div>
                          )}
                          {provided.placeholder}
                        </tbody>
                      )}
                    </Droppable>
                  )}
                </table>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {modalType && (
        <>
          {modalType === 'DeleteParent' && selectedCategory && (
            <DeletePopup
              deleteName={selectedCategory.category_name}
              deleteId={selectedCategory.parent_id}
              url="categories"
              isModalOpen
              setIsModalOpen={() => setModalType(null)}
              display={displaySubscriptionsCat}
            />
          )}
          {modalType === 'AddParent' && (
            <EditAddImgPopup
              isPaid
              url="categories"
              isModalOpen
              setIsModalOpen={() => setModalType(null)}
              display={displaySubscriptionsCat}
            />
          )}
          {modalType === 'EditParent' && selectedCategory && (
            <EditAddImgPopup
              isPaid
              name={selectedCategory?.category_name}
              id={selectedCategory?.parent_id}
              url="categories"
              isModalOpen
              setIsModalOpen={() => setModalType(null)}
              display={displaySubscriptionsCat}
              imageUrl={selectedCategory?.parent_image}
            />
          )}
          {modalType === 'DeleteSub' && selectedSubCategory && (
            <DeletePopup
              deleteName={selectedSubCategory.category_name}
              deleteId={selectedSubCategory.category_id}
              url="categories"
              isModalOpen
              setIsModalOpen={() => setModalType(null)}
              display={displaySubscriptionsCat}
            />
          )}
          {modalType === 'EditSub' && selectedCategory && (
            <EditAddPopup
              name={selectedSubCategory?.category_name}
              id={selectedSubCategory?.category_id}
              url="categories"
              isModalOpen
              setIsModalOpen={() => setModalType(null)}
              display={displaySubscriptionsCat}
            />
          )}
          {modalType === 'AddSub' && selectedCategory && (
            <EditAddPopup
              url={`categories/${selectedCategory?.parent_id}`}
              isModalOpen
              setIsModalOpen={() => setModalType(null)}
              display={displaySubscriptionsCat}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SubscriptionsCat;
