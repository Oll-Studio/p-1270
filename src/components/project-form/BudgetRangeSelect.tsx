import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ProjectBriefFormValues } from "./types";

export const budgetRanges = [
  "Under $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "Over $100,000"
] as const;

interface BudgetRangeSelectProps {
  form: UseFormReturn<ProjectBriefFormValues>;
}

export function BudgetRangeSelect({ form }: BudgetRangeSelectProps) {
  return (
    <FormField
      control={form.control}
      name="budgetRange"
      render={({ field }) => (
        <FormItem>
          <FormLabel>How much is the brand willing to invest?</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-background">
              {budgetRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
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