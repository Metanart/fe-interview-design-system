import { FC, ReactNode, useCallback, useEffect, useRef } from "react";
import { cva } from "class-variance-authority";

import { useTabsContext } from "../TabsContext";

import { TabVariant } from "../types";

import styles from "./Tab.module.scss";
import { Typography } from "../../Typography/Typography";

export type TabProps = {
  /** The id of the tab */
  id: string;

  /** The variant of the tab, changes shape and style of the tab */
  variant?: TabVariant;

  /** Whether the tab is selected */
  isSelected?: boolean;

  /** Whether the tab is disabled */
  isDisabled?: boolean;

  /** The function to handle the click event */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** The function to handle the key down event */
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;

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
  const {
    id: tabId,
    variant: propVariant,
    isSelected: propIsSelected,
    isDisabled,
    children,
    onClick,
    onKeyDown,
} = props;

  const { 
    activeTabId, 
    setActiveTabId, 
    tabVariant, 
    tabsGroupId,
    registerTab,
    unregisterTab,
    getFirstTabId,
    getLastTabId,
  } = useTabsContext();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const variant = propVariant ?? tabVariant;
  const isSelected = activeTabId === tabId ? true : propIsSelected ?? false;

  // Register/unregister tab on mount/unmount
  useEffect(() => {
    registerTab(tabId, isDisabled ?? false);
    return () => {
      unregisterTab(tabId);
    };
  }, [tabId, isDisabled, registerTab, unregisterTab]);

  // Update registration when disabled state changes
  useEffect(() => {
    registerTab(tabId, isDisabled ?? false);
  }, [tabId, isDisabled, registerTab]);

  // Focus the tab when it becomes selected (but not on initial render)
  useEffect(() => {
    if (isSelected && buttonRef.current && document.activeElement !== buttonRef.current) {
      // Only focus if focus is not already on this element
      // This prevents unwanted focus changes during arrow key navigation
      const shouldFocus = buttonRef.current.getAttribute("data-should-focus") === "true";
      if (shouldFocus) {
        buttonRef.current.focus();
        buttonRef.current.removeAttribute("data-should-focus");
      }
    }
  }, [isSelected]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;

    if (!isSelected) setActiveTabId(tabId);

    onClick?.(event);
  }, [tabId, isDisabled, isSelected, setActiveTabId, onClick]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (isDisabled) return;

    // Handle Enter and Space to activate tab
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!isSelected) {
        setActiveTabId(tabId);
      }
      // Create a synthetic click event for onClick handler
      const syntheticEvent = {
        ...event,
        type: "click",
        currentTarget: event.currentTarget,
        target: event.target,
      } as unknown as React.MouseEvent<HTMLButtonElement>;
      onClick?.(syntheticEvent);
      return;
    }

    // Handle Home key - go to first tab
    if (event.key === "Home") {
      event.preventDefault();
      const firstTabId = getFirstTabId();
      if (firstTabId && firstTabId !== activeTabId) {
        // Mark that we should focus the new tab
        const firstTabElement = document.getElementById(`${tabsGroupId}-tab-${firstTabId}`);
        if (firstTabElement) {
          firstTabElement.setAttribute("data-should-focus", "true");
        }
        setActiveTabId(firstTabId);
      }
      return;
    }

    // Handle End key - go to last tab
    if (event.key === "End") {
      event.preventDefault();
      const lastTabId = getLastTabId();
      if (lastTabId && lastTabId !== activeTabId) {
        // Mark that we should focus the new tab
        const lastTabElement = document.getElementById(`${tabsGroupId}-tab-${lastTabId}`);
        if (lastTabElement) {
          lastTabElement.setAttribute("data-should-focus", "true");
        }
        setActiveTabId(lastTabId);
      }
      return;
    }

    // Call custom onKeyDown handler for other keys
    onKeyDown?.(event);
  }, [tabId, isDisabled, isSelected, activeTabId, setActiveTabId, onClick, onKeyDown, getFirstTabId, getLastTabId, tabsGroupId]);

  return (
    <button
      ref={buttonRef}
      role="tab"
      type="button"
      id={`${tabsGroupId}-tab-${tabId}`}
      className={classNames({ variant: variant ?? tabVariant })}
      aria-selected={isSelected ? "true" : "false"}
      aria-controls={`${tabsGroupId}-panel-${tabId}`}
      aria-disabled={isDisabled ? "true" : undefined}
      tabIndex={isDisabled ? -1 : isSelected ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.labelText}>
        <Typography variant="body-m" weight="medium">{children}</Typography>
      </div>
    </button>
  );
};
