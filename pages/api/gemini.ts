import { StreamingTextResponse, GoogleGenerativeAIStream, Message } from "ai";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const reqBody = await req.json();
  const images: string[] = JSON.parse(reqBody.data.images);
  const imageParts = filesArrayToGenerativeParts(images);
  const messages: Message[] = reqBody.messages;

  const modelName = "gemini-1.5-flash";
  const promptWithParts =
    imageParts.length > 0
      ? [getLastUserMessage(messages), ...imageParts].filter(
          (part) => part !== undefined
        )
      : buildGoogleGenAIPrompt(messages);

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: modelName });

  const streamingResponse = await model.generateContentStream(promptWithParts);
  return new StreamingTextResponse(GoogleGenerativeAIStream(streamingResponse));
}

function getLastUserMessage(messages: Message[]): string | undefined {
  return messages.filter((message) => message.role === "user").pop()?.content;
}

function buildGoogleGenAIPrompt(messages: Message[]) {
  return {
    contents: messages
      .filter(
        (message) => message.role === "user" || message.role === "assistant"
      )
      .map((message) => ({
        role: message.role === "user" ? "user" : "model",
        parts: [{ text: message.content }],
      })),
  };
}

function filesArrayToGenerativeParts(images: string[]) {
  return images.map((imageData) => ({
    inlineData: {
      data: imageData.split(",")[1],
      mimeType: imageData.substring(
        imageData.indexOf(":") + 1,
        imageData.lastIndexOf(";")
      ),
    },
  }));
}

export default POST;
