export type AssignmentStatus =
  | "Todo"
  | "In Progress"
  | "Submitted"
  | "Completed";

export type AssignmentPriority =
  | "High"
  | "Medium"
  | "Low";

export interface Assignment {
  id: string;

  title: string;

  subject: string;

  description?: string | null;

  due_date: string;

  platform?: string | null;

  priority: AssignmentPriority;

  status: AssignmentStatus;
}

export interface CreateAssignmentRequest {
  title: string;

  subject: string;

  description?: string;

  due_date: string;

  platform?: string;

  priority: AssignmentPriority;

  status?: AssignmentStatus;
}

export interface UpdateAssignmentRequest {
  title?: string;

  subject?: string;

  description?: string;

  due_date?: string;

  platform?: string;

  priority?: AssignmentPriority;

  status?: AssignmentStatus;
}