interface AddAssignmentModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddAssignmentModal({
  open,
  onClose,
}: AddAssignmentModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-xl">

        <h2 className="text-2xl font-bold mb-6">
          Add Assignment
        </h2>

        <p className="text-gray-600">
          Assignment form coming next...
        </p>

        <button
          onClick={onClose}
          className="mt-6 bg-gray-800 text-white px-5 py-2 rounded-lg"
        >
          Close
        </button>

      </div>
    </div>
  );
}