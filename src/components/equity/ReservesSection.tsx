import { EquityComponents } from "@/types/equity";
import { DataCard } from "./DataCard";
import { SectionHeader } from "./SectionHeader";
import { EquityTable } from "./EquityTable";
import { BilingualText } from "./BilingualText";

interface ReservesSectionProps {
  equityComponents: EquityComponents;
  onEdit: (path: string, year: "current" | "previous", value: number | string | null) => void;
  editedFields: Set<string>;
}

export const ReservesSection = ({
  equityComponents,
  onEdit,
  editedFields,
}: ReservesSectionProps) => {
  const formatCurrency = (value: any) => {
    if (value === null || value === undefined) return "-";
    return new Intl.NumberFormat("ar-SA", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const reservesRows = equityComponents.reserves.breakdown.map((reserve) => ({
    label_ar: reserve.type_arabic,
    label_en: reserve.type_english,
    current_year: reserve.current_year,
    previous_year: reserve.previous_year,
    note: equityComponents.reserves.financial_note_reference,
    path: `equity_components.reserves.${reserve.type}`,
  }));

  reservesRows.push({
    label_ar: "إجمالي الاحتياطيات",
    label_en: "Total Reserves",
    current_year: equityComponents.reserves.total_current_year,
    previous_year: equityComponents.reserves.total_previous_year,
    note: equityComponents.reserves.financial_note_reference,
    path: "equity_components.reserves.total",
  });

  return (
    <div className="space-y-4">
      <SectionHeader arabic="الاحتياطيات" english="Reserves" variant="sub" />
      
      <DataCard>
        <EquityTable
          rows={reservesRows}
          onEdit={onEdit}
          editedFields={editedFields}
          formatValue={formatCurrency}
        />
      </DataCard>
    </div>
  );
};
