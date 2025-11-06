import { FC, HTMLAttributes, ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import styles from './Typography.module.css';

export const classNames = cva(styles.typography, {
  variants: {
    variant: {
      'body-m': styles['variant--body-m'],
      'body-s': styles['variant--body-s'],
      'header-1': styles['variant--header-1'],
      'header-2': styles['variant--header-2'],
      'header-3': styles['variant--header-3'],
    },
  },
  defaultVariants: {
    variant: 'body-m',
  },
});

type TypographyVariant = VariantProps<typeof classNames>['variant'];

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /** Typography variant, changes the font size and line height */
  variant?: TypographyVariant;

  /** Typography content, can be text or numbers or ReactNode */
  children: string | number | ReactNode;
}

export const Typography: FC<TypographyProps> = ({
  variant = 'body-m',
  children,
  ...rest
}) => {
  return (
    <p className={classNames({ variant })} {...rest}>
      {children}
    </p>
  );
};
