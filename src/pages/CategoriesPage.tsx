import { useEffect, useState } from "react";
import { Button, message, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import api from "../api/Api";
import { CatigoriesType } from "../types";
import CategoriesPost from "../components/CategoriesPost";

function CategoriesPage() {
  const [categoryy, setCategoryy] = useState<CatigoriesType[]>([]);

  const [isOpenDraver, setOpenDraver] = useState(false);

  const CategoriesFetch = () => {
    api
      .get("/api/categories?limit=10&page=1&order=ASC")
      .then((res) => {
        setCategoryy(res.data.items);
      })
      .catch((e) => {
        console.error("Xatolik yuz berdi", e);
        message.error("Xatolik");
      });
  };
  useEffect(() => {
    CategoriesFetch();
  }, []);

  if (!categoryy.length) {
    return (
      <div className="banter-loader">
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
      <div className="banter-loader__box"></div>
    </div>
    );
  }

  function DeleteUser(id: number) {
    api
      .delete(`/api/categories/${id}`)
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
              render: (id: number) => {
                return (
                  <div className=" flex gap-2">
                    <div onClick={() => {}}>
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
      </div>
    </>
  );
  {if (categoryy.length===0) {
    return <div>loading</div>
  }}
}

export default CategoriesPage;