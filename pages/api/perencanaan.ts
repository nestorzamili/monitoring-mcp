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

      case "POST":
        const {
          nama_perencanaan,
          target,
          progres,
          status,
          tanggal_lapor,
          tanggal_verifikasi,
          keterangan,
        } = req.body;
        const newPerencanaan = await prisma.perencanaan.create({
          data: {
            nama_perencanaan,
            target,
            progres,
            status,
            tanggal_lapor: tanggal_lapor ? new Date(tanggal_lapor) : null,
            tanggal_verifikasi: tanggal_verifikasi
              ? new Date(tanggal_verifikasi)
              : null,
            keterangan,
          },
        });
        return res.status(201).json(newPerencanaan);

      case "PUT":
        const { id, updatedData } = req.body;
        const updatedPerencanaan = await prisma.perencanaan.update({
          where: { id: id }, // Menggunakan id sebagai string
          data: updatedData,
        });
        return res.status(200).json(updatedPerencanaan);

      case "DELETE":
        const { id: deleteId } = req.body;
        await prisma.perencanaan.delete({
          where: { id: deleteId }, // Menggunakan id sebagai string
        });
        return res.status(204).end();

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
