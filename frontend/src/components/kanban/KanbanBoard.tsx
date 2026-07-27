import { Assignment } from "@/types/assignment";
import KanbanColumn from "./KanbanColumn";

interface Props {
  assignments: Assignment[];
  onDelete: (id: string) => Promise<void>;
  onCardClick: (assignment: Assignment) => void;
  onEdit: (assignment: Assignment) => void;
}

export default function KanbanBoard({
  assignments,
  onDelete,
  onCardClick,
  onEdit,
}: Props) {
  const todo = assignments.filter((a) => a.status === "Todo");
  const progress = assignments.filter((a) => a.status === "In Progress");
  const submitted = assignments.filter((a) => a.status === "Submitted");
  const completed = assignments.filter((a) => a.status === "Completed");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <KanbanColumn
  id="Todo"
  title="To Do"
  assignments={todo}
  onDelete={onDelete}
  onCardClick={onCardClick}
  onEdit={onEdit}
/>

      <KanbanColumn
  id="In Progress"
  title="In Progress"
  assignments={progress}
  onDelete={onDelete}
  onCardClick={onCardClick}
  onEdit={onEdit}
/>

      <KanbanColumn
  id="Submitted"
  title="Submitted"
  assignments={submitted}
  onDelete={onDelete}
  onCardClick={onCardClick}
  onEdit={onEdit}
/>

      <KanbanColumn
  id="Completed"
  title="Completed"
  assignments={completed}
  onDelete={onDelete}
  onCardClick={onCardClick}
  onEdit={onEdit}
/>
    </div>
  );
}