"use client";

import { Sparkles, SquarePen, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface AssignmentMethodSelectionProps {
  onSelectManual: () => void;
  onSelectAI: () => void;
}

export default function AssignmentMethodSelection({
  onSelectManual,
  onSelectAI,
}: AssignmentMethodSelectionProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          Create Task
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Choose how you'd like to add your task.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* AI */}

        <div className="rounded-xl border p-6 transition hover:border-primary hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>

          <h3 className="text-lg font-semibold">
            AI Task
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Paste your classroom announcement or task
            instructions and let AI extract the details.
          </p>

          <div className="mt-4 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
            Coming Soon
          </div>

          <Button
            className="mt-6 w-full"
            variant="secondary"
            onClick={onSelectAI}
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Manual */}

        <div className="rounded-xl border p-6 transition hover:border-primary hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <SquarePen className="h-6 w-6 text-primary" />
          </div>

          <h3 className="text-lg font-semibold">
            Manual Entry
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Fill in the task information yourself and
            organize it immediately.
          </p>

          <Button
            className="mt-12 w-full"
            onClick={onSelectManual}
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}