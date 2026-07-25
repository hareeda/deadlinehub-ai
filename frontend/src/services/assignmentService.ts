import api from "@/lib/api";
import { Assignment } from "@/types/assignment";

export async function getAssignments() {
    const response = await api.get("/assignments");
    return response.data;
}

export async function createAssignment(assignment: Assignment) {
    const response = await api.post("/assignments", assignment);
    return response.data;
}