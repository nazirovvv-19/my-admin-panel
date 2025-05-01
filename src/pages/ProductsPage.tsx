import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Image, message, Table } from "antd";
import { useEffect, useState } from "react";
import ProductApi from "../api/ProductsApi";
import api from "../api/Api";
import ProductsPost from "../components/ProductPost";
import EditProduct from "../components/EditProduct";
import { CatigoriesType, Product, ProductType } from "../types";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productOpen, setProductOpen] = useState(false);
  const [forCategoryName, setForCategoryName] = useState<CatigoriesType[]>([]);
  const [selectedItem, setSelectedItem] = useState<ProductType>();
  const [loading, setLoading] = useState<boolean>(true);

  // pagination states
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchProducts = (pageNumber = page, limitNumber = limit) => {
    setLoading(true);
    ProductApi.getAll(pageNumber, limitNumber)
      .then((res) => {
        setProducts(res.data.items);
        setTotal(res.data.total); // ⚠️ backend bu qiymatni qaytarishi shart
      })
      .catch((e) => {
        message.error("Xatolik yuz berdi");
        console.error(e);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts(page, limit);
  }, [page, limit]);

  useEffect(() => {
    api.get("/api/categories").then((res) => {
      setForCategoryName(res.data.items);
    });
  }, []);

  const deleteProduct = (id: number) => {
    ProductApi.delete(id)
      .then(() => {
        message.success("O'chirildi");
        fetchProducts(); // qayta yuklash
      })
      .catch((e) => {
        message.error("O'chirishda xatolik");
        console.log(e);
        
      });
  };

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6 ">
        <h2>Product Page</h2>
        <Button onClick={() => setProductOpen(true)}>Qo‘shish</Button>
      </div>

      <ProductsPost
        fetchProducts={() => fetchProducts(page, limit)}
        productOpen={productOpen}
        setproductOpen={setProductOpen}
      />

      <Table
        loading={loading}
        dataSource={products.map((item) => ({ ...item, key: item.id }))}
        pagination={{
          current: page,
          pageSize: limit,
          total: total,
          showSizeChanger: true,
          onChange: (newPage, newPageSize) => {
            setPage(newPage);
            setLimit(newPageSize || 10);
          },
        }}
        columns={[
          { title: "Id", dataIndex: "id", key: "id" },
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "Description", dataIndex: "description", key: "description" },
          {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => <p>{price.toLocaleString("ru")} so'm</p>,
          },
          { title: "Stock", dataIndex: "stock", key: "stock" },
          { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
          {
            title: "Category",
            dataIndex: "categoryId",
            key: "categoryId",
            render: (categoryId: number) => {
              const category = forCategoryName.find((item) => item.id === categoryId);
              return category?.name;
            },
          },
          {
            title: "Image",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (imageUrl) => (
              <Image width={50} height={60} src={imageUrl} />
            ),
          },
          {
            title: "Actions",
            dataIndex: "id",
            key: "id",
            render: (id: number, record: any) => (
              <div className="flex space-x-2">
                <Button onClick={() => setSelectedItem(record)}>
                  <EditOutlined />
                </Button>
                <Button danger onClick={() => deleteProduct(id)}>
                  <DeleteOutlined />
                </Button>
              </div>
            ),
          },
        ]}
      />

      <EditProduct
        selectedItem={selectedItem}
        set={setSelectedItem}
        fetchProducts={() => fetchProducts(page, limit)}
      />
    </div>
  );
}

export default Products;
