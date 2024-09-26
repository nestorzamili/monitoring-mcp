import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import cache from "@/lib/cache";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        const cacheKey = "allPenganggaran";
        let allPenganggaran = cache.get(cacheKey);

        if (!allPenganggaran) {
          allPenganggaran = await prisma.penganggaran.findMany({
            include: {
              sub_penganggaran: {
                include: {
                  item_sub_penganggaran: {
                    include: {
                      item_penganggaran: true,
                    },
                    orderBy: { id: "asc" },
                  },
                },
                orderBy: { id: "asc" },
              },
            },
            orderBy: { id: "asc" },
          });
          cache.set(cacheKey, allPenganggaran);
        }

        return res.status(200).json(allPenganggaran);

      case "PUT":
        const { id, progres: updatedProgres } = req.body;

        const updatedItem = await prisma.itemPenganggaran.update({
          where: { id },
          data: { progres: updatedProgres },
        });

        const ItemSubPenganggaranId = updatedItem.ItemSubPenganggaranId;

        const countTrueProgres = await prisma.itemPenganggaran.count({
          where: {
            ItemSubPenganggaranId,
            progres: true,
          },
        });

        const totalItems = await prisma.itemPenganggaran.count({
          where: { ItemSubPenganggaranId },
        });

        const ItemSubPenganggaran = await prisma.itemSubPenganggaran.findUnique(
          {
            where: { id: ItemSubPenganggaranId },
            select: { target: true, SubPenganggaranId: true },
          }
        );

        if (!ItemSubPenganggaran) {
          return res
            .status(404)
            .json({ error: "ItemSubPenganggaran not found" });
        }

        const newProgres =
          (countTrueProgres * ItemSubPenganggaran.target) / totalItems;

        await prisma.itemSubPenganggaran.update({
          where: { id: ItemSubPenganggaranId },
          data: { progres: newProgres },
        });

        const SubPenganggaranId = ItemSubPenganggaran.SubPenganggaranId;

        const sumItemSubProgres = await prisma.itemSubPenganggaran.aggregate({
          where: { SubPenganggaranId },
          _sum: { progres: true },
        });

        const SubPenganggaran = await prisma.subPenganggaran.findUnique({
          where: { id: SubPenganggaranId },
          select: { target: true, penganggaranId: true },
        });

        if (!SubPenganggaran) {
          return res.status(404).json({ error: "SubPenganggaran not found" });
        }

        const totalProgresItem = sumItemSubProgres._sum.progres || 0;
        const targetSubPenganggaran = SubPenganggaran.target;

        const newSubPenganggaranProgres =
          (totalProgresItem / 100) * targetSubPenganggaran;

        await prisma.subPenganggaran.update({
          where: { id: SubPenganggaranId },
          data: { progres: newSubPenganggaranProgres },
        });

        const penganggaranId = SubPenganggaran.penganggaranId;

        const sumSubPenganggaranProgres =
          await prisma.subPenganggaran.aggregate({
            where: { penganggaranId },
            _sum: { progres: true },
          });

        const Penganggaran = await prisma.penganggaran.findUnique({
          where: { id: penganggaranId },
          select: { target: true },
        });

        if (!Penganggaran) {
          return res.status(404).json({ error: "Penganggaran not found" });
        }

        const totalProgresSubPenganggaran =
          sumSubPenganggaranProgres._sum.progres || 0;
        const targetPenganggaran = Penganggaran.target;

        const newPenganggaranProgres =
          (totalProgresSubPenganggaran / 100) * targetPenganggaran;

        await prisma.penganggaran.update({
          where: { id: penganggaranId },
          data: { progres: newPenganggaranProgres },
        });

        cache.flushAll();

        return res.status(204).end();

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
