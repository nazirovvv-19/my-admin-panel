import { Button } from "antd";
import api from "../api/Api";
import { useState, useEffect } from "react";
// import { Package2 } from "lucide-react";

type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
};

type Order = {
  id: number;
  customerId: number;
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  items: OrderItem[];
};

type OrdersResponse = {
  items: Order[];
};

// function OrderStatusBadge({ status }: { status: Order['status'] }) {
//   const statusStyles = {
//     pending: "bg-yellow-100 text-yellow-800",
//     completed: "bg-green-100 text-green-800",
//     cancelled: "bg-red-100 text-red-800"
//   };

  
//   return (
//     <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
//       {status.charAt(0).toUpperCase() + status.slice(1)}
//     </span>
//   );
// }

function OrdersPage() {
  const [orderState, setOrderState] = useState<Order[]>([]);

  const orders = () => {
    api.get<OrdersResponse>('/api/orders?limit=10&page=1&order=ASC').then(res => {
      console.log(res.data.items);
      setOrderState(res.data.items);  
    }).catch(error => {
      console.error("Error fetching orders:", error);
    });
  };

  useEffect(() => {
    orders();  
  }, []);

  return (
    <div className="w-full h-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            {/* <Package2 className="h-8 w-8 text-indigo-600" /> */}
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          </div>
          <Button type="primary" className="bg-indigo-600 hover:bg-indigo-700">
            New Order
          </Button>
        </div>

        
      </div>
    </div>
  );
}

export default OrdersPage;