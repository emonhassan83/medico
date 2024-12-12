"use client";

import { createContext, Dispatch, SetStateAction } from "react";

// Define the type of the context
export interface LoadingContextType {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

// Initialize the context with `null` as the default value
const LoadingContext = createContext<LoadingContextType | null>(null);

export default LoadingContext;
