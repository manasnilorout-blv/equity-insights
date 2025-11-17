import { EquityComponents } from "@/types/equity";
import { DataCard } from "./DataCard";
import { SectionHeader } from "./SectionHeader";
import { EquityTable } from "./EquityTable";
import { BilingualText } from "./BilingualText";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CapitalSectionProps {
  equityComponents: EquityComponents;
  onEdit: (path: string, year: "current" | "previous", value: number | string | null) => void;
  editedFields: Set<string>;
}

export const CapitalSection = ({
  equityComponents,
  onEdit,
  editedFields,
}: CapitalSectionProps) => {
  const formatCurrency = (value: any) => {
    if (value === null || value === undefined) return "-";
    return new Intl.NumberFormat("ar-SA", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const capitalRows = [
    {
      label_ar: "رأس المال المدفوع",
      label_en: "Paid-up Capital",
      current_year: equityComponents.paid_up_capital.current_year.value,
      previous_year: equityComponents.paid_up_capital.previous_year.value,
      note: equityComponents.paid_up_capital.financial_note_reference,
      path: "equity_components.paid_up_capital",
    },
  ];

  const sharesRows = [
    {
      label_ar: "عدد الأسهم العادية",
      label_en: "Number of Common Shares",
      current_year: equityComponents.common_shares.current_year.number_of_shares,
      previous_year: equityComponents.common_shares.previous_year.number_of_shares,
      note: equityComponents.common_shares.financial_note_reference,
      path: "equity_components.common_shares.number",
    },
    {
      label_ar: "القيمة الاسمية للسهم",
      label_en: "Par Value per Share",
      current_year: equityComponents.common_shares.current_year.par_value,
      previous_year: equityComponents.common_shares.previous_year.par_value,
      note: equityComponents.common_shares.financial_note_reference,
      path: "equity_components.common_shares.par_value",
    },
    {
      label_ar: "قيمة الأسهم العادية",
      label_en: "Value of Common Shares",
      current_year: equityComponents.common_shares.current_year.value,
      previous_year: equityComponents.common_shares.previous_year.value,
      note: equityComponents.common_shares.financial_note_reference,
      path: "equity_components.common_shares.value",
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader arabic="رأس المال والأسهم" english="Capital and Shares" />
      
      <div className="space-y-4">
        <DataCard header={
          <h3 className="font-semibold text-lg">
            <BilingualText arabic="رأس المال المدفوع" english="Paid-up Capital" />
          </h3>
        }>
          <EquityTable
            rows={capitalRows}
            onEdit={onEdit}
            editedFields={editedFields}
            formatValue={formatCurrency}
          />
        </DataCard>

        <DataCard header={
          <h3 className="font-semibold text-lg">
            <BilingualText arabic="الأسهم العادية" english="Common Shares" />
          </h3>
        }>
          <EquityTable
            rows={sharesRows}
            onEdit={onEdit}
            editedFields={editedFields}
            formatValue={(val) => val?.toLocaleString() || "-"}
          />
        </DataCard>

        {(equityComponents.capital_changes.increases.length > 0 ||
          equityComponents.capital_changes.decreases.length > 0) && (
          <DataCard header={
            <h3 className="font-semibold text-lg">
              <BilingualText arabic="التغيرات في رأس المال" english="Capital Changes" />
            </h3>
          }>
            <div className="space-y-4">
              {equityComponents.capital_changes.increases.map((increase, idx) => (
                <div key={`inc-${idx}`} className="flex items-start gap-3 p-3 bg-success/5 rounded-lg border border-success/20">
                  <TrendingUp className="h-5 w-5 text-success mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-success text-success-foreground">
                        <BilingualText arabic="زيادة" english="Increase" />
                      </Badge>
                      <span className="text-sm text-muted-foreground">{increase.date}</span>
                    </div>
                    <p className="font-semibold text-success mb-1">
                      {formatCurrency(increase.amount)} <span className="text-xs">SAR</span>
                    </p>
                    <p className="text-sm" dir="rtl">{increase.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{increase.description_english}</p>
                  </div>
                </div>
              ))}
              
              {equityComponents.capital_changes.decreases.map((decrease, idx) => (
                <div key={`dec-${idx}`} className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                  <TrendingDown className="h-5 w-5 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="destructive">
                        <BilingualText arabic="تخفيض" english="Decrease" />
                      </Badge>
                      <span className="text-sm text-muted-foreground">{decrease.date}</span>
                    </div>
                    <p className="font-semibold text-destructive mb-1">
                      {formatCurrency(decrease.amount)} <span className="text-xs">SAR</span>
                    </p>
                    <p className="text-sm" dir="rtl">{decrease.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{decrease.description_english}</p>
                  </div>
                </div>
              ))}
            </div>
          </DataCard>
        )}
      </div>
    </div>
  );
};
