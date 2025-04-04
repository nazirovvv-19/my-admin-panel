export type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
  createdAt: string;
};
export interface bannerType {
  id: number;
  title: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
}
export type RecentOrder = {
  id: number;
  customerId: number;
  totalPrice: number;
  status: string;
  createdAt: string;
};

export type TopProduct = {
  id: number;
  name: string;
  totalSold: number;
};

export type DashboardData = {
  totalUsers: string;
  totalOrders: string;
  totalProducts: string;
  totalRevenue: string;
  recentOrders: RecentOrder[];
  topProducts: TopProduct[];
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  createdAt: string;
  imageUrl: string;
};
export type ProductType = {
  items: Product[];
  message: string;
  page: number;
  total: number;
};

export type CatigoriesType = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
};

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
};

export type Order = {
  id: number;
  customerId: number;
  totalPrice: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
  items: OrderItem[];
};

export type OrdersResponse = {
  items: Order[];
};
