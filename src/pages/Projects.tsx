import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { NewProjectDialog } from "@/components/NewProjectDialog";
import { ProjectStatistics } from "@/components/projects/ProjectStatistics";
import { ProposalRequestsTable } from "@/components/projects/ProposalRequestsTable";
import { OngoingProjectsTable } from "@/components/projects/OngoingProjectsTable";
import { FinishedProjectsTable } from "@/components/projects/FinishedProjectsTable";

const Projects = () => {
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const { data: projects, refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*");
      if (error) throw error;
      return data;
    },
  });

  const stats = {
    total: projects?.length || 0,
    ongoing: projects?.filter(p => p.status === "ongoing").length || 0,
    proposals: projects?.filter(p => p.status === "proposal").length || 0,
    finished: projects?.filter(p => p.status === "finished").length || 0,
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Projects</h1>
        <p className="text-secondary-foreground">Manage all your projects in one place</p>
      </header>

      <ProjectStatistics stats={stats} />

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Proposal Requests</h2>
          <Button onClick={() => setShowNewProjectDialog(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
        <Card>
          <ProposalRequestsTable 
            projects={projects || []} 
            onStatusChange={refetch} 
          />
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Ongoing Projects</h2>
        <Card>
          <OngoingProjectsTable projects={projects || []} />
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Finished Projects</h2>
        <Card>
          <FinishedProjectsTable projects={projects || []} />
        </Card>
      </section>

      <NewProjectDialog 
        open={showNewProjectDialog} 
        onOpenChange={setShowNewProjectDialog} 
      />
    </div>
  );
};

export default Projects;