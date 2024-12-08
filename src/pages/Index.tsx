import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ArrowRight, Clock, CheckCircle2, AlertCircle, Loader2, DollarSign, CreditCard, Calendar, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { NewProjectDialog } from "@/components/NewProjectDialog";

const Index = () => {
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
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

  const stats = {
    total: projects?.length || 0,
    ongoing: projects?.filter(p => p.status === "ongoing").length || 0,
    proposals: projects?.filter(p => p.status === "proposal").length || 0,
    finished: projects?.filter(p => p.status === "finished").length || 0,
  };

  // Example financial data (you might want to replace this with real data)
  const financials = {
    totalInvested: 125000,
    creditAvailable: 50000,
    nextDueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };

  const recentProjects = projects?.slice(0, 5).sort((a, b) => 
    new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  ) || [];

  // Example projects (you might want to replace these with real examples)
  const exampleProjects = [
    {
      title: "E-commerce Platform",
      description: "Full-stack development of a modern e-commerce platform",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    },
    {
      title: "Mobile App Design",
      description: "UI/UX design for a fitness tracking mobile application",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    {
      title: "Brand Identity",
      description: "Complete brand identity design for a tech startup",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    },
    {
      title: "Web Application",
      description: "Custom web application for project management",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overview Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                  <h3 className="text-2xl font-bold">{stats.total}</h3>
                </div>
                <AlertCircle className="h-8 w-8 text-primary opacity-75" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ongoing</p>
                  <h3 className="text-2xl font-bold">{stats.ongoing}</h3>
                </div>
                <Clock className="h-8 w-8 text-blue-500 opacity-75" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Proposals</p>
                  <h3 className="text-2xl font-bold">{stats.proposals}</h3>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-500 opacity-75" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <h3 className="text-2xl font-bold">{stats.finished}</h3>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500 opacity-75" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Financial Summary Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Financial Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Invested</p>
                  <h3 className="text-2xl font-bold">${financials.totalInvested.toLocaleString()}</h3>
                </div>
                <DollarSign className="h-8 w-8 text-green-500 opacity-75" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Credit Available</p>
                  <h3 className="text-2xl font-bold">${financials.creditAvailable.toLocaleString()}</h3>
                </div>
                <CreditCard className="h-8 w-8 text-blue-500 opacity-75" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Next Due Date</p>
                  <h3 className="text-2xl font-bold">{financials.nextDueDate.toLocaleDateString()}</h3>
                </div>
                <Calendar className="h-8 w-8 text-yellow-500 opacity-75" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Projects Health Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Projects Health</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{new Date(project.updated_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      project.status === "proposal" ? "bg-yellow-100 text-yellow-800" :
                      project.status === "ongoing" ? "bg-blue-100 text-blue-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {project.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/projects/${project.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>

      {/* Example Projects Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Example Projects</h2>
          <Button onClick={() => setShowNewProjectDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Start New Project
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {exampleProjects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
      <NewProjectDialog 
        open={showNewProjectDialog} 
        onOpenChange={setShowNewProjectDialog} 
      />
    </div>
  );
};

export default Index;
