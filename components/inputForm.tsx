import { Loader2, Plus, Send } from "lucide-react";
import React, { ChangeEvent, FormEvent, useState, useCallback } from "react";
import SelectedImages from "./selectedImages";
import { ChatRequestOptions } from "ai";

type Props = {
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  input: string;
  isLoading: boolean;
  stop: () => void;
};

const InputForm = ({
  handleInputChange,
  handleSubmit,
  input,
  isLoading,
  stop,
}: Props) => {
  const [images, setImages] = useState<string[]>([]);

  const handleImageSelection = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      const imagePromises = Array.from(files).map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) =>
            resolve(e.target?.result?.toString() as string);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      });

      try {
        const base64Strings = await Promise.all(imagePromises);
        setImages((prevImages) => [...prevImages, ...base64Strings]);
      } catch (error) {
        console.error("Error reading image:", error);
      }
    },
    []
  );

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    handleSubmit(event, {
      data: {
        images: JSON.stringify(images),
      },
    });
  };

  return (
    <div className="w-full mt-5 relative font-sans">
      <form
        onSubmit={handleFormSubmit}
        className="w-full flex flex-row gap-2 items-center h-full"
      >
        <div className="border flex flex-row relative rounded-md overflow-hidden">
          <Plus
            onClick={() => document.getElementById("fileInput")?.click()}
            className="cursor-pointer p-3 h-10 w-10 stroke-stone-500 hover:bg-gray-100 transition"
          />
          <SelectedImages images={images} setImages={setImages} />
        </div>
        <input
          className="hidden"
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageSelection}
        />
        <input
          type="text"
          placeholder={
            isLoading ? "Sabar yaaa . . ." : "Tanyain apapun disini . . "
          }
          value={input}
          disabled={isLoading}
          onChange={handleInputChange}
          className="border-b border-dashed outline-none w-full py-2 px-4 text-md text-[#0842A0] bg-gray-100 placeholder:text-[#0842A099] focus:placeholder-transparent disabled:bg-transparent rounded-md"
        />
        <button
          type="submit"
          className="rounded-full shadow-md border flex flex-row bg-blue-500 hover:bg-blue-600 transition text-white"
        >
          {isLoading ? (
            <Loader2 onClick={stop} className="p-3 h-10 w-10 animate-spin" />
          ) : (
            <Send className="p-3 h-10 w-10" />
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
