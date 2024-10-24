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

interface SubscriptionsCategory {
    parent_id: number;
    category_name: string;
    parent_image: string;
    sub: {
        category_id: number;
        category_name: string;
    }[]
}

const SubscriptionsCat: React.FC = () => {
    const { t } = useTranslation();
    const [subscriptionscategories, setSubscriptionscategories] = useState<SubscriptionsCategory[]>([]);
    const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(null);
    useEffect(() => {
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
        displaySubscriptionsCat();
    }, []);
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
                    <CgAddR className="text-3xl text-Input-TextGreen" role="button" />
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
                                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-7"
                                >
                                    <thead className="text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-2 py-3 rounded-s-lg">{t('categoriesPage.order')}</th>
                                            <th scope="col" className="px-6 py-3">
                                                <img src={cat.parent_image} width={100} alt="" />
                                            </th>
                                            <th scope="col" className="px-6 py-3">{cat.category_name}</th>
                                            <th scope="col" className="py-3">
                                                <CgAddR className="text-3xl text-Input-TextGreen" role="button" />
                                            </th>
                                            <th scope="col" className="py-3">
                                                <LiaEditSolid className="text-3xl text-Input-TextGreen" role="button" />
                                            </th>
                                            <th scope="col" className=" py-3 ">
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
                                                                        className={`bg-white dark:bg-gray-800 border-b dark:border-secondaryBG-light
                                                                        ${snapshot.isDragging ? "bg-header-inputBorder" : ""}`}
                                                                    >
                                                                        <td className="px-2 py-4">#{index + 1}</td>
                                                                        <td className="px-2 py-4"></td>
                                                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                            {sub.category_name}
                                                                        </td>
                                                                        <td className="px-2 py-4"></td>
                                                                        <td className="py-4">
                                                                            <FiEdit3 className="text-xl text-Input-TextGreen" role="button" />
                                                                        </td>
                                                                        <td className="py-4">
                                                                            <RiDeleteBin6Line className="text-xl text-Input-TextRed" role="button" />
                                                                        </td>
                                                                        <td className="py-4"></td>
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
        </div>
    );
};

export default SubscriptionsCat;
