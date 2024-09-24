"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define types for the data based on the API response
interface ItemSubPerencanaan {
  id: number;
  nama_item: string;
  target: number;
  progres: number;
  penanggung_jawab: string;
}

interface SubPerencanaan {
  id: number;
  nama_sub_perencanaan: string;
  target: number;
  progres: number;
  item_sub_perencanaan: ItemSubPerencanaan[];
}

interface Perencanaan {
  id: number;
  nama_perencanaan: string;
  target: number;
  progres: number;
  status: string;
  tanggal_lapor: string | null;
  tanggal_verifikasi: string | null;
  keterangan: string | null;
  sub_perencanaan: SubPerencanaan[];
}

const NestedTable = () => {
  const [data, setData] = useState<Perencanaan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/perencanaan");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        if (Array.isArray(result)) {
          setData(result);
        } else {
          setError("Data is not in the correct format.");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>PERENCANAAN</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PERENCANAAN</TableHead>
              <TableHead>TARGET</TableHead>
              <TableHead>PROGRES</TableHead>
              <TableHead>PENANGGUNG JAWAB</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>TANGGAL LAPOR</TableHead>
              <TableHead>TANGGAL VERIFIKASI</TableHead>
              <TableHead>KETERANGAN</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((perencanaan) => (
              <>
                <TableRow key={perencanaan.id}>
                  <TableCell>
                    <div className="font-bold">
                      {perencanaan.nama_perencanaan}
                    </div>
                  </TableCell>
                  <TableCell>{perencanaan.target}</TableCell>
                  <TableCell>{perencanaan.progres}%</TableCell>
                  <TableCell />
                  <TableCell>
                    <Badge
                      color={perencanaan.progres === 100 ? "success" : "danger"}
                    >
                      {perencanaan.progres === 100
                        ? "Completed"
                        : "In Progress"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {perencanaan.tanggal_lapor
                      ? new Date(perencanaan.tanggal_lapor).toLocaleDateString(
                          "id-ID"
                        )
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {perencanaan.tanggal_verifikasi
                      ? new Date(
                          perencanaan.tanggal_verifikasi
                        ).toLocaleDateString("id-ID")
                      : "-"}
                  </TableCell>
                  <TableCell>{perencanaan.keterangan || "-"}</TableCell>
                </TableRow>
                {perencanaan.sub_perencanaan.map((sub) => (
                  <>
                    <TableRow key={sub.id}>
                      <TableCell className="pl-8">
                        <div className="font-medium">
                          {sub.nama_sub_perencanaan}
                        </div>
                      </TableCell>
                      <TableCell>{sub.target}</TableCell>
                      <TableCell>{sub.progres}%</TableCell>
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell />
                    </TableRow>
                    {sub.item_sub_perencanaan.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="pl-16">
                          {item.nama_item}
                        </TableCell>
                        <TableCell>{item.target}</TableCell>
                        <TableCell>{item.progres}%</TableCell>
                        <TableCell>{item.penanggung_jawab}</TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                      </TableRow>
                    ))}
                  </>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default NestedTable;
