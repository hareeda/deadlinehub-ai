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
  } = useSortable({
    id: assignment.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
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