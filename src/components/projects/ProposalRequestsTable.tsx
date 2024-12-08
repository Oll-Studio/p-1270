import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { getStatusColor } from "@/utils/proposal";
import { ProposalActions } from "@/components/proposals/ProposalActions";

interface ProposalRequestsTableProps {
  projects: any[];
  onStatusChange: () => void;
}

export function ProposalRequestsTable({ projects, onStatusChange }: ProposalRequestsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project Name</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Budget Range</TableHead>
          <TableHead>Submitted Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects?.filter(p => p.status === "proposal").map((project) => (
          <TableRow key={project.id}>
            <TableCell>{project.name}</TableCell>
            <TableCell>{project.client_name}</TableCell>
            <TableCell>{project.budget_range}</TableCell>
            <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
            <TableCell>
              <span className={cn(
                "px-2 py-1 rounded-full text-sm",
                getStatusColor(project.proposal_status as any)
              )}>
                {project.proposal_status}
              </span>
            </TableCell>
            <TableCell>
              <ProposalActions
                projectId={project.id}
                currentStatus={project.proposal_status as any}
                userRole="admin"
                userType="agency"
                onStatusChange={onStatusChange}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}