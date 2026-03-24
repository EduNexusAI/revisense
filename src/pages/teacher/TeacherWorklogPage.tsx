import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Calendar, Clock, FileText, Plus, Edit2, X, CheckCircle, AlertCircle, Coffee } from 'lucide-react';
import { showToast } from '../../utils/toast';

// Leave Interface
interface Leave {
  id: string;
  startDate: string;
  endDate: string;
  leaveType: 'sick' | 'casual' | 'emergency' | 'vacation';
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedOn: string;
}

// Attendance Interface
interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'early-leave';
}

// Teaching Hours Interface
interface TeachingHours {
  id: string;
  date: string;
  subject: string;
  startTime: string;
  endTime: string;
  classNumber: string;
  hoursWorked: number;
}

// Dummy Data
const DUMMY_LEAVES: Leave[] = [
  { id: '1', startDate: '2026-03-15', endDate: '2026-03-17', leaveType: 'sick', reason: 'Medical checkup', status: 'approved', appliedOn: '2026-03-10' },
  { id: '2', startDate: '2026-04-05', endDate: '2026-04-09', leaveType: 'vacation', reason: 'Family vacation', status: 'pending', appliedOn: '2026-03-12' },
];

const DUMMY_ATTENDANCE: AttendanceRecord[] = [
  { id: '1', date: '2026-03-16', checkIn: '08:45', checkOut: '16:30', status: 'present' },
  { id: '2', date: '2026-03-15', checkIn: '08:55', checkOut: '16:45', status: 'late' },
  { id: '3', date: '2026-03-14', checkIn: '08:30', checkOut: '15:30', status: 'early-leave' },
  { id: '4', date: '2026-03-13', checkIn: '08:40', checkOut: '16:40', status: 'present' },
];

const DUMMY_TEACHING_HOURS: TeachingHours[] = [
  { id: '1', date: '2026-03-16', subject: 'Mathematics', startTime: '09:00', endTime: '10:30', classNumber: '9A', hoursWorked: 1.5 },
  { id: '2', date: '2026-03-16', subject: 'Science', startTime: '11:00', endTime: '12:30', classNumber: '9B', hoursWorked: 1.5 },
  { id: '3', date: '2026-03-15', subject: 'Mathematics', startTime: '09:00', endTime: '10:30', classNumber: '8A', hoursWorked: 1.5 },
  { id: '4', date: '2026-03-15', subject: 'Mathematics', startTime: '11:00', endTime: '12:45', classNumber: '9A', hoursWorked: 1.75 },
];

const LEAVE_TYPES = [
  { value: 'sick', label: 'Sick Leave' },
  { value: 'casual', label: 'Casual Leave' },
  { value: 'emergency', label: 'Emergency Leave' },
  { value: 'vacation', label: 'Vacation' },
];

