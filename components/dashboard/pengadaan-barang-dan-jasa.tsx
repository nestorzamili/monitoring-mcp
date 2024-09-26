"use client";

import { Package } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PengadaanBarangDanJasa() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Pengadaan Barang dan Jasa
        </CardTitle>
        <Package className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">0%</div>
        <p className="text-xs text-muted-foreground">0 item belum di submit</p>
      </CardContent>
    </Card>
  );
}
