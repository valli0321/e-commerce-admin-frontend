import React from 'react'
import { format } from "date-fns";

import { serverGet } from '@/lib/serverApiUtils'
import { formatter } from '@/lib/utils';

import { Product } from '@/types/types'
import { ProductClient } from './components/client'
import { ProductColumn } from './components/columns'

const ProductsPage = async ({
  params
} : {
  params: { storeId: string }
}) => {

  const { storeId } = await params;

  const { data } = await serverGet<{data: Product[]}>(`${storeId}/products`);

  const formattedProducts: ProductColumn[] = data.map((item)=> ({
    id: item?.id,
    name: item?.name,
    isArchived: item?.isArchived,
    isFeatured: item?.isFeatured,
    price: formatter.format(item.price),
    category: item?.category.name,
    size: item?.size?.name,
    color: item?.color?.value,
    createdAt: format(item?.createdAt, "MMMM do, yyyy")
  }))
  
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 pt-6 p-8'>
            <ProductClient data={formattedProducts}/>
        </div>
    </div>
  )
}

export default ProductsPage