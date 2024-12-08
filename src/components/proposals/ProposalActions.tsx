import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getAvailableActions, type ProposalAction, type ProposalStatus } from "@/utils/proposal";

interface ProposalActionsProps {
  projectId: string;
  currentStatus: ProposalStatus;
  userRole: "admin" | "editor" | "viewer";
  userType: "agency" | "client" | "freelance";
  onStatusChange: () => void;
}

export function ProposalActions({ 
  projectId, 
  currentStatus, 
  userRole, 
  userType,
  onStatusChange 
}: ProposalActionsProps) {
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleAction = async (action: ProposalAction) => {
    if (action === "decline") {
      setShowFeedbackDialog(true);
      return;
    }

    let newStatus: ProposalStatus;
    switch (action) {
      case "approve":
        newStatus = "approved";
        break;
      case "create":
      case "update":
        newStatus = "on development";
        break;
      case "send":
        newStatus = "on approval";
        break;
      default:
        return;
    }

    const { error } = await supabase
      .from("projects")
      .update({ proposal_status: newStatus })
      .eq("id", projectId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update proposal status",
        variant: "destructive",
      });
      return;
    }

    if (newStatus === "approved") {
      // Update project status to planning when proposal is approved
      const { error: projectError } = await supabase
        .from("projects")
        .update({ status: "planning" })
        .eq("id", projectId);

      if (projectError) {
        toast({
          title: "Error",
          description: "Failed to create project",
          variant: "destructive",
        });
        return;
      }
    }

    toast({
      title: "Success",
      description: "Proposal status updated successfully",
    });
    onStatusChange();
  };

  const handleDeclineWithFeedback = async () => {
    if (!feedback.trim()) {
      toast({
        title: "Error",
        description: "Feedback is required when declining a proposal",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from("projects")
      .update({ 
        proposal_status: "declined",
        feedback: feedback 
      })
      .eq("id", projectId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to decline proposal",
        variant: "destructive",
      });
      return;
    }

    setShowFeedbackDialog(false);
    setFeedback("");
    toast({
      title: "Success",
      description: "Proposal declined with feedback",
    });
    onStatusChange();
  };

  const availableActions = getAvailableActions(currentStatus, userRole, userType);

  return (
    <>
      <div className="flex gap-2">
        {availableActions.map((action) => (
          <Button
            key={action}
            variant="outline"
            size="sm"
            onClick={() => handleAction(action)}
          >
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </Button>
        ))}
      </div>

      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Provide Feedback</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Please provide feedback for declining this proposal..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFeedbackDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeclineWithFeedback}>
              Submit Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}