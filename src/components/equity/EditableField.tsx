import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Pencil, Check } from "lucide-react";

interface EditableFieldProps {
  value: number | string | null;
  onSave: (value: number | string | null) => void;
  type?: "text" | "number";
  isEdited?: boolean;
  className?: string;
  formatValue?: (value: any) => string;
}

export const EditableField = ({
  value,
  onSave,
  type = "number",
  isEdited = false,
  className,
  formatValue,
}: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value?.toString() || "");

  useEffect(() => {
    setLocalValue(value?.toString() || "");
  }, [value]);

  const handleSave = () => {
    const newValue = type === "number" ? (localValue ? parseFloat(localValue) : null) : localValue || null;
    onSave(newValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setLocalValue(value?.toString() || "");
      setIsEditing(false);
    }
  };

  const displayValue = formatValue && value !== null ? formatValue(value) : value?.toLocaleString() || "-";

  return (
    <div className={cn("group relative flex items-center gap-2", className)}>
      {isEditing ? (
        <div className="flex items-center gap-2 w-full">
          <Input
            type={type}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            autoFocus
            className="h-8"
          />
          <button
            onClick={handleSave}
            className="text-success hover:text-success/80 transition-colors"
          >
            <Check className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <>
          <span
            className={cn(
              "flex-1 transition-colors",
              isEdited && "text-edited font-medium"
            )}
          >
            {displayValue}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary transition-all"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          {isEdited && (
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-edited rounded-full" />
          )}
        </>
      )}
    </div>
  );
};
