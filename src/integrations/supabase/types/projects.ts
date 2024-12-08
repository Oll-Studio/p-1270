export interface Project {
  id: string
  name: string
  description: string | null
  agency_id: string
  created_at: string
  updated_at: string
  created_by: string
  status: string | null
  client_name: string | null
  start_date: string | null
  completion_date: string | null
}