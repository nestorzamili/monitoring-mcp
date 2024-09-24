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
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

// Define types for the data based on the API response
interface ItemSubPerencanaan {
  id: number;
  nama_item: string;
  progres: boolean;
  status: string;
  instansi: string;
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
    const fetchData = async () => {
      try {
        const response = await fetch("/api/perencanaan");
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const result = await response.json();
        if (Array.isArray(result)) {
          setData(result);
        } else {
          setError("Wrong data format");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = (itemId: number, checked: boolean) => {
    setData((prevData) =>
      prevData.map((perencanaan) => ({
        ...perencanaan,
        sub_perencanaan: perencanaan.sub_perencanaan.map((sub) => ({
          ...sub,
          item_sub_perencanaan: sub.item_sub_perencanaan.map((item) =>
            item.id === itemId ? { ...item, progres: checked } : item
          ),
        })),
      }))
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card>
      <CardContent>
        <Table className="w-full table-auto text-sm text-left text-gray-700">
          <TableHeader>
            <TableRow>
              {[
                "PERENCANAAN",
                "TARGET",
                "PROGRES",
                "INSTANSI",
                "STATUS",
                "TANGGAL LAPOR",
                "TANGGAL VERIFIKASI",
                "KETERANGAN",
              ].map((head) => (
                <TableHead key={head}>{head}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((perencanaan) => (
              <React.Fragment key={perencanaan.id}>
                <TableRow>
                  <TableCell>
                    <strong>{perencanaan.nama_perencanaan}</strong>
                  </TableCell>
                  <TableCell>{perencanaan.target}%</TableCell>
                  <TableCell>{perencanaan.progres}%</TableCell>
                  <TableCell />
                  <TableCell>{perencanaan.status}</TableCell>
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
                  <TableCell>{perencanaan.keterangan}</TableCell>
                </TableRow>
                {perencanaan.sub_perencanaan.map((sub) => (
                  <React.Fragment key={sub.id}>
                    <TableRow>
                      <TableCell className="pl-8">
                        <em>{sub.nama_sub_perencanaan}</em>
                      </TableCell>
                      <TableCell>{sub.target}%</TableCell>
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
                        <TableCell />
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={item.progres}
                            onChange={(e) =>
                              handleStatusChange(item.id, e.target.checked)
                            }
                          />
                        </TableCell>
                        <TableCell>{item.instansi}</TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default NestedTable;
