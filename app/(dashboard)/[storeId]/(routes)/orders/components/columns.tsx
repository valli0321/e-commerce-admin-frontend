"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"

export type OrderColumn = {
  id: string
  order_number: string;
  isPaid: boolean;
  phone: string
  address: string
  products: string
  totalPrice: string
  createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "order_number",
    header: "Order Number",
  },
  {
    accessorKey: "products",
    header: "Products",
    
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    cell: ({ row }) =>(
      <Badge variant={row.original.isPaid ? "success" : "secondary"}>
        {row.original.isPaid ? "Paid" : "Checkout initiated"}
      </Badge>
    )
  },
]