import { BilingualText } from "./BilingualText";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  arabic: string;
  english: string;
  className?: string;
  variant?: "main" | "sub";
}

export const SectionHeader = ({
  arabic,
  english,
  className,
  variant = "main",
}: SectionHeaderProps) => {
  return (
    <h2
      className={cn(
        "font-bold tracking-tight",
        variant === "main" && "text-2xl text-financial-header",
        variant === "sub" && "text-xl text-financial-subheader",
        className
      )}
    >
      <BilingualText arabic={arabic} english={english} />
    </h2>
  );
};
