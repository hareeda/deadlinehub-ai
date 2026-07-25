import { Assignment } from "@/types/assignment";
import AssignmentCard from "./AssignmentCard";
import EmptyState from "./EmptyState";

interface Props {
  assignments: Assignment[];
}

export default function AssignmentList({
  assignments,
}: Props) {

  if (assignments.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-5 mt-6">

      {assignments.map((assignment) => (
        <AssignmentCard
          key={assignment.id}
          assignment={assignment}
        />
      ))}

    </div>
  );
}