import { Button, Drawer, Form, Input, message, Select } from "antd";
import api from "../api/Api";
import { useEffect, useState } from "react";
import { CatigoriesType } from "../types";

function EditCategory({
  setSelectedCategory,
  selectedCategory,
  CategoriesFetch,
}: any) {
  console.log(selectedCategory);
 
  return (
    <Drawer
      open={selectedCategory ? true : false}
      onClose={() => setSelectedCategory()}
    >
      <div className="font-bold text-xl mb-6">{selectedCategory?.name}</div>
      {selectedCategory && (
        <Form
          onFinish={(values) => {
            console.log(values);
            api
              .patch(`/api/categories/${selectedCategory.id}`, values)
              .then((res) => {
                console.log(res.data);
                message.success("ozgartirildi");
                setSelectedCategory();
                CategoriesFetch();
              });
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
}

export default EditCategory;
