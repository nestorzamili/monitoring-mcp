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
import { Loader2 } from "lucide-react"; // Assuming you have a loader component

interface Update {
  nama_item: string;
  progres: boolean;
  updated_at: string;
}

export default function RecentUpdates() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add isLoading state

  useEffect(() => {
    async function fetchUpdates() {
      try {
        const response = await fetch("/api/recent-update");
        const data = await response.json();
        setUpdates(data);
      } catch (error) {
        console.error("Failed to fetch updates:", error);
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched
      }
    }

    fetchUpdates();
  }, []);

  return (
    <Card className="md:col-span-1">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Terakhir di update</CardTitle>
          <CardDescription>Dokumen terakhir yang di update</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? ( // Show loader while fetching data
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
}
