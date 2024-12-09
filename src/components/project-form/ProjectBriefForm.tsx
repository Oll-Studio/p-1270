import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { ProjectTypeSelect } from "./ProjectTypeSelect";
import { HelpTypeSelect } from "./HelpTypeSelect";
import { FileUpload } from "./FileUpload";
import { DeadlinePicker } from "./DeadlinePicker";
import { BudgetRangeSelect } from "./BudgetRangeSelect";
import { projectBriefFormSchema, type ProjectBriefFormValues } from "./types";

interface ProjectBriefFormProps {
  onSubmit: (data: ProjectBriefFormValues) => Promise<void>;
  isSubmitting: boolean;
  onCancel: () => void;
}

export function ProjectBriefForm({ onSubmit, isSubmitting, onCancel }: ProjectBriefFormProps) {
  const form = useForm<ProjectBriefFormValues>({
    resolver: zodResolver(projectBriefFormSchema),
    defaultValues: {
      name: "",
      type: "Website Development",
      goals: "",
      helpType: "I'd like to discuss project possibilities",
      description: "",
      budgetRange: "Under $5,000",
      deadline: "",
      files: [],
    },
  });

  return (
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

        <BudgetRangeSelect form={form} />
        <FileUpload form={form} />
        <DeadlinePicker form={form} />

        <div className="sticky bottom-0 flex justify-end space-x-2 pt-4 bg-background">
          <Button variant="outline" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Brief'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}