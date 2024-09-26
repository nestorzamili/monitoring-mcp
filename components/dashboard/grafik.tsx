"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Loader2 } from "lucide-react";

export default function Component() {
  const [data, setData] = useState<{ name: string; progres: number }[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/total-progress");
        const result = await response.json();
        setData([
          { name: "Perencanaan", progres: result.perencanaanProgress },
          { name: "Penganggaran", progres: result.penganggaranProgress },
          { name: "Pengadaan Barang dan Jasa", progres: 10 },
          { name: "Pelayanan Publik", progres: 20 },
          { name: "Pengawasan APIP", progres: 30 },
          { name: "Manajemen ASN", progres: 40 },
          { name: "Pengelolaan BMD", progres: 10 },
          { name: "Optimalisasi Pajak", progres: 20 },
        ]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="space-y-0 pb-2">
        <CardTitle className="text-xl tabular-nums">Progress</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin" size={48} />
          </div>
        ) : (
          <ChartContainer
            config={{
              progres: { label: "Progress", color: "hsl(var(--chart-1))" },
            }}
          >
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 10, bottom: 100 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 15 }}
                  angle={-35}
                  textAnchor="end"
                  dy={5}
                />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Bar
                  dataKey="progres"
                  radius={5}
                  fill="var(--color-steps)"
                  fillOpacity={0.6}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={index}
                      fill={index === activeIndex ? "#e76e50" : "#ec8b73"}
                      fillOpacity={index === activeIndex ? 0.8 : 0.6}
                    />
                  ))}
                </Bar>
                <Tooltip
                  content={
                    <ChartTooltipContent
                      hideIndicator
                      labelFormatter={(value) => value}
                      formatter={(value) => `${value}%`}
                    />
                  }
                  cursor={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
