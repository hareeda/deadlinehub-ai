"use client";

import { useMemo, useState } from "react";

import { useAssignments } from "@/hooks/useAssignments";
import type { Assignment } from "@/types/assignment";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";

import AssignmentListSheet from "@/components/add-assignment/AssignmentListSheet";
import KanbanCard from "@/components/kanban/KanbanCard";
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

  const [activeAssignment, setActiveAssignment] =
  useState<Assignment | null>(null);

  const [editOpen, setEditOpen] = useState(false);

  const [sheetOpen, setSheetOpen] = useState(false);

const [sheetTitle, setSheetTitle] = useState("");

const [sheetAssignments, setSheetAssignments] = useState<Assignment[]>([]);

  const {
  assignments,
  setAssignments,
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

  const handleStatClick = (
  type: "all" | "pending" | "completed" | "high"
) => {
  switch (type) {
    case "all":
      setSheetTitle("All Tasks");
      setSheetAssignments(assignments);
      break;

    case "pending":
      setSheetTitle("Pending Tasks");
      setSheetAssignments(
        assignments.filter(
          (a) =>
            a.status === "Todo" ||
            a.status === "In Progress" ||
            a.status === "Submitted"
        )
      );
      break;

    case "completed":
      setSheetTitle("Completed Tasks");
      setSheetAssignments(
        assignments.filter((a) => a.status === "Completed")
      );
      break;

    case "high":
      setSheetTitle("High Priority Tasks");
      setSheetAssignments(
        assignments.filter((a) => a.priority === "High")
      );
      break;
  }

  setSheetOpen(true);
};

  const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  })
);

const handleDragStart = (event: DragStartEvent) => {
  const assignment = assignments.find(
    (a) => a.id === event.active.id
  );

  setActiveAssignment(assignment ?? null);
};

    const handleDragEnd = async (event: DragEndEvent) => {
  const { active, over } = event;

  if (!over) return;

  const assignmentId = active.id as string;
  const newStatus = over.id as AssignmentStatus;

  const previousAssignments = [...assignments];

  const assignment = assignments.find(
    (a) => a.id === assignmentId
  );

  if (!assignment) return;

  if (assignment.status === newStatus) return;

  // 🚀 Update UI immediately
  setAssignments(
    assignments.map((a) =>
      a.id === assignmentId
        ? {
            ...a,
            status: newStatus,
          }
        : a
    )
  );

  try {
    await assignmentService.updateAssignment(
      assignmentId,
      {
        status: newStatus,
      }
    );
  } catch (error) {
    console.error(error);

    // Revert if API fails
    setAssignments(previousAssignments);
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
  onCardClick={handleStatClick}
/>

        <div className="flex justify-between items-center mt-10 mb-6">
          <h2 className="text-3xl font-bold">
            Task Board
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
  collisionDetection={closestCenter}
  onDragStart={handleDragStart}
  onDragEnd={async (event) => {
    await handleDragEnd(event);
    setActiveAssignment(null);
  }}
  onDragCancel={() => setActiveAssignment(null)}
>
  {loading ? (
    <Loading />
  ) : (
    <>
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

  <DragOverlay>
    {activeAssignment ? (
      <div className="rotate-2 scale-105 opacity-95 shadow-2xl">
        <KanbanCard
          assignment={activeAssignment}
          onDelete={async () => {}}
          onClick={() => {}}
          onEdit={() => {}}
        />
      </div>
    ) : null}
  </DragOverlay>
</>
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

    <AssignmentListSheet
  open={sheetOpen}
  onOpenChange={setSheetOpen}
  title={sheetTitle}
  assignments={sheetAssignments}
  onAssignmentClick={(assignment) => {
    setSheetOpen(false);
    setSelectedAssignment(assignment);
    setDetailsOpen(true);
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