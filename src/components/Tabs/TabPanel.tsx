import { ReactNode, FC } from "react";

export type TabPanelProps = {
  /** The content to display inside the tab panel */
  children: ReactNode;
}

export const TabPanel: FC<TabPanelProps> = ({ children }) => {
  return <div>{children}</div>;
};