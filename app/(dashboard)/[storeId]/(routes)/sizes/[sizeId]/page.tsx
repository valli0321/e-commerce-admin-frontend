import React from 'react'
import SizeForm from './components/size-form'
import { serverGet } from '@/lib/serverApiUtils'
import { Size } from '@/types/store'

const SizePage = async ({
    params
}: {
    params: { sizeId: string }
}) => {
    const { sizeId } = await params;
    let sizeData: Size | null = null;

    try {
        const { data }  = await serverGet<{ data: Size }>(`/sizeById/${sizeId}`)
        sizeData = data;
    } catch (error) {
        console.log("Error fetching ", error)
    }

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <SizeForm initialData={sizeData} />
            </div>
        </div>
    )
}

export default SizePage