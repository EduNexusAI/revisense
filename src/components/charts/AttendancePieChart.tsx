import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card } from '../ui/Card';
import { TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AttendancePieChartProps {
  present: number;
  absent: number;
  title?: string;
}

export const AttendancePieChart = ({ present, absent, title = 'Attendance Overview' }: AttendancePieChartProps) => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  
  const total = present + absent;
  const presentPercent = (present / total) * 100;
  const absentPercent = (absent / total) * 100;

  const data = [
    { name: 'Present', value: present },
    { name: 'Absent', value: absent },
  ];

  const COLORS = ['#1f2937', '#7f1d1d'];

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-600" />
            {title}
          </h3>
          <p className="text-xs text-gray-600 mt-1">Total Classes: {total}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Charts Section */}
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                animationDuration={800}
                animationBegin={0}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    opacity={hoveredSegment === entry.name || !hoveredSegment ? 1 : 0.4}
                    style={{ transition: 'opacity 0.3s ease' }}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `${value} days`}
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Section */}
        <div className="space-y-4 flex flex-col justify-center">
          {/* Present Stats */}
          <div 
            className="p-4 rounded-lg bg-white border-2 border-gray-300 hover:border-gray-500 hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-105"
            onMouseEnter={() => setHoveredSegment('Present')}
            onMouseLeave={() => setHoveredSegment(null)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-gray-900" />
                <span className="text-sm font-semibold text-gray-900">Present</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">{present}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-gray-700 to-gray-900 h-full rounded-full transition-all duration-500"
                style={{ width: `${presentPercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">{presentPercent.toFixed(1)}% Attendance Rate</p>
          </div>

          {/* Absent Stats */}
          <div 
            className="p-4 rounded-lg bg-white border-2 border-red-900 hover:border-red-800 hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-105"
            onMouseEnter={() => setHoveredSegment('Absent')}
            onMouseLeave={() => setHoveredSegment(null)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertCircle size={18} className="text-red-900" />
                <span className="text-sm font-semibold text-gray-900">Absent</span>
              </div>
              <span className="text-2xl font-bold text-red-900">{absent}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-red-900 to-red-700 h-full rounded-full transition-all duration-500"
                style={{ width: `${absentPercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">{absentPercent.toFixed(1)}% Absence Rate</p>
          </div>

          {/* Status Badge */}
          <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <p className="text-xs font-medium text-blue-900">
              ✓ {presentPercent >= 90 ? '✨ Excellent Attendance!' : presentPercent >= 75 ? '👍 Good Attendance' : '⚠️ Needs Improvement'}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="mt-6 pt-6 border-t border-gray-300 grid grid-cols-3 gap-3">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{presentPercent.toFixed(1)}%</p>
          <p className="text-xs text-gray-600 mt-1">Attendance %</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{total}</p>
          <p className="text-xs text-gray-600 mt-1">Total Days</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-red-900">{absentPercent.toFixed(1)}%</p>
          <p className="text-xs text-gray-600 mt-1">Absence %</p>
        </div>
      </div>
    </Card>
  );
};
