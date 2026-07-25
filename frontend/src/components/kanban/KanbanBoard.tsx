import { Assignment } from "@/types/assignment";
import KanbanColumn from "./KanbanColumn";

interface Props {
  assignments: Assignment[];
}

export default function KanbanBoard({
  assignments,
}: Props) {

  const todo = assignments.filter(
    (a) => a.status === "Todo"
  );

  const progress = assignments.filter(
    (a) => a.status === "In Progress"
  );

  const submitted = assignments.filter(
    (a) => a.status === "Submitted"
  );

  const completed = assignments.filter(
    (a) => a.status === "Completed"
  );

  return (
  <div className="grid grid-cols-4 gap-6">

    <KanbanColumn
      id="Todo"
      title="📋 To Do"
      assignments={todo}
    />

    <KanbanColumn
      id="In Progress"
      title="🚀 In Progress"
      assignments={progress}
    />

    <KanbanColumn
      id="Submitted"
      title="📤 Submitted"
      assignments={submitted}
    />

    <KanbanColumn
      id="Completed"
      title="✅ Completed"
      assignments={completed}
    />

  </div>
);
}