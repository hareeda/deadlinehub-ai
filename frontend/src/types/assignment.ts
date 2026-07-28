export type AssignmentStatus =
  | "Todo"
  | "In Progress"
  | "Submitted"
  | "Completed";

export type AssignmentPriority =
  | "High"
  | "Medium"
  | "Low";

export interface Task {
  id: number;
  title: string;

  category: string;
  subject?: string;

  priority: string;
  due_date: string;
  due_time?: string;
  status: string;
  description?: string;
}

export interface CreateAssignmentRequest {
  title: string;

  subject: string;

  description?: string;

  due_date: string;

  due_time?: string;          // ← NEW

  platform?: string;

  priority: AssignmentPriority;

  status?: AssignmentStatus;
}

export interface UpdateAssignmentRequest {
  title?: string;

  subject?: string;

  description?: string;

  due_date?: string;

  due_time?: string;          // ← NEW

  platform?: string;

  priority?: AssignmentPriority;

  status?: AssignmentStatus;
}