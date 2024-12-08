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

const Users = () => {
  const { data: members, isLoading } = useQuery({
    queryKey: ["agency-members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("agency_members")
        .select(`
          *,
          agency:agencies(name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Users</h1>
        <p className="text-muted-foreground">Manage user permissions and roles</p>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Agency</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members?.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.user_id}</TableCell>
                <TableCell>{member.agency?.name}</TableCell>
                <TableCell className="capitalize">{member.user_type}</TableCell>
                <TableCell className="capitalize">{member.role}</TableCell>
                <TableCell className="capitalize">{member.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Users;