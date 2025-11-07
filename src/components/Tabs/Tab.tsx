import { FC, ReactNode, useCallback } from "react";
import { cva } from "class-variance-authority";

import { useTabsContext } from "./TabsContext";

import { TabVariant } from "./types";

import styles from "./Tab.module.scss";
import { Typography } from "../Typography/Typography";

export type TabProps = {
  /** The id of the tab */
  id: string;

  /** The variant of the tab, changes shape and style of the tab */
  variant: TabVariant;

  /** The state of the tab, changes visual appearance of the tab */
  state: "default" | "hover" | "active" | "focus";

  /** Whether the tab is selected */
  isSelected: boolean;

  /** Whether the tab is disabled */
  isDisabled?: boolean;

  /** The function to handle the click event */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** The function to handle the key down event */
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;

  /** The content to display inside the tab */
  children: ReactNode;
};

const classNames = cva(styles.tab, {
  variants: {
    variant: {
      pill: styles["variant--pill"],
      underline: styles["variant--underline"],
    }
  },
  defaultVariants: {
    variant: "pill",
  }
});

export const Tab: FC<TabProps> = (props) => {
  const { id,
    variant: propVariant,
    isSelected: propIsSelected,
    isDisabled,
    children,
    onClick,
    onKeyDown,
} = props;

  const { activeTabId, setActiveTabId, tabVariant, tabsGroupId } = useTabsContext();

  const variant = propVariant ?? tabVariant;
  const isSelected = activeTabId === id ? true : propIsSelected ?? false;

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;

    if (!isSelected) setActiveTabId(id);

    onClick?.(event);
  }, [isDisabled, isSelected, setActiveTabId, onClick]);

  return (
    <button
      role="tab"
      type="button"
      className={classNames({ variant: variant ?? tabVariant })}
      aria-selected={isSelected ? "true" : "false"}
      aria-controls={`${tabsGroupId}-panel-${id}`}
      aria-disabled={isDisabled ? "true" : undefined}
      tabIndex={isDisabled ? -1 : isSelected ? 0 : -1}
      onClick={handleClick}
      onKeyDown={onKeyDown}
    >
      <div className={styles.labelText}>
        <Typography variant="body-m" weight="medium">{children}</Typography>
      </div>
    </button>
  );
};
