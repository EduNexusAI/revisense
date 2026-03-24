import { useNavigate } from 'react-router-dom';
import { TrendingUp, Award, Clock, Bot } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { StatCard } from '../../components/cards/StatCard';
import { PerformanceLineChart } from '../../components/charts/PerformanceLineChart';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Dashboard_PUCPlus = () => {
  const navigate = useNavigate();
  const performanceData = [
    { name: 'Unit 1', marks: 82 },
    { name: 'Unit 2', marks: 85 },
    { name: 'Unit 3', marks: 88 },
    { name: 'Midterm', marks: 90 },
    { name: 'Unit 4', marks: 92 },
  ];

  const subjectData = [
    { subject: 'Math', marks: 92 },
    { subject: 'Physics', marks: 88 },
    { subject: 'Chemistry', marks: 85 },
    { subject: 'Biology', marks: 90 },
  ];

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div className="cursor-pointer hover:opacity-80 transition-smooth" onClick={() => navigate('/student/profile')}>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Academic Dashboard</h1>
          <p className="text-slate-600 font-medium">Track your progress and performance</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          <StatCard
            title="Attendance"
            value="94%"
            icon={TrendingUp}
            color="bg-green-500"
          />
          <StatCard
            title="Average Marks"
            value="88.5"
            icon={Award}
            trend={{ value: 5, isPositive: true }}
            color="bg-blue-500"
          />
          <StatCard
            title="Class Rank"
            value="#2"
            icon={Award}
            color="bg-purple-500"
          />
          <StatCard
            title="Study Hours"
            value="24h"
            icon={Clock}
            color="bg-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft" variant="elevated">
            <PerformanceLineChart data={performanceData} title="Performance Trend Analysis" />
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft" variant="elevated">
            <h3 className="text-lg font-bold mb-4 pb-4 border-b border-slate-200 flex items-center gap-2 text-slate-900">
              <div className="w-10 h-10 rounded-12 bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              Subject-wise Performance
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="subject" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="marks" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow-elevated" variant="elevated">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-12 bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Bot size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">AI Personal Assistant</h3>
              <p className="mb-4 text-blue-100 font-medium">
                Access advanced AI tools for research, study planning, and competitive exam preparation.
              </p>
              <button className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-soft">
                Launch AI Assistant
              </button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft" variant="elevated">
            <h3 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-200">Upcoming Competitions</h3>
            <div className="space-y-3">
              {[
                { name: 'Weekly MCQ Test', date: 'March 18, 2024', type: 'MCQ' },
                { name: 'Open Book Challenge', date: 'March 22, 2024', type: 'Open Book' },
                { name: 'Speed Math Contest', date: 'March 25, 2024', type: 'Competition' },
              ].map((comp, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-xl border border-blue-200/50 hover:border-blue-300 transition-all duration-200">
                  <div>
                    <p className="font-medium text-slate-900">{comp.name}</p>
                    <p className="text-sm text-slate-600 mt-1">{comp.date}</p>
                  </div>
                  <Badge variant={comp.type === 'MCQ' ? 'info' : comp.type === 'Competition' ? 'warning' : 'success'}>
                    {comp.type}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft" variant="elevated">
            <h3 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-200">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: 'Completed Physics assignment', time: '2 hours ago' },
                { action: 'Attended AI revision session', time: '1 day ago' },
                { action: 'Scored 95% in Math quiz', time: '2 days ago' },
                { action: 'Submitted Chemistry lab report', time: '3 days ago' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 mt-2.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft" variant="elevated">
          <h3 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-200">Detailed Performance Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-3 font-semibold text-slate-700">Subject</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Unit Test</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Midterm</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Average</th>
                  <th className="text-center p-3 font-semibold text-gray-700">Grade</th>
                </tr>
              </thead>
              <tbody>
                {subjectData.map((subject, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-surface transition-colors">
                    <td className="p-3 font-medium">{subject.subject}</td>
                    <td className="p-3 text-center">85</td>
                    <td className="p-3 text-center">90</td>
                    <td className="p-3 text-center font-semibold">{subject.marks}</td>
                    <td className="p-3 text-center">
                      <Badge variant={subject.marks >= 90 ? 'success' : subject.marks >= 75 ? 'info' : 'warning'}>
                        {subject.marks >= 90 ? 'A+' : subject.marks >= 75 ? 'A' : 'B'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};
