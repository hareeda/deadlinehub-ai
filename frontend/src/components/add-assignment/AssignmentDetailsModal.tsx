"use client";

import { Assignment } from "@/types/assignment";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface AssignmentDetailsModalProps {
  open: boolean;
  assignment: Assignment | null;
  onClose: () => void;
  onEdit: (assignment: Assignment) => void;
}

export default function AssignmentDetailsModal({
  open,
  assignment,
  onClose,
  onEdit,
}: AssignmentDetailsModalProps) {
  if (!assignment) return null;

  const priorityColor =
    assignment.priority === "High"
      ? "text-red-600"
      : assignment.priority === "Medium"
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
        }
      }}
    >
      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {assignment.title}
          </AlertDialogTitle>

          <AlertDialogDescription>
            Assignment Details
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <p className="text-sm text-muted-foreground">
              Subject
            </p>
            <p>{assignment.subject}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Platform
            </p>
            <p>{assignment.platform || "-"}</p>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Priority
              </p>

              <p className={priorityColor}>
                {assignment.priority}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Status
              </p>

              <p>{assignment.status}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Due Date
            </p>

            <p>
              {new Date(
                assignment.due_date
              ).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Description
            </p>

            <p>
              {assignment.description ||
                "No description provided."}
            </p>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Close
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() => onEdit(assignment)}
          >
            Edit Assignment
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}