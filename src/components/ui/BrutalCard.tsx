import { cn } from "@/lib/utils";

export interface BrutalCardProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
  style?: React.CSSProperties;
}

export function BrutalCard({
  children,
  className,
  as: Tag = "div",
  style,
}: BrutalCardProps): React.JSX.Element {
  return (
    <Tag
      className={cn(
        "border-brutal bg-white shadow-brutal",
        className,
      )}
      style={style}
    >
      {children}
    </Tag>
  );
}
