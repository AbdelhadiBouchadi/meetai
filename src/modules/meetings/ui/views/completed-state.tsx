import React from "react";
import { MeetingGetOne } from "../../types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  BookOpenTextIcon,
  ClockFadingIcon,
  FileTextIcon,
  FileVideo2Icon,
  SparklesIcon,
} from "lucide-react";
import MarkDown from "react-markdown";
import Link from "next/link";
import GeneratedAvatar from "@/components/shared/generated-avatar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatDuration } from "@/lib/utils";
import { Transcript } from "../transcript";
import { ChatProvider } from "../chat-provider";

type Props = {
  data: MeetingGetOne;
};

export const CompletedState = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Tabs defaultValue="summary">
        <div className="rounded-lg border bg-white px-3">
          <ScrollArea>
            <TabsList className="bg-background h-13 justify-start rounded-none p-0">
              <TabsTrigger
                value="summary"
                className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-primary hover:text-primary/80 h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none"
              >
                <BookOpenTextIcon />
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="transcript"
                className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-primary hover:text-primary/80 h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none"
              >
                <FileTextIcon />
                Transcript
              </TabsTrigger>
              <TabsTrigger
                value="recording"
                className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-primary hover:text-primary/80 h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none"
              >
                <FileVideo2Icon />
                Recording
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-primary hover:text-primary/80 h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none"
              >
                <SparklesIcon />
                Ask AI
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <TabsContent value="summary">
          <div className="rounded-lg border bg-white px-4 py-5">
            <div className="col-span-5 flex flex-col gap-y-5 px-4 py-5">
              <h2 className="text-2xl font-medium capitalize">{data.name}</h2>
              <div className="flex items-center gap-x-2">
                <Link
                  href={`/agents/${data.agentId}`}
                  className="flex items-center gap-x-2 capitalize underline underline-offset-4"
                >
                  <GeneratedAvatar
                    seed={data.agent.name}
                    variant="botttsneutral"
                    className="size-5"
                  />
                  {data.agent.name}
                </Link>

                <p>{data.startedAt ? format(data.startedAt, "PPP") : ""}</p>
              </div>
              <div className="flex items-center gap-x-2">
                <SparklesIcon className="size-4" />
                <p>General Summary</p>
              </div>

              <Badge
                variant="outline"
                className="flex items-center gap-x-2 py-2 [&>svg]:size-5"
              >
                <ClockFadingIcon className="text-primary" />
                <p className="text-primary text-base">
                  {data.duration
                    ? formatDuration(data.duration)
                    : "No Duration"}
                </p>
              </Badge>
              <div>
                <MarkDown
                  components={{
                    h1: (props) => (
                      <h1 {...props} className="mb-6 text-2xl font-medium" />
                    ),
                    h2: (props) => (
                      <h2 {...props} className="mb-6 text-xl font-medium" />
                    ),
                    h3: (props) => (
                      <h3 {...props} className="mb-6 text-lg font-medium" />
                    ),
                    h4: (props) => (
                      <h4 {...props} className="mb-6 text-base font-medium" />
                    ),
                    p: (props) => (
                      <p {...props} className="mb-6 leading-relaxed" />
                    ),
                    ul: (props) => (
                      <ul {...props} className="mb-6 list-inside list-disc" />
                    ),
                    ol: (props) => (
                      <ol
                        {...props}
                        className="mb-6 list-inside list-decimal"
                      />
                    ),
                    li: (props) => <li {...props} className="mb-1" />,
                    strong: (props) => (
                      <strong {...props} className="font-semibold" />
                    ),
                    code: (props) => (
                      <code
                        {...props}
                        className="rounded bg-gray-100 px-1 py-0.5"
                      />
                    ),
                    blockquote: (props) => (
                      <blockquote
                        {...props}
                        className="my-4 border-l-4 pl-4 italic"
                      />
                    ),
                  }}
                >
                  {data.summary}
                </MarkDown>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="transcript">
          <Transcript meetingId={data.id} />
        </TabsContent>

        <TabsContent value="recording">
          <div className="rounded-lg border bg-white px-4 py-5">
            <video
              src={data.recordingUrl!}
              className="w-full rounded-lg"
              controls
            />
          </div>
        </TabsContent>
        <TabsContent value="chat">
          <ChatProvider meetingId={data.id} meetingName={data.name} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
