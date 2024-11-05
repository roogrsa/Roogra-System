import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Link } from "react-router-dom";
import { CgAddR } from "react-icons/cg";
import { useTranslation } from "react-i18next";
import { RiDeleteBin6Line } from "react-icons/ri";
import axiosInstance from "../../axiosConfig/instanc";
import { FiEdit3 } from "react-icons/fi";
import { LiaEditSolid } from "react-icons/lia";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import EditAddPopup from "../../components/popups/EditAddPopup";
import DeletePopup from "../../components/popups/DeletePopup";
import EditAddImgPopup from "../../components/popups/EditAddImgPopup";
import { toast } from "react-toastify";

interface SubscriptionsCategory {
    parent_id: number;
    category_name: string;
    parent_image: string;
    sub: {
        category_id: number;
        category_name: string;
    }[]
}
interface SubCategory {
    category_id: number;
    category_name: string;
}

const SubscriptionsCat: React.FC = () => {
    const { t } = useTranslation();
    const [subscriptionscategories, setSubscriptionscategories] = useState<SubscriptionsCategory[]>([]);
    const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubModalOpen, setIsSubModalOpen] = useState(false);
    const [isAddParentModalOpen, setIsAddParentModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<SubscriptionsCategory | null>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
    const openDeleteGenericPopup = (category: SubscriptionsCategory | SubCategory) => {
        if ('parent_id' in category) {
            setSelectedCategory(category);
            setSelectedSubCategory(null);
            setIsModalOpen(true);
        } else {
            setSelectedSubCategory(category);
            setSelectedCategory(null);
            setIsSubModalOpen(true);
        }
    };
    const openGenericPopup = (category: SubscriptionsCategory | SubCategory) => {
        if ('parent_id' in category) {
            setSelectedCategory(category);
            setSelectedSubCategory(null);
        } else {
            setSelectedSubCategory(category);
            setSelectedCategory(null);
        }
        setIsAddModalOpen(true);
    };
    const openGenericParentPopup = (category: SubscriptionsCategory | null) => {
        if (category) {
            setSelectedCategory(category);
        } else {
            setSelectedCategory(null);
        }
        setIsAddParentModalOpen(true);
    };

    const displaySubscriptionsCat = async () => {
        try {
            const res = await axiosInstance.get(`/api/categories/extensive`);
            console.log(res.data.data);
            setSubscriptionscategories(res.data.data);
        } catch (error: any) {
            console.error(error);
            console.log(error?.response?.data?.message);
        }
    };
    useEffect(() => {
        displaySubscriptionsCat();
    }, []);
    const changeOrder = async (id: number, order: number) => {
        try {
            const res = await axiosInstance.patch(`/api/categories`, { categories: [{ id, order }] });
            console.log(res);
            toast.success(t('categoriesPage.categoriesToast'))
        } catch (error: any) {
            console.error(error);
        }
    };
    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source } = result;
        if (!destination) return;
        if (destination.index === source.index) return;

        const categoryIndex = subscriptionscategories.findIndex(
            (cat) => cat.parent_id === expandedCategoryId
        );
        if (categoryIndex === -1) return;

        const reorderedSubcategories = Array.from(subscriptionscategories[categoryIndex].sub);
        const [movedSubcategory] = reorderedSubcategories.splice(source.index, 1);
        reorderedSubcategories.splice(destination.index, 0, movedSubcategory);
        changeOrder(movedSubcategory.category_id, destination.index + 1)
        console.log(destination.index);

        const updatedCategories = [...subscriptionscategories];
        updatedCategories[categoryIndex].sub = reorderedSubcategories;
        setSubscriptionscategories(updatedCategories);
    };
    const toggleSubcategories = (parentId: number) => {
        if (expandedCategoryId === parentId) {
            setExpandedCategoryId(null);
        } else {
            setExpandedCategoryId(parentId);
        }
    };

    const breadcrumbLinks = [{ label: t('categoriesPage.title'), path: '/categories/main' }];

    return (
        <div className="relative overflow-x-auto">
            <div className="flex justify-between">
                <Breadcrumb pageName={t('categoriesPage.catSubscriptions.label')} breadcrumbLinks={breadcrumbLinks} />
                <Link to={``}>
                    <CgAddR className="text-3xl text-Input-TextGreen" role="button"
                        onClick={() => openGenericParentPopup(null)} />
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
                                            <th scope="col" className="px-2 py-3 text-[18px] font-[400] rounded-s-lg">{t('categoriesPage.order')}</th>
                                            <th scope="col" className="px-6 py-3">
                                                <img src={cat.parent_image} width={100} alt="" />
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-[18px] font-[400]">{cat.category_name}</th>
                                            <th scope="col" className="py-3" onClick={() => openGenericPopup(cat)}>
                                                <CgAddR className="text-3xl text-Input-TextGreen" role="button" />
                                            </th>
                                            <th scope="col" className="py-3" onClick={() => openGenericParentPopup(cat)}>
                                                <LiaEditSolid className="text-3xl text-Input-TextGreen" role="button" />
                                            </th>
                                            <th scope="col" className=" py-3" onClick={() => openDeleteGenericPopup(cat)} role="button">
                                                <RiDeleteBin6Line className="text-3xl text-Input-TextRed" />
                                            </th>
                                            <th scope="col" className=" py-3 rounded-e-lg" role="button"
                                                onClick={() => toggleSubcategories(cat.parent_id)}>
                                                {expandedCategoryId === cat.parent_id ? (
                                                    <IoMdArrowDropdown className="text-3xl" />
                                                ) : (
                                                    <IoMdArrowDropup className="text-3xl" />
                                                )}
                                            </th>
                                        </tr>
                                        {selectedCategory &&
                                            <DeletePopup
                                                deleteName={selectedCategory.category_name}
                                                deleteId={selectedCategory.parent_id}
                                                url={`categories`}
                                                isModalOpen={isModalOpen}
                                                display={displaySubscriptionsCat}
                                                setIsModalOpen={setIsModalOpen}
                                            />
                                        }
                                        {selectedCategory && (
                                            <EditAddImgPopup
                                                isPaid={true}
                                                name={selectedCategory.category_name}
                                                id={selectedCategory.parent_id}
                                                url={`categories`}
                                                isModalOpen={isAddParentModalOpen}
                                                setIsModalOpen={setIsAddParentModalOpen}
                                                display={displaySubscriptionsCat}
                                                imageUrl={selectedCategory.parent_image}
                                            />
                                        )}
                                    </thead>
                                    {expandedCategoryId === cat.parent_id &&
                                        <Droppable droppableId={`droppable-${cat.parent_id}`}>
                                            {(provided) => (
                                                <tbody
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                >
                                                    {cat.sub.length ?
                                                        cat.sub.map((sub, index) => (
                                                            <Draggable key={`sub-${index}`} draggableId={`sub-${sub.category_id}-${index}`} index={index}>
                                                                {(provided, snapshot) => (
                                                                    <tr
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className={`${index % 2 !== 0
                                                                            ? 'dark:bg-MainTableBG-OddDark bg-MainTableBG-OddLight'
                                                                            : 'dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight'} border-b
                                                                            dark:border-secondaryBG-light
                                                                        ${snapshot.isDragging ? "bg-header-inputBorder" : ""}`}
                                                                    >
                                                                        <td className="px-2 py-4 font-[400] text-[17px]">#{index + 1}</td>
                                                                        <td className="px-2 py-4"></td>
                                                                        <td className="px-6 py-4 font-[400] text-[17px] text-gray-900 whitespace-nowrap dark:text-white">
                                                                            {sub.category_name}
                                                                        </td>
                                                                        <td className="px-2 py-4"></td>
                                                                        <td className="py-4" onClick={() => openGenericPopup(sub)}>
                                                                            <FiEdit3 className="text-xl text-Input-TextGreen" role="button" />
                                                                        </td>
                                                                        <td className="py-4" onClick={() => openDeleteGenericPopup(sub)}>
                                                                            <RiDeleteBin6Line className="text-xl text-Input-TextRed" role="button" />
                                                                        </td>
                                                                        <td className="py-4"></td>
                                                                        {selectedSubCategory &&
                                                                            <DeletePopup
                                                                                deleteName={selectedSubCategory.category_name}
                                                                                deleteId={selectedSubCategory.category_id}
                                                                                url={`categories`}
                                                                                isModalOpen={isSubModalOpen}
                                                                                display={displaySubscriptionsCat}
                                                                                setIsModalOpen={setIsSubModalOpen}
                                                                            />
                                                                        }
                                                                        {selectedSubCategory && (
                                                                            <EditAddPopup
                                                                                name={selectedSubCategory?.category_name}
                                                                                id={selectedSubCategory?.category_id}
                                                                                url={`categories`}
                                                                                isModalOpen={isAddModalOpen}
                                                                                setIsModalOpen={setIsAddModalOpen}
                                                                                display={displaySubscriptionsCat}
                                                                            />

                                                                        )}
                                                                    </tr>
                                                                )}
                                                            </Draggable>
                                                        ))
                                                        :
                                                        <div className="font-semibold text-xl my-5">
                                                            {t('categoriesPage.catSubscriptions.noSub')}
                                                        </div>}
                                                    {provided.placeholder}
                                                </tbody>
                                            )}
                                        </Droppable>
                                    }
                                </table>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {selectedCategory &&
                <EditAddPopup
                    url={`categories/${selectedCategory.parent_id}`}
                    isModalOpen={isAddModalOpen}
                    setIsModalOpen={setIsAddModalOpen}
                    display={displaySubscriptionsCat}
                />
            }
            {!selectedCategory &&
                <EditAddImgPopup
                    isPaid={true}
                    url={`categories`}
                    setIsModalOpen={setIsAddParentModalOpen}
                    isModalOpen={isAddParentModalOpen}
                    display={displaySubscriptionsCat}
                />
            }
        </div>
    );
};

export default SubscriptionsCat;
