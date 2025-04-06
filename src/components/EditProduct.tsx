import { Button, Drawer, Form, Input, InputNumber, message, Select } from 'antd';
import api from '../api/Api';
import { CatigoriesType } from '../types';
import { useEffect, useState } from 'react';

function EditProduct({ set, selectedItem,fetchProducts }: any) {
    console.log(selectedItem);
    const [categoryNames, setCategoryNames] = useState<CatigoriesType[]>([]);

    useEffect(()=>{
      api.get('/api/categories').then(res=>{
        setCategoryNames(res.data.items)
      })
    },[])
    
  return (
    <Drawer open={selectedItem ? true : false} onClose={() => set()}>
      <div className='font-bold text-xl mb-6'>{selectedItem?.name}</div>
     {selectedItem && <Form

        onFinish={(values)=>{
            console.log(values);
            api.patch(`/api/products/${selectedItem.id}`,values).then(res=>{
                console.log(res.data);
                message.success('ozgartirildi')
                set()
                fetchProducts()
            })
            
        }}
        layout="vertical"
        initialValues={selectedItem}
      >
        
        
        <Form.Item label="Name" name="name" >
            <Input/>
        </Form.Item>
        <Form.Item label="Description" name="description" >
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Price" name="price" >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Stock" name="stock" >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Category" name="categoryId" >
          <Select options={categoryNames.map(item=>{
            return {
              label:item.name,
              value:item.id
            }
          })}>
           
          </Select>
        </Form.Item>

        <Form.Item label="Image" name="imageUrl">
            <Input/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>}
    </Drawer>
  );
  
}

export default EditProduct;
