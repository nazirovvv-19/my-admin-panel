import axios from "axios";
import { useEffect, useState } from "react";
import { TopProduct } from "../types";
import { Button, message, Table } from "antd";

function ProductsPage() {
  const [product, setproduct] = useState<TopProduct[]>([]);
  const fetchProduct = () => {
    axios
      .get(`https://nt.softly.uz/api/products?limit=10&page=1&order=ASC`)
      .then((res) => {
        console.log(res.data.items);
        setproduct(res.data.items);
      })
      .catch((e) => {
        console.log(e);
        message.error(e.message);
      });
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="container mx-auto p-3">
      <div className="flex justify-between items-center mb-5">
        <h2>Product Page</h2>
        <Button type="primary">Qoshish</Button>
      </div>
      <Table dataSource={product} columns={[
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
              title: "price",
              dataIndex: "price",
              key: "price",
            },
            {
              title: "stock",
              dataIndex: "stock",
              key: "stock",
            },
            {
              title: "Created At",
              dataIndex: "createdAt",
              key: "createdAt",
              render: (item: any) => {
                const dates = new Date(item);
                const day = String(dates.getDate()).padStart(2, "0");
                const month = String(dates.getMonth() + 1).padStart(2, "0");
                const year = dates.getFullYear();
                return `${day}.${month}.${year}`;
              },
            },
            {
              title: "categoryNme",
              dataIndex: "categoryId",
              key: "categoryId",
              
            },
            {
              title: "imageUrl",
              dataIndex: "imageUrl",
              key: "imageUrl",
            },
          ]}/>
    </div>
  );
}

export default ProductsPage;
