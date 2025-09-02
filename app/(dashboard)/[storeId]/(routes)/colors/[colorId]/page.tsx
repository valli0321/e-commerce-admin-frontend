import React from 'react'
import ColorForm from './components/color-form'
import { serverGet } from '@/lib/serverApiUtils'
import { Color } from '@/types/types'

const ColorPage = async ({
    params
}: {
    params: { colorId: string, storeId: string }
}) => {
    const { colorId , storeId} = await params;
    let colorData: Color | null = null;

    try {
        const { data }  = await serverGet<{ data: Color }>(`${storeId}/colors/${colorId}`)
        colorData = data;
    } catch (error) {
        console.log("Error fetching ", error)
    }

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <ColorForm initialData={colorData} />
            </div>
        </div>
    )
}

export default ColorPage