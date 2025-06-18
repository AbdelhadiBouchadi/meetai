"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AgentGetMany } from "../types";
import GeneratedAvatar from "@/components/shared/generated-avatar";
import { CornerDownRightIcon, VideoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Agent = AgentGetMany[number];

export const columns: ColumnDef<Agent>[] = [
  {
    accessorKey: "name",
    header: "Agent",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar
            variant="botttsneutral"
            seed={row.original.name}
            className="size-6"
          />
          <span className="font-semibold capitalize">{row.original.name}</span>
        </div>
        <div className="flex items-center gap-x-1.5">
          <CornerDownRightIcon className="text-muted-foreground size-3" />
          <span className="text-muted-foreground max-w-[200px] truncate text-sm capitalize">
            {row.original.instructions}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex items-center gap-x-2 py-2 [&>svg]:size-4"
      >
        <VideoIcon className="text-primary/50" />
        {row.original.meetingCount}{" "}
        {row.original.meetingCount === 1 ? "meeting" : "meetings"}
      </Badge>
    ),
  },
];
