import { boolean } from "zod";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export interface Store {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}


export interface Billboard {
  id: string;
  storeId: string;
  label: string;
  imageUrl: string;
  createdAt: string;
}

export interface Category {
  id: string;
  storeId: string;
  name: string;
  billboard: Billboard;
  createdAt: string;
}

export interface Size {
  id: string;
  storeId: string;
  name: string;
  value: string;
  createdAt: string;
}

export interface Color {
  id: string;
  storeId: string;
  name: string;
  value: string;
  createdAt: string;
}

export interface Image {
  id: string;
  url: string;
  createdAt: string;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  price: number;
  isFeatured: boolean;
  isArchived: boolean;
  category: Category;
  size: Size;
  color: Color;
  images: Image[];
  createdAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
}

export interface Order {
  id: string;
  storeId: string;
  order_number: string;
  phone: string;
  isPaid: boolean;
  address: string;
  orderItems: OrderItem[];
  createdAt: string;
}