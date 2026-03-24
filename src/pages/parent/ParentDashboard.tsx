import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { PerformanceLineChart } from '../../components/charts/PerformanceLineChart';
import { Users, Eye, CreditCard, Award, TrendingUp, AlertCircle, Check, IndianRupee, Plus, X, Flame, Calendar, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ResponsiveContainer } from 'recharts';

interface Child {
  id: string;
  name: string;
  grade: string;
  section: string;
  avgScore: number;
  attendance: number;
}

const DUMMY_CHILDREN: Child[] = [
  {
    id: '1',
    name: 'Arjun Singh',
    grade: '9',
    section: 'A',
    avgScore: 87,
    attendance: 94,
  },
  {
    id: '2',
    name: 'Avni Singh',
    grade: '6',
    section: 'B',
    avgScore: 85,
    attendance: 96,
  },
];

const FEES_DATA = [
  { month: 'January', paid: true, amount: 8500, status: 'Paid' },
  { month: 'February', paid: true, amount: 8500, status: 'Paid' },
  { month: 'March', paid: false, amount: 8500, status: 'Pending' },
  { month: 'April', paid: false, amount: 8500, status: 'Pending' },
];

export const ParentDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedChild, setSelectedChild] = useState<Child>(DUMMY_CHILDREN[0]);
  const [linkedChildren, setLinkedChildren] = useState<Child[]>(DUMMY_CHILDREN);
  const [showLinkChildModal, setShowLinkChildModal] = useState(false);
  const [linkChildEmail, setLinkChildEmail] = useState('');

  const performanceData = [
    { name: 'Week 1', score: 82 },
    { name: 'Week 2', score: 85 },
    { name: 'Week 3', score: 88 },
    { name: 'Week 4', score: 87 },
  ];

  const attendanceData = [
    { name: 'Present', value: selectedChild.attendance, fill: '#10b981' },
    { name: 'Absent', value: 100 - selectedChild.attendance, fill: '#ef4444' },
  ];

  const subjectMarks = [
    { subject: 'Math', marks: 92, total: 100 },
    { subject: 'English', marks: 85, total: 100 },
    { subject: 'Science', marks: 88, total: 100 },
    { subject: 'Social', marks: 80, total: 100 },
  ];

  const homework = [
    { id: 1, subject: 'Math', title: 'Chapter 5 Exercises', dueDate: 'Today', priority: 'high', submitted: false },
    { id: 2, subject: 'English', title: 'Essay Submission', dueDate: 'Tomorrow', priority: 'medium', submitted: false },
    { id: 3, subject: 'Science', title: 'Biology Project', dueDate: 'Mar 20', priority: 'high', submitted: true },
  ];

  const handleLinkChild = () => {
    if (!linkChildEmail.trim()) return;
    
    // In real app, this would validate student email and fetch their data
    // For now, we simulate finding a student
    const newChild: Child = {
      id: Date.now().toString(),
      name: 'Anjali Kumar',
      grade: '6',
      section: 'B',
      avgScore: 82,
      attendance: 92,
    };
    
    setLinkedChildren([...linkedChildren, newChild]);
    setLinkChildEmail('');
    setShowLinkChildModal(false);
  };

  const paidFees = FEES_DATA.filter((f) => f.paid).length;
  const pendingFees = FEES_DATA.filter((f) => !f.paid).length;
  const totalFeeAmount = FEES_DATA.reduce((sum, f) => sum + f.amount, 0);
  const paidAmount = FEES_DATA.filter((f) => f.paid).reduce((sum, f) => sum + f.amount, 0);

  return (
    <PageWrapper>
      <div className="space-y-8">
        {/* Child Selector */}
        <div>
          <h2 className="text-xs font-semibold text-slate-600 mb-3 md:mb-4 uppercase tracking-widest">My Children</h2>
          <div className="flex gap-2 md:gap-3 overflow-x-auto pb-3 items-center -mx-4 px-4 md:mx-0 md:px-0">
            {linkedChildren.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className={`px-4 md:px-5 py-2 md:py-2.5 rounded-12 whitespace-nowrap transition-all duration-200 font-medium text-xs md:text-sm flex-shrink-0 ${
                  selectedChild.id === child.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-medium hover:shadow-elevated'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {child.name} (Grade {child.grade})
              </button>
            ))}
            <button
              onClick={() => setShowLinkChildModal(true)}
              className="px-4 md:px-5 py-2 md:py-2.5 rounded-12 whitespace-nowrap transition-all duration-200 font-medium text-xs md:text-sm bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:shadow-soft flex items-center gap-1.5 md:gap-2 border border-emerald-200 flex-shrink-0"
              title="Link another child account"
            >
              <Plus size={16} className="md:hidden" /> <Plus size={18} className="hidden md:block" /> <span className="hidden sm:inline">Add Child</span>
            </button>
          </div>
        </div>

        {/* Header Card */}
        <Card className="bg-gradient-to-br from-blue-600 via-blue-650 to-blue-700 text-white border-0 cursor-pointer hover:shadow-elevated shadow-medium" onClick={() => navigate('/parent/profile')}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2 tracking-tight break-words">{selectedChild.name}</h2>
              <p className="text-sm md:text-base text-blue-100 font-medium">Grade {selectedChild.grade} • Section {selectedChild.section}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-4xl md:text-5xl font-bold">{selectedChild.avgScore}%</p>
              <p className="text-xs md:text-sm text-blue-100 font-medium">Average Score</p>
            </div>
          </div>
        </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        <Card variant="elevated" size="md">
          <div className="flex flex-col items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-tight md:tracking-wide mb-1">Current Average</p>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 break-words">{selectedChild.avgScore}%</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-12 bg-amber-100 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
            </div>
          </div>
        </Card>
        <Card variant="elevated" size="md">
          <div className="flex flex-col items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-tight md:tracking-wide mb-1">Attendance</p>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 break-words">{selectedChild.attendance}%</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-12 bg-green-100 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
            </div>
          </div>
        </Card>
        <Card variant="elevated" size="md">
          <div className="flex flex-col items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-tight md:tracking-wide mb-1">Fees Paid</p>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 break-words">₹{paidAmount}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-12 bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
            </div>
          </div>
        </Card>
        <Card variant="elevated" size="md">
          <div className="flex flex-col items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-tight md:tracking-wide mb-1">Fees Pending</p>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 break-words">₹{totalFeeAmount - paidAmount}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-12 bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Performance & Attendance - Stack on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card variant="elevated">
          <PerformanceLineChart data={performanceData} title="Performance Trend" />
        </Card>
        <Card variant="elevated">
          {/* Advanced Attendance Insights */}
          <div className="space-y-6">
            {/* Title */}
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Attendance Insights
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
                    stroke={selectedChild.attendance >= 90 ? '#10b981' : selectedChild.attendance >= 80 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="8"
                    strokeDasharray={`${(selectedChild.attendance / 100) * 2 * Math.PI * 54} ${2 * Math.PI * 54}`}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 0.5s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-slate-900">{selectedChild.attendance}%</span>
                  <span className="text-xs text-slate-500 font-medium">Present</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`px-4 py-2 rounded-full text-sm font-bold inline-flex items-center gap-2 ${
                selectedChild.attendance >= 90
                  ? 'bg-green-100 text-green-800'
                  : selectedChild.attendance >= 80
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {selectedChild.attendance >= 90 ? '✓ Excellent' : selectedChild.attendance >= 80 ? '⚠ Good' : '✗ Needs Improvement'}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-xs text-green-700 font-medium mb-1">Days Present</p>
                <p className="text-xl font-bold text-green-900">{Math.round((selectedChild.attendance / 100) * 200)}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <p className="text-xs text-red-700 font-medium mb-1">Days Absent</p>
                <p className="text-xl font-bold text-red-900">{Math.round(((100 - selectedChild.attendance) / 100) * 200)}</p>
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
                  <p className="text-xs text-amber-600 font-medium">Keep it up!</p>
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
      </div>

      {/* Subject-wise Marks */}
      <Card variant="elevated">
        <h3 className="text-base md:text-lg font-bold text-slate-900 mb-4 md:mb-6 pb-3 md:pb-4 border-b border-slate-200 flex items-center gap-2">
          <TrendingUp className="w-4 md:w-5 h-4 md:h-5 text-blue-600 flex-shrink-0" />
          <span className="break-words">Subject-wise Exam Marks</span>
        </h3>
        <div className="space-y-4">
          {subjectMarks.map((subject) => (
            <div key={subject.subject} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="font-semibold text-slate-900">{subject.subject}</span>
                  <span className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-8 text-sm">{subject.marks}/{subject.total}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${(subject.marks / subject.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Homework & Fees Grid - Stack on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Homework Tracking */}
        <Card variant="elevated">
          <h3 className="text-base md:text-lg font-bold text-slate-900 mb-4 md:mb-6 pb-3 md:pb-4 border-b border-slate-200 flex items-center gap-2">
            <AlertCircle className="w-4 md:w-5 h-4 md:h-5 text-orange-600 flex-shrink-0" />
            <span>Child's Homework</span>
          </h3>
          <div className="space-y-2 md:space-y-3">
            {homework.map((hw) => (
              <div key={hw.id} className="flex items-start justify-between gap-2 p-2 md:p-3 bg-slate-50 rounded-12 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-all duration-200 group">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm md:text-base text-slate-900 break-words">{hw.title}</p>
                  <p className="text-xs text-slate-600 mt-1">{hw.subject} • Due: {hw.dueDate}</p>
                </div>
                {hw.submitted && <Check className="w-4 md:w-5 h-4 md:h-5 text-emerald-600 ml-2 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </Card>

        {/* Fee Status - Advanced Updates */}
        <Card variant="elevated">
          <h3 className="text-base md:text-lg font-bold text-slate-900 mb-4 md:mb-6 pb-3 md:pb-4 border-b border-slate-200 flex items-center gap-2">
            <IndianRupee className="w-4 md:w-5 h-4 md:h-5 text-blue-600 flex-shrink-0" />
            <span>Fee Status</span>
          </h3>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-green-700 font-medium mb-1">Paid</p>
              <p className="text-lg font-bold text-green-900">₹{paidAmount}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-xs text-red-700 font-medium mb-1">Pending</p>
              <p className="text-lg font-bold text-red-900">₹{totalFeeAmount - paidAmount}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700 font-medium mb-1">Total</p>
              <p className="text-lg font-bold text-blue-900">₹{totalFeeAmount}</p>
            </div>
          </div>

          {/* Payment Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold text-slate-700">Payment Progress</p>
              <p className="text-sm font-bold text-slate-900">{Math.round((paidAmount / totalFeeAmount) * 100)}%</p>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(paidAmount / totalFeeAmount) * 100}%` }}
              />
            </div>
          </div>

          {/* Fee Details */}
          <div className="space-y-2 border-t border-slate-200 pt-4">
            <p className="text-sm font-semibold text-slate-700 mb-3">Monthly Breakdown</p>
            {FEES_DATA.map((fee) => (
              <div key={fee.month} className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                fee.paid 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-orange-50 border-orange-200'
              }`}>
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-2 h-2 rounded-full ${
                    fee.paid ? 'bg-green-600' : 'bg-orange-600'
                  }`} />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{fee.month}</p>
                    <p className="text-xs text-slate-600">₹{fee.amount}</p>
                  </div>
                </div>
                <Badge variant={fee.paid ? 'success' : 'warning'}>
                  {fee.paid ? '✓ Paid' : '⏱ Pending'}
                </Badge>
              </div>
            ))}
          </div>

          {/* Info Message */}
          {pendingFees > 0 && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs font-medium text-amber-800">
                💡 You have ₹{totalFeeAmount - paidAmount} pending for {pendingFees} month{pendingFees > 1 ? 's' : ''}. Please contact the admin to process payment.
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <Card variant="elevated">
        <h3 className="text-lg font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="gradient-amber" className="p-4 h-auto flex-col gap-2 justify-center">
            <p className="text-2xl">📱</p>
            <p className="text-sm font-medium">View Homework</p>
          </Button>
          <Button variant="gradient-purple" className="p-4 h-auto flex-col gap-2 justify-center">
            <p className="text-2xl">📞</p>
            <p className="text-sm font-medium">Contact Teacher</p>
          </Button>
          <Button variant="primary" className="p-4 h-auto flex-col gap-2 justify-center">
            <p className="text-2xl">🚌</p>
            <p className="text-sm font-medium">Bus Tracking</p>
          </Button>
          <Button variant="gradient-emerald" className="p-4 h-auto flex-col gap-2 justify-center">
            <p className="text-2xl">🎉</p>
            <p className="text-sm font-medium">Events & Calendar</p>
          </Button>
        </div>
      </Card>



      {/* Link Another Child Modal */}
      {showLinkChildModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md shadow-elevated" variant="elevated">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-slate-900">Link Another Child</h2>
              <button
                onClick={() => {
                  setShowLinkChildModal(false);
                  setLinkChildEmail('');
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 transition-all duration-200 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-xl border border-emerald-200/50 backdrop-blur-sm">
              <p className="text-sm text-emerald-700 font-medium">
                ✨ Enter your other child's student email to link their account to your dashboard.
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Student Email</label>
              <input
                type="email"
                value={linkChildEmail}
                onChange={(e) => setLinkChildEmail(e.target.value)}
                placeholder="e.g., anjali@dsu.com"
                className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 placeholder-slate-400"
              />
              <p className="text-xs text-slate-500 mt-2">
                Student email is generated when their account is created. Contact the school if you're unsure.
              </p>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200/50 rounded-xl mb-6 backdrop-blur-sm">
              <p className="text-sm text-blue-700">
                💡 <strong>How it works:</strong> After linking, you can view and manage all your children's data from one dashboard. Switch between children using the buttons at the top.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowLinkChildModal(false);
                  setLinkChildEmail('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="premium"
                onClick={handleLinkChild}
                disabled={!linkChildEmail.trim()}
                className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Link Child
              </Button>
            </div>
          </Card>
        </div>
      )}
      </div>
    </PageWrapper>
  );
};
