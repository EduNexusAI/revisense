import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, DollarSign, Calendar, BarChart3, Settings, Plus, Edit, Trash2, Flame, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { StatCard } from '../../components/cards/StatCard';
import { PerformanceLineChart } from '../../components/charts/PerformanceLineChart';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { dummyStudents } from '../../data/dummyData';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { school } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  const performanceData = [
    { name: 'Jan', marks: 75 },
    { name: 'Feb', marks: 78 },
    { name: 'Mar', marks: 82 },
    { name: 'Apr', marks: 85 },
    { name: 'May', marks: 88 },
    { name: 'Jun', marks: 90 },
  ];

  const avgAttendance = dummyStudents.reduce((sum, s) => sum + s.attendance_percent, 0) / dummyStudents.length;

  const teachers = [
    { id: 1, name: 'Ravi Krishnamurthy', subject: 'Mathematics', email: 'ravi@school.com', status: 'active' },
    { id: 2, name: 'Anjali Sharma', subject: 'Science', email: 'anjali@school.com', status: 'active' },
    { id: 3, name: 'Priya Desai', subject: 'English', email: 'priya@school.com', status: 'inactive' },
  ];

  const classes = [
    { id: 1, name: '9A', students: 45, mentor: 'Rajesh Kumar' },
    { id: 2, name: '9B', students: 42, mentor: 'Anjali Sharma' },
    { id: 3, name: '10A', students: 48, mentor: 'Priya Desai' },
  ];

  return (
    <PageWrapper>
      <div className="space-y-8">
        {/* Header */}
        <div className="border-b border-slate-200/50 pb-6 cursor-pointer hover:opacity-80 transition-all duration-200" onClick={() => navigate('/admin/profile')}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">{t('welcome_back')}, Admin</h1>
          <p className="text-sm text-slate-600 font-medium">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
          <StatCard
            title={t('total_students')}
            value={dummyStudents.length}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            color="bg-blue-500"
          />
          <StatCard
            title={t('total_teachers')}
            value="28"
            icon={BookOpen}
            trend={{ value: 5, isPositive: true }}
            color="bg-green-500"
          />
          <StatCard
            title={t('total_classes')}
            value="12"
            icon={Calendar}
            color="bg-purple-500"
          />
          <StatCard
            title={t('fees')}
            value="₹22.3L"
            icon={DollarSign}
            trend={{ value: 8, isPositive: true }}
            color="bg-orange-500"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Advanced Attendance Overview */}
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft" variant="elevated">
            <div className="space-y-6">
              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Attendance Overview
              </h3>

              {/* Circular Progress */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    {/* Background circle */}
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                    {/* Progress circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="8"
                      strokeDasharray={`${(91 / 100) * 2 * Math.PI * 54} ${2 * Math.PI * 54}`}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dasharray 0.5s ease' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-slate-900">91%</span>
                    <span className="text-xs text-slate-500 font-medium">Present</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="px-4 py-2 rounded-full text-sm font-bold inline-flex items-center gap-2 bg-green-100 text-green-800">
                  ✓ Excellent Attendance
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs text-green-700 font-medium mb-1">Present</p>
                  <p className="text-2xl font-bold text-green-900">91%</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-xs text-red-700 font-medium mb-1">Absent</p>
                  <p className="text-2xl font-bold text-red-900">9%</p>
                </div>
              </div>

              {/* Streak */}
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <Flame className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Current Streak</p>
                      <p className="text-xl font-bold text-amber-900">18 days</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-amber-600 font-medium">Excellent!</p>
                  </div>
                </div>
              </div>

              {/* Weekly Summary */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-700">Weekly Breakdown</p>
                <div className="flex gap-1.5 h-8">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                      <div className={`w-full h-5 rounded transition-all ${
                        idx < 5 ? 'bg-green-500 hover:bg-green-600' : 'bg-slate-200 hover:bg-slate-300'
                      }`} title={`${day}: ${idx < 5 ? 'Present' : 'Weekend'}`} />
                      <span className="text-xs font-bold text-slate-600">{day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft" variant="elevated">
            <PerformanceLineChart data={performanceData} title={t('average_performance')} />
          </Card>
        </div>

        {/* Tabs for Management */}
        <div className="flex gap-4 border-b border-slate-200/50">
          {[
            { id: 'overview', label: t('dashboard'), icon: BarChart3 },
            { id: 'users', label: t('users'), icon: Users },
            { id: 'classes', label: t('classes'), icon: BookOpen },
            { id: 'settings', label: t('settings'), icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-[2px] ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft" variant="elevated">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-200/50">{t('month_overview')}</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50">
                  <span className="text-blue-600 font-bold text-lg">✓</span>
                  <div>
                    <p className="font-medium text-slate-900">{t('total_students')}: 342</p>
                    <p className="text-sm text-slate-600">↑ 12 new students this month</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50">
                  <span className="text-blue-600 font-bold text-lg">✓</span>
                  <div>
                    <p className="font-medium text-slate-900">{t('attendance_rate')}: 94.5%</p>
                    <p className="text-sm text-slate-600">↑ 2.3% from last month</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/50">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                  <div>
                    <p className="font-medium text-slate-900">{t('fees')}: 89% collected</p>
                    <p className="text-sm text-slate-600">₹22.3L collected this month</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200/50">
                  <span className="text-orange-600 font-bold text-lg">⏱</span>
                  <div>
                    <p className="font-medium text-slate-900">{t('pending_approvals')}: 8</p>
                    <p className="text-sm text-slate-600">Awaiting your action</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Users Tab - Teachers */}
        {activeTab === 'users' && (
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft" variant="elevated">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200/50">
                <h3 className="text-lg font-bold text-slate-900">{t('teacher_list')}</h3>
                <Button variant="gradient-purple" size="sm">
                  <Plus className="w-4 h-4" />
                  {t('add_user')}
                </Button>
              </div>
              <div className="overflow-x-auto -mx-4 md:-mx-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200/50">
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{t('name')}</th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{t('subject')}</th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{t('email_address')}</th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{t('status')}</th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((teacher) => (
                      <tr key={teacher.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors duration-200">
                        <td className="px-4 md:px-6 py-3 text-sm font-medium text-slate-900">{teacher.name}</td>
                        <td className="px-4 md:px-6 py-3 text-sm text-slate-600">{teacher.subject}</td>
                        <td className="px-4 md:px-6 py-3 text-sm text-slate-600">{teacher.email}</td>
                        <td className="px-4 md:px-6 py-3 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            teacher.status === 'active'
                              ? 'bg-green-100/70 text-green-700'
                              : 'bg-slate-100/70 text-slate-700'
                          }`}>
                            {teacher.status}
                          </span>
                        </td>
                        <td className="px-4 md:px-6 py-3 text-sm flex gap-2">
                          <button className="p-2 hover:bg-blue-100/70 rounded-lg transition-colors duration-200">
                            <Edit className="w-4 h-4 text-blue-600" />
                          </button>
                          <button className="p-2 hover:bg-red-100/70 rounded-lg transition-colors duration-200">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}

        {/* Classes Tab */}
        {activeTab === 'classes' && (
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft" variant="elevated">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200/50">
                <h3 className="text-lg font-bold text-slate-900">{t('class_list')}</h3>
                <Button variant="gradient-emerald" size="sm">
                  <Plus className="w-4 h-4" />
                  Add Class
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {classes.map((cls) => (
                  <div
                    key={cls.id}
                    className="border border-slate-200/50 rounded-12 p-4 bg-gradient-to-br from-slate-50 to-slate-100/50 hover:border-blue-300/50 hover:from-blue-50 hover:to-blue-100/50 transition-all duration-200 group shadow-soft hover:shadow-medium"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs text-slate-600 uppercase tracking-wide mb-1">Class</p>
                        <h4 className="text-lg font-bold text-slate-900">{cls.name}</h4>
                      </div>
                      <button className="p-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-blue-600 transition-all duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between text-slate-600">
                        <span>{t('students')}</span>
                        <span className="font-semibold text-slate-900">{cls.students}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Mentor</span>
                        <span className="font-semibold text-slate-900">{cls.mentor}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft" variant="elevated">
            <div className="space-y-8">
              <div className="pb-4 border-b border-slate-200/50">
                <h3 className="text-lg font-bold text-slate-900">{t('settings')}</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('school_name')}</label>
                  <Input
                    value={school?.name}
                    className="bg-slate-50/70 backdrop-blur-sm border border-slate-200/50"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('primary_color')}</label>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-12 border border-slate-200/50 shadow-soft"
                      style={{ backgroundColor: school?.theme_primary }}
                    ></div>
                    <Input
                      value={school?.theme_primary}
                      className="flex-1 bg-slate-50/70 backdrop-blur-sm border border-slate-200/50"
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('subscription_plan')}</label>
                  <Input
                    value={school?.subscription_plan.toUpperCase()}
                    className="bg-slate-50/70 backdrop-blur-sm border border-slate-200/50"
                    disabled
                  />
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </PageWrapper>
  );
};
