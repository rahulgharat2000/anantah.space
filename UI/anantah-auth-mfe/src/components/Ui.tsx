import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export function BrandMark() {
  return (
    <span className="brand-mark" aria-label="Anantah">
      <span className="brand-mark__symbol" aria-hidden="true">A</span>
      <span className="brand-mark__word">ANANTAH</span>
    </span>
  );
}

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    busy?: boolean;
    tone?: "primary" | "quiet";
  }
>;

export function Button({ busy, children, className = "", tone = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={`button button--${tone} ${className}`}
      disabled={busy || props.disabled}
      {...props}
    >
      {busy && <span className="button__spinner" aria-hidden="true" />}
      <span>{busy ? "Please wait" : children}</span>
    </button>
  );
}