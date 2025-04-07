import { Button, Drawer, Form, Input, message } from "antd";
import api from "../api/Api";
import { useState } from "react";

function EditCategory({
  setSelectedCategory,
  selectedCategory,
  CategoriesFetch,
}: any) {
  console.log(selectedCategory);
     const [loading,setLoading]=useState<boolean>(false)
 
  return (
    <Drawer
      open={selectedCategory ? true : false}
      onClose={() => setSelectedCategory()}
    >
      <div className="font-bold text-xl mb-6">{selectedCategory?.name}</div>
      {selectedCategory && (
        <Form
          onFinish={(values) => {
            setLoading(true)
            console.log(values);
            api
              .patch(`/api/categories/${selectedCategory.id}`, values)
              .then((res) => {
                console.log(res.data);
                message.success("ozgartirildi");
                setSelectedCategory();
                CategoriesFetch();
              }).finally(()=>{
                setLoading(false)
              })
          }}
          layout="vertical"
          initialValues={selectedCategory}
        >
          <Form.Item label="Name" name="name">
            <Input/>
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
}

export default EditCategory;
