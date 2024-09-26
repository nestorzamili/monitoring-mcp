import { Penganggaran } from "./types";

export const fetchData = async (): Promise<Penganggaran[]> => {
  const response = await fetch("/api/penganggaran");
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  const result = await response.json();
  if (Array.isArray(result)) {
    return result;
  } else {
    throw new Error("Wrong data format");
  }
};

// update value progress itemsubpenganggaran
export const updateData = async (id: number, progres: boolean) => {
  try {
    await fetch("/api/penganggaran", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, progres }),
    });
  } catch (err) {
    console.error("Failed to update data:", err);
  }
};
