import { type Project } from "@/integrations/supabase/types/projects";

export type ProposalStatus = 
  | "requested"
  | "on development"
  | "on approval"
  | "approved"
  | "declined";

export type ProposalAction = 
  | "approve"
  | "decline"
  | "send"
  | "create"
  | "update";

export const getAvailableActions = (
  status: ProposalStatus,
  userRole: "admin" | "editor" | "viewer",
  userType: "agency" | "client" | "freelance"
): ProposalAction[] => {
  if (userType === "client" && userRole === "admin") {
    if (status === "on approval") {
      return ["approve", "decline"];
    }
  }

  if (userType === "agency") {
    if (userRole === "admin") {
      if (status === "on development") {
        return ["send"];
      }
      if (status === "declined") {
        return ["send"];
      }
    }
    if (userRole === "admin" || userRole === "editor") {
      if (status === "requested") {
        return ["create"];
      }
      if (status === "declined") {
        return ["update"];
      }
    }
  }

  return [];
};

export const getStatusColor = (status: ProposalStatus): string => {
  switch (status) {
    case "requested":
      return "bg-yellow-100 text-yellow-800";
    case "on development":
      return "bg-blue-100 text-blue-800";
    case "on approval":
      return "bg-purple-100 text-purple-800";
    case "declined":
      return "bg-red-100 text-red-800";
    case "approved":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};