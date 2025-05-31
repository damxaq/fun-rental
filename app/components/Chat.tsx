"use client";
import { RealtimeChat } from "@/components/realtime-chat";
import { addMessage } from "../actions";
import { ChatMessage } from "@/hooks/use-realtime-chat";

type ChatProps = {
  id: string;
  userName: string;
  messages?: any[];
};

export function Chat({ id, userName, messages }: ChatProps) {
  messages = messages?.map(({ userName, ...message }) => ({
    ...message,
    user: { name: userName },
  })) as ChatMessage[];

  const handleMessage = (messages: ChatMessage) => {
    console.log(messages);
    addMessage(messages, id);
  };
  return (
    <div
      className="w-full h-[300px] md:h-[600px] px-4 border-2 rounded-md shadow-gray-300 shadow-md mx-auto md:mx-6 mt-5
md:mt-0 flex"
    >
      <div className="flex h-full w-full">
        <RealtimeChat
          roomName={id}
          username={userName}
          onMessage={handleMessage}
          messages={messages}
        />
      </div>
    </div>
  );
}
