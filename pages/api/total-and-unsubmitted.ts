import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import cache from "@/lib/cache"; // Extract cache to external file for consistency

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const cacheKey = "totalAndUnsubmitted";
      let cachedData = cache.get(cacheKey);

      if (!cachedData) {
        // Aggregating progress sum and unsubmitted counts for perencanaan
        const perencanaanProgressSum = await prisma.perencanaan.aggregate({
          _sum: {
            progres: true,
          },
        });
        const perencanaanUnsubmittedCount =
          await prisma.itemSubPerencanaan.count({
            where: {
              progres: false,
            },
          });

        // Aggregating progress sum and unsubmitted counts for penganggaran
        const penganggaranProgressSum = await prisma.penganggaran.aggregate({
          _sum: {
            progres: true,
          },
        });
        const penganggaranUnsubmittedCount =
          await prisma.itemPenganggaran.count({
            where: {
              progres: false,
            },
          });

        // Prepare the response data
        cachedData = {
          perencanaanProgress: perencanaanProgressSum._sum.progres || 0,
          perencanaanUnsubmitted: perencanaanUnsubmittedCount,
          penganggaranProgress: penganggaranProgressSum._sum.progres || 0,
          penganggaranUnsubmitted: penganggaranUnsubmittedCount,
        };

        // Store the result in cache
        cache.set(cacheKey, cachedData);
      }

      return res.status(200).json(cachedData);
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
