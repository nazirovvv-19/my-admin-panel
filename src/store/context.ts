import { createContext } from "react";

export const Mycontext =createContext(null as any)
export const context5 = createContext<{num:number}>({num:0})