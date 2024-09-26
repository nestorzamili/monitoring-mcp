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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
          await updateData(Number(id), progres);
        })
      );
      setChangedItems({});
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Perencanaan</CardTitle>
        </div>
        <Button
          className="ml-auto gap-1"
          onClick={syncChanges}
          disabled={Object.keys(changedItems).length === 0}
        >
          SYNC
        </Button>
      </CardHeader>
      <CardContent>
        <Table className="w-full table-auto text-sm text-left text-gray-700">
          <TableHeader>
            <TableRow>
              {[
                "ITEM",
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
          {loading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  <Button variant="ghost" disabled>
                    <Loader2 className="animate-spin h-5 w-5 mr-3" />
                    Loading...
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : error ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  <div className="text-red-500">{error}</div>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
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
                        : ""}
                    </TableCell>
                    <TableCell>
                      {perencanaan.tanggal_verifikasi
                        ? new Date(
                            perencanaan.tanggal_verifikasi
                          ).toLocaleDateString("id-ID")
                        : ""}
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
          )}
        </Table>
      </CardContent>
    </Card>
  );
};

export default PerencanaanTable;
