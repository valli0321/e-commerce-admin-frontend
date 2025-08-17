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
}