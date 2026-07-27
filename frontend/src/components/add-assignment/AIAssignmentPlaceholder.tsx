"use client";

import {
  Sparkles,
  Wand2,
  CheckCircle2,
  ArrowRight,
  FileText,
  Image,
  Mail,
  MessageSquare,
  Calendar,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  onBack: () => void;
}

const supportedPlatforms = [
  "Digii",
  "Moodle",
  "Google Classroom",
  "Email",
  "Microsoft Teams",
  "WhatsApp",
];

const extractedFields = [
  "Assignment Title",
  "Subject",
  "Due Date",
  "Priority",
  "Description",
  "Reminder Schedule",
];

export default function AIAssignmentPlaceholder({
  onBack,
}: Props) {
  const handleAnalyze = () => {
    alert(
      "🚧 AI extraction is under development.\n\nThis feature will be available in a future update."
    );
  };

  return (
    <div className="space-y-8">

      {/* Hero */}

      <div className="text-center">

        <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-12 w-12 text-primary" />
        </div>

        <h2 className="text-3xl font-bold">
          AI Assignment Assistant
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Paste assignment instructions from Digii,
          Moodle, Google Classroom, Email,
          Microsoft Teams, or WhatsApp.
          AI will automatically organize your
          assignment details for you.
        </p>
      </div>

      {/* Supported Platforms */}

      <div className="space-y-3">

        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Supported Platforms
        </h3>

        <div className="flex flex-wrap gap-2">

          {supportedPlatforms.map((platform) => (
            <Badge
              key={platform}
              variant="secondary"
            >
              {platform}
            </Badge>
          ))}

        </div>

      </div>

      {/* Text Area */}

      <div className="space-y-4">

        <label className="text-sm font-semibold">
          Assignment Instructions
        </label>

        <Textarea
          rows={8}
          placeholder={`Example:

Operations Assignment 2

Subject: Operations Management

Deadline: 30 July 2026

Weightage: 20 Marks

Submit through Digii

Prepare a report on Inventory Management...`}
        />

        <Button
          className="w-full"
          onClick={handleAnalyze}
        >
          <Wand2 className="mr-2 h-4 w-4" />
          Analyze Assignment
        </Button>

      </div>

      {/* Extraction Card */}

      <div className="rounded-xl border bg-muted/20 p-6">

        <h3 className="mb-5 text-lg font-semibold">
          ✨ AI will identify
        </h3>

        <div className="grid gap-3 sm:grid-cols-2">

          {extractedFields.map((field) => (
            <div
              key={field}
              className="flex items-center gap-3 rounded-lg border bg-background p-4"
            >
              <CheckCircle2 className="h-5 w-5 text-green-600" />

              <span>{field}</span>

            </div>
          ))}

        </div>

      </div>

      {/* Coming Soon */}

      <div className="rounded-xl border border-dashed bg-muted/20 p-6">

        <h3 className="mb-5 text-lg font-semibold">
          🚀 Coming Soon
        </h3>

        <div className="grid gap-3 sm:grid-cols-2">

          <div className="flex items-center gap-3 text-muted-foreground">
            <FileText className="h-5 w-5" />
            PDF Upload
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <Image className="h-5 w-5" />
            Screenshot OCR
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <Mail className="h-5 w-5" />
            Email Import
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <MessageSquare className="h-5 w-5" />
            WhatsApp Import
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <Calendar className="h-5 w-5" />
            Calendar Reminder Sync
          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="rounded-xl border bg-muted/30 p-6 text-center">

        <p className="font-medium">
          AI extraction is currently under development.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          You can continue creating assignments manually
          until AI extraction becomes available.
        </p>

        <Button
          variant="outline"
          className="mt-5"
          onClick={onBack}
        >
          Go to Manual Entry
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

      </div>

    </div>
  );
}