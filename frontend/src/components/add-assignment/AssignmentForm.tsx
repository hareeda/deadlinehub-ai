"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { assignmentService } from "@/services/assignmentService";

import SubjectSelector from "@/components/shared/SubjectSelector";
import PlatformSelector from "@/components/shared/PlatformSelector";
import PrioritySelector from "@/components/shared/PrioritySelector";
import DatePicker from "@/components/shared/DatePicker";

import type { Assignment } from "@/types/assignment";

interface AssignmentFormProps {
  mode: "create" | "edit";
  assignment?: Assignment;
  onBack?: () => void;
  onClose: () => void;
  onSuccess: () => void;
}

interface AssignmentFormData {
  title: string;
  subject: string;
  platform: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  notes: string;
}

export default function AssignmentForm({
  mode,
  assignment,
  onBack,
  onClose,
  onSuccess,
}: AssignmentFormProps) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] =
    useState<AssignmentFormData>({
      title: "",
      subject: "",
      platform: "",
      dueDate: "",
      priority: "Medium",
      notes: "",
    });

  useEffect(() => {
    if (mode === "edit" && assignment) {
      setFormData({
        title: assignment.title,
        subject: assignment.subject,
        platform: assignment.platform ?? "",
        dueDate: assignment.due_date,
        priority: assignment.priority,
        notes: assignment.description ?? "",
      });
    }

    if (mode === "create") {
      setFormData({
        title: "",
        subject: "",
        platform: "",
        dueDate: "",
        priority: "Medium",
        notes: "",
      });
    }
  }, [mode, assignment]);

  const updateField = (
    field: keyof AssignmentFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subject: "",
      platform: "",
      dueDate: "",
      priority: "Medium",
      notes: "",
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Assignment title is required.");
      return;
    }

    if (formData.title.trim().length < 3) {
      alert(
        "Assignment title must be at least 3 characters."
      );
      return;
    }

    if (!formData.subject) {
      alert("Please select a subject.");
      return;
    }

    if (!formData.dueDate) {
      alert("Please select a due date.");
      return;
    }

    try {
      setLoading(true);

      if (mode === "create") {
        await assignmentService.createAssignment({
          title: formData.title.trim(),
          subject: formData.subject,
          description:
            formData.notes.trim() || undefined,
          due_date: formData.dueDate,
          platform:
            formData.platform || undefined,
          priority: formData.priority,
          status: "Todo",
        });
      } else {
        if (!assignment) return;

        await assignmentService.updateAssignment(
          assignment.id,
          {
            title: formData.title.trim(),
            subject: formData.subject,
            description:
              formData.notes.trim() || undefined,
            due_date: formData.dueDate,
            platform:
              formData.platform || undefined,
            priority: formData.priority,
            status: assignment.status,
          }
        );
      }

      resetForm();

      await onSuccess();

      onClose();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : `Failed to ${
              mode === "create"
                ? "create"
                : "update"
            } assignment.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        {onBack && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onBack}
            disabled={loading}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}

        <div>
          <h2 className="text-2xl font-bold">
            {mode === "create"
              ? "Create Assignment"
              : "Edit Assignment"}
          </h2>

          <p className="text-sm text-muted-foreground">
            {mode === "create"
              ? "Fill in the assignment details below."
              : "Update the assignment details below."}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Assignment Title
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <Input
            placeholder="Enter assignment title"
            value={formData.title}
            disabled={loading}
            onChange={(e) =>
              updateField(
                "title",
                e.target.value
              )
            }
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <SubjectSelector
            value={formData.subject}
            onChange={(value) =>
              updateField("subject", value)
            }
          />

          <PlatformSelector
            value={formData.platform}
            onChange={(value) =>
              updateField("platform", value)
            }
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <DatePicker
            value={
              formData.dueDate
                ? new Date(formData.dueDate)
                : undefined
            }
            onChange={(date) =>
              updateField(
                "dueDate",
                date
                  ? date.toISOString()
                  : ""
              )
            }
          />

          <PrioritySelector
            value={formData.priority}
            onChange={(value) =>
              updateField(
                "priority",
                value
              )
            }
          />
        </div>

                <div className="space-y-2">
          <label className="text-sm font-medium">
            Additional Notes
          </label>

          <Textarea
            rows={5}
            disabled={loading}
            placeholder="Add reminders, grading criteria, submission instructions, or personal notes..."
            value={formData.notes}
            onChange={(e) =>
              updateField(
                "notes",
                e.target.value
              )
            }
          />
        </div>

        <div className="flex justify-end gap-3 border-t pt-6">
          {onBack && (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={loading}
            >
              Back
            </Button>
          )}

          <Button
            type="submit"
            disabled={loading}
          >
            {loading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            {loading
              ? mode === "create"
                ? "Creating..."
                : "Saving..."
              : mode === "create"
                ? "Create Assignment"
                : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}