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
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Perencanaan } from "./types";
import { fetchData, updateData } from "./api";

const PerencanaanTable = () => {
  const [data, setData] = useState<Perencanaan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [changedItems, setChangedItems] = useState<{ [key: number]: boolean }>(
    {}
  );

  const loadData = async () => {
    try {
      setLoading(true);
      const result = await fetchData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
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
    setChangedItems((prev) => ({ ...prev, [itemId]: checked }));
  };

  const syncChanges = async () => {
    try {
      setLoading(true);
      await Promise.all(
        Object.entries(changedItems).map(async ([id, progres]) => {
          await updateData(id, progres);
        })
      );
      setChangedItems({});
      await loadData(); // Reload data after sync
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Button variant="ghost" disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Mohon tunggu
        </Button>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-end space-y-2">
      <Button
        onClick={syncChanges}
        disabled={Object.keys(changedItems).length === 0}
      >
        SYNC
      </Button>
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
                  <TableHead key={head} className="font-semibold">
                    {head}
                  </TableHead>
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
                        ? new Date(
                            perencanaan.tanggal_lapor
                          ).toLocaleDateString("id-ID")
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
    </div>
  );
};

export default PerencanaanTable;
