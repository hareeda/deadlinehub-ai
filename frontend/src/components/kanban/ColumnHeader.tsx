import { Plus } from "lucide-react";

interface ColumnHeaderProps {
  title: string;
  count: number;
  color: string;
}

export default function ColumnHeader({
  title,
  count,
  color,
}: ColumnHeaderProps) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between">

        <div>
          <h2
            className={`uppercase tracking-wide font-bold text-sm ${color}`}
          >
            {title}
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            {count} {count === 1 ? "Assignment" : "Assignments"}
          </p>
        </div>

        <button
          className="w-8 h-8 rounded-lg hover:bg-gray-200 flex items-center justify-center transition"
        >
          <Plus size={16} />
        </button>

      </div>

      <div className="mt-4 border-b border-gray-300"></div>
    </div>
  );
}