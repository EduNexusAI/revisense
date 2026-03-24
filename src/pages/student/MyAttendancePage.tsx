import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { TrendingUp, Zap, Lock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useState, useEffect } from 'react';

export const MyAttendancePage = () => {
  const attendanceData = [
    { name: 'Present', value: 76, color: '#06b6d4' },
    { name: 'Absent', value: 12, color: '#f43f5e' },
    { name: 'Leave', value: 12, color: '#f59e0b' },
  ];

  const trendData = [
    { week: 'Week 1', percentage: 88, attendance: 18 },
    { week: 'Week 2', percentage: 92, attendance: 19 },
    { week: 'Week 3', percentage: 85, attendance: 17 },
    { week: 'Week 4', percentage: 95, attendance: 19 },
    { week: 'Week 5', percentage: 76, attendance: 15 },
  ];

  const percentagePresent = 76;
  const currentStreak = 5;
  const bestStreak = 18;
  const predictedScore = 82;

  // Calendar data for March 2026
  const calendarDays = [
    { date: 1, status: 'present' },
    { date: 2, status: 'present' },
    { date: 3, status: 'absent' },
    { date: 4, status: 'holiday' },
    { date: 5, status: 'present' },
    { date: 6, status: 'present' },
    { date: 7, status: 'present' },
    { date: 8, status: 'present' },
    { date: 9, status: 'present' },
    { date: 10, status: 'present' },
    { date: 11, status: 'present' },
    { date: 12, status: 'present' },
    { date: 13, status: 'present' },
    { date: 14, status: 'holiday' },
    { date: 15, status: 'present' },
    { date: 16, status: 'present' },
    { date: 17, status: 'present' },
    { date: 18, status: 'present' },
    { date: 19, status: 'present' },
    { date: 20, status: 'absent' },
    { date: 21, status: 'present' },
    { date: 22, status: 'present' },
    { date: 23, status: 'present' },
    { date: 24, status: 'present' },
    { date: 25, status: 'present' },
    { date: 26, status: 'holiday' },
    { date: 27, status: 'present' },
    { date: 28, status: 'present' },
    { date: 29, status: 'present' },
    { date: 30, status: 'present' },
  ];

  const getDateColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-gradient-to-br from-emerald-100/50 to-green-200/50 hover:from-emerald-100/70 hover:to-green-200/70 text-slate-900';
      case 'absent':
        return 'bg-gradient-to-br from-red-400/60 to-red-600/60 hover:from-red-400/80 hover:to-red-600/80 text-white font-semibold';
      case 'holiday':
        return 'bg-gradient-to-br from-gray-300/40 to-gray-500/40 hover:from-gray-300/60 hover:to-gray-500/60 text-slate-900';
      default:
        return 'bg-slate-200/30';
    }
  };

  const getDateLabel = (status: string) => {
    switch (status) {
      case 'present':
        return 'Present';
      case 'absent':
        return 'Absent';
      case 'holiday':
        return 'Holiday';
      default:
        return 'Unknown';
    }
  };

  // Toast state
  const [toast, setToast] = useState<{ message: string; status: string } | null>(null);
  
  // Month state - 0 = January, 1 = February, etc.
  const [selectedMonth, setSelectedMonth] = useState(2); // March (2024-03)
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const showToast = (date: number, status: string) => {
    setToast({
      message: `March ${date}, 2026 • ${getDateLabel(status)}`,
      status: status,
    });
    setTimeout(() => setToast(null), 3000); // Hide after 3 seconds
  };

  const handleDateClick = (date: number, status: string) => {
    showToast(date, status);
  };

  const calendarStats = {
    present: 24,
    absent: 2,
    holiday: 4,
    rate: 92.3,
  };

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <PageWrapper>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 p-8 md:p-12 border border-blue-400/20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <p className="text-blue-300 text-sm font-semibold mb-2">ATTENDANCE ANALYTICS</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {percentagePresent}%
            </h1>
            <p className="text-blue-100 text-lg">Current Overall Attendance</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-blue-200">On track for excellent performance</span>
            </div>
          </div>
        </div>

        {/* Premium Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Streak Card */}
          <Card className="shadow-soft border-slate-200/50 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-slate-50 to-slate-100/50">
            <div className="p-4 md:p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-slate-600 text-sm font-semibold uppercase tracking-wide mb-2">Attendance Streak</p>
                  <p className="text-5xl font-bold text-blue-600">{currentStreak}</p>
                  <p className="text-slate-500 text-sm mt-2">Days in a row</p>
                </div>
                <Zap className="w-8 h-8 text-blue-500" />
              </div>
              <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
              </div>
            </div>
          </Card>

          {/* Predicted Score */}
          <Card className="shadow-soft border-slate-200/50 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-slate-50 to-slate-100/50">
            <div className="p-4 md:p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-slate-600 text-sm font-semibold uppercase tracking-wide mb-2">Predicted by EoY</p>
                  <p className="text-5xl font-bold text-purple-600">{predictedScore}%</p>
                  <p className="text-slate-500 text-sm mt-2">End of year forecast</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
              <div className="text-xs text-slate-600 bg-purple-50 rounded-lg p-3">
                Based on current attendance pattern & historical data
              </div>
            </div>
          </Card>
        </div>

        {/* Attendance Trend */}
        <Card className="shadow-soft border-slate-200/50">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Weekly Trend</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="week" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#f1f5f9',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Area type="monotone" dataKey="percentage" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAttendance)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* My Attendance */}
        <Card className="shadow-soft border-slate-200/50">
          <div className="p-4 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">📋 My Attendance</h2>
            
            {/* Month Selector */}
            <div className="mb-6 p-4 bg-gradient-to-r from-slate-50/80 via-purple-50/80 to-slate-50/80 backdrop-blur-md rounded-xl border border-slate-200/50">
              <p className="text-xs md:text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Select Month</p>
              <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-0">
                {monthNames.map((month, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedMonth(index)}
                    className={`flex-shrink-0 px-3 md:px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${
                      selectedMonth === index
                        ? 'bg-gradient-to-b from-purple-600 to-purple-700 text-white shadow-md'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    {month.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Row - Moved to Top */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-gradient-to-r from-slate-50/60 via-blue-50/60 to-slate-50/60 backdrop-blur-md rounded-xl border border-slate-200/50 mb-8">
              <div className="text-center">
                <p className="text-emerald-600 text-xs md:text-sm font-semibold">Present</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600">{calendarStats.present}</p>
              </div>
              <div className="text-center">
                <p className="text-red-600 text-xs md:text-sm font-semibold">Absent</p>
                <p className="text-2xl md:text-3xl font-bold text-red-600">{calendarStats.absent}</p>
              </div>
              <div className="text-center md:col-span-1">
                <p className="text-gray-600 text-xs md:text-sm font-semibold">Holiday</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-700">{calendarStats.holiday}</p>
              </div>
              <div className="text-center md:col-span-1">
                <p className="text-slate-600 text-xs md:text-sm font-semibold">Rate</p>
                <p className="text-2xl md:text-3xl font-bold text-blue-600">{calendarStats.rate}%</p>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="mb-8">
              {/* Week Days Header */}
              <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
                {weekDays.map((day) => (
                  <div key={day} className="text-center font-bold text-slate-600 text-sm py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1 md:gap-2">
                {calendarDays.map((day) => (
                  <button
                    key={day.date}
                    onClick={() => handleDateClick(day.date, day.status)}
                    className={`aspect-square flex items-center justify-center rounded-lg font-semibold text-sm md:text-base transition-all duration-200 cursor-pointer transform hover:scale-105 active:scale-95 backdrop-blur-sm border border-white/30 ${getDateColor(
                      day.status
                    )}`}
                  >
                    {day.date}
                  </button>
                ))}
              </div>
            </div>

            {/* Legend - Moved to Bottom */}
            <div className="flex flex-wrap gap-4 p-4 bg-gradient-to-r from-slate-50/80 via-blue-50/80 to-slate-50/80 backdrop-blur-md rounded-xl border border-slate-200/50">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-br from-emerald-100 to-green-200" />
                <span className="text-sm font-semibold text-slate-700">Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-br from-red-400 to-red-600" />
                <span className="text-sm font-semibold text-slate-700">Absent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-br from-gray-300 to-gray-500" />
                <span className="text-sm font-semibold text-slate-700">Holiday</span>
              </div>
            </div>

            {/* Toast Notification - Bottom Center */}
            {toast && (
              <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl px-6 py-4 rounded-lg border border-slate-700/50 text-white font-semibold text-sm md:text-base shadow-xl">
                  {toast.message}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Attendance Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-soft border-slate-200/50">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Distribution</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 space-y-2">
                {attendanceData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-600 font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Coming Soon Features */}
          <div className="space-y-4">
            <Card className="shadow-soft border-slate-200/50 bg-gradient-to-br from-slate-50 to-slate-100/50 opacity-75">
              <div className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Lock className="w-5 h-5 text-slate-400" />
                  <h2 className="text-2xl font-bold text-slate-500">Coming Soon</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white/50 rounded-lg border border-slate-200/50">
                    <p className="font-semibold text-slate-700 mb-1">Biometric Check-in</p>
                    <p className="text-sm text-slate-600">Face recognition attendance tracking</p>
                  </div>
                  
                  <div className="p-4 bg-white/50 rounded-lg border border-slate-200/50">
                    <p className="font-semibold text-slate-700 mb-1">Smart Alerts</p>
                    <p className="text-sm text-slate-600">Real-time notifications for low attendance</p>
                  </div>
                  
                  <div className="p-4 bg-white/50 rounded-lg border border-slate-200/50">
                    <p className="font-semibold text-slate-700 mb-1">Parent Reports</p>
                    <p className="text-sm text-slate-600">Detailed insights sent to guardians</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Stats Box */}
            <Card className="shadow-soft border-blue-200/50 bg-gradient-to-br from-blue-50 to-blue-100/50">
              <div className="p-8">
                <h3 className="text-xl font-bold text-blue-900 mb-6">Session Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-blue-700 font-medium">Best Streak</span>
                    <span className="font-bold text-2xl text-blue-600">{bestStreak}</span>
                  </div>
                  <div className="border-t border-blue-200" />
                  <div className="flex justify-between">
                    <span className="text-blue-700 font-medium">Total Days</span>
                    <span className="font-bold text-2xl text-blue-600">100</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
