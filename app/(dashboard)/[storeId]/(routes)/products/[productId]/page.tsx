import React from 'react'

import ProductForm from './components/product-form'
import { serverGet } from '@/lib/serverApiUtils'
import { Category, Color, Product, Size } from '@/types/types'

const ProductPage = async ({
    params
}: {
    params: { productId: string, storeId: string }
}) => {
    const { productId, storeId } = await params;
    let productData: Product | null = null;

    const resCatg: any = await serverGet(`/${storeId}/categories`);
    const categories: Category[] = resCatg?.data || [];

    const ressizes: any = await serverGet(`/${storeId}/sizes`);
    const sizes: Size[] = ressizes?.data || [];

    const resColors: any = await serverGet(`/${storeId}/colors`);
    const colors: Color[] = resColors?.data || [];


    try {
        const { data }  = await serverGet<{ data: Product }>(`/productById/${productId}`)
        productData = data;
    } catch (error) {
        console.log("Error fetching Product:", error)
    }

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <ProductForm 
                    initialData={productData} 
                    categories={categories} 
                    sizes={sizes}
                    colors={colors}
                />
            </div>
        </div>
    )
}

export default ProductPage