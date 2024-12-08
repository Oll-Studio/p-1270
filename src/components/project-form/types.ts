import { z } from "zod";
import { projectTypes } from "./ProjectTypeSelect";
import { helpTypes } from "./HelpTypeSelect";
import { budgetRanges } from "./BudgetRangeSelect";

export const projectBriefFormSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  type: z.enum(projectTypes),
  goals: z.string().min(10, "Please provide more detail about your goals"),
  helpType: z.enum(helpTypes),
  description: z.string().min(20, "Please provide a more detailed description"),
  budgetRange: z.enum(budgetRanges),
  deadline: z.string().min(1, "Please provide a deadline"),
  files: z.array(z.object({
    name: z.string(),
    path: z.string(),
    url: z.string()
  })).default([]),
});

export type ProjectBriefFormValues = z.infer<typeof projectBriefFormSchema>;