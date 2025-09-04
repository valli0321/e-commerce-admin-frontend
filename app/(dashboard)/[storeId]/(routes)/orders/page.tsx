import React from 'react'
import { format } from "date-fns";

import { serverGet } from '@/lib/serverApiUtils'
import { Order } from '@/types/types'
import { OrderClient } from './components/client'
import { OrderColumn } from './components/columns'
import { formatter } from '@/lib/utils';

const OrdersPage = async ({
  params
} : {
  params: { storeId: string }
}) => {

  const { storeId } = await params;

  const { data } = await serverGet<{data: Order[]}>(`${storeId}/orders`);

  const formattedOrders: OrderColumn[] = data.map((item)=> ({
    id: item?.id,
    order_number: item?.order_number,
    phone: item?.phone,
    address: item?.address,
    products: item?.orderItems?.map((orderItem) => orderItem?.product?.name).join(", "),
    totalPrice: formatter.format(item?.orderItems.reduce((total, item) => {
      return total + Number(item?.product.price)
    }, 0)),
    isPaid: item?.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 pt-6 p-8'>
            <OrderClient data={formattedOrders}/>
        </div>
    </div>
  )
}

export default OrdersPage