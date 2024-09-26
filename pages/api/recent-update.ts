import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const lastFiveItemSubPerencanaan =
        await prisma.itemSubPerencanaan.findMany({
          orderBy: {
            updated_at: "desc",
          },
          take: 3,
          select: {
            nama_item: true,
            progres: true,
            updated_at: true,
          },
        });

      const lastFiveItemPenganggaran = await prisma.itemPenganggaran.findMany({
        orderBy: {
          updated_at: "desc",
        },
        take: 3,
        select: {
          nama_item: true,
          progres: true,
          updated_at: true,
        },
      });

      const combinedItems = [
        ...lastFiveItemSubPerencanaan,
        ...lastFiveItemPenganggaran,
      ];

      const sortedCombinedItems = combinedItems.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );

      sortedCombinedItems.splice(5);

      res.status(200).json(sortedCombinedItems);
    } catch (error) {
      res.status(500).json({ error: "Terjadi kesalahan saat mengambil data" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
