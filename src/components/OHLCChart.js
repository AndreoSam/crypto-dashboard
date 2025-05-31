import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
  ReferenceLine,
} from "recharts";
import { Box, Typography } from "@mui/material";

export default function OHLCChart({ data }) {
  const formattedData = data.map((item) => ({
    date: new Date(item[0]).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    open: item[1],
    high: item[2],
    low: item[3],
    close: item[4],
  }));
  const allPrices = formattedData.flatMap((d) => [
    d.open,
    d.high,
    d.low,
    d.close,
  ]);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const padding = (maxPrice - minPrice) * 0.2 || 1;

  return (
    <Box sx={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            domain={[minPrice - padding, maxPrice + padding]}
            tickFormatter={(val) => `$${val.toFixed(2)}`}
          />
          <Tooltip formatter={(val) => `$${val.toFixed(2)}`} />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar
            dataKey="open"
            fill="#8884d8"
            name="Open"
            activeBar={<Rectangle fill="lavender" stroke="purple" />}
          />
          <Bar
            dataKey="high"
            fill="#4caf50"
            name="High"
            activeBar={<Rectangle fill="#b9f6ca" stroke="#388e3c" />}
          />
          <Bar
            dataKey="low"
            fill="#f44336"
            name="Low"
            activeBar={<Rectangle fill="#ffcdd2" stroke="#d32f2f" />}
          />
          <Bar
            dataKey="close"
            fill="#ff9800"
            name="Close"
            activeBar={<Rectangle fill="#ffe0b2" stroke="#ef6c00" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
