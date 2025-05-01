import { Button, Drawer, Form, Input, message, Radio, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import UserApi from "../api/UserApi";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

function PostUser({ setOpenUserDrawer, openUserDrawer, user }: any) {
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div>
      <Drawer open={openUserDrawer} onClose={() => setOpenUserDrawer(false)}>
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            setLoading(true);
            UserApi.create(values)

              .then((res) => {
                console.log(res.data);

                user();
                form.resetFields();
                // setUsers(res.data);
                //refresh
              })
              .catch((e) => {
                console.log(e.message);
                message.error("xatolik");
              })
              .finally(() => {
                setLoading(false);
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
          {/* <Form.Item label="Image" name={"image"}>
            <Input placeholder="Enter the image URL" />
          </Form.Item> */}
          <Form.Item name={'image'}>
            <Upload
              name="file"
              action={`https://nt.softly.uz/api/files/upload`}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item name={"phone"} label="phone number">
            <Input placeholder="telefon raqam" />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Qoshish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default PostUser;
