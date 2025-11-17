import { Metadata } from "@/types/equity";
import { BilingualText } from "./BilingualText";
import { DataCard } from "./DataCard";
import { SectionHeader } from "./SectionHeader";
import { Building2, Calendar, DollarSign, FileCheck } from "lucide-react";

interface MetadataSectionProps {
  metadata: Metadata;
}

export const MetadataSection = ({ metadata }: MetadataSectionProps) => {
  return (
    <div className="space-y-4">
      <SectionHeader arabic="معلومات الشركة" english="Company Information" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DataCard>
          <div className="flex items-start gap-3">
            <Building2 className="h-5 w-5 text-primary mt-1" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground mb-1">
                <BilingualText arabic="اسم الشركة" english="Company Name" />
              </p>
              <p className="font-semibold text-sm break-words" dir="rtl">
                {metadata.company_name_arabic}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {metadata.company_name}
              </p>
            </div>
          </div>
        </DataCard>

        <DataCard>
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-primary mt-1" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">
                <BilingualText arabic="تاريخ التقرير" english="Report Date" />
              </p>
              <p className="font-semibold">{metadata.report_date}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {metadata.reporting_period}
              </p>
            </div>
          </div>
        </DataCard>

        <DataCard>
          <div className="flex items-start gap-3">
            <DollarSign className="h-5 w-5 text-primary mt-1" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">
                <BilingualText arabic="العملة" english="Currency" />
              </p>
              <p className="font-semibold">{metadata.currency}</p>
              <p className="text-xs text-muted-foreground mt-1">
                <BilingualText arabic="القيم الفعلية" english={metadata.currency_unit} />
              </p>
            </div>
          </div>
        </DataCard>

        <DataCard>
          <div className="flex items-start gap-3">
            <FileCheck className="h-5 w-5 text-primary mt-1" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">
                <BilingualText arabic="حالة المراجعة" english="Audit Status" />
              </p>
              <p className="font-semibold">
                <BilingualText 
                  arabic={metadata.audit_status === "audited" ? "مراجَع" : "غير مراجَع"} 
                  english={metadata.audit_status} 
                />
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <BilingualText 
                  arabic={metadata.financial_statement_type === "consolidated" ? "موحد" : "منفصل"} 
                  english={metadata.financial_statement_type} 
                />
              </p>
            </div>
          </div>
        </DataCard>
      </div>
    </div>
  );
};
