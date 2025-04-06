import { Button, Drawer, Form, Input, message, Radio } from 'antd';
import api from '../api/Api';

function EditUser({ setSelectedUser, selectedUser,user }: any) {
    console.log(selectedUser);
    
  return (
    <Drawer open={selectedUser ? true : false} onClose={() => setSelectedUser()}>
      <div className='font-bold text-xl mb-6'>{selectedUser?.name}</div>
     {selectedUser && <Form

        onFinish={(values)=>{
            console.log(values);
            api.patch(`/api/users/${selectedUser.id}`,values).then(res=>{
                console.log(res.data);
                message.success('ozgartirildi')
                setSelectedUser()
                user()
            })
            
        }}
        layout="vertical"
        initialValues={selectedUser}
      >
        
        
        <Form.Item label="Name" name="name" >
            <Input/>
        </Form.Item>
        

        <Form.Item label="email" name="email" >
          <Input/>
        </Form.Item>

        <Form.Item label="role" name="role" >
         <Radio.Group options={[
          {
            label:'admin',
            value:'admin'
          },
          {
            label:'costumer',
            value:'costumer'
          }
         ]}
         block
         buttonStyle="solid"
         optionType="button"/>
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

export default EditUser;
