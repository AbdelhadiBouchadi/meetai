"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { DEFAULT_PAGE } from "@/constants";
import NewMeetingDialog from "./new-meeting-dialog";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { SearchFilters } from "../meetings-search-filter";
import { StatusFilter } from "../status-filter";
import { AgentIdFilter } from "../agent-id-filter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const MeetingsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [filters, setFilters] = useMeetingsFilters();

  const isAnyFilterModified =
    !!filters.search || !!filters.status || filters.agentId;

  const onClearFilters = () => {
    setFilters({
      search: "",
      status: null,
      agentId: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="flex flex-col gap-y-4 px-4 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">My Meetings</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <SearchFilters />
            <StatusFilter />
            <AgentIdFilter />
            {isAnyFilterModified && (
              <Button variant="destructive" size="sm" onClick={onClearFilters}>
                <XCircleIcon />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default MeetingsListHeader;
