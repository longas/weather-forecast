import React, { useMemo } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { Hour } from "../../types";

interface TemperaturesChartProps {
  hours: Hour[];
}

const TemperaturesChart: React.FC<TemperaturesChartProps> = ({ hours }) => {
  const chartData = useMemo(() => {
    if (!hours.length) return [];
    return hours.map((h, i) => ({
      name: i,
      temperature: h.temperature,
    }));
  }, [hours]);

  return (
    <ResponsiveContainer width="100%" height={75}>
      <LineChart data={chartData}>
        <Tooltip />
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="temperature"
          stroke="black"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TemperaturesChart;
