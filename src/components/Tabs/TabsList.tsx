import { ReactNode, FC } from "react";

export type TabsListProps = {
  /** The content to display inside the tab list */
  children: ReactNode;
}

export const TabsList:FC<TabsListProps> = ({ children }) => (
  <div role="tablist">{children}</div>
);