export const TeacherWorklogPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'leave' | 'attendance' | 'teaching'>('leave');

  // Leave State
  const [leaves, setLeaves] = useState<Leave[]>(DUMMY_LEAVES);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [editingLeave, setEditingLeave] = useState<string | null>(null);
  const [leaveForm, setLeaveForm] = useState({
    startDate: '',
    endDate: '',
    leaveType: 'casual' as const,
    reason: '',
  });

  // Attendance State
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(DUMMY_ATTENDANCE);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [attendanceForm, setAttendanceForm] = useState({
    date: new Date().toISOString().split('T')[0],
    checkIn: '',
    checkOut: '',
  });

  // Teaching Hours State
  const [teachingHours, setTeachingHours] = useState<TeachingHours[]>(DUMMY_TEACHING_HOURS);
  const [showHoursModal, setShowHoursModal] = useState(false);
  const [editingHours, setEditingHours] = useState<string | null>(null);
  const [hoursForm, setHoursForm] = useState({
    date: new Date().toISOString().split('T')[0],
    subject: '',
    startTime: '',
    endTime: '',
    classNumber: '',
  });

  // ======================
  // LEAVE FUNCTIONS
  // ======================
  const handleAddLeave = () => {
    if (!leaveForm.startDate || !leaveForm.endDate || !leaveForm.reason) {
      showToast('Please fill all required fields', 'warning');
      return;
    }

    if (editingLeave) {
      setLeaves(
        leaves.map((l) =>
          l.id === editingLeave
            ? { ...l, ...leaveForm, status: 'pending' as const }
            : l
        )
      );
      setEditingLeave(null);
      showToast('Leave updated successfully!', 'success');
    } else {
      const newLeave: Leave = {
        id: Date.now().toString(),
        ...leaveForm,
        status: 'pending',
        appliedOn: new Date().toISOString().split('T')[0],
      };
      setLeaves([...leaves, newLeave]);
      showToast('Leave application submitted!', 'success');
    }

    setLeaveForm({ startDate: '', endDate: '', leaveType: 'casual', reason: '' });
    setShowLeaveModal(false);
  };

  const handleEditLeave = (id: string) => {
    const leave = leaves.find((l) => l.id === id);
    if (leave) {
      setLeaveForm({
        startDate: leave.startDate,
        endDate: leave.endDate,
        leaveType: leave.leaveType,
        reason: leave.reason,
      });
      setEditingLeave(id);
      setShowLeaveModal(true);
    }
  };

  const handleDeleteLeave = (id: string) => {
    setLeaves(leaves.filter((l) => l.id !== id));
    showToast('Leave cancelled', 'info');
  };

  const getLeaveTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      sick: 'bg-red-100 text-red-800',
      casual: 'bg-blue-100 text-blue-800',
      emergency: 'bg-orange-100 text-orange-800',
      vacation: 'bg-green-100 text-green-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  // ======================
  // ATTENDANCE FUNCTIONS
  // ======================
  const handleAddAttendance = () => {
    if (!attendanceForm.date || !attendanceForm.checkIn || !attendanceForm.checkOut) {
      showToast('Please fill all fields', 'warning');
      return;
    }

    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      ...attendanceForm,
      status: 'present',
    };

    setAttendance([newRecord, ...attendance]);
    setAttendanceForm({
      date: new Date().toISOString().split('T')[0],
      checkIn: '',
      checkOut: '',
    });
    setShowAttendanceModal(false);
    showToast('Attendance recorded successfully!', 'success');
  };

  const handleDeleteAttendance = (id: string) => {
    setAttendance(attendance.filter((a) => a.id !== id));
    showToast('Record deleted', 'info');
  };

  const getAttendanceColor = (status: string) => {
    const colors: Record<string, string> = {
      present: 'bg-green-100 text-green-800',
      absent: 'bg-red-100 text-red-800',
      late: 'bg-yellow-100 text-yellow-800',
      'early-leave': 'bg-orange-100 text-orange-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // ======================
  // TEACHING HOURS FUNCTIONS
  // ======================
  const handleAddHours = () => {
    if (!hoursForm.date || !hoursForm.subject || !hoursForm.startTime || !hoursForm.endTime || !hoursForm.classNumber) {
      showToast('Please fill all required fields', 'warning');
      return;
    }

    const start = new Date(`2026-01-01 ${hoursForm.startTime}`);
    const end = new Date(`2026-01-01 ${hoursForm.endTime}`);
    const hoursWorked = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

    if (editingHours) {
      setTeachingHours(
        teachingHours.map((h) =>
          h.id === editingHours
            ? { ...h, ...hoursForm, hoursWorked }
            : h
        )
      );
      setEditingHours(null);
      showToast('Teaching hours updated!', 'success');
    } else {
      const newHours: TeachingHours = {
        id: Date.now().toString(),
        ...hoursForm,
        hoursWorked,
      };
      setTeachingHours([newHours, ...teachingHours]);
      showToast('Teaching hours recorded!', 'success');
    }

    setHoursForm({
      date: new Date().toISOString().split('T')[0],
      subject: '',
      startTime: '',
      endTime: '',
      classNumber: '',
    });
    setShowHoursModal(false);
  };

  const handleEditHours = (id: string) => {
    const hours = teachingHours.find((h) => h.id === id);
    if (hours) {
      setHoursForm({
        date: hours.date,
        subject: hours.subject,
        startTime: hours.startTime,
        endTime: hours.endTime,
        classNumber: hours.classNumber,
      });
      setEditingHours(id);
      setShowHoursModal(true);
    }
  };

  const handleDeleteHours = (id: string) => {
    setTeachingHours(teachingHours.filter((h) => h.id !== id));
    showToast('Record deleted', 'info');
  };

  const totalTeachingHours = teachingHours.reduce((sum, h) => sum + h.hoursWorked, 0);
  const presentDays = attendance.filter((a) => a.status === 'present').length;

  return (
    <PageWrapper title="Work & Attendance" icon={<Clock className="w-6 h-6" />}>
      {/* Tab Navigation - Professional & Responsive */}
      <div className="flex gap-2 md:gap-4 mb-6 border-b-2 border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('leave')}
          className={`px-4 md:px-6 py-3 font-semibold text-sm md:text-base transition-all whitespace-nowrap border-b-2 flex items-center gap-2 ${
            activeTab === 'leave'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          }`}
        >
          <Calendar className="w-5 h-5" />
          Leave Application
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`px-4 md:px-6 py-3 font-semibold text-sm md:text-base transition-all whitespace-nowrap border-b-2 flex items-center gap-2 ${
            activeTab === 'attendance'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          }`}
        >
          <Coffee className="w-5 h-5" />
          My Attendance
        </button>
        <button
          onClick={() => setActiveTab('teaching')}
          className={`px-4 md:px-6 py-3 font-semibold text-sm md:text-base transition-all whitespace-nowrap border-b-2 flex items-center gap-2 ${
            activeTab === 'teaching'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          }`}
        >
          <Clock className="w-5 h-5" />
          Teaching Hours
        </button>
      </div>

      {/* ===================================
          LEAVE APPLICATION TAB
          =================================== */}
      {activeTab === 'leave' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <Card className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600">{leaves.filter((l) => l.status === 'pending').length}</div>
              <p className="text-sm md:text-base text-gray-600 mt-2">Pending Leaves</p>
            </Card>
            <Card className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-600">{leaves.filter((l) => l.status === 'approved').length}</div>
              <p className="text-sm md:text-base text-gray-600 mt-2">Approved</p>
            </Card>
            <Card className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-red-600">{leaves.filter((l) => l.status === 'rejected').length}</div>
              <p className="text-sm md:text-base text-gray-600 mt-2">Rejected</p>
            </Card>
          </div>

          {/* Add Leave Button */}
          <Button
            onClick={() => {
              setEditingLeave(null);
              setLeaveForm({ startDate: '', endDate: '', leaveType: 'casual', reason: '' });
              setShowLeaveModal(true);
            }}
            icon={<Plus className="w-4 h-4" />}
            variant="premium"
          >
            Apply for Leave
          </Button>

          {/* Leave List */}
          <div className="space-y-3">
            {leaves.map((leave) => (
              <Card key={leave.id} className="hover:shadow-md transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-gray-900">{leave.startDate} to {leave.endDate}</h3>
                      <Badge className={getLeaveTypeColor(leave.leaveType)}>
                        {LEAVE_TYPES.find((t) => t.value === leave.leaveType)?.label}
                      </Badge>
                      <Badge className={leave.status === 'approved' ? 'bg-green-100 text-green-800' : leave.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-1">{leave.reason}</p>
                    <p className="text-xs text-gray-500">Applied on: {leave.appliedOn}</p>
                  </div>
                  <div className="flex gap-2">
                    {leave.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleEditLeave(leave.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLeave(leave.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Leave Modal */}
          {showLeaveModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <Card className="w-full max-w-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">{editingLeave ? 'Edit Leave' : 'Apply for Leave'}</h2>
                  <button
                    onClick={() => setShowLeaveModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Start Date *</label>
                      <Input
                        type="date"
                        value={leaveForm.startDate}
                        onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">End Date *</label>
                      <Input
                        type="date"
                        value={leaveForm.endDate}
                        onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Leave Type *</label>
                    <select
                      value={leaveForm.leaveType}
                      onChange={(e) => setLeaveForm({ ...leaveForm, leaveType: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {LEAVE_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Reason *</label>
                    <textarea
                      value={leaveForm.reason}
                      onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="Enter reason for leave"
                    />
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button onClick={handleAddLeave} variant="premium" className="flex-1">
                      {editingLeave ? 'Update Leave' : 'Submit Application'}
                    </Button>
                    <Button
                      onClick={() => setShowLeaveModal(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* ===================================
          ATTENDANCE TAB
          =================================== */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          {/* Attendance Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Card className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-600">{presentDays}</div>
              <p className="text-sm md:text-base text-gray-600 mt-2">Present Days</p>
            </Card>
            <Card className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-red-600">{attendance.filter((a) => a.status === 'absent').length}</div>
              <p className="text-sm md:text-base text-gray-600 mt-2">Absent</p>
            </Card>
            <Card className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-yellow-600">{attendance.filter((a) => a.status === 'late').length}</div>
              <p className="text-sm md:text-base text-gray-600 mt-2">Late Arrivals</p>
            </Card>
            <Card className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-orange-600">{attendance.filter((a) => a.status === 'early-leave').length}</div>
              <p className="text-sm md:text-base text-gray-600 mt-2">Early Leaves</p>
            </Card>
          </div>

          {/* Add Attendance Button */}
          <Button
            onClick={() => {
              setAttendanceForm({
                date: new Date().toISOString().split('T')[0],
                checkIn: '',
                checkOut: '',
              });
              setShowAttendanceModal(true);
            }}
            icon={<Plus className="w-4 h-4" />}
            variant="premium"
          >
            Record Attendance
          </Button>

          {/* Attendance Table - Desktop */}
          <Card className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b-2 border-gray-300">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Check-In</th>
                    <th className="px-4 py-3 text-left">Check-Out</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((record) => (
                    <tr key={record.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{record.date}</td>
                      <td className="px-4 py-3">{record.checkIn}</td>
                      <td className="px-4 py-3">{record.checkOut}</td>
                      <td className="px-4 py-3 text-center">
                        <Badge className={getAttendanceColor(record.status)}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleDeleteAttendance(record.id)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Attendance Cards - Mobile */}
          <div className="md:hidden space-y-4">
            {attendance.map((record) => (
              <Card key={record.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-base">{record.date}</p>
                    <div className="text-sm text-gray-600 mt-2">
                      <p>In: {record.checkIn}</p>
                      <p>Out: {record.checkOut}</p>
                    </div>
                    <Badge className={`mt-3 text-sm ${getAttendanceColor(record.status)}`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </Badge>
                  </div>
                  <button
                    onClick={() => handleDeleteAttendance(record.id)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded transition flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {/* Attendance Modal */}
          {showAttendanceModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <Card className="w-full max-w-md">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Record Attendance</h2>
                  <button
                    onClick={() => setShowAttendanceModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Date *</label>
                    <Input
                      type="date"
                      value={attendanceForm.date}
                      onChange={(e) => setAttendanceForm({ ...attendanceForm, date: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Check-In Time *</label>
                    <Input
                      type="time"
                      value={attendanceForm.checkIn}
                      onChange={(e) => setAttendanceForm({ ...attendanceForm, checkIn: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Check-Out Time *</label>
                    <Input
                      type="time"
                      value={attendanceForm.checkOut}
                      onChange={(e) => setAttendanceForm({ ...attendanceForm, checkOut: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button onClick={handleAddAttendance} variant="premium" className="flex-1">
                      Save Attendance
                    </Button>
                    <Button
                      onClick={() => setShowAttendanceModal(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* ===================================
          TEACHING HOURS TAB
          =================================== */}
      {activeTab === 'teaching' && (
        <div className="space-y-6">
          {/* Teaching Hours Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <Card className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600">{totalTeachingHours.toFixed(1)}</div>
              <p className="text-sm md:text-base text-gray-600 mt-2\">Total Hours This Week</p>
            </Card>
            <Card className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600\">{teachingHours.length}</div>
              <p className="text-sm md:text-base text-gray-600 mt-2\">Classes Conducted</p>
            </Card>
            <Card className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-600\">{(totalTeachingHours / teachingHours.length).toFixed(1)}</div>
              <p className="text-sm md:text-base text-gray-600 mt-2\">Avg. Hours per Class</p>
            </Card>
          </div>

          {/* Add Hours Button */}
          <Button
            onClick={() => {
              setEditingHours(null);
              setHoursForm({
                date: new Date().toISOString().split('T')[0],
                subject: '',
                startTime: '',
                endTime: '',
                classNumber: '',
              });
              setShowHoursModal(true);
            }}
            icon={<Plus className="w-4 h-4" />}
            variant="premium"
          >
            Add Teaching Hours
          </Button>

          {/* Teaching Hours Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b-2 border-gray-300">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Subject</th>
                    <th className="px-4 py-3 text-left">Class</th>
                    <th className="px-4 py-3 text-center">Time</th>
                    <th className="px-4 py-3 text-center">Hours</th>
                    <th className="px-4 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teachingHours.map((hours) => (
                    <tr key={hours.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{hours.date}</td>
                      <td className="px-4 py-3 font-semibold">{hours.subject}</td>
                      <td className="px-4 py-3">{hours.classNumber}</td>
                      <td className="px-4 py-3 text-center">{hours.startTime} - {hours.endTime}</td>
                      <td className="px-4 py-3 text-center font-bold text-blue-600">{hours.hoursWorked}h</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleEditHours(hours.id)}
                            className="text-blue-600 hover:bg-blue-50 p-2 rounded transition"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteHours(hours.id)}
                            className="text-red-600 hover:bg-red-50 p-2 rounded transition"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Teaching Hours Modal */}
          {showHoursModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <Card className="w-full max-w-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">{editingHours ? 'Edit Teaching Hours' : 'Add Teaching Hours'}</h2>
                  <button
                    onClick={() => setShowHoursModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Date *</label>
                      <Input
                        type="date"
                        value={hoursForm.date}
                        onChange={(e) => setHoursForm({ ...hoursForm, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Class *</label>
                      <Input
                        type="text"
                        placeholder="e.g., 9A"
                        value={hoursForm.classNumber}
                        onChange={(e) => setHoursForm({ ...hoursForm, classNumber: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Subject *</label>
                    <Input
                      type="text"
                      placeholder="e.g., Mathematics"
                      value={hoursForm.subject}
                      onChange={(e) => setHoursForm({ ...hoursForm, subject: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Start Time *</label>
                      <Input
                        type="time"
                        value={hoursForm.startTime}
                        onChange={(e) => setHoursForm({ ...hoursForm, startTime: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">End Time *</label>
                      <Input
                        type="time"
                        value={hoursForm.endTime}
                        onChange={(e) => setHoursForm({ ...hoursForm, endTime: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button onClick={handleAddHours} variant="premium" className="flex-1">
                      {editingHours ? 'Update Hours' : 'Add Hours'}
                    </Button>
                    <Button
                      onClick={() => setShowHoursModal(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}
    </PageWrapper>
  );
};
