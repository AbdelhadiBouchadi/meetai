import EmptyState from "@/components/shared/empty-state";

export const ProcessingState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-white px-4 py-5">
      <EmptyState
        image="/processing.svg"
        title="Meeting is completed"
        description="This meeting was completed, a summary will appear here soon"
      />
    </div>
  );
};
