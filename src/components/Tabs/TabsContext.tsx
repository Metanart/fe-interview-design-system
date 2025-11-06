import { ReactElement, ReactNode, createContext, useContext, useState } from "react";

export type TabVariant = "pill" | "underline";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: TabVariant;
  groupId: string;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export const useTabsContext = () => useContext(TabsContext);

interface TabsProviderProps {
  defaultActiveTab: string;
  variant?: TabVariant;
  groupId?: string;
  children: ReactNode;
}

export const TabsProvider = ({
  defaultActiveTab,
  variant = "pill",
  groupId = "tabs",
  children,
}: TabsProviderProps): ReactElement<TabsContextValue> => {
  const [activeTab, setActiveTab] = useState<string>(defaultActiveTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, variant, groupId }}>{children}</TabsContext.Provider>
  );
};
