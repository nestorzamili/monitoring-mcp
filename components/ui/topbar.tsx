"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  Package,
  Users,
  ClipboardList,
  Shield,
  UserCheck,
  Box,
  DollarSign,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const navItems = [
  { href: "/", label: "DASHBOARD", icon: Home },
  { href: "/perencanaan", label: "PERENCANAAN", icon: ClipboardList },
  { href: "/penganggaran", label: "PENGANGGARAN", icon: DollarSign },
  {
    href: "/pengadaan-barang-dan-jasa",
    label: "PENGADAAN BARANG DAN JASA",
    icon: Package,
  },
  { href: "/pelayanan-publik", label: "PELAYANAN PUBLIK", icon: Users },
  { href: "/pengawasan-apip", label: "PENGAWASAN APIP", icon: Shield },
  { href: "/manajemen-asn", label: "MANAJEMEN ASN", icon: UserCheck },
  { href: "/pengelolaan-bmd", label: "PENGELOLAAN BMD", icon: Box },
  {
    href: "/optimalisasi-pajak",
    label: "OPTIMALISASI PAJAK",
    icon: DollarSign,
  },
];

export default function Topbar() {
  const currentPath = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Function to handle closing the sheet
  const closeSheet = () => setIsSheetOpen(false);

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-muted/40 backdrop-blur px-4 lg:h-[60px] lg:px-6">
      {/* Navigation Menu for Mobile */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
            onClick={() => setIsSheetOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-white">
          <nav className="grid gap-2 text-sm font-medium pt-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${
                  currentPath === item.href
                    ? "bg-primary/10 text-primary font-semibold shadow-sm"
                    : "text-muted-foreground hover:bg-primary/5"
                } flex items-center gap-3 rounded-md px-3 py-2 transition-colors duration-200 hover:text-primary`}
                onClick={closeSheet} // Close the sheet on click
              >
                <item.icon className="h-4 w-4" /> {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Search Bar */}
      <div className="flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari Data"
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <UserButton />
    </header>
  );
}
