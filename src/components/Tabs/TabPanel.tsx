import { ReactNode, FC } from "react";
import { useTabsContext } from "./TabsContext";

export type TabPanelProps = {
  /** The content to display inside the tab panel */
  children: ReactNode;
}

export const TabPanel: FC<TabPanelProps> = (props) => {
  const { children } = props;
  
  const { activeTabId } = useTabsContext();
  if (activeTab !== activeTabId) return null;

  return (
    <div role="tabpanel" style={{ padding: 8, border: "1px solid #ccc", marginTop: 4 }}>
      {children}
    </div>
  );
};