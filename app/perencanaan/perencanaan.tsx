"use client";

import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>PERENCANAAN</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PERENCANAAN</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="hidden md:table-cell">Instansi</TableHead>
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
            {/* Nested row */}
            <TableRow>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div>
                    <div className="text-sm font-semibold">Perencanaan 1</div>
                    <div className="text-xs text-muted-foreground">
                      1234567890
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge color="success">100%</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">Instansi 1</TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge color="success">Selesai</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">2021-01-01</TableCell>
              <TableCell className="hidden md:table-cell">2021-01-01</TableCell>
              <TableCell className="hidden md:table-cell">
                Keterangan 1
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="sm" aria-label="Actions">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
