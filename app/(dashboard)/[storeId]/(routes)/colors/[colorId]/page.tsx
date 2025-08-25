import React from 'react'
import ColorForm from './components/color-form'
import { serverGet } from '@/lib/serverApiUtils'
import { Color } from '@/types/store'

const ColorPage = async ({
    params
}: {
    params: { colorId: string }
}) => {
    const { colorId } = await params;
    let colorData: Color | null = null;

    try {
        const { data }  = await serverGet<{ data: Color }>(`/colorById/${colorId}`)
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