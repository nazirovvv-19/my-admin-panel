import { Button, Drawer, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import api from "../api/Api";
import { useState } from "react";
// import { useEffect, useState } from "react";
// import { CatigoriesType } from "../types";

function CategoriesPost({ setOpenDraver, isOpenDraver, CategoriesFetch }: any) {
  const [form] = useForm();
      const [loading,setLoading]=useState<boolean>(false)
  


  return (
    <div>
      <Drawer open={isOpenDraver} onClose={() => setOpenDraver(false)}>
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            console.log(values);
            setLoading(true)
            api
              .post(`/api/categories`, {
                name: values.name,
                description: values.description,
                
              })
              .then((res) => {
                console.log(res.data);

                CategoriesFetch();
              })
              .catch((e) => {
                console.log(e.message);
                message.error("xatolik");
              })
              .finally(() => {
                form.resetFields();
                setOpenDraver(false);
                setLoading(false)
              });
          }}
        >
          <Form.Item label="Name" name={"name"}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name={"description"}>
            <TextArea />
          </Form.Item>
          
      
          <Form.Item>
            <Button loading={loading} htmlType="submit" style={{ marginTop: 15 }}>
              Qoshish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default CategoriesPost;
