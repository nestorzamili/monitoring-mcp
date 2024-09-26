import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        const allPenganggaran = await prisma.penganggaran.findMany({
          include: {
            sub_penganggaran: {
              include: {
                item_sub_penganggaran: {
                  include: {
                    item_penganggaran: true,
                  },
                },
              },
            },
          },
        });
        return res.status(200).json(allPenganggaran);

      case "PUT":
        const { id, progres: updatedProgres } = req.body;

        // Update progres ItemPenganggaran
        const updatedItem = await prisma.itemPenganggaran.update({
          where: { id: id },
          data: { progres: updatedProgres },
        });

        // Update progres ItemSubPenganggaran
        const ItemSubPenganggaranId = updatedItem.ItemSubPenganggaranId;

        const countTrueProgres = await prisma.itemPenganggaran.count({
          where: {
            ItemSubPenganggaranId: ItemSubPenganggaranId,
            progres: true,
          },
        });

        const totalItems = await prisma.itemPenganggaran.count({
          where: {
            ItemSubPenganggaranId: ItemSubPenganggaranId,
          },
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

        // Update progres SubPenganggaran
        const SubPenganggaranId = ItemSubPenganggaran.SubPenganggaranId;

        // Menghitung total progres dari semua ItemSubPenganggaran yang terkait
        const sumItemSubProgres = await prisma.itemSubPenganggaran.aggregate({
          where: {
            SubPenganggaranId: SubPenganggaranId,
          },
          _sum: {
            progres: true, // Mengambil total progres dari kolom progres
          },
        });

        const SubPenganggaran = await prisma.subPenganggaran.findUnique({
          where: { id: SubPenganggaranId },
          select: { target: true, penganggaranId: true }, // Mengambil target dan penganggaranId dari SubPenganggaran
        });

        if (!SubPenganggaran) {
          return res.status(404).json({ error: "SubPenganggaran not found" });
        }

        // Total progres dari semua item
        const totalProgresItem = sumItemSubProgres._sum.progres || 0;

        // Nilai target dari SubPenganggaran
        const targetSubPenganggaran = SubPenganggaran.target;

        // Hitung progres baru untuk SubPenganggaran
        // Nilai progres baru proporsional terhadap target berdasarkan total progres item (maksimal 100)
        const newSubPenganggaranProgres =
          (totalProgresItem / 100) * targetSubPenganggaran;

        // Update progres SubPenganggaran dengan nilai yang dihitung
        await prisma.subPenganggaran.update({
          where: { id: SubPenganggaranId },
          data: { progres: newSubPenganggaranProgres },
        });

        // Update progres Penganggaran
        const penganggaranId = SubPenganggaran.penganggaranId; // Mengambil penganggaranId dari SubPenganggaran

        // Menghitung total progres dari semua SubPenganggaran yang terkait
        const sumSubPenganggaranProgres =
          await prisma.subPenganggaran.aggregate({
            where: {
              penganggaranId: penganggaranId,
            },
            _sum: {
              progres: true, // Mengambil total progres dari kolom progres
            },
          });

        const Penganggaran = await prisma.penganggaran.findUnique({
          where: { id: penganggaranId },
          select: { target: true }, // Mengambil target dari Penganggaran
        });

        if (!Penganggaran) {
          return res.status(404).json({ error: "Penganggaran not found" });
        }

        // Total progres dari semua SubPenganggaran
        const totalProgresSubPenganggaran =
          sumSubPenganggaranProgres._sum.progres || 0;

        // Nilai target dari Penganggaran
        const targetPenganggaran = Penganggaran.target;

        // Hitung progres baru untuk Penganggaran
        // Nilai progres baru proporsional terhadap target berdasarkan total progres SubPenganggaran (maksimal 100)
        const newPenganggaranProgres =
          (totalProgresSubPenganggaran / 100) * targetPenganggaran;

        // Update progres Penganggaran dengan nilai yang dihitung
        await prisma.penganggaran.update({
          where: { id: penganggaranId },
          data: { progres: newPenganggaranProgres },
        });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
