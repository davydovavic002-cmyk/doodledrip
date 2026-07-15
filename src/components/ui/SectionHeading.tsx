import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" && "text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-coffee-blue">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-black tracking-tight text-coffee-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base text-coffee-ink/70 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
