import { Enums } from "./enums"

export interface Agency {
  id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
  created_by: string
}

export interface AgencyMember {
  id: string
  agency_id: string | null
  user_id: string | null
  user_type: Enums["user_type"]
  permission_level: Enums["permission_level"]
  status: Enums["membership_status"]
  invited_by: string | null
  created_at: string
  updated_at: string
  role: Enums["permission_level"] | null
}