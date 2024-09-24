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

      // Handle POST Request: Menambahkan data perencanaan baru
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

      // Handle PUT Request: Update data perencanaan berdasarkan ID
      case "PUT":
        const { id, updatedData } = req.body;
        const updatedPerencanaan = await prisma.perencanaan.update({
          where: { id: Number(id) },
          data: updatedData,
        });
        return res.status(200).json(updatedPerencanaan);

      // Handle DELETE Request: Hapus perencanaan berdasarkan ID
      case "DELETE":
        const { id: deleteId } = req.body;
        await prisma.perencanaan.delete({
          where: { id: Number(deleteId) },
        });
        return res.status(204).end();

      // Jika method tidak di-support
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
