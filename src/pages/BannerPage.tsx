import { Button, message, Switch, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../api/Api";
import { bannerType } from "../types";
import BannersPost from "../components/BannersPost";
import { DeleteOutlined } from "@ant-design/icons";

function BannerPage() {
  const [bannerState, setBannerState] = useState<bannerType[]>([]);
  const [bannerDrawer, setBannerDrawer] = useState(false)
  const [loading,setLoading]=useState<boolean>(true)
  const banners = () => {
    setLoading(true)
    api
    
      .get("/api/banners?limit=10&page=1&order=ASC")
      .then((res) => {

        setBannerState(res.data.items);
      })
      .catch((e) => {
        console.log(e);
      }).finally(()=>{
        setLoading(false)
      })
  };
  useEffect(() => {
    banners();
  }, []);
  const handleSwitchChange = (checked: boolean, id: number) => {
    const updatedBanners = bannerState.map((banner) =>
      banner.id === id ? { ...banner, isActive: checked } : banner
    );
    setBannerState(updatedBanners);

    api
      .put(`/api/banners/${id}`, { isActive: checked })
      .then(() => {
        console.log("Banner updated successfully");
      })
      .catch((e) => {
        console.error("Error updating banner", e);
      });
  };
  function onDelete(id:number) {
    api.delete(`/api/banners/${id}`).then(_=>{
     setBannerState(prev=>prev.filter(item=>item.id!== id))
     message.success('Ochirilib yuborildi')
    }).catch(e=>{
      console.log(e + " ochirishda xatolik");
      message.error('ochirishni imkoni bolmadi')
    })
  }


  return (
    <div className="w-full h-full p-6">
      <div className="flex justify-between items-center mb-5 ">
        <h2>Banners</h2>
        <Button onClick={()=>setBannerDrawer(true)}>Qoshish</Button>
      </div>
      <Table
      loading={loading}
        size="small"
        style={{ overflow: "auto", height: "100%" }}
        dataSource={bannerState}
        columns={[
          { key: 1, dataIndex: "id", title: "id" },
          { key: 2, dataIndex: "title", title: "title" },
          {
            key: 4,
            dataIndex: "isActive",
            title: "isActive",
            render: (isActive, record) => {
              return (
                <Switch
                  checked={isActive} 
                  onChange={(checked) => handleSwitchChange(checked, record.id)} 
                />
              );
            },
          },
          { key: 5, dataIndex: "createdAt", title: "createdAt" },
          {
            key: 3,
            dataIndex: "imageUrl",
            title: "image",
            render: (image) => (
              <div>
                <img width={70} src={image} alt="" />
              </div>
            ),
          },
          {
            key: 6,
            dataIndex: "id",
            title: "Actions",
            render: (id:number) => (
              <div>
               <Button onClick={()=>onDelete(id)}>
                <DeleteOutlined/>
               </Button>
              </div>
            ),
          },
        ]}
      />
    <BannersPost banners={banners} bannerDrawer={bannerDrawer} setBannerDrawer={setBannerDrawer}/>
    </div>
  );
}

export default BannerPage;
