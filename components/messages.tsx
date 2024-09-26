import React from "react";
import Markdown from "./markdown";
import { Bot, User2 } from "lucide-react";
import { Message } from "ai/react";

type Props = {
  messages: Message[];
  isLoading: boolean;
};

const Messages = ({ messages, isLoading }: Props) => {
  return (
    <div id="chatbox" className="flex flex-col-reverse w-full mt-4 gap-4">
      {messages.map((m, index) => (
        <div
          key={index}
          className={`relative p-4 shadow-md rounded-lg max-w-[75%] ${
            m.role === "user" ? "ml-auto bg-blue-100" : "mr-auto bg-gray-100"
          }`}
        >
          <div className="flex gap-2 items-start">
            {m.role === "user" ? (
              <User2 className="w-6 h-6 text-blue-500" />
            ) : (
              <Bot
                className={`w-6 h-6 text-[#0842A0] ${
                  isLoading && index === messages.length - 1
                    ? "animate-bounce"
                    : ""
                }`}
              />
            )}
            <div className="flex-1 text-sm">
              {" "}
              <Markdown text={m.content} />
            </div>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex items-center gap-2 p-4 rounded-lg shadow-md bg-gray-100 max-w-[75%] mr-auto">
          <Bot className="w-6 h-6 text-[#0842A0] animate-bounce" />
          <div className="flex-1 text-sm text-gray-500">
            AI-nya lagi ngetik ya gaes, sabar...
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
