import { api } from "@/lib/api";

import {
  Assignment,
  CreateAssignmentRequest,
  UpdateAssignmentRequest,
} from "@/types/assignment";

class AssignmentService {
  async getAssignments(): Promise<Assignment[]> {
    return api<Assignment[]>("/assignments/");
  }

  async getAssignment(id: string): Promise<Assignment> {
    return api<Assignment>(`/assignments/${id}`);
  }

  async createAssignment(
    data: CreateAssignmentRequest
  ): Promise<Assignment[]> {
    return api<Assignment[]>("/assignments/", {
      method: "POST",
      body: data,
    });
  }

  async updateAssignment(
    id: string,
    data: UpdateAssignmentRequest
  ): Promise<Assignment> {
    return api<Assignment>(`/assignments/${id}`, {
      method: "PUT",
      body: data,
    });
  }

  async deleteAssignment(
    id: string
  ): Promise<{ message: string }> {
    return api<{ message: string }>(
      `/assignments/${id}`,
      {
        method: "DELETE",
      }
    );
  }
}

export const assignmentService = new AssignmentService();