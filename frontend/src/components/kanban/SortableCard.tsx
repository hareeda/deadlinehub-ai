"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Assignment } from "@/types/assignment";
import KanbanCard from "./KanbanCard";

interface Props {
  assignment: Assignment;
  onDelete: (id: string) => Promise<void>;
  onCardClick: (assignment: Assignment) => void;
  onEdit: (assignment: Assignment) => void;
}

export default function SortableCard({
  assignment,
  onDelete,
  onCardClick,
  onEdit,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: assignment.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 200ms ease",
    opacity: isDragging ? 0.35 : 1,
    cursor: isDragging ? "grabbing" : "grab",
    zIndex: isDragging ? 999 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`transition-all duration-200 ${
        isDragging
          ? "scale-105 shadow-2xl rotate-1"
          : "scale-100"
      }`}
    >
      <KanbanCard
        assignment={assignment}
        onDelete={onDelete}
        onClick={onCardClick}
        onEdit={onEdit}
      />
    </div>
  );
}