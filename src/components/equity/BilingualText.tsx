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
      className={cn("relative cursor-help inline-block", className)}
      onMouseEnter={() => setShowEnglish(true)}
      onMouseLeave={() => setShowEnglish(false)}
    >
      <span>
        {arabic}
      </span>
      {showEnglish && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-accent text-accent-foreground text-sm font-medium rounded-md shadow-lg whitespace-nowrap animate-in fade-in-0 slide-in-from-bottom-2 duration-200 z-50">
          {english}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-accent"></span>
        </span>
      )}
    </span>
  );
};
