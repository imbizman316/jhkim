"use client";

import { createContext, useContext, useState } from "react";

export const AppContext = createContext<any>(null);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState("mikey is rampant");
  const [openProfileEdit, setOpenProfileEdit] = useState(false);

  return (
    <AppContext.Provider
      value={{ state, setState, openProfileEdit, setOpenProfileEdit }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
