import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ProjectBriefForm } from "./project-form/ProjectBriefForm";
import { submitProjectBrief } from "@/utils/project-brief/submitProjectBrief";
import type { ProjectBriefFormValues } from "./project-form/types";

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewProjectDialog({ open, onOpenChange }: NewProjectDialogProps) {
  const { toast } = useToast();
  const session = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (data: ProjectBriefFormValues) => {
    if (isSubmitting) return; // Prevent multiple submissions
    console.log("Form submitted with data:", data);
    setIsSubmitting(true);

    try {
      if (!session?.user?.id) {
        toast({
          title: "Error",
          description: "You must be logged in to create a project",
          variant: "destructive",
        });
        return;
      }

      // First, get the user's agency
      const { data: agencyMember, error: agencyError } = await supabase
        .from('agency_members')
        .select('agency_id')
        .eq('user_id', session.user.id)
        .single();

      if (agencyError || !agencyMember?.agency_id) {
        console.error('Error fetching agency:', agencyError);
        toast({
          title: "Error",
          description: "You must be part of an agency to create a project",
          variant: "destructive",
        });
        return;
      }

      await submitProjectBrief(data, session.user.id, agencyMember.agency_id);

      // Invalidate and refetch projects query to update the list
      await queryClient.invalidateQueries({ queryKey: ["projects"] });

      toast({
        title: "Success",
        description: "Project brief submitted successfully",
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error in form submission:', error);
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Project Brief</DialogTitle>
        </DialogHeader>
        
        <ProjectBriefForm 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}