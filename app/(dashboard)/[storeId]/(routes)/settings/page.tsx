import { serverGet, verifySession } from "@/lib/serverApiUtils";

import { redirect } from "next/navigation";

import SettingsForm from "./components/settings-form";

interface SettingPageProps {
    params: {
        storeId: string
    }
}

const SettingsPage: React.FC<SettingPageProps> = async ({
    params
}) => {

    await verifySession();
    const { storeId } = await params;
    let store = null;

    const res: any = await serverGet(`/stores/${storeId}`);
    store = res?.data;

    if(!store){
        redirect("/");
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store} />
            </div>
        </div>
    )
}

export default SettingsPage