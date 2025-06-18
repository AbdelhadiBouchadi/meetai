"use client";

import ErrorState from "@/components/shared/error-state";
import LoadingState from "@/components/shared/loading-state";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import React, { useState } from "react";
import GeneratedAvatar from "@/components/shared/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UseConfirm } from "../../hooks/use-confirm";
import UpdateAgentDialog from "@/modules/agents/ui/update-agent-dialog";
import MeetingIdViewHeader from "./meeting-id-view-header";
import UpdateMeetingDialog from "./update-meeting-dialog";

type Props = {
  meetingId: string;
};

const MeetingIdView = ({ meetingId }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId }),
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        // TODO: Invalidate Free Tier
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const [RemoveConfirmation, confirmRemove] = UseConfirm(
    "Are you sure?",
    `The following action will remove ${data.name} and associated data forever`,
    "destructive",
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeMeeting.mutateAsync({ id: meetingId });
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />

      <div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => {
            setUpdateMeetingDialogOpen(true);
          }}
          onRemove={handleRemoveMeeting}
        />

        <div className="rounded-lg border bg-white">
          <div className="col-span-5 flex flex-col gap-y-5 px-4 py-5">
            <div className="flex items-center gap-x-3">
              <GeneratedAvatar
                variant="botttsneutral"
                seed={data.agent.name}
                className="size-10"
              />
              <h2 className="text-2xl font-medium">{data.name}</h2>
            </div>
            {/* <Badge
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
            </div> */}
          </div>
        </div>
      </div>
      {JSON.stringify(data)}
    </>
  );
};

export const MeetingIdLoading = () => {
  return (
    <LoadingState
      title="Loading Agent"
      description="This may take a few seconds ..."
    />
  );
};

export const MeetingIdError = () => {
  return (
    <ErrorState
      title="Error Loading Agent"
      description="An Error has occured while loading agent !"
    />
  );
};

export default MeetingIdView;
