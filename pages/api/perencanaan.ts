import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        const allPerencanaan = await prisma.perencanaan.findMany({
          include: {
            sub_perencanaan: {
              include: {
                item_sub_perencanaan: true,
              },
            },
          },
        });
        return res.status(200).json(allPerencanaan);

      case "PUT":
        const { id, progres: updatedProgres } = req.body;

        const updatedItem = await prisma.itemSubPerencanaan.update({
          where: { id },
          data: { progres: updatedProgres },
        });

        const subPerencanaanId = updatedItem.subPerencanaanId;

        const countTrueProgres = await prisma.itemSubPerencanaan.count({
          where: {
            subPerencanaanId: subPerencanaanId,
            progres: true,
          },
        });

        const totalItems = await prisma.itemSubPerencanaan.count({
          where: {
            subPerencanaanId: subPerencanaanId,
          },
        });

        const subPerencanaan = await prisma.subPerencanaan.findUnique({
          where: { id: subPerencanaanId },
          select: { target: true, perencanaanId: true },
        });

        if (!subPerencanaan) {
          return res.status(404).json({ error: "SubPerencanaan not found" });
        }

        const newProgres =
          (countTrueProgres * subPerencanaan.target) / totalItems;

        await prisma.subPerencanaan.update({
          where: { id: subPerencanaanId },
          data: { progres: newProgres },
        });

        const perencanaanId = subPerencanaan.perencanaanId;

        const totalProgres = await prisma.subPerencanaan.aggregate({
          where: { perencanaanId: perencanaanId },
          _sum: { progres: true },
        });

        await prisma.perencanaan.update({
          where: { id: perencanaanId },
          data: { progres: totalProgres._sum.progres || 0 },
        });

        return res.status(204).end();

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Failed to process request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
