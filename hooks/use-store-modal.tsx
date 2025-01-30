'use client'

import { useDispatch, useSelector } from "react-redux";

import { onClose, onOpen } from "@/redux/slices/storeModalSlice";
import { AppDispatch, RootState } from "@/redux/store";


export const useStoreModal = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isOpen = useSelector((state: RootState) => state.storeModal.isOpen);

    return {
        isOpen,
        onOpen: () => dispatch(onOpen()),
        onClose: () => dispatch(onClose())
    }
}