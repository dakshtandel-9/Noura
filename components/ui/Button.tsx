import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "light";

interface CommonProps {
  variant?: Variant;
  icon?: IconName | null;
  children: ReactNode;
}

function classes(variant: Variant, className?: string) {
  return ["btn", `btn--${variant}`, className].filter(Boolean).join(" ");
}

export function ButtonLink({
  variant = "primary",
  icon = "arrow-right",
  className,
  children,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={classes(variant, className)} {...rest}>
      <span>{children}</span>
      {icon && <Icon name={icon} size={20} />}
    </a>
  );
}

export function Button({
  variant = "primary",
  icon = "arrow-right",
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classes(variant, className)} {...rest}>
      <span>{children}</span>
      {icon && <Icon name={icon} size={20} />}
    </button>
  );
}

export function TextLink({
  children,
  className,
  ...rest
}: { children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={["text-link", className].filter(Boolean).join(" ")} {...rest}>
      <span>{children}</span>
      <Icon name="arrow-right" size={20} />
    </a>
  );
}
