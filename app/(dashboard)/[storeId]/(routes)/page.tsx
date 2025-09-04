import React from 'react'

import { serverGet, verifySession } from '@/lib/serverApiUtils';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, IndianRupee, PackageIcon } from 'lucide-react';
import { formatter } from '@/lib/utils';
import Overview from '@/components/overview';

interface DashboardPageProps {
  params: { storeId: string}
}

export default async function DashboardPage ({ params }: DashboardPageProps) {
  // await verifySession();
  const { storeId } =  await params;

  let stats = null;
  let graphData = [];

  try {
    const res: any = await serverGet(`/${storeId}/orders/stats`)
    const resGraph: any = await serverGet(`/${storeId}/orders/graph`)
    stats = res?.data;
    graphData = resGraph?.data;
    
  } catch (error) {
    console.log(error);
  }
console.log(graphData)
  return (
      <div className="flex-col">
        <div className='flex-1 space-y-4 p-8 pt-6 '>
          <Heading title='Dashboard' description='Overview of your store' />
          <Separator/>
          <div className='grid gap-4 grid-cols-3'>
            <Card>
              <CardHeader className='flex items-center flex-row justify-between pb-2 space-y-0'>
                <CardTitle className='font-medium text-sm'>
                  Total Revenue
                </CardTitle>
                <IndianRupee className='h-4 w-4 text-muted-foreground'/>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {formatter.format(stats?.totalRevenue)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex items-center flex-row justify-between pb-2 space-y-0'>
                <CardTitle className='font-medium text-sm'>
                  Sales
                </CardTitle>
                <CreditCard className='h-4 w-4 text-muted-foreground'/>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  +{stats?.salesCount}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex items-center flex-row justify-between pb-2 space-y-0'>
                <CardTitle className='font-medium text-sm'>
                  Products in Stock
                </CardTitle>
                <PackageIcon className='h-4 w-4 text-muted-foreground'/>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {stats?.productsInStock}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className='col-span-4'>
            <CardHeader className=''>
              <CardTitle>
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-2'>
              {(graphData || graphData.length) && <Overview data={graphData || []} />}
            </CardContent>
          </Card>
        </div>
      </div>
  )
}
