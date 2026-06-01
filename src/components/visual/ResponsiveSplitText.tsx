import { cn } from "@/lib/utils";

/** Use `|` in copy to break onto two lines on mobile (comma removed). */
export function ResponsiveSplitText({
  text,
  className,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  as?: "span" | "p";
}) {
  if (!text.includes("|")) {
    return <Tag className={className}>{text}</Tag>;
  }

  const [line1, line2] = text.split("|").map((s) => s.trim());

  return (
    <Tag className={className}>
      <span className="md:hidden">
        {line1}
        <br />
        {line2}
      </span>
      <span className="hidden md:inline">
        {line1}
        {line2}
      </span>
    </Tag>
  );
}
