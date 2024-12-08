import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Inbox, UserPlus, Users } from "lucide-react";

const Dashboard = () => {
  // Fetch agencies
  const { data: agencies } = useQuery({
    queryKey: ["agencies"],
    queryFn: async () => {
      const { data, error } = await supabase.from("agencies").select("*");
      if (error) throw error;
      return data;
    },
  });

  // Fetch user's membership requests and invitations
  const { data: memberships } = useQuery({
    queryKey: ["memberships"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("agency_members")
        .select(`
          *,
          agency:agencies(*)
        `)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleJoinRequest = async (agencyId: string) => {
    try {
      const { error } = await supabase.from("agency_members").insert({
        agency_id: agencyId,
        user_id: (await supabase.auth.getUser()).data.user?.id,
        user_type: "client",
        permission_level: "viewer",
        status: "pending",
      });

      if (error) throw error;
      toast.success("Join request sent successfully!");
    } catch (error) {
      console.error("Error sending join request:", error);
      toast.error("Failed to send join request");
    }
  };

  const pendingRequests = memberships?.filter(
    (membership) => membership.status === "pending" && membership.invited_by === null
  );

  const invitations = memberships?.filter(
    (membership) => membership.status === "pending" && membership.invited_by !== null
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Dashboard</h1>
        <p className="text-secondary-foreground">Manage your agency memberships</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Available Agencies */}
        <Card className="col-span-3 p-6">
          <div className="flex items-center gap-2 mb-4">
            <UserPlus className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Available Agencies</h2>
          </div>
          <div className="space-y-4">
            {agencies?.map((agency) => (
              <div
                key={agency.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{agency.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {agency.description}
                  </p>
                </div>
                <Button onClick={() => handleJoinRequest(agency.id)}>
                  Request to Join
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Requests */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Inbox className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Pending Requests</h2>
          </div>
          <div className="space-y-4">
            {pendingRequests?.map((request) => (
              <div
                key={request.id}
                className="p-4 bg-muted rounded-lg"
              >
                <h3 className="font-medium">{request.agency?.name}</h3>
                <p className="text-sm text-muted-foreground">Status: {request.status}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Invitations */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Invitations</h2>
          </div>
          <div className="space-y-4">
            {invitations?.map((invitation) => (
              <div
                key={invitation.id}
                className="p-4 bg-muted rounded-lg"
              >
                <h3 className="font-medium">{invitation.agency?.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Invited by: {invitation.invited_by}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;