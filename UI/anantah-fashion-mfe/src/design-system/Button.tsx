import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  size?: "sm" | "md";
  variant?: "primary" | "secondary" | "danger";
};

export function Button({
  children,
  className = "",
  icon,
  size = "md",
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = [
    "fashion-button",
    `fashion-button--${variant}`,
    `fashion-button--${size}`,
    className,
  ].filter(Boolean).join(" ");

  return (
    <button className={classes} {...props}>
      {icon && <span className="fashion-button__icon" aria-hidden="true">{icon}</span>}
      {children}
    </button>
  );
}