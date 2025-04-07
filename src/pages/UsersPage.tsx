import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Table } from "antd";
import { useEffect, useState } from "react";
import UserApi from "../api/UserApi";
import EditUser from "../components/EditUser";
import PostUser from "../components/PostUser";
import useGlobalStore from "../store/store";
import { UserType, UserTypeObj } from "../types";

function UsersPage() {
  const accessToken = useGlobalStore((s) => s.accessToken);
  const [users, setUsers] = useState<UserType[]>([]);
  const [openUserDrawer, setOpenUserDrawer] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserTypeObj>();
  const [deleting, setDeleting]=useState<number|null>(null)


  const user = () => {
    setLoading(true)
    UserApi.getAll()
      .then((res) => {
        setUsers(res.data.items);
        console.log("user", res.data);
        setOpenUserDrawer(false);
      })
      .catch((e) => {
        console.log(e);
        message.error(e.message);
        
      })
      .finally(() => {
        setOpenUserDrawer(false);
        setLoading(false)
      });
  };
  useEffect(() => {
    if (!accessToken) return;
    user();
  }, [accessToken]);



  function onDelete(id: number) {
    setDeleting(id)
    UserApi.delete(id)
      .then(() => {
        setUsers((prev) => prev.filter((item) => item.id !== id));
      }).finally(()=>{
        setDeleting(null)
      })
  }

  return (
    <div className="w-full p-6 overflow-auto   ">
      <div className="flex justify-between mb-4 overflow-auto ">
        <h2 className="text-2xl font-bold ">Users</h2>
        <Button
          type="primary"
          onClick={() => {
            setOpenUserDrawer(true);
          }}
        >
          Qoshish
        </Button>
      </div>
      <div className="h-full">
        <Table
        loading={loading}
          size="small"
          dataSource={users}
          columns={[
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
              title: "Email",
              dataIndex: "email",
              key: "email",
            },
            {
              title: "Role",
              dataIndex: "role",
              key: "role",
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
              title: "images",
              dataIndex: "image",
              key: "image",
              render: (image) => {
                return (
                  <>
                    <img className="w-10 rounded" src={image} alt="img" />
                  </>
                );
              },
            },
            {
              title: "delete & edit",
              dataIndex: "id",
              key: "id",
              render: (id: number, userData:any) => {
                return (
                  <div className="flex gap-2">
                    <Button onClick={() => setSelectedUser(userData)}>
                      <EditOutlined />
                    </Button>
                    <Button loading={deleting===id} danger onClick={() => onDelete(id)}>
                      <DeleteOutlined />
                    </Button>
                  </div>
                );
              },
            },
            {},
          ]}
        />
      </div>
      <PostUser
        user={user}
        openUserDrawer={openUserDrawer}
        setOpenUserDrawer={setOpenUserDrawer}
      />
      <EditUser selectedUser={selectedUser} setSelectedUser={setSelectedUser} user={user}/>
    </div>
  );
}

export default UsersPage;
