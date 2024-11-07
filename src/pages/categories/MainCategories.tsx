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
import EditAddImgPopup from "../../components/popups/EditAddImgPopup";
import { toast } from "react-toastify";

interface Category {
  parent_id: number;
  category_name: string;
  parent_image: string;
  parent_sort_order:number;
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
      } catch (err) { }
    };
    fetchCategoriesCount();
  }, []);
  const totalPages = Math.ceil(categoriesCount);
  const changeOrder = async (id:number,order:number) => {
    try {
        const res = await axiosInstance.patch(`/api/categories`,{categories:[{ id, order }]},
          {headers: {
            "content-type": "Application/json",
          }}
        );
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
    const reorderedCategories = Array.from(categories);
    const [movedCategory] = reorderedCategories.splice(source.index, 1);
    reorderedCategories.splice(destination.index, 0, movedCategory);
    setCategories(reorderedCategories);
    changeOrder(movedCategory.parent_id,destination.index)
    console.log(movedCategory);
    
  };
  const displayCategories = async () => {
    try {
      const res = await axiosInstance.get(`/api/categories?page=${currentPage}&limit=8`);
      console.log(res.data.data);
      // console.log(res.data.data.sort((a:Category, b:Category) => a.parent_sort_order - b.parent_sort_order));
      setCategories(res.data.data.sort((a:Category, b:Category) => a.parent_sort_order - b.parent_sort_order))
    } catch (error: any) {
      console.error(error);
      console.log(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    displayCategories()
  }, [currentPage]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const openModal = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };
  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setIsAddModalOpen(true);
  };
  const openAddModal = () => {
    setSelectedCategory(null)
    setIsAddModalOpen(true);
  };

  const breadcrumbLinks = [{ label: t('categoriesPage.title'), path: '/categories/main' }]
  return (
    <div className="relative overflow-x-auto">
      <div className="flex justify-between">
        <Breadcrumb pageName={t('categoriesPage.catMain.label')} breadcrumbLinks={breadcrumbLinks} />
        <Link to={``}>
          <CgAddR className="text-3xl text-Input-TextGreen" role="button" onClick={() => openAddModal()} />
        </Link>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="categories">
          {(provided) => (
            <div className="bg-secondaryBG-light dark:bg-secondaryBG-dark p-6 rounded-sm">
              <table
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="w-full text-left rtl:text-right text-[20px]"
              >
                <thead className="bg-[#EDEDED] dark:bg-[#3E3E46]">
                <tr className="px-2 py-2 text-[18px] font-[400]">
                    <th scope="col" className="px-2 py-3 text-[18px] font-[400] rounded-s-lg">{t('categoriesPage.order')}</th>
                    <th scope="col" className="px-6 py-3 text-[18px] font-[400]">{t('categoriesPage.catMain.catName')}</th>
                    <th scope="col" className="px-6 py-3 text-[18px] font-[400]">{t('categoriesPage.catMain.img')}</th>
                    <th scope="col" className="py-3 text-[18px] font-[400]">{t('categoriesPage.edit')}</th>
                    <th scope="col" className=" py-3 rounded-e-lg">
                      <RiDeleteBin6Line className="text-xl text-Input-TextRed" />
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
                            className={`border-b dark:border-secondaryBG-light ${index % 2 !== 0
                              ? 'dark:bg-MainTableBG-OddDark bg-MainTableBG-OddLight'
                              : 'dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight'}
                          ${snapshot.isDragging ? "bg-header-inputBorder" : ""}
                          `}
                          >
                            <td className="px-2 py-4 font-[400] text-[17px]">#{index+1 } {cat.parent_sort_order}</td>
                            <td
                              scope="row"
                              className="px-6 py-4 font-[400] text-[17px] text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {cat.category_name}
                            </td>
                            <td className="px-6 py-4"><img src={cat.parent_image} alt="" width={40} /></td>
                            <td className="py-4" onClick={() => openEditModal(cat)}><FiEdit3 className="text-xl text-Input-TextGreen" role="button" /></td>
                            <td className="py-4" onClick={() => openModal(cat)}>
                              <RiDeleteBin6Line className="text-xl text-Input-TextRed" role="button" />
                            </td>
                          </tr>
                          {selectedCategory && (
                            <DeletePopup
                              deleteName={selectedCategory.category_name}
                              deleteId={selectedCategory.parent_id}
                              url={`categories`}
                              isModalOpen={isModalOpen}
                              setIsModalOpen={setIsModalOpen}
                              display={displayCategories}
                            />
                          )}
                          {selectedCategory && (
                            <EditAddImgPopup
                              name={selectedCategory.category_name}
                              id={selectedCategory.parent_id}
                              url={`categories`}
                              isModalOpen={isAddModalOpen}
                              setIsModalOpen={setIsAddModalOpen}
                              display={displayCategories}
                              imageUrl={selectedCategory.parent_image}
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
      {!selectedCategory&&
      <EditAddImgPopup
        url={`categories`}
        isModalOpen={isAddModalOpen}
        setIsModalOpen={setIsAddModalOpen}
        display={displayCategories}
      />
      }
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default MainCategories;





