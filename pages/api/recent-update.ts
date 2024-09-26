import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import cache from "@/lib/cache";

interface Item {
  nama_item: string;
  progres: boolean;
  updated_at: Date;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const cacheKey = "recentUpdates";
      let sortedCombinedItems: Item[] | undefined = cache.get(cacheKey);

      if (!sortedCombinedItems) {
        const lastFiveItemSubPerencanaan =
          await prisma.itemSubPerencanaan.findMany({
            orderBy: { updated_at: "desc" },
            take: 6,
            select: {
              nama_item: true,
              progres: true,
              updated_at: true,
            },
          });

        const lastFiveItemPenganggaran = await prisma.itemPenganggaran.findMany(
          {
            orderBy: { updated_at: "desc" },
            take: 6,
            select: {
              nama_item: true,
              progres: true,
              updated_at: true,
            },
          }
        );

        const combinedItems: Item[] = [
          ...lastFiveItemSubPerencanaan,
          ...lastFiveItemPenganggaran,
        ];

        sortedCombinedItems = combinedItems.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );

        sortedCombinedItems.splice(6);

        cache.set(cacheKey, sortedCombinedItems);
      }

      return res.status(200).json(sortedCombinedItems);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil data" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
