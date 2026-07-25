import {
  Calendar,
  Pencil,
  Trash2,
  BookOpen,
} from "lucide-react";

import { Assignment } from "@/types/assignment";

interface AssignmentCardProps {
  assignment: Assignment;
}

export default function AssignmentCard({
  assignment,
}: AssignmentCardProps) {
  const priorityColor = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 p-6">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-xl font-bold text-gray-900">
            {assignment.title}
          </h2>

          <div className="flex items-center gap-2 mt-2">
            <BookOpen
              size={16}
              className="text-gray-500"
            />

            <span className="text-gray-600">
              {assignment.subject}
            </span>
          </div>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            priorityColor[
              assignment.priority as keyof typeof priorityColor
            ] || "bg-gray-100 text-gray-700"
          }`}
        >
          {assignment.priority}
        </span>

      </div>

      {assignment.description && (
        <p className="text-gray-600 mt-5 leading-relaxed">
          {assignment.description}
        </p>
      )}

      <div className="flex justify-between items-center mt-6">

        <div className="flex items-center gap-2 text-gray-500">
          <Calendar size={16} />

          <span>
            {new Date(
              assignment.due_date
            ).toLocaleDateString()}
          </span>
        </div>

        <div className="flex gap-3">

          <button
            className="p-2 rounded-lg hover:bg-blue-100 transition"
          >
            <Pencil
              size={18}
              className="text-blue-600"
            />
          </button>

          <button
            className="p-2 rounded-lg hover:bg-red-100 transition"
          >
            <Trash2
              size={18}
              className="text-red-600"
            />
          </button>

        </div>

      </div>

    </div>
  );
}