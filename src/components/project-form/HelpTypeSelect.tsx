import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ProjectBriefFormValues } from "./types";

export const helpTypes = [
  "I'd like to discuss project possibilities",
  "Create something new",
  "Revamp, refine, or edit some existing project",
] as const;

interface HelpTypeSelectProps {
  form: UseFormReturn<ProjectBriefFormValues>;
}

export function HelpTypeSelect({ form }: HelpTypeSelectProps) {
  return (
    <FormField
      control={form.control}
      name="helpType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>How can we help?</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select how we can help" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-background">
              {helpTypes.map((type) => (
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