import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Aggregate the sum of the progress field in the perencanaan table and count of false in the ItemSubPerencanaan table
      const perencanaanProgressSum = await prisma.perencanaan.aggregate({
        _sum: {
          progres: true,
        },
      });
      const perencanaanUnsubmittedCount = await prisma.itemSubPerencanaan.count(
        {
          where: {
            progres: false,
          },
        }
      );

      // Aggregate the sum of the progress field in the penganggaran table and count of false in the ItemSubPenganggaran table
      const penganggaranProgressSum = await prisma.penganggaran.aggregate({
        _sum: {
          progres: true,
        },
      });
      const penganggaranUnsubmittedCount = await prisma.itemPenganggaran.count({
        where: {
          progres: false,
        },
      });

      res.status(200).json({
        perencanaanProgress: perencanaanProgressSum._sum.progres || 0,
        perencanaanUnsubmitted: perencanaanUnsubmittedCount,
        penganggaranProgress: penganggaranProgressSum._sum.progres || 0,
        penganggaranUnsubmitted: penganggaranUnsubmittedCount,
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
