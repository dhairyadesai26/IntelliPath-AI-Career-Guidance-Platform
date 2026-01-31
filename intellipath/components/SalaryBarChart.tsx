import React, { useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SalaryRange {
  role: string;
  min: number;
  median: number;
  max: number;
}

interface SalaryBarChartProps {
  data: SalaryRange[];
}

const SalaryBarChart: React.FC<SalaryBarChartProps> = ({ data }) => {
  const chartWidth = Math.max(900, data.length * 90);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full" style={{ height: 350 }}>
      {/* Left Arrow */}
      <button
        aria-label="Scroll left"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background border border-muted rounded-full p-2 shadow transition"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={() => scrollBy(-300)}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
      </button>
      {/* Right Arrow */}
      <button
        aria-label="Scroll right"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background border border-muted rounded-full p-2 shadow transition"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={() => scrollBy(300)}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
      </button>
      <div
        ref={scrollRef}
        style={{ width: "100%", height: 350, overflowX: "auto", scrollBehavior: "smooth" }}
        className="hide-scrollbar"
      >
        <div style={{ width: chartWidth, height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="role" tick={{ fill: "#a3a3a3", fontSize: 12 }} interval={0} angle={-20} textAnchor="end" height={70} />
              <YAxis 
                tick={{ fill: "#a3a3a3", fontSize: 12 }} 
                tickFormatter={(value) => `${value} LPA`}
                label={{ value: "Salary (LPA)", angle: -90, position: "insideLeft", fill: "#a3a3a3", fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ background: "#18181b", border: "1px solid #333", color: "#fff" }}
                formatter={(value, name) => [`₹${value} LPA`, name.charAt(0).toUpperCase() + name.slice(1)]}
                labelFormatter={(label) => `${label}`}
              />
              <Legend wrapperStyle={{ color: "#fff" }} />
              <Bar dataKey="min" fill="#60a5fa" name="Min" barSize={20} />
              <Bar dataKey="median" fill="#2563eb" name="Median" barSize={20} />
              <Bar dataKey="max" fill="#1e40af" name="Max" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SalaryBarChart;
