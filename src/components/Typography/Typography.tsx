import { FC, ReactNode } from 'react';
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
    weight: {
      regular: styles['weight--regular'],
      medium: styles['weight--medium'],
    },
  },
  defaultVariants: {
    variant: 'body-m',
  },
});

type TypographyVariant = VariantProps<typeof classNames>['variant'];

type TypographyWeight = VariantProps<typeof classNames>['weight'];

export type TypographyProps = {
  /** Typography variant, changes the font size and line height */
  variant?: TypographyVariant;

  /** Typography weight, changes the font weight */
  weight?: TypographyWeight;

  /** Typography content, can be text or numbers or ReactNode */
  children: string | number | ReactNode;
}

export const Typography: FC<TypographyProps> = ({
  variant = 'body-m',
  weight = 'regular',
  children,
}) => {
  return (
    <p className={classNames({ variant, weight })}>
      {children}
    </p>
  );
};
