"use client";

import { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define the type for the data
interface StatusLaporan {
  id: number;
  tanggal_lapor: string;
  tanggal_verifikasi: string;
  keterangan: string;
}

interface Dokumen {
  id: number;
  nama_dokumen: string;
  status: boolean;
  status_laporan: StatusLaporan[];
}

interface SubPerencanaan {
  id: number;
  nama_sub_perencanaan: string;
  progress: number;
  dokumen: Dokumen[];
}

interface Perencanaan {
  id: number;
  nama_perencanaan: string;
  total_progress: number;
  sub_perencanaan: SubPerencanaan[];
}

const formatDate = (dateStr: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Date(dateStr).toLocaleDateString("id-ID", options);
};

const ActionMenu = () => (
  <DropdownMenu>
    <Button variant="ghost" size="sm" aria-label="Actions">
      <MoreHorizontal />
    </Button>
    <DropdownMenuContent>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem>Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const DokumenRow = ({ dokumen }: { dokumen: Dokumen }) => (
  <>
    <TableRow key={dokumen.id}>
      <TableCell className="pl-16">
        <div className="text-md">{dokumen.nama_dokumen}</div>
      </TableCell>
      <TableCell></TableCell>
      <TableCell>
        <Badge color={dokumen.status ? "success" : "danger"}>
          {dokumen.status ? "Completed" : "Pending"}
        </Badge>
      </TableCell>
      <TableCell colSpan={5}></TableCell>
    </TableRow>
    {dokumen.status_laporan.map((laporan) => (
      <TableRow key={laporan.id}>
        <TableCell className="pl-16">{dokumen.nama_dokumen}</TableCell>
        <TableCell></TableCell>
        <TableCell>
          <Badge color={dokumen.status ? "success" : "danger"}>
            {dokumen.status ? "Completed" : "Pending"}
          </Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {formatDate(laporan.tanggal_lapor)}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {formatDate(laporan.tanggal_verifikasi)}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {laporan.keterangan}
        </TableCell>
        <TableCell>
          <ActionMenu />
        </TableCell>
      </TableRow>
    ))}
  </>
);

const SubPerencanaanRow = ({ sub }: { sub: SubPerencanaan }) => (
  <>
    <TableRow key={sub.id}>
      <TableCell className="pl-8">
        <div className="text-md">{sub.nama_sub_perencanaan}</div>
      </TableCell>
      <TableCell>{sub.progress}%</TableCell>
      <TableCell colSpan={6}></TableCell>
    </TableRow>
    {sub.dokumen.map((dokumen) => (
      <DokumenRow key={dokumen.id} dokumen={dokumen} />
    ))}
  </>
);

const PerencanaanRow = ({ perencanaan }: { perencanaan: Perencanaan }) => (
  <>
    <TableRow key={perencanaan.id}>
      <TableCell>
        <div className="text-md">{perencanaan.nama_perencanaan}</div>
      </TableCell>
      <TableCell>{perencanaan.total_progress}%</TableCell>
      <TableCell colSpan={6}></TableCell>
    </TableRow>
    {perencanaan.sub_perencanaan.map((sub) => (
      <SubPerencanaanRow key={sub.id} sub={sub} />
    ))}
  </>
);

export default function Component() {
  const [data, setData] = useState<Perencanaan[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/perencanaan");
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>PERENCANAAN</CardTitle>
        <CardDescription>
          Data perencanaan yang sudah diinputkan oleh user
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PERENCANAAN</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">
                Tanggal Lapor
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Tanggal Verifikasi
              </TableHead>
              <TableHead className="hidden md:table-cell">Keterangan</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((perencanaan) => (
              <PerencanaanRow key={perencanaan.id} perencanaan={perencanaan} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
