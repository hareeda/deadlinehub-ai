"use client";

import { useEffect, useMemo, useState } from "react";

import Navbar from "@/components/Navbar";
import DashboardStats from "@/components/DashboardStats";
import Loading from "@/components/Loading";
import AddAssignmentButton from "@/components/AddAssignmentButton";
import AddAssignmentModal from "@/components/AddAssignmentModal";
import KanbanBoard from "@/components/kanban/KanbanBoard";

import { getAssignments } from "@/services/assignmentService";
import { Assignment } from "@/types/assignment";

export default function Home() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadAssignments();
  }, []);

  async function loadAssignments() {
    try {
      setLoading(true);
      const data = await getAssignments();
      setAssignments(data);
    } catch (error) {
      console.error("Failed to load assignments:", error);
    } finally {
      setLoading(false);
    }
  }

  const stats = useMemo(() => {
    return {
      total: assignments.length,
      pending: assignments.filter(
        (a) =>
          a.status === "Todo" ||
          a.status === "In Progress" ||
          a.status === "Submitted"
      ).length,
      completed: assignments.filter(
        (a) => a.status === "Completed"
      ).length,
      highPriority: assignments.filter(
        (a) => a.priority === "High"
      ).length,
    };
  }, [assignments]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto p-8">

        <DashboardStats
          total={stats.total}
          pending={stats.pending}
          completed={stats.completed}
          highPriority={stats.highPriority}
        />

        <div className="flex justify-between items-center mt-10 mb-6">
          <h2 className="text-3xl font-bold">
            Assignment Board
          </h2>

          <AddAssignmentButton
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        {loading ? (
          <Loading />
        ) : (
          <KanbanBoard assignments={assignments} />
        )}

      </main>

      <AddAssignmentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}