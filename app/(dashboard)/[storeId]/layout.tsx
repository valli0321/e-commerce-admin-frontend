import { redirect } from "next/navigation";

import { Navbar } from "@/components/navbar";
import { serverGet } from "@/lib/serverApiUtils";

export default async function DashboardLayout ({
    children,
    params
} : {
    children: React.ReactNode,
    params: { storeId: string }
}) {

    let store = null;


    try {
        const res: any = await serverGet("/stores/first-store");

        store = res?.data;
        
    } catch (error: any) {
        // toast.error(error?.message);
        console.log(error.message);
    }

    if(!store){
        redirect("/");
    } 

    return (
        <>
            <Navbar />
            {children}
        </>
    )

}