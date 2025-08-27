import React from 'react'

import { MainNav } from './main-nav'
import StoreSwitcher from './store-switcher'
import { serverGet, verifySession } from '@/lib/serverApiUtils'
import { Store } from '@/types/types' 
import { UserButton } from './user-button'

export const Navbar = async () => {

    const res: any = await verifySession();

    let stores: Store[] = [];

    const response: any = await serverGet("/stores");
    stores = response?.data;

    return (
        <div className='border-b'>
            <div className='flex h-16 items-center px-4'>
                <StoreSwitcher items={stores} />
                <MainNav className='mx-6'/>
                <div className='ml-auto flex items-center space-x-4'>
                    <UserButton user={res?.data} />
                </div>
            </div>
        </div>
    )
}
