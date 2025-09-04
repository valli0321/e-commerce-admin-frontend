'use client';

import { useEffect, useState } from 'react';
import * as z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver} from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { apiPost } from '@/lib/apiUtils';

const formSchema = z.object({ 
    name: z.string().min(1), 
})

export const StoreModal = () => {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const storeModal = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        
        try {
            setLoading(true);
            
            const response: any = await apiPost("/stores/create-store", values)
            toast.success("Store created.");
            form.reset();

            const store = response.data;
            window.location.assign(`${store?.id}`);
            // router.push(`/${store?.id}`)

        } catch (err) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <Modal 
            title="Create Store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
        <div className='space-y-4 py-2 pb-4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField 
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel> Name </FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder='E-Commerce' {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className='pt-6 space-x-2 flex items-center justify-end'>
                        <Button disabled={loading} variant="outline" type="button" onClick={() => {
                            storeModal.onClose()
                            form.reset();
                        }}>
                            Cancel
                        </Button>
                        <Button disabled={loading} type='submit'>
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
        </Modal>
    )

}