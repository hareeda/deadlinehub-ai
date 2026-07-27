"use client";

import { Monitor, Mail, MessageSquare, GraduationCap } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PlatformSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const platforms = [
  { value: "Digii", icon: GraduationCap },
  { value: "Google Classroom", icon: GraduationCap },
  { value: "Moodle", icon: GraduationCap },
  { value: "Canvas", icon: GraduationCap },
  { value: "Microsoft Teams", icon: Monitor },
  { value: "Email", icon: Mail },
  { value: "WhatsApp", icon: MessageSquare },
  { value: "Other", icon: Monitor },
];

export default function PlatformSelector({
  value,
  onChange,
}: PlatformSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Platform
      </label>

      <Select
      value={value}
      onValueChange={(value) => onChange(value ?? "")}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Platform" />
        </SelectTrigger>

        <SelectContent>
          {platforms.map((platform) => {
            const Icon = platform.icon;

            return (
              <SelectItem
                key={platform.value}
                value={platform.value}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>{platform.value}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
