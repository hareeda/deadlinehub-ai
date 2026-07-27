"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import type { Assignment } from "@/types/assignment";
import AssignmentForm from "./AssignmentForm";

interface EditAssignmentModalProps {
  open: boolean;
  assignment: Assignment | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditAssignmentModal({
  open,
  assignment,
  onClose,
  onSuccess,
}: EditAssignmentModalProps) {
  if (!assignment) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
        }
      }}
    >
      <DialogContent
        className="
          w-[95vw]
          sm:max-w-2xl
          lg:max-w-3xl
          h-[92vh]
          overflow-hidden
          p-0
        "
      >
        <div className="h-full overflow-y-auto px-8 py-6">
          <AssignmentForm
            mode="edit"
            assignment={assignment}
            onClose={onClose}
            onSuccess={onSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}