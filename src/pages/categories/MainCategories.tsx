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

interface Category {
  parent_id: number;
  category_name: string;
  parent_image: string;
};

const MainCategories: React.FC = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [categoriesCount, setcategoriesCount] = useState(0);

  useEffect(() => {
    const fetchCategoriesCount = async () => {
      try {
        const response = await axiosInstance.get(`/api/categories/count`);
        setcategoriesCount(response.data.data.count / 8);
      } catch (err) {}
    };
    fetchCategoriesCount();
  }, []);
  const totalPages = Math.ceil(categoriesCount);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.index === source.index) return;
    const reorderedCategories = Array.from(categories);
    const [movedCategory] = reorderedCategories.splice(source.index, 1);
    reorderedCategories.splice(destination.index, 0, movedCategory);
    setCategories(reorderedCategories);
  };
  useEffect(() => {
    const displayCategories = async () => {
      try {
          const res = await axiosInstance.get(`/api/categories?page=${currentPage}&limit=8`);
          console.log(res.data.data);
          setCategories(res.data.data)
      } catch (error: any) {
          console.error(error);
          console.log(error?.response?.data?.message);
      }
  };
  displayCategories()
  }, [currentPage]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const openModal = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const breadcrumbLinks = [{ label: t('categoriesPage.title'), path: '/categories/main' }]
  return (
    <div className="relative overflow-x-auto">
    <div className="flex justify-between">
        <Breadcrumb pageName={t('categoriesPage.catMain.label')} breadcrumbLinks={breadcrumbLinks}/>
        <Link to={``}>
            <CgAddR className="text-3xl text-Input-TextGreen" role="button"/>
        </Link>
        </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="categories">
          {(provided) => (
            <div className="bg-secondaryBG-light dark:bg-secondaryBG-dark p-6 rounded-sm">
            <table
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              <thead className="text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-2 py-3 rounded-s-lg">{t('categoriesPage.order')}</th>
                  <th scope="col" className="px-6 py-3">{t('categoriesPage.catMain.catName')}</th>
                  <th scope="col" className="px-6 py-3">{t('categoriesPage.catMain.img')}</th>
                  <th scope="col" className="py-3">{t('categoriesPage.edit')}</th>
                  <th scope="col" className=" py-3 rounded-e-lg">
                  <RiDeleteBin6Line className="text-xl text-Input-TextRed"/>
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, index) => (
                  <Draggable key={`cat-${index}`} draggableId={`cat-${cat.parent_id}-${index}`} index={index}>
                    {(provided, snapshot) => (
                      <>
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`bg-white dark:bg-gray-800 border-b dark:border-secondaryBG-light
                          ${snapshot.isDragging ? "bg-header-inputBorder" : ""}
                          `}
                      >
                        <td className="px-2 py-4">#{index + 1}</td>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {cat.category_name}
                        </th>
                        <td className="px-6 py-4"><img src={cat.parent_image} alt="" width={40}/></td>
                        <td className="py-4"><FiEdit3 className="text-xl text-Input-TextGreen" role="button"/></td>
                        <td className="py-4" onClick={() => openModal(cat)}>
                          <RiDeleteBin6Line className="text-xl text-Input-TextRed" role="button"/>
                        </td>
                      </tr>
                          {selectedCategory && (
                            <DeletePopup
                              deleteName={selectedCategory.category_name}
                              deleteId={selectedCategory.parent_id}
                              url={`categories`}
                              isModalOpen={isModalOpen}
                              setIsModalOpen={setIsModalOpen}
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default MainCategories;





