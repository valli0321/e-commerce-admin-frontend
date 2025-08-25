import React from 'react'
import { format } from "date-fns";

import { serverGet } from '@/lib/serverApiUtils'
import { Billboard } from '@/types/store'
import { BillboardClient } from './components/client'
import { BillboardColumn } from './components/columns'

const BillboardsPage = async ({
  params
} : {
  params: { storeId: string }
}) => {

  const { storeId } = await params;

  const { data } = await serverGet<{data: Billboard[]}>(`${storeId}/billboards`);

  const formattedBillboards: BillboardColumn[] = data.map((item)=> ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 pt-6 p-8'>
            <BillboardClient data={formattedBillboards}/>
        </div>
    </div>
  )
}

export default BillboardsPage