import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from '../ui/Card';

interface PerformanceLineChartProps {
  data: Array<{ name: string; marks: number }>;
  title?: string;
}

export const PerformanceLineChart = ({ data, title = 'Performance Trend' }: PerformanceLineChartProps) => {
  return (
    <Card>
      <h3 className="text-lg font-bold text-primary mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="marks" stroke="#0F3460" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
