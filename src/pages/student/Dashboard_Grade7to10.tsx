import { useNavigate } from 'react-router-dom';
import { Flame, Trophy, Target, BookOpen, Brain, Calendar, ClipboardCheck, TrendingUp, Award, CheckCircle, AlertCircle } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { PerformanceLineChart } from '../../components/charts/PerformanceLineChart';
import { AttendancePieChart } from '../../components/charts/AttendancePieChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Dashboard_Grade7to10 = () => {
  const navigate = useNavigate();
  const performanceData = [
    { name: 'Test 1', marks: 75 },
    { name: 'Test 2', marks: 80 },
    { name: 'Test 3', marks: 85 },
    { name: 'Test 4', marks: 88 },
    { name: 'Test 5', marks: 92 },
  ];

  const attendanceData = [
    { name: 'Present', value: 94, fill: '#10b981' },
    { name: 'Absent', value: 6, fill: '#ef4444' },
  ];

  const subjectPerformance = [
    { subject: 'Math', score: 92 },
    { subject: 'English', score: 85 },
    { subject: 'Science', score: 88 },
    { subject: 'Social', score: 80 },
    { subject: 'Hindi', score: 87 },
  ];

  const homework = [
    { id: 1, subject: 'Math', title: 'Chapter 5 Exercises', dueDate: 'Today', priority: 'high', submitted: false },
    { id: 2, subject: 'English', title: 'Essay Submission', dueDate: 'Tomorrow', priority: 'medium', submitted: false },
    { id: 3, subject: 'Science', title: 'Biology Project', dueDate: 'Mar 20', priority: 'high', submitted: true },
  ];

  const achievements = [
    { title: 'First Assignment', icon: '🎯', unlocked: true },
    { title: 'Perfect Attendance', icon: '📅', unlocked: true },
    { title: 'Top Scorer', icon: '🏆', unlocked: false },
    { title: 'Quiz Master', icon: '🧠', unlocked: true },
  ];

  return (
    <PageWrapper>
      <div className="space-y-8">
        {/* Header */}
        <div className="pb-6 border-b border-slate-200 cursor-pointer hover:opacity-80 transition" onClick={() => navigate('/student/profile')}>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, Priya 👋</h1>
          <p className="text-sm text-slate-600 font-medium">Grade 9 • Section A • Top Performer</p>
        </div>

        {/* Quick Stats - One per row on mobile, grid on desktop */}
        <div className="flex md:hidden flex-col gap-3">
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft hover:shadow-medium transition-shadow" variant="elevated">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full">
                <Flame className="text-orange-600" size={22} />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-semibold uppercase tracking-wide">Study Streak</p>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">7 <span className="text-sm text-slate-500">Days</span></h3>
              </div>
            </div>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft hover:shadow-medium transition-shadow" variant="elevated">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full">
                <Target className="text-blue-600" size={22} />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-semibold uppercase tracking-wide">Avg Score</p>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">87<span className="text-sm text-slate-500">%</span></h3>
              </div>
            </div>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft hover:shadow-medium transition-shadow" variant="elevated">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full">
                <Trophy className="text-purple-600" size={22} />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-semibold uppercase tracking-wide">Class Rank</p>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">#<span className="text-sm">3</span></h3>
              </div>
            </div>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft hover:shadow-medium transition-shadow" variant="elevated">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-full">
                <CheckCircle className="text-green-600" size={22} />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-semibold uppercase tracking-wide">Attendance</p>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">94<span className="text-sm text-slate-500">%</span></h3>
              </div>
            </div>
          </Card>
        </div>

        {/* Grid view for tablets and desktops */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft hover:shadow-medium transition-shadow" variant="elevated">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-12">
                <Flame className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-semibold uppercase tracking-wide">Study Streak</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">7 <span className="text-lg text-slate-500">Days</span></h3>
              </div>
            </div>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft hover:shadow-medium transition-shadow" variant="elevated">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-12">
                <Target className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-semibold uppercase tracking-wide">Avg Score</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">87<span className="text-lg text-slate-500">%</span></h3>
              </div>
            </div>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft hover:shadow-medium transition-shadow" variant="elevated">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-12">
                <Trophy className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-semibold uppercase tracking-wide">Class Rank</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">#<span className="text-lg">3</span></h3>
              </div>
            </div>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft hover:shadow-medium transition-shadow" variant="elevated">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-12">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-semibold uppercase tracking-wide">Attendance</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">94<span className="text-lg text-slate-500">%</span></h3>
              </div>
            </div>
          </Card>
        </div>

        {/* Performance & Attendance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft" variant="elevated">
            <PerformanceLineChart data={performanceData} title="Your Test Scores" />
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft" variant="elevated">
            <AttendancePieChart present={94} absent={6} />
          </Card>
        </div>

        {/* Subject Performance Breakdown */}
        <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft" variant="elevated">
          <h3 className="text-lg font-bold mb-6 pb-4 border-b border-slate-200 flex items-center gap-2 text-slate-900">
            <div className="w-10 h-10 rounded-12 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            Subject-wise Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectPerformance} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="subject" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" name="Score %" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Homework Section */}
        <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft" variant="elevated">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <div className="w-10 h-10 rounded-12 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5 text-blue-600" />
              </div>
              My Homework
            </h3>
            <Badge variant="info">{homework.length} Active</Badge>
          </div>
          <div className="space-y-3">
            {homework.map((hw) => (
              <div key={hw.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-xl border border-blue-200/50 hover:border-blue-300 hover:shadow-soft transition-all duration-200">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-slate-900">{hw.title}</p>
                    {hw.submitted ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    ) : hw.priority === 'high' ? (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    ) : null}
                  </div>
                  <p className="text-sm text-slate-600">{hw.subject} • Due: {hw.dueDate}</p>
                </div>
                {!hw.submitted && (
                  <Button size="sm" variant="primary" className="ml-4">
                    Submit
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft" variant="elevated">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <div className="w-10 h-10 rounded-12 bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              Achievements
            </h3>
            <Badge variant="success">4/8 Unlocked</Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl text-center transition-all border ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50 scale-100'
                    : 'bg-slate-100/50 border-slate-200 opacity-50 grayscale'
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <p className="text-xs font-semibold text-slate-800">{achievement.title}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Study Buddy */}
        <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-6 h-6" />
                <h3 className="text-xl font-bold">AI Study Buddy</h3>
              </div>
              <p className="text-sm opacity-90 mb-4">Get personalized help with your studies and boost your grades!</p>
              <Button className="bg-white text-purple-600 hover:bg-gray-50 font-semibold">
                Start Learning →
              </Button>
            </div>
            <div className="text-5xl opacity-20">🤖</div>
          </div>
        </Card>

        {/* Upcoming Exams */}
        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Upcoming Exams
          </h3>
          <div className="space-y-3">
            {[
              { subject: 'Mathematics', date: 'Mar 20', daysLeft: 2, sections: '10 Chapters' },
              { subject: 'Science', date: 'Mar 22', daysLeft: 4, sections: '12 Chapters' },
              { subject: 'English', date: 'Mar 25', daysLeft: 7, sections: '8 Units' },
            ].map((exam, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-200 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{exam.subject}</p>
                  <p className="text-xs text-gray-600">{exam.sections} • {exam.date}</p>
                </div>
                <div className="text-right">
                  <Badge variant={exam.daysLeft <= 3 ? 'alert' : 'warning'}>
                    {exam.daysLeft} days
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};
