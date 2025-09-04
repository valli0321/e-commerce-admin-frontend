"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface OrderClientProps {
    data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    const { storeId } = params;

    return (
        <>
            <Heading
                title={`Orders (${data.length})`}
                description="Manage orders for your store"
            />
            <Separator />
            <DataTable columns={columns} data={data} searchKey="products" />
        </>
    )
}