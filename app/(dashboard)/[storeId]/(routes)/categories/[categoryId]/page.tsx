import React from 'react'
import CategoryForm from './components/category-form'
import { serverGet } from '@/lib/serverApiUtils'
import { Billboard, Category } from '@/types/types'

const CategoryPage = async ({
    params
}: {
    params: { categoryId: string, storeId: string }
}) => {
    const { categoryId, storeId } = await params;
    let categoryData: Category | null = null;
    let billboards: Billboard[] = [];

    const res: any  = await serverGet(`/${storeId}/billboards`);
    billboards = res?.data;

    try {
        const { data } = await serverGet<{data: Category}>(`/${storeId}/categories/${categoryId}`);
        categoryData = data;
    } catch (error) {
        console.log("Error fetching :", error)
    }

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <CategoryForm 
                    billboards={billboards}
                    initialData={categoryData}
                />
            </div>
        </div>
    )
}

export default CategoryPage