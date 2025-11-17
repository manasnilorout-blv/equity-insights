import { FinancialNote } from "@/types/equity";
import { DataCard } from "./DataCard";
import { SectionHeader } from "./SectionHeader";
import { BilingualText } from "./BilingualText";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FinancialNotesSectionProps {
  notes: FinancialNote[];
}

export const FinancialNotesSection = ({ notes }: FinancialNotesSectionProps) => {
  if (!notes || notes.length === 0) return null;

  return (
    <div className="space-y-4">
      <SectionHeader arabic="الإيضاحات المالية" english="Financial Notes" />
      
      <DataCard>
        <Accordion type="single" collapsible className="w-full">
          {notes.map((note, idx) => (
            <AccordionItem key={idx} value={`note-${idx}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <FileText className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">#{note.note_number}</Badge>
                      <span className="font-semibold" dir="rtl">{note.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{note.title_english}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  <div className="bg-muted/50 p-4 rounded-lg" dir="rtl">
                    <p className="text-sm leading-relaxed">{note.content}</p>
                  </div>
                  <div className="bg-accent/5 p-4 rounded-lg">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {note.content_english}
                    </p>
                  </div>
                  {note.related_items && note.related_items.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-muted-foreground">
                        <BilingualText arabic="البنود ذات الصلة:" english="Related Items:" />
                      </span>
                      {note.related_items.map((item, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </DataCard>
    </div>
  );
};
