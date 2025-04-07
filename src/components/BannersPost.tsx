import { Button, Drawer, Form, Input, message, Switch } from "antd";
import { useForm } from "antd/es/form/Form";
import api from "../api/Api";
import { useState } from "react";
// import { useEffect, useState } from "react";
// import { CatigoriesType } from "../types";

function BannersPost({ setBannerDrawer, bannerDrawer, banners }: any) {
  const [form] = useForm();
    const [loading,setLoading]=useState<boolean>(false)
  
  // const [categoryName, setCategoryName] = useState<CatigoriesType[]>([])

  // useEffect(()=>{
  //   api
  //     .get("/api/categories") 
  //     .then((res) => {
  //       setCategoryName(res.data.items); 
  //     })
  //     .catch((err) => {
  //       console.error("Kategoriyalarni yuklashda xatolik:", err);
  //       message.error("Kategoriyalarni yuklashda xatolik ");
  //     });
  // },[])

  return (
    <div>
      <Drawer open={bannerDrawer} onClose={() => setBannerDrawer(false)}>
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            console.log(values);
            setLoading(true)
            api
              .post(`/api/banners`, {
                title: values.title,
                // createdAt: values.createdAt,
                imageUrl:values.imageUrl,
                isActive:values.isActive
                
              })
              .then((res) => {
                console.log(res.data);

                banners();
              })
              .catch((e) => {
                console.log(e.message);
                message.error("xatolik " + e.status);
              })
              .finally(() => {
                form.resetFields();
                setBannerDrawer(false);
                setLoading(false)
              });
          }}
        >
          <Form.Item label="title" name={"title"}>
            <Input />
          </Form.Item>
          <Form.Item label="isActive" name={"isActive"}>
            <Switch />
          </Form.Item>
          <Form.Item label="imgUrl" name={"imageUrl"}>
            <Input />
          </Form.Item>
          
      
          <Form.Item>
            <Button htmlType="submit" style={{ marginTop: 15 }} loading={loading}>
              Qoshish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default BannersPost;
