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
    <div className="h-full">
      <RealtimeChat
        roomName={id}
        username={userName}
        onMessage={handleMessage}
        messages={messages}
      />
    </div>
  );
}
