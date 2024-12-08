import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface FinishedProjectsTableProps {
  projects: any[];
}

export function FinishedProjectsTable({ projects }: FinishedProjectsTableProps) {
  return (
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
  );
}