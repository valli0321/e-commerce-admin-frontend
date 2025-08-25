import React from 'react'

import { serverGet, verifySession } from '@/lib/serverApiUtils';

interface DashboardPageProps {
  params: { storeId: string}
}

export default async function DashboardPage ({ params }: DashboardPageProps) {
  // await verifySession();
  const { storeId } =  await params;

  let store = null;

  try {
    const res: any = await serverGet(`/stores/${storeId}`)
    
    store = res?.data;
  } catch (error) {
    console.log(error);
  }

  return (
      <div>
        DashboardPage
        <p>Active Store: {store.name}</p>
      </div>
  )
}
