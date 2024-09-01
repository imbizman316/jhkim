"use client";

import { createContext, useContext, useState } from "react";

export const AppContext = createContext<any>(null);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [showHamburger, setShowHamburger] = useState(false);
  const [openProfileEdit, setOpenProfileEdit] = useState(false);

  return (
    <AppContext.Provider
      value={{
        showHamburger,
        setShowHamburger,
        openProfileEdit,
        setOpenProfileEdit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
