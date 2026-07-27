"use client";

import { useDroppable } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Assignment } from "@/types/assignment";
import SortableCard from "./SortableCard";
import ColumnHeader from "./ColumnHeader";

interface Props {
  id: string;
  title: string;
  assignments: Assignment[];
  onDelete: (id: string) => Promise<void>;
  onCardClick: (assignment: Assignment) => void;
  onEdit: (assignment: Assignment) => void;
}

export default function KanbanColumn({
  id,
  title,
  assignments,
  onDelete,
  onCardClick,
  onEdit,
}: Props) {
  const { setNodeRef } = useDroppable({
    id,
  });

  const getColor = () => {
    switch (id) {
      case "Todo":
        return "text-blue-600";

      case "In Progress":
        return "text-orange-600";

      case "Submitted":
        return "text-purple-600";

      case "Completed":
        return "text-green-600";

      default:
        return "text-gray-600";
    }
  };

  return (
    <div
      ref={setNodeRef}
      className="bg-slate-100 rounded-2xl p-5 min-h-[650px]"
    >
      <ColumnHeader
        title={title}
        count={assignments.length}
        color={getColor()}
      />

<SortableContext
  items={assignments.map((a) => a.id)}
  strategy={verticalListSortingStrategy}
>
  <div className="space-y-4">
        {assignments.length === 0 && (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-400">
            No assignments yet
          </div>
        )}

        {assignments.map((assignment) => (
          <SortableCard
  key={assignment.id}
  assignment={assignment}
  onDelete={onDelete}
  onCardClick={onCardClick}
  onEdit={onEdit}
/>
        ))}
            </div>
    </SortableContext>
    </div>
  );
}