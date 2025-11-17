import { EquityComponents } from "@/types/equity";
import { DataCard } from "./DataCard";
import { SectionHeader } from "./SectionHeader";
import { EquityTable } from "./EquityTable";
import { BilingualText } from "./BilingualText";
import { Badge } from "@/components/ui/badge";

interface RetainedEarningsSectionProps {
  equityComponents: EquityComponents;
  onEdit: (path: string, year: "current" | "previous", value: number | string | null) => void;
  editedFields: Set<string>;
}

export const RetainedEarningsSection = ({
  equityComponents,
  onEdit,
  editedFields,
}: RetainedEarningsSectionProps) => {
  const formatCurrency = (value: any) => {
    if (value === null || value === undefined) return "-";
    return new Intl.NumberFormat("ar-SA", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const retainedRows = [
    {
      label_ar: "الأرباح (الخسائر) المبقاة",
      label_en: "Retained Earnings (Losses)",
      current_year: equityComponents.retained_earnings.current_year.value,
      previous_year: equityComponents.retained_earnings.previous_year.value,
      note: equityComponents.retained_earnings.financial_note_reference || "-",
      path: "equity_components.retained_earnings",
    },
  ];

  const movements = equityComponents.retained_earnings.movements;
  const movementRows = [
    {
      label_ar: "الرصيد الافتتاحي",
      label_en: "Opening Balance",
      value: movements.opening_balance,
    },
    {
      label_ar: "صافي الدخل (الخسارة)",
      label_en: "Net Income (Loss)",
      value: movements.net_income,
    },
    {
      label_ar: "أرباح موزعة",
      label_en: "Dividends Declared",
      value: movements.dividends_declared,
    },
    {
      label_ar: "تسويات أخرى",
      label_en: "Other Adjustments",
      value: movements.other_adjustments,
    },
    {
      label_ar: "الرصيد الختامي",
      label_en: "Closing Balance",
      value: movements.closing_balance,
    },
  ];

  return (
    <div className="space-y-4">
      <SectionHeader arabic="الأرباح المبقاة" english="Retained Earnings" variant="sub" />
      
      <DataCard>
        <div className="space-y-4">
          <EquityTable
            rows={retainedRows}
            onEdit={onEdit}
            editedFields={editedFields}
            formatValue={formatCurrency}
          />

          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-3 text-sm">
              <BilingualText arabic="الحركة خلال السنة" english="Movement During the Year" />
            </h4>
            <div className="space-y-2">
              {movementRows.map((row, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-2 rounded hover:bg-muted/50 transition-colors"
                >
                  <span className="text-sm" dir="rtl">
                    <BilingualText arabic={row.label_ar} english={row.label_en} />
                  </span>
                  <span className={`font-medium ${row.value < 0 ? 'text-destructive' : ''}`}>
                    {formatCurrency(row.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            {equityComponents.retained_earnings.current_year.is_loss && (
              <Badge variant="destructive">
                <BilingualText arabic="خسارة" english="Loss" />
              </Badge>
            )}
            {!equityComponents.retained_earnings.current_year.is_loss && 
             equityComponents.retained_earnings.current_year.value > 0 && (
              <Badge className="bg-success text-success-foreground">
                <BilingualText arabic="ربح" english="Profit" />
              </Badge>
            )}
          </div>
        </div>
      </DataCard>
    </div>
  );
};
