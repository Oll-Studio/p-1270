import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*");
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const urgentProjects = projects?.filter(p => 
    p.status === "ongoing" && new Date(p.start_date || "") < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ) || [];

  const recentProjects = projects?.slice(0, 5) || [];
  
  const projectsByStatus = {
    proposal: projects?.filter(p => p.status === "proposal") || [],
    ongoing: projects?.filter(p => p.status === "ongoing") || [],
    finished: projects?.filter(p => p.status === "finished") || [],
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-primary">Projects Overview</h1>
          <p className="text-secondary-foreground">A summary of all your projects</p>
        </div>
        <Button asChild>
          <Link to="/projects">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <h2 className="text-xl font-semibold">Proposals</h2>
          </div>
          <div className="text-3xl font-bold mb-2">{projectsByStatus.proposal.length}</div>
          <p className="text-sm text-muted-foreground">Awaiting review</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-blue-500" />
            <h2 className="text-xl font-semibold">Ongoing</h2>
          </div>
          <div className="text-3xl font-bold mb-2">{projectsByStatus.ongoing.length}</div>
          <p className="text-sm text-muted-foreground">In progress</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <h2 className="text-xl font-semibold">Completed</h2>
          </div>
          <div className="text-3xl font-bold mb-2">{projectsByStatus.finished.length}</div>
          <p className="text-sm text-muted-foreground">Successfully delivered</p>
        </Card>
      </div>

      {/* Recent Projects */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Recent Projects</h2>
        <Card className="divide-y">
          {recentProjects.map((project) => (
            <div key={project.id} className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium">{project.name}</h3>
                <p className="text-sm text-muted-foreground">{project.client_name}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  project.status === "proposal" ? "bg-yellow-100 text-yellow-800" :
                  project.status === "ongoing" ? "bg-blue-100 text-blue-800" :
                  "bg-green-100 text-green-800"
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </Card>
      </section>

      {/* Urgent Projects */}
      {urgentProjects.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Needs Attention</h2>
          <Card className="divide-y">
            {urgentProjects.map((project) => (
              <div key={project.id} className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Started {new Date(project.start_date || "").toLocaleDateString()}
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <Link to={`/projects?id=${project.id}`}>
                    View Project
                  </Link>
                </Button>
              </div>
            ))}
          </Card>
        </section>
      )}
    </div>
  );
};

export default Index;