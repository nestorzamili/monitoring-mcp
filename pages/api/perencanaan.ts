import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Fetch all data from perencanaan including related tables
    const perencanaan = await prisma.perencanaan.findMany({
      include: {
        sub_perencanaan: {
          include: {
            dokumen: {
              include: {
                status_laporan: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(perencanaan);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
