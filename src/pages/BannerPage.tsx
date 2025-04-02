import { Button, Spin, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { bannerType } from "../types";

function BannerPage() {
  const [bannerState, setBannerState] = useState<bannerType[]>([]);
  const banners = () => {
    axios
      .get("https://nt.softly.uz/api/banners?limit=10&page=1&order=ASC")
      .then((res) => {
        setBannerState(res.data.items);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    banners();
  });
  if (!bannerState?.length) {
    return (
      <div className="banter-loader">
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
      </div>
    );
  }
  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-5 ">
        <h2>Banners</h2>
        <Button>Qoshish</Button>
      </div>
      <Table
        dataSource={bannerState}
        columns={[
          { key: 1, dataIndex: "id", title: "id" },
          { key: 2, dataIndex: "title", title: "title" },
          { key: 3, dataIndex: "imageUrl", title: "image" },
          { key: 4, dataIndex: "isActive", title: "isActive" },
          { key: 5, dataIndex: "createdAt", title: "createdAt" },
        ]}
      />
    </div>
  );
}

export default BannerPage;
