"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import AssignmentMethodSelection from "./AssignmentMethodSelection";
import AssignmentForm from "./AssignmentForm";
import AIAssignmentPlaceholder from "./AIAssignmentPlaceholder";

interface AddAssignmentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type AssignmentStep =
  | "select"
  | "manual"
  | "ai";

export default function AddAssignmentModal({
  open,
  onClose,
  onSuccess,
}: AddAssignmentModalProps) {
  const [step, setStep] =
    useState<AssignmentStep>("select");

  useEffect(() => {
    if (open) {
      setStep("select");
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
        }
      }}
    >
      <DialogContent
        className="
          w-[95vw]
          sm:max-w-2xl
          lg:max-w-3xl
          h-[92vh]
          overflow-hidden
          p-0
        "
      >
        <div className="h-full overflow-y-auto px-8 py-6">
          {step === "select" && (
            <AssignmentMethodSelection
              onSelectManual={() =>
                setStep("manual")
              }
              onSelectAI={() =>
                setStep("ai")
              }
            />
          )}

          {step === "manual" && (
            <AssignmentForm
  mode="create"
  onBack={() =>
    setStep("select")
  }
  onClose={onClose}
  onSuccess={onSuccess}
/>
          )}

          {step === "ai" && (
            <AIAssignmentPlaceholder
              onBack={() =>
                setStep("select")
              }
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}