import {
  BookOpen,
  Clock3,
  CheckCircle2,
  Flame,
} from "lucide-react";

interface DashboardStatsProps {
  total: number;
  pending: number;
  completed: number;
  highPriority: number;
}

export default function DashboardStats({
  total,
  pending,
  completed,
  highPriority,
}: DashboardStatsProps) {
  const cards = [
    {
      title: "Total Assignments",
      value: total,
      icon: BookOpen,
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock3,
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-200",
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-200",
    },
    {
      title: "High Priority",
      value: highPriority,
      icon: Flame,
      bg: "bg-red-50",
      text: "text-red-600",
      border: "border-red-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`bg-white border ${card.border} rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {card.value}
                </h2>
              </div>

              <div
                className={`${card.bg} p-3 rounded-xl`}
              >
                <Icon
                  size={28}
                  className={card.text}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}