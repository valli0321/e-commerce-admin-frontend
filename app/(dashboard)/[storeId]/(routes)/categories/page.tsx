import React from 'react'
import { format } from "date-fns";

import { serverGet } from '@/lib/serverApiUtils'
import { Category } from '@/types/store'
import { CategoryClient } from './components/client'
import { CategoryColumn } from './components/columns'

const CategoriesPage = async ({
  params
} : {
  params: { storeId: string }
}) => {

  const { storeId } = await params;

  const { data } = await serverGet<{data: Category[]}>(`${storeId}/categories`);

  const formattedCategories: CategoryColumn[] = data.map((item)=> ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 pt-6 p-8'>
            <CategoryClient data={formattedCategories}/>
        </div>
    </div>
  )
}

export default CategoriesPage