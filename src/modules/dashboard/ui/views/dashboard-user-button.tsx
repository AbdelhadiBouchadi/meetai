"use client";

import GeneratedAvatar from "@/components/shared/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { ChevronsUpDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardUserButton = () => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const isMobile = useIsMobile();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  if (isPending || !data?.user) return null;

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="border-border/10 flex w-full cursor-pointer items-center justify-between gap-x-2 overflow-hidden rounded-lg border bg-white/5 p-3 hover:bg-white/10">
          {data.user.image ? (
            <Avatar>
              <AvatarImage src={data.user.image} />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={data.user.name}
              variant="initials"
              className="mr-3 size-9"
            />
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden text-left">
            <p className="w-full truncate text-sm font-semibold">
              {data.user.name}
            </p>
            <p className="w-full truncate text-sm">{data.user.email}</p>
          </div>
          <ChevronsUpDownIcon className="size-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent className="bg-sidebar-accent border border-[#5d6b68]">
          <DrawerHeader>
            <DrawerTitle className="text-white">{data.user.name}</DrawerTitle>
            <DrawerDescription>{data.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              variant="outline"
              onClick={() => authClient.customer.portal()}
            >
              <CreditCardIcon className="mr-2 size-4" />
              Billing
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                onLogout();
              }}
            >
              <LogOutIcon className="mr-2 size-4" />
              Sign Out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-border/10 flex w-full cursor-pointer items-center justify-between gap-x-2 overflow-hidden rounded-lg border bg-white/5 p-3 hover:bg-white/10">
        {data.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            variant="initials"
            className="mr-3 size-9"
          />
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden text-left">
          <p className="w-full truncate text-sm font-semibold">
            {data.user.name}
          </p>
          <p className="w-full truncate text-sm">{data.user.email}</p>
        </div>
        <ChevronsUpDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        side="top"
        className="bg-sidebar-accent/80 w-60 border border-[#5d6b68] text-white"
      >
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="truncate font-medium">{data.user.name}</span>
            <span className="text-muted-foreground truncate text-sm font-normal">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#5d6b68]" />
        <DropdownMenuItem
          className="group flex cursor-pointer items-center justify-between"
          onClick={() => authClient.customer.portal()}
        >
          Billing
          <CreditCardIcon className="group-hover:text-muted-foreground size-4 text-white" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="group flex cursor-pointer items-center justify-between"
          onClick={onLogout}
        >
          Sign Out
          <LogOutIcon className="group-hover:text-muted-foreground size-4 text-white" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardUserButton;
