"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { IUCNStatus } from "@/lib/types";
import { EXTINCTION_COLORS, STATUS_LABELS } from "@/lib/colors";
import { motion } from "framer-motion";

interface StatsChartProps {
  stats: Record<IUCNStatus, number>;
  selectedStatus: IUCNStatus | null;
  onStatusClick: (status: IUCNStatus | null) => void;
}

const STATUS_ORDER: IUCNStatus[] = ["LC", "NT", "VU", "EN", "CR", "EW", "EX"];

export default function StatsChart({
  stats,
  selectedStatus,
  onStatusClick,
}: StatsChartProps) {
  // Transform data for Recharts
  const chartData = STATUS_ORDER.map((status) => ({
    status,
    count: stats[status],
    label: STATUS_LABELS[status],
    color: EXTINCTION_COLORS[status],
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg p-3 shadow-xl">
          <p className="text-white font-semibold">{data.label}</p>
          <p className="text-white/80 text-sm">
            Count: <span className="font-bold">{data.count}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">
        Status Distribution
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333333" opacity={0.3} />
          <XAxis
            dataKey="status"
            stroke="#888888"
            tick={{ fill: "#ffffff", fontSize: 12 }}
            axisLine={{ stroke: "#444444" }}
          />
          <YAxis
            stroke="#888888"
            tick={{ fill: "#ffffff", fontSize: 12 }}
            axisLine={{ stroke: "#444444" }}
            label={{
              value: "Count",
              angle: -90,
              position: "insideLeft",
              fill: "#ffffff",
              style: { textAnchor: "middle" },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="count"
            radius={[4, 4, 0, 0]}
            onClick={(data) => {
              const status = data.status as IUCNStatus;
              if (selectedStatus === status) {
                onStatusClick(null); // Deselect if clicking the same
              } else {
                onStatusClick(status);
              }
            }}
            style={{ cursor: "pointer" }}
            animationDuration={500}
            animationEasing="ease-out"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                opacity={
                  selectedStatus === null || selectedStatus === entry.status
                    ? 1
                    : 0.3
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {selectedStatus && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm text-white/70"
        >
          Filtered:{" "}
          <span className="font-semibold">{STATUS_LABELS[selectedStatus]}</span>
          <button
            onClick={() => onStatusClick(null)}
            className="ml-2 text-xs underline hover:text-white"
          >
            Clear filter
          </button>
        </motion.div>
      )}
    </div>
  );
}
