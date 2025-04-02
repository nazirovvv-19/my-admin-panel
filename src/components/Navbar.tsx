import React from "react";
import useGlobalStore from "../store/store";
import userLogo from "../assets/userLogo.png";
import { Avatar, Dropdown } from "antd";
import {
  LoginOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

function Navbar() {
  const auth = useGlobalStore();
  return (
    
    <div className="container mx-auto px-6 py-2 bg-[#001529]">
     <div className="flex justify-between items-center">
      <i className="font-bold text-xl text-white">Logo</i>
     <Dropdown
        menu={{
          items: [
            {
              key: 1,
              label: "sozlamalar ",
              icon: <SettingOutlined />,
            },
            {
              key: 2,
              label: "profil ",
              icon: <UserOutlined />,
            },
            {
              key: 3,
              label: "chiqish ",
              icon: <LoginOutlined />,
              danger:true,
              onClick:()=>{
                auth.logOut()
              }
            },
          ],
        }}
      >
        <div className="flex gap-3 items-center">
          <Avatar size="large" icon={<UserOutlined />} />
          <div className="text-sm">
            <p className="font-semibold text-white  text-[17px]">Name: {auth.user.name}</p>
            <p className="text-sm text-white">Email: {auth.user.email}</p>
          </div>
        </div>
      </Dropdown>
     </div>
    </div>
  );
}

export default Navbar;
