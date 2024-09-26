import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const perencanaanProgressSum = await prisma.perencanaan.aggregate({
        _sum: {
          progres: true,
        },
      });

      const penganggaranProgressSum = await prisma.penganggaran.aggregate({
        _sum: {
          progres: true,
        },
      });

      res.status(200).json({
        perencanaanProgress: perencanaanProgressSum._sum.progres || 0,
        penganggaranProgress: penganggaranProgressSum._sum.progres || 0,
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
      res.status(500).json({ error: "Terjadi kesalahan saat mengambil data" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
