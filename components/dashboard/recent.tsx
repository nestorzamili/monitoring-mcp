"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Update {
  nama_item: string;
  progres: boolean;
  updated_at: string;
}

export default function RecentUpdates() {
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    async function fetchUpdates() {
      const response = await fetch("/api/recent-update");
      const data = await response.json();
      setUpdates(data);
    }

    fetchUpdates();
  }, []);

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Terakhir di update</CardTitle>
          <CardDescription>Dokumen terakhir yang di update</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead className="text-right">Tanggal Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {updates.map((update, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{update.nama_item}</div>
                </TableCell>
                <TableCell className="text-right">
                  {new Date(update.updated_at).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
