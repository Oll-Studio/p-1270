import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface OngoingProjectsTableProps {
  projects: any[];
}

export function OngoingProjectsTable({ projects }: OngoingProjectsTableProps) {
  return (
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
  );
}