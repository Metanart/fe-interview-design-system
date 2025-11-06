import { FC, ReactNode } from "react";

export type TabProps = {
  /** The content to display inside the tab */
  children: ReactNode;
}

export const Tab: FC<TabProps> = ({ children }) => {
  return <div>{children}</div>;
};