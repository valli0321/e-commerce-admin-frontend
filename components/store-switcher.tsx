"use client"

import { useParams, useRouter } from "next/navigation";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { CommandInput } from "cmdk";
import type { Store } from "@/types/store";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}

export default function StoreSwitcher ({
    className,
    items=[]
}: StoreSwitcherProps) {

    const params = useParams();
    const router = useRouter();
    const storeModal = useStoreModal();

    const [open, setOpen] = useState(false);
    const storeId = params.storeId;

    const formattedStore = items.map((item: any) => ({
        label: item.name,
        value: item.id
    }));

    const currentStore = formattedStore.find((item: any) => item.value === storeId);

    const onStoreSelect = (store: { value: string, label: string}) => {
        setOpen(false);
        router.push(`/${store.value}`)
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput className="ml-2" placeholder="Search store..."/>
                        <CommandEmpty>No Store Found</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedStore.map((store)=> (
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => onStoreSelect(store)}
                                >
                                    <StoreIcon className="mr-2 w-4 h-4"/>
                                    {store.label}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                             currentStore?.value === store.value 
                                             ? "opacity-100" 
                                             : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator/>
                    <CommandGroup>
                        <CommandItem
                            onSelect={() => {
                                setOpen(false);
                                storeModal.onOpen();
                            }}
                        >
                            <PlusCircle className="mr-2 w-4 h-4" />
                            Create Store
                        </CommandItem>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}