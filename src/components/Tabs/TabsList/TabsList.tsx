import { ReactNode, FC } from "react";

import { useTabsContext } from "../TabsContext";

import styles from "./TabsList.module.scss";

export type TabsListProps = {
  /** The content to display inside the tab list */
  children: ReactNode;
}

export const TabsList:FC<TabsListProps> = ({ children }) => {
  const { tabVariant } = useTabsContext();
  
  return (
    <div 
      role="tablist" 
      className={`${styles.tabsList} ${styles[`variant--${tabVariant}`]}`}
    >
      {children}
    </div>
  );
};

