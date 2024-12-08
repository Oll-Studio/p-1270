export type PermissionLevel = "admin" | "editor" | "viewer"
export type MembershipStatus = "pending" | "approved" | "rejected"
export type UserType = "agency" | "client" | "freelance"

export type Enums = {
  permission_level: PermissionLevel
  membership_status: MembershipStatus
  user_type: UserType
}