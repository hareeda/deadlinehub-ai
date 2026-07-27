"use client";

import { useMemo, useState } from "react";

import { useAssignments } from "@/hooks/useAssignments";
import type { Assignment } from "@/types/assignment";

import {
  DndContext,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

import EditAssignmentModal from "@/components/add-assignment/EditAssignmentModal";
import Navbar from "@/components/Navbar";
import DashboardStats from "@/components/DashboardStats";
import Loading from "@/components/Loading";
import AddAssignmentButton from "@/components/add-assignment/AddAssignmentButton";
import AddAssignmentModal from "@/components/add-assignment/AddAssignmentModal";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import AssignmentDetailsModal from "@/components/add-assignment/AssignmentDetailsModal";
import { assignmentService } from "@/services/assignmentService";
import { AssignmentStatus } from "@/types/assignment";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedAssignment, setSelectedAssignment] =
  useState<Assignment | null>(null);

const [detailsOpen, setDetailsOpen] =
  useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const {
    assignments,
    loading,
    refresh,
    remove,
  } = useAssignments();

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

  const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  })
);

    const handleDragEnd = async (event: DragEndEvent) => {
  const { active, over } = event;

  if (!over) return;

  const assignmentId = active.id as string;
  const newStatus = over.id as AssignmentStatus;

  const assignment = assignments.find(
    (a) => a.id === assignmentId
  );

  if (!assignment) return;

  if (assignment.status === newStatus) return;

  try {
    await assignmentService.updateAssignment(
      assignmentId,
      {
        status: newStatus,
      }
    );

    await refresh();
  } catch (error) {
    console.error(error);
  }
};

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
  <DndContext
  sensors={sensors}
  collisionDetection={closestCorners}
  onDragEnd={handleDragEnd}
>
  {loading ? (
    <Loading />
  ) : (
    <KanbanBoard
      assignments={assignments}
      onDelete={remove}
      onCardClick={(assignment) => {
        setSelectedAssignment(assignment);
        setDetailsOpen(true);
      }}
      onEdit={(assignment) => {
        setSelectedAssignment(assignment);
        setDetailsOpen(false);
        setEditOpen(true);
      }}
    />
  )}
</DndContext>
)}
      </main>

      <AddAssignmentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={refresh}
      />

      <AssignmentDetailsModal
  open={detailsOpen}
  assignment={selectedAssignment}
  onClose={() => setDetailsOpen(false)}
  onEdit={(assignment) => {
  setDetailsOpen(false);
  setSelectedAssignment(assignment);
  setEditOpen(true);
}}
/>

      <EditAssignmentModal
  open={editOpen}
  assignment={selectedAssignment}
  onClose={() => setEditOpen(false)}
  onSuccess={async () => {
    await refresh();
    setEditOpen(false);
  }}
/>
    </div>
  );
}