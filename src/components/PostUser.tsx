import { Button, Drawer, Form, Input, message, Radio } from "antd";
import axios from "axios";
import useGlobalStore from "../store/store";
import { useForm } from "antd/es/form/Form";

function PostUser({ setOpenUserDrawer, openUserDrawer, user }: any) {
  const accessToken = useGlobalStore((a) => a.accessToken);
  const [form] = useForm()

  return (
    <div>
      <Drawer open={openUserDrawer} onClose={() => setOpenUserDrawer(false)}>
        <Form
        form={form}
          layout="vertical"
          onFinish={(values) => {
            axios
              .post(
                `https://nt.softly.uz/api/users`,
                { 
                  name: values.name,
                  email: values.email,
                  password: values.password,
                  image: values.image,
                  role: values.role,
                },
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              )
              .then((res) => {
                console.log(res.data);

                user();
                form.resetFields()
                // setUsers(res.data);
                //refresh
              })
              .catch((e) => {
                console.log(e.message);
                message.error("xatolik");
              });
          }}
        >
          <Form.Item label="Name" name={"name"}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name={"email"}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name={"password"}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Radio.Group
              options={[
                { label: "Customer", value: "customer" },
                { label: "Admin", value: "admin" },
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
          <Form.Item label="Image" name={"image"}>
            <Input placeholder="Enter the image URL" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Qoshish</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default PostUser;
