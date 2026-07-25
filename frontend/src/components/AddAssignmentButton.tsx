import { Plus } from "lucide-react";

interface AddAssignmentButtonProps {
  onClick: () => void;
}

export default function AddAssignmentButton({
  onClick,
}: AddAssignmentButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition"
    >
      <Plus size={18} />
      Add Assignment
    </button>
  );
}