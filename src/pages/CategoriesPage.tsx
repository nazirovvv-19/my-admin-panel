import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Table } from "antd";
import { useEffect, useState } from "react";
import CategoriesApi from "../api/CategoriesApi";
import CategoriesPost from "../components/CategoriesPost";
import EditCategory from "../components/EditCategory";
import { CatigoriesType, CatigoriesTypeObj } from "../types";

function CategoriesPage() {
  const [categoryy, setCategoryy] = useState<CatigoriesType[]>([]);

  const [isOpenDraver, setOpenDraver] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<CatigoriesTypeObj>()

  const CategoriesFetch = () => {
    setLoading(true)
    CategoriesApi.getAll()
      .then((res) => {
        setCategoryy(res.data.items);
        console.log(res.data);
        
      })
      .catch((e) => {
        console.error("Xatolik yuz berdi", e);
        message.error("Xatolik");
      }).finally(()=>{
        setLoading(false)
      })
  };
  useEffect(() => {
    CategoriesFetch();
  }, []);



  function DeleteUser(id: number) {
      CategoriesApi.delete(id)

      .then((res) => {
        console.log(res.data);
        setCategoryy((i) => i.filter((item) => item.id !== id));
        message.success("O'chirish amalga oshirildi ");
      })
      .catch((e) => {
        message.error("O'chirish amalga oshirilmadi " + e.message);
      });
  }

  return (
    <>
      <div className="w-full p-6 ">
        <div className="flex justify-between items-center mb-6">
          <h2>Categories Page</h2>
          <Button onClick={()=>setOpenDraver(true)}>Qoshish</Button>
        </div>
        <div className=" flex-1 ">
          <CategoriesPost
            CategoriesFetch={CategoriesFetch}
            isOpenDraver={isOpenDraver}
            setOpenDraver={setOpenDraver}
          />
        </div>
        <Table
        loading={loading}
          dataSource={categoryy.map((item) => ({ ...item, key: item.id }))}
          columns={[
            {
              title: "Id",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "description",
              dataIndex: "description",
              key: "description",
            },

            {
              title: "delete",
              dataIndex: "id",
              key: "id",
              render: (id: number,categoryData:any) => {
                return (
                  <div className=" flex gap-2">
                    <div onClick={() => setSelectedCategory(categoryData)}>
                      <Button>
                        <EditOutlined />
                      </Button>
                    </div>
                    <div >
                      <Button onClick={()=>DeleteUser(id)}><DeleteOutlined/></Button>
                    </div>
                  </div>
                );
              },
            },
          ]}
        />
        <EditCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} CategoriesFetch={CategoriesFetch} />
      </div>
    </>
  );

}

export default CategoriesPage;