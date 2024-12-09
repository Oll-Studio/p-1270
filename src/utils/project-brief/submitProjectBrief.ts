import { supabase } from "@/integrations/supabase/client";
import { ProjectBriefFormValues } from "@/components/project-form/types";
import { useToast } from "@/hooks/use-toast";

export async function submitProjectBrief(
  data: ProjectBriefFormValues,
  userId: string,
  agencyId: string,
) {
  const { error: projectError } = await supabase.from("projects").insert({
    name: data.name,
    description: data.description,
    status: "proposal",
    created_by: userId,
    agency_id: agencyId,
    client_name: null,
    start_date: null,
    completion_date: new Date(data.deadline).toISOString(),
    budget_range: data.budgetRange,
    proposal_status: "requested",
  });

  if (projectError) {
    console.error('Error creating project:', projectError);
    throw projectError;
  }
}