import { FC, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";

import { Typography, TypographyProps } from "../Typography/Typography";

import styles from "./Badge.module.scss";

const classNames = cva(styles.badge, {
  variants: {
    variant: {
      neutral: styles["variant--neutral"],
      positive: styles["variant--positive"],
      negative: styles["variant--negative"],
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

type BadgeVariant = VariantProps<typeof classNames>["variant"];
export interface BadgeProps {
  /**
   * The visual variant of the badge. Use neutral for general information,
   * positive for success states, and negative for error or warning states
   */
  variant?: BadgeVariant;

  /** Text variant inside the badge, corresponds to TypographyProps["variant"] */
  textVariant?: TypographyProps["variant"];

  /** The content to display inside the badge. Can be text or numbers only */
  children: string | number | ReactNode;
}


export const Badge: FC<BadgeProps> = (props: BadgeProps) => {
  const { variant, children, textVariant = "body-s", ...rest } = props;
  return (
    <span className={classNames({ variant })}>
      <Typography variant={textVariant} weight="medium" {...rest} >{children}</Typography>
    </span>
  );
};
