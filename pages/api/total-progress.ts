import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import cache from "@/lib/cache"; // Ekstraksi cache ke file terpisah untuk konsistensi

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const cacheKey = "totalProgress";
      let cachedData = cache.get(cacheKey);

      if (!cachedData) {
        // Agregasi progres dari perencanaan
        const perencanaanProgressSum = await prisma.perencanaan.aggregate({
          _sum: {
            progres: true,
          },
        });

        // Agregasi progres dari penganggaran
        const penganggaranProgressSum = await prisma.penganggaran.aggregate({
          _sum: {
            progres: true,
          },
        });

        // Membuat data yang akan disimpan ke cache
        cachedData = {
          perencanaanProgress: perencanaanProgressSum._sum.progres || 0,
          penganggaranProgress: penganggaranProgressSum._sum.progres || 0,
        };

        // Simpan data ke dalam cache
        cache.set(cacheKey, cachedData);
      }

      // Kembalikan respons dengan data yang sudah di-cache atau hasil query
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
