import { clsx, type ClassValue } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkAuth = (
  router: AppRouterInstance,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
  const token = localStorage.getItem("token");
  if (token) {
    router.push("/journals");
    return;
  }
  setIsLoading(false);
};
