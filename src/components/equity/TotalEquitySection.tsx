import { EquityComponents } from "@/types/equity";
import { DataCard } from "./DataCard";
import { SectionHeader } from "./SectionHeader";
import { EquityTable } from "./EquityTable";

interface TotalEquitySectionProps {
  equityComponents: EquityComponents;
  onEdit: (path: string, year: "current" | "previous", value: number | string | null) => void;
  editedFields: Set<string>;
}

export const TotalEquitySection = ({
  equityComponents,
  onEdit,
  editedFields,
}: TotalEquitySectionProps) => {
  const formatCurrency = (value: any) => {
    if (value === null || value === undefined) return "-";
    return new Intl.NumberFormat("ar-SA", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const totalRows = [
    {
      label_ar: "إجمالي حقوق الملكية",
      label_en: "Total Equity",
      current_year: equityComponents.total_equity.current_year.total,
      previous_year: equityComponents.total_equity.previous_year.total,
      note: "-",
      path: "equity_components.total_equity",
    },
  ];

  return (
    <div className="space-y-4">
      <SectionHeader arabic="إجمالي حقوق الملكية" english="Total Equity" />
      
      <DataCard>
        <EquityTable
          rows={totalRows}
          onEdit={onEdit}
          editedFields={editedFields}
          formatValue={formatCurrency}
          showNotes={false}
        />
      </DataCard>
    </div>
  );
};
