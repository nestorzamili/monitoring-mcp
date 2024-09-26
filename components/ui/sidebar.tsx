"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { href: "/playground", label: "PLAYGROUND", icon: Home },
];

export default function Sidebar() {
  const currentPath = usePathname();
  return (
    <div className="sticky top-0 h-screen hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center justify-center px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="">MONITORING MCP</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start gap-1 px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${
                  currentPath === item.href
                    ? "bg-primary/10 text-primary font-semibold shadow-sm"
                    : "text-muted-foreground hover:bg-primary/5"
                } flex items-center gap-3 rounded-md px-3 py-2 transition-colors duration-200 hover:text-primary`}
              >
                <item.icon className="h-4 w-4" /> {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
          <Link
            href="https://nestorzamili.github.io"
            className="flex items-center gap-2"
          >
            <span className="text-xs">Build by Samunu</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
