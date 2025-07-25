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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UseConfirm } from "../../hooks/use-confirm";
import MeetingIdViewHeader from "./meeting-id-view-header";
import UpdateMeetingDialog from "./update-meeting-dialog";
import { UpcomingState } from "./upcoming-state";
import { ActiveState } from "./active-state";
import { CanceledState } from "./canceled-state";
import { ProcessingState } from "./processing-state";
import { CompletedState } from "./completed-state";

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
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({}),
        );
        await queryClient.invalidateQueries(
          trpc.premium.getFreeUsage.queryOptions(),
        );
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);

        if (error.data?.code === "FORBIDDEN") {
          router.push("/upgrade");
        }
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

  const isActive = data.status === "active";
  const isCompleted = data.status === "completed";
  const isUpcoming = data.status === "upcoming";
  const isProcessing = data.status === "processing";
  const isCanceled = data.status === "canceled";

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

        {isCanceled && <CanceledState />}
        {isUpcoming && <UpcomingState meetingId={meetingId} />}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isProcessing && <ProcessingState />}
        {isCompleted && <CompletedState data={data} />}
      </div>
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
