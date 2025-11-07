import { ReactNode, FC, useCallback } from "react";

import { useTabsContext } from "../TabsContext";

import styles from "./TabsList.module.scss";

export type TabsListProps = {
  /** The content to display inside the tab list */
  children: ReactNode;
}

export const TabsList:FC<TabsListProps> = ({ children }) => {
  const { tabVariant, activeTabId, setActiveTabId, getNextTabId, getPreviousTabId, tabsGroupId } = useTabsContext();
  
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    // Only handle arrow keys if they come from a tab button
    const target = event.target as HTMLElement;
    if (target.getAttribute("role") !== "tab") {
      return;
    }

    // Handle Left Arrow - go to previous tab
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      const previousTabId = getPreviousTabId(activeTabId);
      if (previousTabId && previousTabId !== activeTabId) {
        setActiveTabId(previousTabId);
        // Focus the new tab after state update
        setTimeout(() => {
          const previousTabElement = document.getElementById(`${tabsGroupId}-tab-${previousTabId}`);
          if (previousTabElement) {
            previousTabElement.focus();
          }
        }, 0);
      }
      return;
    }

    // Handle Right Arrow - go to next tab
    if (event.key === "ArrowRight") {
      event.preventDefault();
      const nextTabId = getNextTabId(activeTabId);
      if (nextTabId && nextTabId !== activeTabId) {
        setActiveTabId(nextTabId);
        // Focus the new tab after state update
        setTimeout(() => {
          const nextTabElement = document.getElementById(`${tabsGroupId}-tab-${nextTabId}`);
          if (nextTabElement) {
            nextTabElement.focus();
          }
        }, 0);
      }
      return;
    }
  }, [activeTabId, setActiveTabId, getNextTabId, getPreviousTabId, tabsGroupId]);
  
  return (
    <div 
      role="tablist" 
      aria-orientation="horizontal"
      className={`${styles.tabsList} ${styles[`variant--${tabVariant}`]}`}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};

