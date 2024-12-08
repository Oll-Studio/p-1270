import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ProjectBriefFormValues } from "./types";

export const projectTypes = [
  "Website Development",
  "Mobile App",
  "Branding",
  "UI/UX Design",
  "Marketing Campaign",
  "E-commerce",
  "Content Creation",
  "Social Media",
] as const;

interface ProjectTypeSelectProps {
  form: UseFormReturn<ProjectBriefFormValues>;
}

export function ProjectTypeSelect({ form }: ProjectTypeSelectProps) {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Project Type</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-background">
              {projectTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}