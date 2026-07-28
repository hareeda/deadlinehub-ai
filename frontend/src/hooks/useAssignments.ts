"use client";

import { useCallback, useEffect, useState } from "react";

import { assignmentService } from "@/services/assignmentService";

import {
  Assignment,
  CreateAssignmentRequest,
  UpdateAssignmentRequest,
} from "@/types/assignment";

export function useAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);

      const data = await assignmentService.getAssignments();

      setAssignments(data);
    } catch (error) {
      console.error("Failed to load assignments:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = async (data: CreateAssignmentRequest) => {
    await assignmentService.createAssignment(data);
    await refresh();
  };

  const update = async (
    id: string,
    data: UpdateAssignmentRequest
  ) => {
    await assignmentService.updateAssignment(id, data);
    await refresh();
  };

  const remove = async (id: string) => {
    await assignmentService.deleteAssignment(id);
    await refresh();
  };

  return {
  assignments,
  setAssignments,
  loading,
  refresh,
  create,
  update,
  remove,
};
}