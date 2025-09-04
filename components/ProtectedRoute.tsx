"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/redux/hooks";
import { AuthLoading } from "./ui/auth-loading";


export default function ProtectedRoutes({ children }: { children: React.ReactNode}) {
    const { isAuthenticated, isLoading} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!isLoading && !isAuthenticated){
            router.push("/sign-in")
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading || !isAuthenticated) {
        return <AuthLoading />;
      }
    
    return <>
        {children}
    </>;
}