import { redirect } from "next/navigation";

import { serverGet, verifySession } from "@/lib/serverApiUtils";

export default async function SetupLayout ({
    children
} : {
    children: React.ReactNode
}){
    
    const res = await verifySession();
    
    let store = null;

    try {
        const res: any = await serverGet<{ data: any }>(`/stores/first-store`);
        
        store = res?.data;
    } catch (error: any) {
        console.log(error?.message)
    }

    if(store){
        redirect(`/${store?.id}`);
    } 

    return (
        <> {children} </>
    )

}