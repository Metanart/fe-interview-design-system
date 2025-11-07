import { ReactNode, FC } from "react";
import { useTabsContext } from "../TabsContext";

import styles from "./TabPanel.module.css";

export type TabPanelProps = {
  /** The id of the tab controlling the panel. */
  tabId: string;
  
  /** The content to display inside the tab panel */
  children: ReactNode;
}

export const TabPanel: FC<TabPanelProps> = (props) => {
  const { tabId, children } = props;
  
  const { activeTabId, tabsGroupId } = useTabsContext();
  
  const isActive = activeTabId === tabId;

  return (
    <div 
      role="tabpanel" 
      id={`${tabsGroupId}-panel-${tabId}`}
      aria-labelledby={`${tabsGroupId}-tab-${tabId}`}
      className={styles.tabPanel}
      hidden={!isActive}
      tabIndex={isActive ? 0 : -1}
    >
      {children}
    </div>
  );
};