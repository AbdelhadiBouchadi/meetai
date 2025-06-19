import EmptyState from "@/components/shared/empty-state";

export const CanceledState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-white px-4 py-5">
      <EmptyState
        image="/cancelled.svg"
        title="Meeting is cancelled"
        description="This meeting was cancelled"
      />
    </div>
  );
};
