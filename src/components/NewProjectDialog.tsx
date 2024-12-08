import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { ProjectTypeSelect } from "./project-form/ProjectTypeSelect";
import { HelpTypeSelect } from "./project-form/HelpTypeSelect";
import { FileUpload } from "./project-form/FileUpload";
import { DeadlinePicker } from "./project-form/DeadlinePicker";
import { projectBriefFormSchema, type ProjectBriefFormValues } from "./project-form/types";

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewProjectDialog({ open, onOpenChange }: NewProjectDialogProps) {
  const { toast } = useToast();
  const session = useSession();

  const form = useForm<ProjectBriefFormValues>({
    resolver: zodResolver(projectBriefFormSchema),
    defaultValues: {
      name: "",
      type: "Website Development",
      goals: "",
      helpType: "I'd like to discuss project possibilities",
      description: "",
      deadline: "",
      files: [],
    },
  });

  const onSubmit = async (data: ProjectBriefFormValues) => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to create a project",
        variant: "destructive",
      });
      return;
    }

    // First, get the user's agency
    const { data: agencyMember } = await supabase
      .from('agency_members')
      .select('agency_id')
      .eq('user_id', session.user.id)
      .single();

    if (!agencyMember?.agency_id) {
      toast({
        title: "Error",
        description: "You must be part of an agency to create a project",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("projects").insert({
      name: data.name,
      description: data.description,
      status: "proposal",
      created_by: session.user.id,
      agency_id: agencyMember.agency_id,
      client_name: null,
      start_date: null,
      completion_date: new Date(data.deadline).toISOString(),
    });

    if (error) {
      console.error('Error creating project:', error);
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Project brief submitted successfully",
    });
    
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Project Brief</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ProjectTypeSelect form={form} />

            <FormField
              control={form.control}
              name="goals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Goals</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What are your main objectives for this project?"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <HelpTypeSelect form={form} />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please provide more details about your project"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FileUpload form={form} />
            <DeadlinePicker form={form} />

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Brief</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}