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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { fetchData, updateData } from "./api";
import { Penganggaran } from "./types";
import React from "react";

export default function Component() {
  const [data, setData] = useState<Penganggaran[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [changedItems, setChangedItems] = useState<{ [key: string]: boolean }>(
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

  const handleStatusChange = (itemId: string, checked: boolean) => {
    setData((prevData) =>
      prevData.map((penganggaran) => ({
        ...penganggaran,
        sub_penganggaran: penganggaran.sub_penganggaran.map((sub) => ({
          ...sub,
          item_sub_penganggaran: sub.item_sub_penganggaran.map((itemSub) => ({
            ...itemSub,
            item_penganggaran: itemSub.item_penganggaran.map((item) =>
              item.id === itemId ? { ...item, progres: checked } : item
            ),
          })),
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
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Penganggaran</CardTitle>
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
        <Table>
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
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  <Button variant="ghost" disabled>
                    <Loader2 className="animate-spin h-5 w-5 mr-3" />
                    Loading...
                  </Button>
                </TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  <div className="text-red-500">{error}</div>
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              !error &&
              data.map((penganggaran) => (
                <React.Fragment key={penganggaran.id}>
                  <TableRow className="bg-gray-100">
                    <TableCell>
                      <strong>{penganggaran.nama_penganggaran}</strong>
                    </TableCell>
                    <TableCell>{penganggaran.target}%</TableCell>
                    <TableCell>{penganggaran.progres}%</TableCell>
                    <TableCell></TableCell>
                    <TableCell>{penganggaran.status}</TableCell>
                    <TableCell>
                      {penganggaran.tanggal_lapor
                        ? new Date(
                            penganggaran.tanggal_lapor
                          ).toLocaleDateString()
                        : ""}
                    </TableCell>
                    <TableCell>
                      {penganggaran.tanggal_verifikasi
                        ? new Date(
                            penganggaran.tanggal_verifikasi
                          ).toLocaleDateString()
                        : ""}
                    </TableCell>
                    <TableCell>{penganggaran.keterangan}</TableCell>
                  </TableRow>
                  {penganggaran.sub_penganggaran.map((sub) => (
                    <React.Fragment key={sub.id}>
                      <TableRow className="bg-gray-100">
                        <TableCell className="pl-8">
                          <em>{sub.nama_sub_penganggaran}</em>
                        </TableCell>
                        <TableCell>{sub.target}%</TableCell>
                        <TableCell>{sub.progres}%</TableCell>
                        <TableCell></TableCell>
                        <TableCell>{sub.status}</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      {sub.item_sub_penganggaran.map((itemSub) => (
                        <React.Fragment key={itemSub.id}>
                          <TableRow className="bg-yellow-100">
                            <TableCell className="pl-16">
                              <em>{itemSub.nama_item_sub_penganggaran}</em>
                            </TableCell>
                            <TableCell>{itemSub.target}%</TableCell>
                            <TableCell>{itemSub.progres}%</TableCell>
                            <TableCell></TableCell>
                            <TableCell>{itemSub.status}</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                          {itemSub.item_penganggaran.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="pl-24">
                                {item.nama_item}
                              </TableCell>
                              <TableCell></TableCell>
                              <TableCell>
                                <input
                                  type="checkbox"
                                  checked={item.progres}
                                  onChange={(e) =>
                                    handleStatusChange(
                                      item.id,
                                      e.target.checked
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>{item.instansi}</TableCell>
                              <TableCell>{item.status}</TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          ))}
                        </React.Fragment>
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
}
