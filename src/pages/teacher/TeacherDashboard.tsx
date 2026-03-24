import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, BookOpen, Users, TrendingUp } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { StatCard } from '../../components/cards/StatCard';
import { StudentCard } from '../../components/cards/StudentCard';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { dummyStudents } from '../../data/dummyData';

export const TeacherDashboard = () => {
  const navigate = useNavigate();

  const studentsNeedingAttention = dummyStudents.filter(
    s => s.ai_revision_status === 'pending' || s.attendance_percent < 75
  );

  return (
    <PageWrapper>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-slate-200/50 cursor-pointer hover:opacity-80 transition-all duration-200" onClick={() => navigate('/teacher/profile')}>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Welcome back, Teacher</h1>
            <p className="text-sm text-slate-600 font-medium">Here's what's happening with your classes today</p>
          </div>
          <Button onClick={() => navigate('/teacher/attendance')} variant="premium" className="w-full md:w-auto">
            <ClipboardCheck size={20} className="mr-2" />
            Quick Attendance
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
          <StatCard
            title="Total Students"
            value={dummyStudents.length}
            icon={Users}
            color="bg-green-600"
          />
          <StatCard
            title="Classes Today"
            value={5}
            icon={BookOpen}
            color="bg-blue-600"
          />
          <StatCard
            title="Pending Reviews"
            value={8}
            icon={ClipboardCheck}
            color="bg-orange-600"
          />
          <StatCard
            title="Avg Performance"
            value="85%"
            icon={TrendingUp}
            trend={{ value: 3, isPositive: true }}
            color="bg-purple-600"
          />
        </div>

        {studentsNeedingAttention.length > 0 && (
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft" variant="elevated">
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2 pb-3 md:pb-4 border-b border-slate-200">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
                <span className="break-words">Students Needing Attention</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {studentsNeedingAttention.slice(0, 3).map(student => (
                  <div key={student.id} className="bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/50 rounded-12 p-3 md:p-4 hover:border-slate-300 hover:from-white hover:to-slate-50 transition-all duration-200 shadow-soft hover:shadow-medium">
                    <p className="font-semibold text-sm md:text-base text-slate-900 break-words">{student.name}</p>
                    <p className="text-xs text-slate-600 mt-1">Grade {student.grade} - Section {student.section}</p>
                    {student.attendance_percent < 75 && (
                      <p className="text-xs text-red-600 mt-2 font-medium">⚠ Attendance: {student.attendance_percent}%</p>
                    )}
                    {student.ai_revision_status === 'pending' && (
                      <p className="text-xs text-orange-600 mt-2 font-medium">⏱ Pending AI revision</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        <div className="border-t border-slate-200/50 pt-4 md:pt-6">
          <h3 className="text-base md:text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 md:mb-4 break-words">All Students (Class 9A)</h3>
          <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
            {dummyStudents.slice(0, 4).map(student => (
              <div key={student.id} className="flex-shrink-0">
                <StudentCard student={student} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
