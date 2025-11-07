import { FC, ReactNode } from "react";

import styles from "./Stack.module.css";

export type StackSpacing = '0' | '4xs' | '3xs' | '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl';

export type StackDirection = 'row' | 'column';

export interface StackProps {
  /**
   * The spacing between the child components,
   * changes the gap between the child components
   */
  spacing?: StackSpacing;

  /** The direction of the stack, changes the layout of the stack */
  direction?: StackDirection;

  /** The content to display inside the stack */
  children: ReactNode;
}

export const Stack: FC<StackProps> = ({ 
  children, 
  spacing = 'm',
  direction = 'column' 
}) => {
  const spacingClass = spacing ? styles[`spacing--${spacing}`] : '';
  const directionClass = direction ? styles[`direction--${direction}`] : '';
  
  return (
    <div className={`${styles.stack} ${spacingClass} ${directionClass}`}>
      {children}
    </div>
  );
};