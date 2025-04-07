import { Button, Drawer, Form, Input, InputNumber, message, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import api from "../api/Api";
import { useEffect, useState } from "react";
import { CatigoriesType } from "../types";

function ProductsPost({ setproductOpen, productOpen, fetchProducts }: any) {
  const [form] = useForm();
  const [categoryName, setCategoryName] = useState<CatigoriesType[]>([])

  useEffect(()=>{
    api
      .get("/api/categories") 
      .then((res) => {
        setCategoryName(res.data.items); 
      })
      .catch((err) => {
        console.error("Kategoriyalarni yuklashda xatolik:", err);
        message.error("Kategoriyalarni yuklashda xatolik ");
      });
  },[])

  return (
    <div>
      <Drawer open={productOpen} onClose={() => setproductOpen(false)}>
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            console.log(values);

            api
              .post(`/api/products`, {
                name: values.name,
                stock: Number(values.stock),
                description: values.description,
                price: Number(values.price),
                imageUrl: values.imageUrl,
                categoryId: Number(values.categoryId),
              })
              .then((res) => {
                console.log(res.data);

                fetchProducts();
              })
              .catch((e) => {
                console.log(e.message);
                message.error("xatolik");
              })
              .finally(() => {
                form.resetFields();
                setproductOpen(false);
              });
          }}
        >
          <Form.Item label="Name" name={"name"}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name={"description"}>
            <TextArea />
          </Form.Item>
          <Form.Item label="price" name={"price"}>
            <Input />
          </Form.Item>
          <Form.Item name="stock" label="stock" rules={[{ required: true }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label="categoryName" name={"categoryId"}>
            <Select showSearch options={categoryName.map(item=>{
            return{
              label:item.name,
              value:item.id
            }
            })}/>
          </Form.Item>{" "}
          <Form.Item label="Image" name={"imageUrl"}>
            <Input placeholder="Enter the image URL" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" style={{ marginTop: 15 }}>
              Qoshish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default ProductsPost;
