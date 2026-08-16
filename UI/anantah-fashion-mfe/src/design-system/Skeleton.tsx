import type { CSSProperties } from "react";

type SkeletonProps = {
  className?: string;
  height?: CSSProperties["height"];
  width?: CSSProperties["width"];
};

export function Skeleton({ className = "", height, width }: SkeletonProps) {
  return (
    <span
      className={`fashion-skeleton ${className}`.trim()}
      style={{ height, width }}
      aria-hidden="true"
    />
  );
}