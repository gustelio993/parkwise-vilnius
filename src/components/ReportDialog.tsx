import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Car, LogOut } from "lucide-react";
import { toast } from "sonner";

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReportDialog = ({ open, onOpenChange }: ReportDialogProps) => {
  const handleReport = (status: "taken" | "free") => {
    const points = Math.floor(Math.random() * 5) + 5; // 5-10 points
    toast.success(`+${points} points earned!`, {
      description: `Parking spot marked as ${status === "taken" ? "occupied" : "available"}`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Parking Status</DialogTitle>
          <DialogDescription>
            Let others know about parking availability and earn reward points
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          <Button
            onClick={() => handleReport("taken")}
            className="w-full h-16 text-base bg-taken hover:bg-taken/90"
            size="lg"
          >
            <Car className="w-5 h-5 mr-3" />
            I Just Parked Here
          </Button>
          
          <Button
            onClick={() => handleReport("free")}
            className="w-full h-16 text-base bg-success hover:bg-success/90"
            size="lg"
          >
            <LogOut className="w-5 h-5 mr-3" />
            I'm Leaving This Spot
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Earn 5-10 points for each status update
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
