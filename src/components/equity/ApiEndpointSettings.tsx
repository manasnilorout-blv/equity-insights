import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { BilingualText } from "./BilingualText";
import { useToast } from "@/hooks/use-toast";

interface ApiEndpointSettingsProps {
  endpoint: string;
  onEndpointChange: (endpoint: string) => void;
}

export const ApiEndpointSettings = ({
  endpoint,
  onEndpointChange,
}: ApiEndpointSettingsProps) => {
  const [localEndpoint, setLocalEndpoint] = useState(endpoint);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setLocalEndpoint(endpoint);
  }, [endpoint]);

  const handleSave = () => {
    if (!localEndpoint.trim()) {
      toast({
        title: "خطأ / Error",
        description: "يرجى إدخال عنوان API صالح / Please enter a valid API endpoint",
        variant: "destructive",
      });
      return;
    }

    try {
      new URL(localEndpoint); // Validate URL
      onEndpointChange(localEndpoint);
      localStorage.setItem("equity_api_endpoint", localEndpoint);
      setIsOpen(false);
      toast({
        title: "تم الحفظ / Saved",
        description: "تم حفظ عنوان API بنجاح / API endpoint saved successfully",
      });
    } catch (error) {
      toast({
        title: "خطأ / Error",
        description: "عنوان URL غير صالح / Invalid URL format",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          <BilingualText arabic="إعدادات API" english="API Settings" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle dir="rtl">
            <BilingualText arabic="إعدادات نقطة النهاية API" english="API Endpoint Settings" />
          </DialogTitle>
          <DialogDescription dir="rtl">
            <BilingualText
              arabic="قم بتكوين عنوان URL لواجهة برمجة التطبيقات لاستخراج البيانات"
              english="Configure the API URL for data extraction"
            />
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="endpoint">
              <BilingualText arabic="عنوان API" english="API Endpoint" />
            </Label>
            <Input
              id="endpoint"
              value={localEndpoint}
              onChange={(e) => setLocalEndpoint(e.target.value)}
              placeholder="https://your-api.ngrok-free.dev/extract"
              dir="ltr"
            />
            <p className="text-xs text-muted-foreground">
              <BilingualText
                arabic="أدخل عنوان URL الكامل لنقطة نهاية الاستخراج"
                english="Enter the full URL of the extraction endpoint"
              />
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              <BilingualText arabic="إلغاء" english="Cancel" />
            </Button>
            <Button onClick={handleSave}>
              <BilingualText arabic="حفظ" english="Save" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
