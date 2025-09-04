'use client'

import { onClose, onOpen } from "@/redux/slices/storeModalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";


export const useStoreModal = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.storeModal.isOpen);

    return {
        isOpen,
        onOpen: () => dispatch(onOpen()),
        onClose: () => dispatch(onClose())
    }
}