import { ReactElement, ReactNode, createContext, useContext, useState, useRef, useCallback } from "react";

import { TabVariant } from "./types";

export type TabsContextValue = {
  /** The id of the active tab */
  activeTabId: string;

  /** The function to set the id of the active tab */
  setActiveTabId: (tabId: string) => void;
  
  /** The variant of the tabs, corresponds to TabProps["variant"] */
  tabVariant: TabVariant;
  
  /** The id of the tabs group */
  tabsGroupId: string;

  /** Register a tab ID */
  registerTab: (tabId: string, isDisabled: boolean) => void;

  /** Unregister a tab ID */
  unregisterTab: (tabId: string) => void;

  /** Get the next tab ID in the sequence */
  getNextTabId: (currentTabId: string) => string | null;

  /** Get the previous tab ID in the sequence */
  getPreviousTabId: (currentTabId: string) => string | null;

  /** Get the first tab ID */
  getFirstTabId: () => string | null;

  /** Get the last tab ID */
  getLastTabId: () => string | null;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export const useTabsContext = (): TabsContextValue => useContext(TabsContext) as TabsContextValue;

type TabInfo = {
  tabId: string;
  isDisabled: boolean;
};

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
  const tabsRef = useRef<Map<string, TabInfo>>(new Map());

  const registerTab = useCallback((tabId: string, isDisabled: boolean) => {
    tabsRef.current.set(tabId, { tabId, isDisabled });
  }, []);

  const unregisterTab = useCallback((tabId: string) => {
    tabsRef.current.delete(tabId);
  }, []);

  const getEnabledTabs = useCallback((): string[] => {
    return Array.from(tabsRef.current.values())
      .filter(tab => !tab.isDisabled)
      .map(tab => tab.tabId);
  }, []);

  const getNextTabId = useCallback((currentId: string): string | null => {
    const enabledTabs = getEnabledTabs();
    const currentIndex = enabledTabs.indexOf(currentId);
    
    if (currentIndex === -1) return enabledTabs[0] || null;
    if (currentIndex === enabledTabs.length - 1) return enabledTabs[0] || null; // Wrap around
    
    return enabledTabs[currentIndex + 1] || null;
  }, [getEnabledTabs]);

  const getPreviousTabId = useCallback((currentId: string): string | null => {
    const enabledTabs = getEnabledTabs();
    const currentIndex = enabledTabs.indexOf(currentId);
    
    if (currentIndex === -1) return enabledTabs[enabledTabs.length - 1] || null;
    if (currentIndex === 0) return enabledTabs[enabledTabs.length - 1] || null; // Wrap around
    
    return enabledTabs[currentIndex - 1] || null;
  }, [getEnabledTabs]);

  const getFirstTabId = useCallback((): string | null => {
    const enabledTabs = getEnabledTabs();
    return enabledTabs[0] || null;
  }, [getEnabledTabs]);

  const getLastTabId = useCallback((): string | null => {
    const enabledTabs = getEnabledTabs();
    return enabledTabs[enabledTabs.length - 1] || null;
  }, [getEnabledTabs]);

  return (
    <TabsContext.Provider value={{ 
      activeTabId, 
      setActiveTabId, 
      tabVariant, 
      tabsGroupId,
      registerTab,
      unregisterTab,
      getNextTabId,
      getPreviousTabId,
      getFirstTabId,
      getLastTabId,
    }}>
      {children}
    </TabsContext.Provider>
  );
};
