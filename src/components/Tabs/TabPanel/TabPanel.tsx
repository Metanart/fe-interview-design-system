import { ReactNode, FC } from "react";
import { useTabsContext } from "../TabsContext";

import styles from "./TabPanel.module.css";

export type TabPanelProps = {
  /**
   * The id of the tab panel.
   * Should be the same as the id of the tab that controls the panel.
   * This is used to determine which panel to display when the tab is selected.
   */
  id: string;

  /**
   * The content to display inside the tab panel.
   */
  children: ReactNode;
}

export const TabPanel: FC<TabPanelProps> = (props) => {
  const { id, children } = props;
  
  const { activeTabId, tabsGroupId } = useTabsContext();
  
  if (activeTabId !== id) return null;

  return (
    <div 
      role="tabpanel" 
      id={`${tabsGroupId}-panel-${id}`}
      aria-labelledby={`${tabsGroupId}-tab-${id}`}
      className={styles.tabPanel}
    >
      {children}
    </div>
  );
};