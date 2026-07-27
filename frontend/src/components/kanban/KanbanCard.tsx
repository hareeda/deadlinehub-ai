"use client";

import { useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

import type { Assignment } from "@/types/assignment";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface KanbanCardProps {
  assignment: Assignment;
  onDelete: (id: string) => Promise<void>;
  onClick: (assignment: Assignment) => void;
  onEdit: (assignment: Assignment) => void;
}

export default function KanbanCard({
  assignment,
  onDelete,
  onClick,
  onEdit,
}: KanbanCardProps)  {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    try {
      setDeleting(true);
      await onDelete(assignment.id);
      setDialogOpen(false);
    } finally {
      setDeleting(false);
    }
  }

  const badge =
    assignment.priority === "High"
      ? "bg-red-100 text-red-700"
      : assignment.priority === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <>
      <div
        onClick={() => onClick(assignment)}
        className="rounded-xl border bg-white p-4 shadow-sm space-y-3 cursor-pointer transition-all hover:shadow-md hover:border-primary"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold">{assignment.title}</h3>

            <p className="text-sm text-muted-foreground">
              {assignment.subject}
            </p>
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon-sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                }
              />

              <DropdownMenuContent align="end">
                <DropdownMenuItem
  onClick={() => {
    onEdit(assignment);
  }}
>
  <Pencil className="mr-2 h-4 w-4" />
  Edit
</DropdownMenuItem>

                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setDialogOpen(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${badge}`}
          >
            {assignment.priority}
          </span>

          <span className="text-xs text-muted-foreground">
            {assignment.status}
          </span>
        </div>

        {assignment.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {assignment.description}
          </p>
        )}

        <p className="text-xs text-muted-foreground">
          Due: {assignment.due_date}
        </p>
      </div>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Assignment?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}