"use client";

import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface SubjectSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const DEFAULT_SUBJECTS = [
  "Operations",
  "Marketing",
  "Finance",
  "Accounting",
  "Economics",
  "Statistics",
  "Business Analytics",
];

export default function SubjectSelector({
  value,
  onChange,
}: SubjectSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const subjects = useMemo(() => {
    const all = [...DEFAULT_SUBJECTS];

    if (value && !all.includes(value)) {
      all.push(value);
    }

    return all;
  }, [value]);

  const filtered = subjects.filter((subject) =>
    subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Subject
        <span className="ml-1 text-red-500">*</span>
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <span className={value ? "" : "text-muted-foreground"}>
            {value || "Select Subject"}
          </span>

          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </PopoverTrigger>

        <PopoverContent className="w-80 space-y-3 p-3">
          <Input
            placeholder="Search subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="max-h-56 overflow-y-auto space-y-1">
            {filtered.map((subject) => (
              <Button
                key={subject}
                type="button"
                variant="ghost"
                className="w-full justify-between"
                onClick={() => {
                  onChange(subject);
                  setOpen(false);
                  setSearch("");
                }}
              >
                {subject}

                {value === subject && (
                  <Check className="h-4 w-4" />
                )}
              </Button>
            ))}

            {search.trim() &&
              !subjects.some(
                (s) => s.toLowerCase() === search.toLowerCase()
              ) && (
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={() => {
                    onChange(search.trim());
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add "{search}"
                </Button>
              )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}