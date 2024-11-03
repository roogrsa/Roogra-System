
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Link } from "react-router-dom";
import { CgAddR } from "react-icons/cg";
import { useTranslation } from "react-i18next";
import { RiDeleteBin6Line } from "react-icons/ri";
import axiosInstance from "../../axiosConfig/instanc";
import { FiEdit3 } from "react-icons/fi";
import Pagination from "../../components/pagination/Pagination";
import DeletePopup from "../../components/popups/DeletePopup";
import EditAddPopup from "../../components/popups/EditAddPopup";
import { toast } from "react-toastify";

interface CategoryMap {
    map_category_id: number;
    name: string;
};

const CategoriesMap: React.FC = () => {
    const { t } = useTranslation();
    const [categoriesMap, setCategoriesMap] = useState<CategoryMap[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [categoriesCount, setcategoriesCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<CategoryMap | null>(null);

    const openModal = (category: CategoryMap) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };
    const openEditModal = (category: CategoryMap) => {
        setSelectedCategory(category);
        setIsAddModalOpen(true);
    };
    const openAddModal = () => {
        setSelectedCategory(null)
        setIsAddModalOpen(true);
    };
    useEffect(() => {
        const fetchCategoriesCount = async () => {
            try {
                const response = await axiosInstance.get(`/api/map-categories/count`);
                setcategoriesCount(response.data.data.count / 8);
            } catch (err) { }
        };
        fetchCategoriesCount();
    }, []);
    const totalPages = Math.ceil(categoriesCount);
    const displayCategoriesMap = async () => {
        try {
            const res = await axiosInstance.get(`/api/map-categories?limit=8&page=${currentPage}`);
            console.log(res.data.data);
            setCategoriesMap(res.data.data)
        } catch (error: any) {
            console.error(error);
            console.log(error?.response?.data?.message);
        }
    };
    const changeOrder = async (id: number, order: number) => {
        try {
            const res = await axiosInstance.patch(`/api/categories`, { categories: [{ id: id, order: order }] });
            console.log(res);
            toast.success(t('categoriesPage.categoriesTost'))
        } catch (error: any) {
            console.error(error);
        }
    };
    useEffect(() => {
        displayCategoriesMap()
    }, [currentPage]);

    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source } = result;
        if (!destination) return;
        if (destination.index === source.index) return;
        const reorderedCategoriesMap = Array.from(categoriesMap);
        const [movedCategory] = reorderedCategoriesMap.splice(source.index, 1);
        reorderedCategoriesMap.splice(destination.index, 0, movedCategory);
        setCategoriesMap(reorderedCategoriesMap);
        console.log(destination.droppableId);
        console.log(destination.index);
        console.log(movedCategory);
        changeOrder(movedCategory.map_category_id, destination.index + 1)

    };
    const breadcrumbLinks = [{ label: t('categoriesPage.title'), path: '/categories/main' }]
    return (
        <div className="relative overflow-x-auto">
            <div className="flex justify-between">
                <Breadcrumb pageName={t('categoriesPage.catMap.label')} breadcrumbLinks={breadcrumbLinks} />
                <Link to={``}>
                    <CgAddR className="text-3xl text-Input-TextGreen" role="button" onClick={() => openAddModal()} />
                </Link>
            </div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="categoriesMap">
                    {(provided) => (
                        <div className="bg-secondaryBG-light dark:bg-secondaryBG-dark p-6 rounded-sm">
                            <table
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="w-full text-[20px] text-left rtl:text-right"
                            >
                                <thead className="bg-[#EDEDED] dark:bg-[#3E3E46]">
                                    <tr className="px-2 py-2 text-[18px] font-[400]">
                                        <th scope="col" className="px-2 py-3 rounded-s-lg text-[18px] font-[400]
                                        dark:text-secondaryBG-light">
                                            {t('categoriesPage.order')}</th>
                                        <th scope="col" className="px-6 py-3 text-[18px] font-[400]">{t('categoriesPage.catMap.regionName')}</th>
                                        <th scope="col" className="py-3 text-[18px] font-[400]">{t('categoriesPage.edit')}</th>
                                        <th scope="col" className=" py-3 text-[18px] font-[400] rounded-e-lg">
                                            <RiDeleteBin6Line className="text-xl text-Input-TextRed" />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categoriesMap.map((cat, index) => (
                                        <Draggable key={`cat-${index}`} draggableId={`cat-${cat.map_category_id}-${index}`} index={index}>
                                            {(provided, snapshot) => (
                                                <>
                                                    <tr
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`dark:border-gray-700  ${index % 2 !== 0
                                                            ? 'dark:bg-MainTableBG-OddDark bg-MainTableBG-OddLight'
                                                            : 'dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight'} border-b 
                                                            dark:border-secondaryBG-light
                                                    ${snapshot.isDragging ? "bg-header-inputBorder" : ""}
                                                    `}>
                                                        <td className="px-2 py-4 font-[400] text-[17px]">#{index + 1}</td>
                                                        <td
                                                            scope="row"
                                                            className="px-6 py-4 font-[400] text-[17px] text-gray-900 whitespace-nowrap
                                                                dark:text-white"
                                                        >
                                                            {cat.name}
                                                        </td>
                                                        <td className="py-4 font-[400] text-[17px]">
                                                            <FiEdit3 className="text-xl text-Input-TextGreen" role="button"
                                                                onClick={() => openEditModal(cat)} />
                                                        </td>
                                                        <td className="py-4 font-[400] text-[17px]" onClick={() => openModal(cat)}>
                                                            <RiDeleteBin6Line className="text-xl text-Input-TextRed" role="button" /></td>
                                                    </tr>
                                                    {selectedCategory && (
                                                        <DeletePopup
                                                            deleteName={selectedCategory.name}
                                                            deleteId={selectedCategory.map_category_id}
                                                            url={`map-categories`}
                                                            isModalOpen={isModalOpen}
                                                            display={displayCategoriesMap}
                                                            setIsModalOpen={setIsModalOpen}
                                                        />
                                                    )}
                                                    {selectedCategory && (
                                                        <EditAddPopup
                                                            name={selectedCategory.name}
                                                            id={selectedCategory.map_category_id}
                                                            url={`map-categories`}
                                                            isModalOpen={isAddModalOpen}
                                                            setIsModalOpen={setIsAddModalOpen}
                                                            display={displayCategoriesMap}
                                                        />
                                                    )}
                                                </>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {!selectedCategory && (
                <EditAddPopup
                    url={`map-categories`}
                    isModalOpen={isAddModalOpen}
                    setIsModalOpen={setIsAddModalOpen}
                    display={displayCategoriesMap}
                />
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default CategoriesMap;





