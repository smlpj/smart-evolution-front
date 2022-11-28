import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
];

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  return (
    <text
      style={{
        fontSize: "0.7vw",
        fontWeight: "bold",
        fill: "#fff",
        textAnchor: "middle",
        fontFamily: "Montserrat",
      }}
      x={x + width / 2}
      y={y + 30}
      fill="#666"
      textAnchor="middle"
      dy={-6}
    >
      {value}
    </text>
  );
};

export default function BarChartComponent({}) {
  return (
    <ResponsiveContainer width="98%" height="70%">
      <BarChart data={data} margin={{ top: 0, left: 0, right: 15, bottom: 0 }}>
        <CartesianGrid
          stroke="#C7C7C7"
          strokeDasharray="4 4"
          vertical={false}
        />
        <Bar
          dataKey="amt"
          fill="#488B8FCC"
          label={renderCustomBarLabel}
          radius={[4, 4, 0, 0]}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{
            fontSize: "0.7vw",
            fontFamily: "Montserrat",
            fontWeight: "bold",
            color: "#7C828A",
          }}
          tickCount={5}
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{
            fontSize: "0.7vw",
            fontFamily: "Montserrat",
            fontWeight: "bold",
            color: "#4A4546",
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
