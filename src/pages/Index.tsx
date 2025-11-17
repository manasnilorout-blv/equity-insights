import { useState } from "react";
import { EquityData, EditedField } from "@/types/equity";
import { MetadataSection } from "@/components/equity/MetadataSection";
import { CapitalSection } from "@/components/equity/CapitalSection";
import { ReservesSection } from "@/components/equity/ReservesSection";
import { RetainedEarningsSection } from "@/components/equity/RetainedEarningsSection";
import { TotalEquitySection } from "@/components/equity/TotalEquitySection";
import { FinancialNotesSection } from "@/components/equity/FinancialNotesSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Save, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data from the JSON provided
const sampleData: EquityData = {
  metadata: {
    company_name: "National Metal Manufacturing and Casting Company (Maadaniah)",
    company_name_arabic: "الشركة الوطنية لتصنيع وسبك المعادن (معدنية)",
    report_date: "2023-12-31",
    currency: "SAR",
    currency_unit: "actual",
    reporting_period: "2023",
    financial_statement_type: "consolidated",
    audit_status: "audited",
  },
  equity_components: {
    paid_up_capital: {
      current_year: { value: 354000000, date: "2023-12-31" },
      previous_year: { value: 354000000, date: "2022-12-31" },
      financial_note_reference: "14",
      distribution_among_shareholders: [],
    },
    common_shares: {
      current_year: { value: 354000000, number_of_shares: 35400000, par_value: 10 },
      previous_year: { value: 354000000, number_of_shares: 35400000, par_value: 10 },
      shareholders: [],
      financial_note_reference: "14",
    },
    preferred_shares: {
      current_year: { value: null, number_of_shares: null },
      previous_year: { value: null, number_of_shares: null },
      terms: {
        dividend_rate: null,
        cumulative: null,
        convertible: null,
        redemption_terms: null,
        redemption_terms_english: null,
      },
    },
    additional_paid_up_capital: null,
    capital_changes: {
      increases: [
        {
          date: "2021-11-23",
          amount: 120000000,
          source: "cash",
          description: "زيادة رأس المال عن طريق الإكتتاب بإصدار أسهم",
          description_english: "Capital increase through subscription of new shares",
        },
      ],
      decreases: [
        {
          date: "2021-11-23",
          amount: 47120890,
          reason: "تخفيض رأس المال بالخسائر المتراكمة",
          description: "تخفيض رأس المال بالخسائر المتراكمة",
          description_english: "Capital reduction due to accumulated losses",
        },
      ],
    },
    branches_current_account: null,
    reserves: {
      total_current_year: 27173222,
      total_previous_year: 27173222,
      breakdown: [
        {
          type: "statutory",
          type_arabic: "الإحتياطي النظامي",
          type_english: "Statutory Reserve",
          current_year: 27173222,
          previous_year: 27173222,
          movement: 0,
        },
      ],
      financial_note_reference: "15",
    },
    treasury_stocks: null,
    retained_earnings: {
      current_year: { value: -29735126, is_loss: true },
      previous_year: { value: 6735136, is_loss: false },
      movements: {
        opening_balance: 6735136,
        net_income: -31470394,
        dividends_declared: 0,
        other_adjustments: -5000000,
        closing_balance: -29735126,
      },
      financial_note_reference: null,
    },
    dividends_to_distribute: null,
    minority_interests: null,
    total_equity: {
      current_year: { total: 284280363, excluding_minority: 284280363, including_minority: 284280363 },
      previous_year: { total: 315564996, excluding_minority: 315564996, including_minority: 315564996 },
    },
  },
  shareholder_structure: [],
  valuation_metrics: null,
  financial_notes: [
    {
      note_number: "14",
      title: "رأس المال",
      title_english: "Share Capital",
      content: "يبلغ رأس مال المجموعة المصدر والمدفوع 354.000.000 لاير سعودي (31 ديسمبر 2022: 354.000.000 لاير سعودي) مقسم إلى 35.400.000 سهم (31 ديسمبر 2022: 35.400.000 سهم) بقيمة 10 لاير سعودي للسهم.",
      content_english: "The issued and paid-up capital of the Group is SAR 354,000,000 (December 31, 2022: SAR 354,000,000) divided into 35,400,000 shares (December 31, 2022: 35,400,000 shares) with a par value of SAR 10 per share.",
      related_items: ["رأس المال"],
    },
    {
      note_number: "15",
      title: "الإحتياطي النظامي",
      title_english: "Statutory Reserve",
      content: "تماشياً مع قانون الشركات بالمملكة العربية السعودية والنظام الأساسي للشركة المعمول به سابقاً، قامت الشركة بتكوين احتياطي نظامي بتخصيص نسبة %10 من صافي أرباحها السنوية، حتى يبلغ هذا الاحتياطي %30 من رأس المال.",
      content_english: "In accordance with the Saudi Companies Law previously in force and the Company's bylaws, the Company established a statutory reserve by allocating 10% of its annual net profits until this reserve reaches 30% of the capital.",
      related_items: ["الإحتياطي النظامي"],
    },
  ],
  formulas_applied: null,
  data_quality: null,
};

