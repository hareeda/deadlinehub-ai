"use client";

import {
  BookOpen,
  Calendar,
  Flag,
} from "lucide-react";

import { Assignment } from "@/types/assignment";

interface Props {
  assignment: Assignment;
}

export default function KanbanCard({ assignment }: Props) {
  const priorityColors = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer">

      {/* Header */}
      <div className="flex justify-between items-start gap-3">

        <h3 className="font-semibold text-gray-900 text-base leading-6">
          {assignment.title}
        </h3>

        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
            priorityColors[
              assignment.priority as keyof typeof priorityColors
            ] || "bg-gray-100 text-gray-700"
          }`}
        >
          {assignment.priority}
        </span>

      </div>

      {/* Subject */}
      <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">

        <BookOpen size={15} />

        <span>{assignment.subject}</span>

      </div>

      {/* Description */}
      {assignment.description && (
        <p className="text-sm text-gray-500 mt-3 line-clamp-2">
          {assignment.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center mt-5 pt-3 border-t border-gray-100">

        <div className="flex items-center gap-2 text-sm text-gray-500">

          <Calendar size={15} />

          <span>
            {new Date(
              assignment.due_date
            ).toLocaleDateString()}
          </span>

        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500">

          <Flag size={15} />

          <span>{assignment.priority}</span>

        </div>

      </div>

    </div>
  );
}