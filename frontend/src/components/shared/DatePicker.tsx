"use client";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
}

export default function DatePicker({
  value,
  onChange,
}: DatePickerProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Due Date
        <span className="ml-1 text-red-500">*</span>
      </label>

      <Popover>
        <PopoverTrigger
  className="flex w-full items-center rounded-lg border border-input bg-background px-3 py-2 text-left text-sm"
>
  <CalendarIcon className="mr-2 h-4 w-4" />

  {value ? (
    format(value, "PPP")
  ) : (
    <span className="text-muted-foreground">
      Pick a due date
    </span>
  )}
</PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
