import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { DashboardData } from "../types";

function HomePage() {
  const [dashboard, setDashboard] = useState<DashboardData>();

  useEffect(() => {
    axios
      .get(`https://nt.softly.uz/api/statistics/dashboard`)
      .then((res) => {
        console.log(res.data);
        setDashboard(res.data);
      })
      .catch((e) => {
        console.log(e);
        message.error("xatolik");
      });
  }, []);

  return (
    <div className="container mx-auto p-8 bg-gray-50 h-[620px] overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
          <p className="text-gray-600 text-sm mb-2">Foydalanuvchilar</p>
          <p className="text-2xl font-bold text-gray-900">
            {dashboard?.totalUsers} ta
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
          <p className="text-gray-600 text-sm mb-2">Mahsulotlar</p>
          <p className="text-2xl font-bold text-gray-900">
            {dashboard?.totalProducts} ta
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
          <p className="text-gray-600 text-sm mb-2">Umumiy Daromad</p>
          <p className="text-2xl font-bold text-emerald-600">
            {dashboard?.totalRevenue} som
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
          <p className="text-gray-600 text-sm mb-2">Buyurtmalar</p>
          <p className="text-2xl font-bold text-gray-900">
            {dashboard?.totalOrders} ta
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Oxirgi Buyurtmalar</h2>
          <div className="space-y-4">
            {dashboard?.recentOrders.map((item) => (
              <div key={item.id} className="border-b border-gray-100 pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Buyurtma #{item.id}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "Yetkazildi"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Jarayonda"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Mijoz ID: {item.customerId}
                  </span>
                  <span className="font-medium">${item.totalPrice}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top mahsulotlar */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Top Mahsulotlar</h2>
          <div className="space-y-6">
            {dashboard?.topProducts.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.totalSold} ta sotilgan
                  </p>
                </div>
                <div className="w-32 ml-4">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${(item.totalSold / 50) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
