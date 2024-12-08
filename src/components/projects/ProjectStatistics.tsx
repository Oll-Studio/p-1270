import React from 'react';
import { Card } from "@/components/ui/card";
import { ChartBar, Inbox, Activity, CheckCircle } from "lucide-react";

interface ProjectStatisticsProps {
  stats: {
    total: number;
    ongoing: number;
    proposals: number;
    finished: number;
  };
}

export function ProjectStatistics({ stats }: ProjectStatisticsProps) {
  return (
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
  );
}