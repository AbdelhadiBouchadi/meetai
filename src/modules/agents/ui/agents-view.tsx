"use client";

import ErrorState from "@/components/shared/error-state";
import LoadingState from "@/components/shared/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import EmptyState from "@/components/shared/empty-state";
import { useAgentsFilters } from "../hooks/use-agents-filters";
import DataPagination from "./data-pagination";
import { useRouter } from "next/navigation";

const AgentsView = () => {
  const trpc = useTRPC();
  const [filters, setFilters] = useAgentsFilters();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters }),
  );
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8">
      <DataTable
        columns={columns}
        data={data.items}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call"
        />
      )}
    </div>
  );
};

export const AgentViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take a few seconds ..."
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="An Error has occured while loading agents !"
    />
  );
};

export default AgentsView;
