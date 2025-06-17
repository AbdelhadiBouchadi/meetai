"use client";

import ErrorState from "@/components/shared/error-state";
import LoadingState from "@/components/shared/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import AgentIdViewHeader from "./agent-id-view-header";
import GeneratedAvatar from "@/components/shared/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";

type Props = {
  agentId: string;
};

const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  );

  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
      <AgentIdViewHeader
        agentId={agentId}
        agentName={data.name}
        onEdit={() => {}}
        onRemove={() => {}}
      />

      <div className="rounded-lg border bg-white">
        <div className="col-span-5 flex flex-col gap-y-5 px-4 py-5">
          <div className="flex items-center gap-x-3">
            <GeneratedAvatar
              variant="botttsneutral"
              seed={data.name}
              className="size-10"
            />
            <h2 className="text-2xl font-medium">{data.name}</h2>
          </div>
          <Badge
            variant="outline"
            className="flex items-center gap-x-2 py-2 [&>svg]:size-4"
          >
            <VideoIcon className="text-primary/50" />
            {data.meetingCount}{" "}
            {data.meetingCount === 1 ? "meeting" : "meetings"}
          </Badge>
          <div className="flex flex-col gap-y-4">
            <p className="text-lg font-medium">Insctruction</p>
            <p className="text-neutral-800">{data.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AgentIdLoading = () => {
  return (
    <LoadingState
      title="Loading Agent"
      description="This may take a few seconds ..."
    />
  );
};

export const AgentIdError = () => {
  return (
    <ErrorState
      title="Error Loading Agent"
      description="An Error has occured while loading agent !"
    />
  );
};

export default AgentIdView;
