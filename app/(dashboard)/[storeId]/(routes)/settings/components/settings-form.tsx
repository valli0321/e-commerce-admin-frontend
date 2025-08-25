"use client";

import React, { useState } from 'react'
import * as z from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';

import { Store } from '@/types/store';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { apiDelete, apiPut } from '@/lib/apiUtils';
import { AlertModal } from '@/components/modals/alert-modal';
import { ApiAlert } from '@/components/ui/api-alert';
import { useOrigin } from '@/hooks/use-origin';

interface SettingsFormProps {
    initialData: Store
}

const formSchema = z.object({
    name: z.string().min(1)
})

type SettingFormValues = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {

    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<SettingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const onSubmit = async (values: SettingFormValues) => {
        setLoading(true);
        try {
            const res = await apiPut(`/stores/${params?.storeId}`,values);
            router.refresh();
            toast.success("Store updated successfully");
        } catch(error: any) {
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        setLoading(true);
        try {
            await apiDelete(`/stores/${params?.storeId}`);
            router.refresh();
            router.push("/");
            toast.success("Store deleted.")
        } catch (error) {
            toast.error("Make sure you remove all products and categories first")
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className='flex items-center justify-between'>
                <Heading
                    title='Settings'
                    description='Manage store preferences'
                />
                <Button
                    variant="destructive"
                    disabled={loading}
                    size="icon"
                    onClick={() => setOpen(true)}
                >
                    <Trash className='h-4 w-4' />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <div className='grid grid-cols-3 gap-8'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Store name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className='ml-auto' type="submit">
                        Save Changes
                    </Button>
                </form>
            </Form>
            <Separator />
            <ApiAlert 
                title='NEXT_PUBLIC_API_URL' 
                description={`${origin}/stores/${params.storeId}`} 
                variant='public'
            />
        </>
    )
}

export default SettingsForm