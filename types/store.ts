import { boolean } from "zod";

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
  id: number;
  storeId: string;
  name: string;
  value: string;
  createdAt: string;
}

export interface Color {
  id: number;
  storeId: string;
  name: string;
  value: string;
  createdAt: string;
}

export interface Image {
  id: number;
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