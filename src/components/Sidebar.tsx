import { AppstoreAddOutlined, BankOutlined, CarryOutFilled, CloudDownloadOutlined, HomeOutlined, ImportOutlined, ProductOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useLocation } from "react-router";

function Sidebar() {
  const location = useLocation();
  return (
    <div className="w-50 h-full">
      <aside className="h-full">
        <Menu
          style={{
            height: 670,
            maxWidth: 180,
            paddingRight: 5,
            // width:180
          }}
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          theme="dark"
          items={[
            {
              key: "/",
              label: <Link to={"/"}>Home</Link>,
              icon: <HomeOutlined />,
            },
            {
                key: "/users",
                label: <Link to={"/users"}>User</Link>,
                icon: <UserOutlined />,
              },
              {
                key: "/products",
                label: <Link to={"/products"}>Products</Link>,
                icon: <ProductOutlined />,
              },
              {
                key: "/categories",
                label: <Link to={"/categories"}>Categories</Link>,
                icon: <CarryOutFilled />,
              },
              {
                key: "/banner",
                label: <Link to={"/banner"}>Banner</Link>,
                icon: <AppstoreAddOutlined />,
              },
          ]}
        />
      </aside>
    </div>
  );
}

export default Sidebar;
