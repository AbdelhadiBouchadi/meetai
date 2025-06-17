import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  ChevronRightIcon,
  MoreVerticalIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  agentId: string;
  agentName: string;
  onEdit: () => void;
  onRemove: () => void;
};

const AgentIdViewHeader = ({ agentId, agentName, onEdit, onRemove }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="text-xl font-medium">
              <Link href={"/agents"}>My Agents</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-foreground text-xl font-medium [&>svg]:size-4">
            <ChevronRightIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              asChild
              className="text-foreground text-xl font-medium"
            >
              <Link href={`/agents/${agentId}`}>{agentName}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* Actions Dropdown menu */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onEdit} className="cursor-pointer gap-x-4">
            <PencilIcon className="size-4 text-green-800" />
            <span className="text-sm text-green-800">Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onRemove}
            className="cursor-pointer gap-x-4"
          >
            <Trash2Icon className="size-4 text-red-500" />
            <span className="text-sm text-red-500">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AgentIdViewHeader;
