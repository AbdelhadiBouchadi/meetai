"use client";

import { DataTable } from "@/components/shared/data-table";
import ErrorState from "@/components/shared/error-state";
import LoadingState from "@/components/shared/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { columns } from "./columns";
import EmptyState from "@/components/shared/empty-state";
import { useRouter } from "next/navigation";
import DataPagination from "@/components/shared/data-pagination";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";

const MeetingsView = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const [filters, setFilters] = useMeetingsFilters();
  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({ ...filters }),
  );

  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => {
          setFilters({ page });
        }}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Schedule a meeting to connect with others. Each meetings enables you to collaborate, share ideas, and interact with participants in real time"
        />
      )}
    </div>
  );
};

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="This may take a few seconds ..."
    />
  );
};

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meetings"
      description="An Error has occured while loading meetings !"
    />
  );
};

export default MeetingsView;
