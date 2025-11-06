import { FC, PropsWithChildren } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import styles from './Badge.module.css';

const classNames = cva(styles.badge, {
  variants: {
    variant: {
      neutral: styles['variant-neutral'],
      positive: styles['variant-positive'],
      negative: styles['variant-negative'],
    },
  },
  defaultVariants: {
    variant: 'neutral',
  },
});

export type BadgeVariant = VariantProps<typeof classNames>['variant'];

export interface BadgeProps extends PropsWithChildren, VariantProps<typeof classNames> {}

export const Badge: FC<BadgeProps> = ({ variant, children}) => {
  return (
    <span className={classNames({ variant })}>
        {children}
    </span>
  );
};
