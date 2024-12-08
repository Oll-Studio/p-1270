import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ChartBar, Inbox, Activity, CheckCircle } from "lucide-react";

const Projects = () => {
  const { data: projects } = useQuery({
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

      {/* Projects Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <ChartBar className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Projects</p>
              <h3 className="text-2xl font-bold">{stats.total}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Activity className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Ongoing Projects</p>
              <h3 className="text-2xl font-bold">{stats.ongoing}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Inbox className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Proposal Requests</p>
              <h3 className="text-2xl font-bold">{stats.proposals}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Finished Projects</p>
              <h3 className="text-2xl font-bold">{stats.finished}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Proposal Requests */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Proposal Requests</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects?.filter(p => p.status === "proposal").map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.client_name}</TableCell>
                  <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      Pending Review
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>

      {/* Ongoing Projects */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Ongoing Projects</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects?.filter(p => p.status === "ongoing").map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.client_name}</TableCell>
                  <TableCell>{new Date(project.start_date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      In Progress
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>

      {/* Finished Projects */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Finished Projects</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Completion Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects?.filter(p => p.status === "finished").map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.client_name}</TableCell>
                  <TableCell>{new Date(project.completion_date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Completed
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>
    </div>
  );
};

export default Projects;