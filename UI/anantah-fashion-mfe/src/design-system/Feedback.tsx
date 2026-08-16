import { AlertCircle, PackageOpen } from "lucide-react";
import type { ReactNode } from "react";

type NoticeProps = {
  action?: ReactNode;
  children: ReactNode;
  tone?: "error" | "neutral";
};

export function Notice({ action, children, tone = "neutral" }: NoticeProps) {
  return (
    <div className={`fashion-notice fashion-notice--${tone}`} role={tone === "error" ? "alert" : "status"}>
      <div className="fashion-notice__content">
        {tone === "error" && <AlertCircle size={18} aria-hidden="true" />}
        <p>{children}</p>
      </div>
      {action}
    </div>
  );
}

type EmptyStateProps = {
  description: string;
  title: string;
};

export function EmptyState({ description, title }: EmptyStateProps) {
  return (
    <div className="fashion-empty-state">
      <span className="fashion-empty-state__icon" aria-hidden="true"><PackageOpen size={20} /></span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}