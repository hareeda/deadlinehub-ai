"use client";

import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Priority = "High" | "Medium" | "Low";

interface PrioritySelectorProps {
  value: Priority;
  onChange: (value: Priority) => void;
}

const priorities = [
  {
    value: "High" as Priority,
    label: "High",
    icon: AlertCircle,
  },
  {
    value: "Medium" as Priority,
    label: "Medium",
    icon: AlertTriangle,
  },
  {
    value: "Low" as Priority,
    label: "Low",
    icon: CheckCircle2,
  },
];

export default function PrioritySelector({
  value,
  onChange,
}: PrioritySelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Priority
      </label>

      <Select
        value={value}
        onValueChange={(value) =>
          onChange((value ?? "Medium") as Priority)
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Priority" />
        </SelectTrigger>

        <SelectContent>
          {priorities.map((priority) => {
            const Icon = priority.icon;

            return (
              <SelectItem
                key={priority.value}
                value={priority.value}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>{priority.label}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}