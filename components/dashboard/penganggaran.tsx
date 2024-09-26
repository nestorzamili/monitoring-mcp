"use client";

import { useEffect, useState } from "react";
import { DollarSign, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Penganggaran() {
  const [data, setData] = useState({
    penganggaranProgress: 0,
    penganggaranUnsubmitted: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/total-and-unsubmitted");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Penganggaran</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        ) : (
          <>
            <div className="text-2xl font-bold">
              {data.penganggaranProgress}%
            </div>
            <p className="text-xs text-muted-foreground">
              {data.penganggaranUnsubmitted === 0 ? (
                "Semua item sudah di submit"
              ) : (
                <>
                  <span className="bg-yellow-100 text-black px-1 rounded">
                    {data.penganggaranUnsubmitted}
                  </span>{" "}
                  item belum di submit
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
