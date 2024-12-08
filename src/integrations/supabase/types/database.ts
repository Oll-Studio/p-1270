import { Agency, AgencyMember } from "./agencies"
import { Project } from "./projects"
import { Enums } from "./enums"

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      agencies: {
        Row: Agency
        Insert: Partial<Agency>
        Update: Partial<Agency>
        Relationships: []
      }
      agency_members: {
        Row: AgencyMember
        Insert: Partial<AgencyMember>
        Update: Partial<AgencyMember>
        Relationships: [
          {
            foreignKeyName: "agency_members_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: Project
        Insert: Partial<Project>
        Update: Partial<Project>
        Relationships: [
          {
            foreignKeyName: "projects_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_default_permission_level: {
        Args: {
          user_type: Enums["user_type"]
          requested_level: Enums["permission_level"]
        }
        Returns: Enums["permission_level"]
      }
    }
    Enums: Enums
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"]
export type TablesInsert<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Insert"]
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Update"]