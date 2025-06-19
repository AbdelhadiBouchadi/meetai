"use client";

import { ColumnDef } from "@tanstack/react-table";
import GeneratedAvatar from "@/components/shared/generated-avatar";
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  ClockFadingIcon,
  CornerDownRightIcon,
  Icon,
  Loader2Icon,
  LoaderIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MeetingGetMany } from "../../types";
import humanizeDuration from "humanize-duration";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type Meeting = MeetingGetMany[number];

function formatDuration(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
  });
}

const statusIconMap = {
  upcoming: ClockArrowUpIcon,
  active: LoaderIcon,
  completed: CircleCheckIcon,
  processing: LoaderIcon,
  canceled: CircleXIcon,
};

const statusColorMap = {
  upcoming: "bg-yellow-500/20 text-yellow-800 border-yellow-800/5",
  active: "bg-primary/20 text-green-800 border-green-800/5",
  completed: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
  processing: "bg-gray-300/20 text-gray-800 border-gray-800/5",
  canceled: "bg-rose-500/20 text-rose-800 border-rose-800/5",
};

export const columns: ColumnDef<Meeting>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <span className="font-semibold capitalize">{row.original.name}</span>
        <div className="flex items-center gap-x-1.5">
          <div className="flex items-center gap-x-1">
            <CornerDownRightIcon className="text-muted-foreground size-3" />
            <span className="text-muted-foreground max-w-[200px] truncate text-sm capitalize">
              {row.original.agent.name}
            </span>
          </div>
          <GeneratedAvatar
            variant="botttsneutral"
            seed={row.original.agent.name}
            className="size-4"
          />
          <span className="text-muted-foreground text-sm">
            {row.original.startedAt
              ? format(row.original.startedAt, "MMM d")
              : ""}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const Icon =
        statusIconMap[row.original.status as keyof typeof statusIconMap];

      return (
        <Badge
          variant="outline"
          className={cn(
            "text-muted-foreground py-2 capitalize [&>svg]:size-4",
            statusColorMap[row.original.status as keyof typeof statusColorMap],
          )}
        >
          <Icon
            className={cn(
              row.original.status === "processing" && "animate-spin",
            )}
          />
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex items-center gap-x-2 py-2 capitalize [&>svg]:size-4"
      >
        <ClockFadingIcon className="text-blue-700" />
        {row.original.duration
          ? formatDuration(row.original.duration)
          : "No duration"}
      </Badge>
    ),
  },
];
