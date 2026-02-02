import { ReactNode, createContext, useContext, useState } from 'react';

type SidebarStates = {
  sidebar1: boolean;
  sidebar2: boolean;
};

type SidebarContextType = {
  states: SidebarStates;
  setSidebarState: (sidebarName: keyof SidebarStates, value: boolean) => void;
};

const SidebarStateContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarStateProvider({ children }: { children: ReactNode }) {
  const [states, setStates] = useState<SidebarStates>({
    sidebar1: false,
    sidebar2: false,
  });

  const setSidebarState = (sidebarName: keyof SidebarStates, value: boolean) => {
    setStates((prev) => ({
      ...prev,
      [sidebarName]: value,
    }));
  };

  return <SidebarStateContext.Provider value={{ states, setSidebarState }}>{children}</SidebarStateContext.Provider>;
}

export function useSidebarState() {
  const context = useContext(SidebarStateContext);
  if (!context) {
    throw new Error('useSidebarState must be used within SidebarStateProvider');
  }
  return context;
}
