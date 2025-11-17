import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DataCardProps {
  children: ReactNode;
  className?: string;
  header?: ReactNode;
}

export const DataCard = ({ children, className, header }: DataCardProps) => {
  return (
    <Card className={cn("shadow-sm hover:shadow-md transition-shadow", className)}>
      {header && <CardHeader className="pb-3">{header}</CardHeader>}
      <CardContent className={cn(!header && "pt-6")}>{children}</CardContent>
    </Card>
  );
};
