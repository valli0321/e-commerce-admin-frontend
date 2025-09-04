"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { verifyAuth } from "@/redux/slices/authSlice";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifyAuth());
  }, [dispatch]);

  return <>{children}</>
}