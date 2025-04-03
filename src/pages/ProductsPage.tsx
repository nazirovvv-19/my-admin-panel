import { Button, message, Table } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { CatigoriesType, Product } from "../types";
import api from "../api/Api";
import ProductsPost from "../components/ProductPost";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productOpen, setproductOpen] = useState(false);
  const [forCategoryName, setForCategoryName] = useState<CatigoriesType[]>([]);

  const fetchProducts = () => {
    api
      .get("/api/products?limit=10&page=1&order=ASC")
      .then((res) => {
        setProducts(res.data.items);
      })
      .catch((e) => {
        console.error("Xatolik yuz berdi", e);
        message.error("Xatolik");
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    api.get("/api/categories").then((res) => {
      setForCategoryName(res.data.items);
    });
  });

  if (!products.length) {
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

  function deleteProduct(id: number) {
    api
      .delete(`/api/products/${id}`)
      .then(() => {
        setProducts((prev) => prev.filter((item) => item.id !== id));
        message.success("O'chirish amalga oshirildi ");
      })
      .catch((e) => {
        message.error("O'chirish amalga oshirilmadi " + e);
      });
  }

  return (
    <div className="w-full p-6  overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2>Product Page</h2>
        <Button onClick={() => setproductOpen(true)}>qoshish</Button>
      </div>
      <div className="flex-1">
        <ProductsPost
          fetchProducts={fetchProducts}
          productOpen={productOpen}
          setproductOpen={setproductOpen}
        />
      </div>
      <Table
        style={{ overflow: "auto ", height: "100% " }}
        size="small"
        dataSource={products.map((item) => ({ ...item, key: item.id }))}
        columns={[
          { title: "Id", dataIndex: "id", key: "id" },
          { title: "Name", dataIndex: "name", key: "name" },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
          },
          {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => {
              const formattedPrice = price.toLocaleString('ru');
              return (
                <div>
                  <p>{formattedPrice} som</p>
                </div>
              );
            },
          },
          
          { title: "Stock", dataIndex: "stock", key: "stock" },
          { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
          {
            title: "Category",
            dataIndex: "categoryId",
            key: "categoryId",
            render: (categoryId: number) => {
              const category = forCategoryName.find(
                (item) => item.id === categoryId
              );
              return category?.name;
            },
          },
          {
            title: "Image",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (imageUrl) => (
              <img className="w-10 rounded" src={imageUrl} alt="" />
            ),
          },
          {
            title: "Actions",
            dataIndex: "id",
            key: "id",
            render: (id: number) => (
              <div className="flex space-x-2">
                <Button onClick={() => {}}>
                  <EditOutlined />
                </Button>
                <div onClick={() => deleteProduct(id)}>
                  <Button danger onClick={()=>deleteProduct(id)}><DeleteOutlined/></Button>
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export default Products;