const Index = () => {
  const [equityData, setEquityData] = useState<EquityData>(sampleData);
  const [editedFields, setEditedFields] = useState<Set<string>>(new Set());
  const [editHistory, setEditHistory] = useState<EditedField[]>([]);
  const { toast } = useToast();

  const handleEdit = (path: string, year: "current" | "previous", value: number | string | null) => {
    const fullPath = `${path}.${year}_year.value`;
    
    // Create a deep copy and update the value
    const newData = JSON.parse(JSON.stringify(equityData));
    const pathParts = fullPath.split(".");
    let current: any = newData;
    
    for (let i = 0; i < pathParts.length - 1; i++) {
      current = current[pathParts[i]];
    }
    
    const originalValue = current[pathParts[pathParts.length - 1]];
    current[pathParts[pathParts.length - 1]] = value;
    
    // Track the edit
    setEditedFields((prev) => new Set(prev).add(`${path}.${year}`));
    setEditHistory((prev) => [
      ...prev,
      {
        path: fullPath,
        timestamp: new Date(),
        originalValue,
        newValue: value,
      },
    ]);
    
    setEquityData(newData);

    toast({
      title: "قيمة محدثة / Value Updated",
      description: "تم تحديث القيمة بنجاح / Value has been successfully updated",
    });
  };

  const handleSave = () => {
    // In a real application, this would send the data to an API
    console.log("Saving edited data:", { equityData, editHistory });
    
    toast({
      title: "تم الحفظ / Saved",
      description: `تم حفظ ${editedFields.size} تعديل بنجاح / Successfully saved ${editedFields.size} changes`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-financial-header" dir="rtl">
                عارض بيانات حقوق الملكية
              </h1>
              <p className="text-sm text-muted-foreground">Equity Data Viewer</p>
            </div>
            <div className="flex items-center gap-3">
              {editedFields.size > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {editedFields.size} تعديل / edits
                </Badge>
              )}
              <Button onClick={handleSave} disabled={editedFields.size === 0}>
                <Save className="h-4 w-4 mr-2" />
                حفظ / Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <MetadataSection metadata={equityData.metadata} />
          
          <div className="border-t pt-8">
            <CapitalSection
              equityComponents={equityData.equity_components}
              onEdit={handleEdit}
              editedFields={editedFields}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ReservesSection
              equityComponents={equityData.equity_components}
              onEdit={handleEdit}
              editedFields={editedFields}
            />
            
            <RetainedEarningsSection
              equityComponents={equityData.equity_components}
              onEdit={handleEdit}
              editedFields={editedFields}
            />
          </div>

          <TotalEquitySection
            equityComponents={equityData.equity_components}
            onEdit={handleEdit}
            editedFields={editedFields}
          />

          <FinancialNotesSection notes={equityData.financial_notes} />
        </div>
      </main>
    </div>
  );
};

export default Index;
