import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BilingualText } from "./BilingualText";
import { EditableField } from "./EditableField";
import { cn } from "@/lib/utils";

interface EquityTableRow {
  label_ar: string;
  label_en: string;
  current_year: number | string | null;
  previous_year: number | string | null;
  note?: string;
  path: string;
}

interface EquityTableProps {
  rows: EquityTableRow[];
  onEdit: (path: string, year: "current" | "previous", value: number | string | null) => void;
  editedFields: Set<string>;
  formatValue?: (value: any) => string;
  showNotes?: boolean;
}

export const EquityTable = ({
  rows,
  onEdit,
  editedFields,
  formatValue,
  showNotes = true,
}: EquityTableProps) => {
  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-bold" dir="rtl">
              <BilingualText arabic="البيان" english="Description" />
            </TableHead>
            <TableHead className="text-center font-bold">
              <BilingualText arabic="السنة الحالية" english="Current Year" />
            </TableHead>
            <TableHead className="text-center font-bold">
              <BilingualText arabic="السنة السابقة" english="Previous Year" />
            </TableHead>
            {showNotes && (
              <TableHead className="text-center font-bold w-24">
                <BilingualText arabic="إيضاح" english="Note" />
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-medium" dir="rtl">
                <BilingualText arabic={row.label_ar} english={row.label_en} />
              </TableCell>
              <TableCell className="text-center">
                <EditableField
                  value={row.current_year}
                  onSave={(val) => onEdit(row.path, "current", val)}
                  isEdited={editedFields.has(`${row.path}.current`)}
                  formatValue={formatValue}
                  className="justify-center"
                />
              </TableCell>
              <TableCell className="text-center">
                <EditableField
                  value={row.previous_year}
                  onSave={(val) => onEdit(row.path, "previous", val)}
                  isEdited={editedFields.has(`${row.path}.previous`)}
                  formatValue={formatValue}
                  className="justify-center"
                />
              </TableCell>
              {showNotes && (
                <TableCell className="text-center text-sm text-muted-foreground">
                  {row.note || "-"}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
