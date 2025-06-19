import EmptyState from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { BanIcon, VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  meetingId: string;
  onCancelMeeting: () => void;
  isCanceling: boolean;
}

export const UpcomingState = ({
  meetingId,
  onCancelMeeting,
  isCanceling,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-white px-4 py-5">
      <EmptyState
        image="/upcoming.svg"
        title="Not started yet"
        description="Once you start this meeting, a summary will appear here"
      />

      <div className="flex w-full flex-col-reverse items-center gap-2 lg:flex-row lg:justify-center">
        <Button
          variant="destructive"
          className="w-full lg:w-auto"
          onClick={onCancelMeeting}
          disabled={isCanceling}
        >
          <BanIcon />
          Cancel meeting
        </Button>
        <Button asChild className="w-full lg:w-auto" disabled={isCanceling}>
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
