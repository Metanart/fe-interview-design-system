import { FC, ReactNode } from "react";

import { TabsProvider } from "./TabsContext";
import { TabVariant } from "./types";

export type TabsProps = {
  /** The id of the default active tab */
  defaultActiveTabId: string;

  /** The variant of the tabs, changes shape and style of the tabs */
  tabVariant?: TabVariant;

  /** The id of the tabs group, used for accessibility */
  tabsGroupId?: string;

  /** The content to display inside the tabs */
  children: ReactNode;
}

export const Tabs: FC<TabsProps> = ({ 
  defaultActiveTabId,
  tabVariant = "pill",
  tabsGroupId = "tabs",
  children 
}) => {
  return (
    <TabsProvider
      defaultActiveTabId={defaultActiveTabId}
      tabVariant={tabVariant}
      tabsGroupId={tabsGroupId}
    >
      {children}
    </TabsProvider>
  );
};