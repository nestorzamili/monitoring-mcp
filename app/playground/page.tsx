"use client";
import { useChat } from "ai/react";
import Messages from "@/components/messages";
import InputForm from "@/components/inputForm";

const Playground = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/gemini",
    });

  return (
    <main className="flex min-h-screen flex-col items-center p-12 text-lg">
      <InputForm
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
      />
      <Messages messages={messages} isLoading={isLoading} />
    </main>
  );
};

export default Playground;
