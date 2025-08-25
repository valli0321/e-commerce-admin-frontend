import React from 'react'
import { format } from "date-fns";

import { serverGet } from '@/lib/serverApiUtils'
import { Color } from '@/types/store'
import { ColorsClient } from './components/client'
import { ColorColumn } from './components/columns'

const ColorsPage = async ({
  params
} : {
  params: { storeId: string }
}) => {

  const { storeId } = await params;

  const { data } = await serverGet<{data: Color[]}>(`${storeId}/colors`);

  const formattedColors: ColorColumn[] = data.map((item)=> ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 pt-6 p-8'>
            <ColorsClient data={formattedColors}/>
        </div>
    </div>
  )
}

export default ColorsPage