import { FC, ReactNode, HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import styles from './Typography.module.css';

export const classNames = cva(styles.typography, {
  variants: {
    variant: {
      'body-m': styles['body-m'],
      'body-s': styles['body-s'],
    },
  },
  defaultVariants: {
    variant: 'body-m',
  },
});

export type TypographyVariant = VariantProps<typeof classNames>['variant'];

export interface TypographyProps
  extends Omit<HTMLAttributes<HTMLParagraphElement>, 'className'>,
    VariantProps<typeof classNames> {
  children: ReactNode;
}

export const Typography: FC<TypographyProps> = (props: TypographyProps) => {
  const { variant, children, ...rest } = props;

  return (
    <p className={classNames({ variant })} {...rest}>
      {children}
    </p>
  );
};
