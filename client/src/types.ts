export type Budget = "minimo" | "moderado" | "sin_limite";
export type Users = "<100" | "100-10k" | ">10k";
export type Level = "principiante" | "intermedio" | "avanzado";

export interface ArchitectRequest {
  idea: string;
  budget: Budget;
  expected_users: Users;
  team_level: Level;
}

export interface NodeT { id: string; service: string; role: string }
export interface EdgeT { source: string; target: string; label: string }
export interface ServiceDetail {
  name: string;
  what_it_is: string;
  role_in_architecture: string;
  why_chosen: string;
  alternatives: string[];
}
export interface Architecture {
  summary: string;
  assumptions: string[];
  nodes: NodeT[];
  edges: EdgeT[];
  services: ServiceDetail[];
  sources: string[];
}
