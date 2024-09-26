import { Perencanaan } from "./types";

export const fetchData = async (): Promise<Perencanaan[]> => {
  const response = await fetch("/api/perencanaan");
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  const result = await response.json();
  if (Array.isArray(result)) {
    return result;
  } else {
    throw new Error("Wrong data format");
  }
};

// update value progress itemsubperencanaan
export const updateData = async (id: string, progres: boolean) => {
  await fetch("/api/perencanaan", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, progres }),
  });
};
