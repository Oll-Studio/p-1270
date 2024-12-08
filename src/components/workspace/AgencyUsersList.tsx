import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AgencyUsersListProps {
  agencyId: string;
}

export function AgencyUsersList({ agencyId }: AgencyUsersListProps) {
  const { data: members, isLoading } = useQuery({
    queryKey: ["agency-members", agencyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("agency_members")
        .select(`
          *,
          agency:agencies(name)
        `)
        .eq('agency_id', agencyId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members?.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.user_id}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {member.user_type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {member.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={member.status === 'approved' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {member.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}