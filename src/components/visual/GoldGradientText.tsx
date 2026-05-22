import { cn } from "@/lib/utils";
import { ElementType } from "react";

export function GoldGradientText({
  as: Tag = "span",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: React.ReactNode;
}) {
  return <Tag className={cn("gold-text", className)}>{children}</Tag>;
}
