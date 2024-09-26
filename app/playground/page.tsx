"use client";

import { useState, FormEvent } from "react";
import { CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  sender: "user" | "bot";
  text: string;
  isMarkdown?: boolean;
}

const Playground: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showChatPrompt, setShowChatPrompt] = useState<boolean>(true);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: message },
    ]);

    setIsLoading(true);
    setMessage("");
    setShowChatPrompt(false);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: data.response, isMarkdown: true },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 mx-4 my-2 rounded-lg shadow">
            {showChatPrompt && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-lg font-semibold">
                    Welcome to the chatbot playground!
                  </p>
                  <p className="text-gray-600">
                    Type a message below to start chatting with the bot.
                  </p>
                </div>
              </div>
            )}
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={msg.sender === "user" ? "text-right" : "text-left"}
                >
                  <div
                    className={`inline-block rounded-lg p-3 ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {msg.isMarkdown ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text}
                      </ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="sticky bottom-0 bg-white shadow p-4">
            <form onSubmit={handleSubmit} className="flex">
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="min-h-20 resize-none border border-gray-300 rounded-md flex-1 p-3 mr-2"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="sm"
                className="flex-shrink-0"
                disabled={isLoading || !message.trim()}
              >
                {isLoading ? "Sending..." : <CornerDownLeft />}
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Playground;
