import React from 'react'
import BillboardForm from './components/billboard-form'
import { serverGet } from '@/lib/serverApiUtils'
import { Billboard } from '@/types/types'

const BillboardPage = async ({
    params
}: {
    params: { storeId: string, billboardId: string }
}) => {
    const { storeId, billboardId } = await params;
    let billboardData: Billboard | null = null;

    try {
        const { data }  = await serverGet<{ data: Billboard }>(`${storeId}/billboards/${billboardId}`)
        billboardData = data;
    } catch (error) {
        console.log("Error fetching billboard:", error)
    }

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <BillboardForm initialData={billboardData} />
            </div>
        </div>
    )
}

export default BillboardPage