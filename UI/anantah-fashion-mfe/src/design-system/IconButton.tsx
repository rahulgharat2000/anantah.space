import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  icon: ReactNode;
};

export function IconButton({ className = "", icon, label, ...props }: IconButtonProps) {
  return (
    <button className={`fashion-icon-button ${className}`.trim()} aria-label={label} title={label} {...props}>
      {icon}
    </button>
  );
}