"use client";

import { useMemo, useState } from "react";
import { Assignment } from "@/types/assignment";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, CalendarDays, Clock } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  assignments: Assignment[];
  onAssignmentClick: (assignment: Assignment) => void;
}

export default function AssignmentListSheet({
  open,
  onOpenChange,
  title,
  assignments,
  onAssignmentClick,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredAssignments = useMemo(() => {
    if (!search.trim()) return assignments;

    return assignments.filter((assignment) =>
      assignment.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [assignments, search]);

  const getStatusClass = (status: Assignment["status"]) => {
    switch (status) {
      case "Todo":
        return "bg-slate-100 text-slate-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Submitted":
        return "bg-purple-100 text-purple-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getPriorityClass = (priority: Assignment["priority"]) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      case "Low":
        return "bg-green-100 text-green-700";

      default:
        return "";
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[420px] sm:w-[500px] overflow-y-auto px-5 py-5">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">
            {title}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-5 space-y-3">

          {/* Search */}
          <div className="relative mb-4">
            <Search
              size={18}
              className="absolute left-3 top-2.5 text-gray-400"
            />

            <Input
              placeholder="Search tasks..."
              className="pl-10 h-10 rounded-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Empty State */}
          {filteredAssignments.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              No tasks found.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  onClick={() => onAssignmentClick(assignment)}
                  className="cursor-pointer rounded-xl border bg-white p-4 transition-all duration-200 hover:border-blue-200 hover:shadow-lg"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900">
                        {assignment.title}
                      </h3>

                      <p className="mt-0.5 text-sm text-gray-500">
                        {assignment.subject}
                      </p>
                    </div>

                    <Badge className={getStatusClass(assignment.status)}>
                      {assignment.status}
                    </Badge>
                  </div>

                  {/* Date & Time */}
                  <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <CalendarDays size={15} />

                      <span>
                        {new Date(
                          assignment.due_date
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {assignment.due_time && (
                      <div className="flex items-center gap-1">
                        <Clock size={15} />

                        <span>{assignment.due_time}</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Row */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      Click to view details
                    </span>

                    <Badge className={getPriorityClass(assignment.priority)}>
                      {assignment.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}