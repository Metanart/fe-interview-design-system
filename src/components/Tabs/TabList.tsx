import { ReactNode, FC } from "react";

export type TabListProps = {
  /** The content to display inside the tab list */
  children: ReactNode;
}

export const TabList: FC<TabListProps> = ({ children }) => {
  return <div>{children}</div>;
};