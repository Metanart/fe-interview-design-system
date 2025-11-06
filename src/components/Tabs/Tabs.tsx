import { FC, ReactNode } from "react";

export type TabsProps ={
  /** The content to display inside the tabs */
  children: ReactNode;
}

export const Tabs: FC<TabsProps> = ({ children }) => {
  return <div>{children}</div>;
};