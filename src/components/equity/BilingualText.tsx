import { useState } from "react";
import { cn } from "@/lib/utils";

interface BilingualTextProps {
  arabic: string;
  english: string;
  className?: string;
}

export const BilingualText = ({ arabic, english, className }: BilingualTextProps) => {
  const [showEnglish, setShowEnglish] = useState(false);

  return (
    <span
      className={cn("relative cursor-help transition-all", className)}
      onMouseEnter={() => setShowEnglish(true)}
      onMouseLeave={() => setShowEnglish(false)}
    >
      <span className={cn("transition-opacity", showEnglish && "opacity-0")}>
        {arabic}
      </span>
      {showEnglish && (
        <span className="absolute inset-0 text-accent font-medium animate-in fade-in-0 slide-in-from-top-1 duration-200">
          {english}
        </span>
      )}
    </span>
  );
};
