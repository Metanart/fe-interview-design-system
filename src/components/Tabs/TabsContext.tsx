import { ReactElement, ReactNode, createContext, useContext, useState } from "react";

import { TabVariant } from "./types";

export type TabsContextValue = {
  /** The id of the active tab */
  activeTabId: string;

  /** The function to set the id of the active tab */
  setActiveTabId: (value: string) => void;
  
  /** The variant of the tabs, corresponds to TabProps["variant"] */
  tabVariant: TabVariant;
  
  /** The id of the tabs group */
  tabsGroupId: string;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export const useTabsContext = (): TabsContextValue => useContext(TabsContext) as TabsContextValue;

type TabsProviderProps = {
  /** The id of the default active tab */
  defaultActiveTabId: string;

  /** The variant of the tabs, corresponds to TabProps["variant"] */
  tabVariant?: TabVariant;

  /** The id of the tabs group */
  tabsGroupId?: string;

  /** The content to display inside the tabs */
  children: ReactNode;
}

export const TabsProvider = ({
  defaultActiveTabId,
  tabVariant = "pill",
  tabsGroupId = "tabs",
  children,
}: TabsProviderProps): ReactElement<TabsContextValue> => {
  const [activeTabId, setActiveTabId] = useState<string>(defaultActiveTabId);

  return (
    <TabsContext.Provider value={{ activeTabId, setActiveTabId, tabVariant, tabsGroupId }}>{children}</TabsContext.Provider>
  );
};
