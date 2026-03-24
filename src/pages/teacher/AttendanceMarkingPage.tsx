import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { CalendarDays, Save, RotateCcw, Check, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { showToast } from '../../utils/toast';

// Dummy student data for demo
const DUMMY_STUDENTS = [
  {
    id: '1',
    name: 'Arjun Singh',
    grade: 8,
    section: 'A',
    admission_number: 'ADM001',
    photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    email: 'arjun@school.com',
    class_id: 'class1',
    parent_id: 'parent1',
    phone: '+91 98765 43210',
    school_id: 'school1',
    user_id: 'user1',
    dob: new Date('2010-05-15'),
  },
  {
    id: '2',
    name: 'Priya Sharma',
    grade: 8,
    section: 'A',
    admission_number: 'ADM002',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    email: 'priya@school.com',
    class_id: 'class1',
    parent_id: 'parent2',
    phone: '+91 98765 43211',
    school_id: 'school1',
    user_id: 'user2',
    dob: new Date('2010-06-20'),
  },
  {
    id: '3',
    name: 'Ravi Kumar',
    grade: 8,
    section: 'A',
    admission_number: 'ADM003',
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    email: 'ravi@school.com',
    class_id: 'class1',
    parent_id: 'parent3',
    phone: '+91 98765 43212',
    school_id: 'school1',
    user_id: 'user3',
    dob: new Date('2010-07-10'),
  },
  {
    id: '4',
    name: 'Sneha Patel',
    grade: 8,
    section: 'A',
    admission_number: 'ADM004',
    photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    email: 'sneha@school.com',
    class_id: 'class1',
    parent_id: 'parent4',
    phone: '+91 98765 43213',
    school_id: 'school1',
    user_id: 'user4',
    dob: new Date('2010-03-25'),
  },
  {
    id: '5',
    name: 'Vikram Desai',
    grade: 8,
    section: 'A',
    admission_number: 'ADM005',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    email: 'vikram@school.com',
    class_id: 'class1',
    parent_id: 'parent5',
    phone: '+91 98765 43214',
    school_id: 'school1',
    user_id: 'user5',
    dob: new Date('2010-08-12'),
  },
  {
    id: '6',
    name: 'Divya Singh',
    grade: 8,
    section: 'A',
    admission_number: 'ADM006',
    photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    email: 'divya@school.com',
    class_id: 'class1',
    parent_id: 'parent6',
    phone: '+91 98765 43215',
    school_id: 'school1',
    user_id: 'user6',
    dob: new Date('2010-02-08'),
  },
];


// ===== MOBILE SWIPE CARD COMPONENT =====
interface SwipeCardProps {
  student: (typeof DUMMY_STUDENTS)[0];
  index: number;
  total: number;
  onMark: (status: 'present' | 'absent') => void;
  status?: 'present' | 'absent';
}

const SwipeCard: React.FC<SwipeCardProps> = ({ student, index, total, onMark, status }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const minSwipeDistance = 50;
  const maxDragDistance = 150;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const currentTouch = e.targetTouches[0].clientX;
    const diff = currentTouch - touchStart;
    
    // Limit drag distance for visual feedback
    const clampedDiff = Math.max(-maxDragDistance, Math.min(maxDragDistance, diff));
    setOffsetX(clampedDiff);
    
    // Show hint which direction
    if (diff > 30) {
      setSwipeDirection('right');
    } else if (diff < -30) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection(null);
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentTouch = e.changedTouches[0].clientX;
    const distance = currentTouch - touchStart;
    const isRightSwipe = distance > minSwipeDistance;
    const isLeftSwipe = distance < -minSwipeDistance;

    if (isRightSwipe) {
      onMark('present');
      // Animate off screen to the right
      if (cardRef.current) {
        cardRef.current.style.transition = 'all 0.3s ease-out';
        cardRef.current.style.transform = 'translateX(400px) rotate(20deg)';
        cardRef.current.style.opacity = '0';
      }
    } else if (isLeftSwipe) {
      onMark('absent');
      // Animate off screen to the left
      if (cardRef.current) {
        cardRef.current.style.transition = 'all 0.3s ease-out';
        cardRef.current.style.transform = 'translateX(-400px) rotate(-20deg)';
        cardRef.current.style.opacity = '0';
      }
    } else {
      // Snap back
      if (cardRef.current) {
        cardRef.current.style.transition = 'all 0.2s ease-out';
        cardRef.current.style.transform = 'translateX(0) rotate(0)';
      }
    }

    setOffsetX(0);
    setTouchStart(null);
    setSwipeDirection(null);
    setIsDragging(false);
  };

  return (
    <div
      ref={cardRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={`w-full h-80 rounded-3xl shadow-2xl cursor-grab active:cursor-grabbing select-none transition-all backdrop-blur-sm border border-white border-opacity-10 ${
        isDragging ? '' : 'transition-all'
      }`}
      style={{
        transform: isDragging ? `translateX(${offsetX}px) rotate(${offsetX * 0.05}deg)` : 'translateX(0)',
        background: status === 'present' 
          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.95) 50%, rgba(6, 78, 59, 0.95) 100%)'
          : status === 'absent'
          ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.95) 50%, rgba(127, 29, 29, 0.95) 100%)'
          : 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 50%, rgba(15, 23, 42, 0.98) 100%)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Content */}
      <div className="h-full p-8 text-white flex flex-col justify-between">
        <div className="text-center">
          {student.photo_url ? (
            <img
              src={student.photo_url}
              alt={student.name}
              className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-28 h-28 rounded-full mx-auto bg-gradient-to-br from-slate-800 via-slate-900 to-black flex items-center justify-center border-4 border-white shadow-lg text-5xl font-bold text-slate-300">
              {student.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">{student.name}</h3>
          <p className="text-lg opacity-90">Grade {student.grade} • Section {student.section}</p>
          <p className="text-sm opacity-75">{student.admission_number}</p>
        </div>

        {/* Swipe Hints */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-semibold">
            <div className={`flex items-center gap-2 transition-all ${swipeDirection === 'left' ? 'opacity-100 text-red-200' : 'opacity-50'}`}>
              <X className="w-5 h-5" /> ABSENT
            </div>
            <div className={`flex items-center gap-2 transition-all ${swipeDirection === 'right' ? 'opacity-100 text-green-200' : 'opacity-50'}`}>
              CHECK <Check className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs text-center opacity-75">
            {index + 1} of {total}
          </p>
        </div>
      </div>

      {/* Status Overlay */}
      {(status === 'present' || status === 'absent') && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="text-center">
            {status === 'present' ? (
              <>
                <Check className="w-20 h-20 text-white mx-auto mb-3" />
                <p className="text-white text-2xl font-bold">PRESENT ✓</p>
              </>
            ) : (
              <>
                <X className="w-20 h-20 text-white mx-auto mb-3" />
                <p className="text-white text-2xl font-bold">ABSENT ✗</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ===== DESKTOP PROFESSIONAL CARD COMPONENT =====
interface DesktopAttendanceRowProps {
  student: (typeof DUMMY_STUDENTS)[0];
  status?: 'present' | 'absent';
  onMark: (status: 'present' | 'absent') => void;
}

const DesktopAttendanceRow: React.FC<DesktopAttendanceRowProps> = ({ student, status, onMark }) => {
  return (
    <Card className={`p-5 flex items-center justify-between transition-all duration-200 border-l-4 ${
      status === 'present'
        ? 'border-l-green-500 bg-gradient-to-r from-green-50 to-transparent hover:shadow-lg'
        : status === 'absent'
        ? 'border-l-red-500 bg-gradient-to-r from-red-50 to-transparent hover:shadow-lg'
        : 'border-l-slate-300 bg-gradient-to-r from-slate-50 via-white to-transparent hover:shadow-md'
    }`}>
      <div className="flex-1">
        <div className="flex items-center gap-4">
          {student.photo_url ? (
            <img
              src={student.photo_url}
              alt={student.name}
              className="w-14 h-14 rounded-full object-cover shadow-md"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-800 via-slate-900 to-black flex items-center justify-center text-white text-xl font-bold shadow-lg border border-slate-700">
              {student.name.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="font-semibold text-gray-900">{student.name}</h4>
            <p className="text-sm text-gray-600">
              Grade {student.grade} • {student.admission_number}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Status Indicator */}
        {status && (
          <div className={`px-4 py-2 rounded-xl text-sm font-bold shadow-md ${
            status === 'present'
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
              : 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
          }`}>
            {status === 'present' ? '✓ Present' : '✗ Absent'}
          </div>
        )}

        {/* Buttons */}
        <Button
          variant={status === 'present' ? 'default' : 'outline'}
          onClick={() => onMark('present')}
          icon={<Check className="w-4 h-4" />}
          className={`transition-all font-semibold ${
            status === 'present'
              ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg'
              : 'border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-400 hover:shadow-md'
          }`}
        >
          Present
        </Button>

        <Button
          variant={status === 'absent' ? 'default' : 'outline'}
          onClick={() => onMark('absent')}
          icon={<X className="w-4 h-4" />}
          className={`transition-all font-semibold ${
            status === 'absent'
              ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg'
              : 'border-2 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-400 hover:shadow-md'
          }`}
        >
          Absent
        </Button>
      </div>
    </Card>
  );
};

// ===== MAIN PAGE COMPONENT =====
export const AttendanceMarkingPage: React.FC = () => {
  const { t } = useTranslation();
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent'>>({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [submitted, setSubmitted] = useState(false);
  const [currentSwipeIndex, setCurrentSwipeIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle responsive resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMark = (studentId: string, status: 'present' | 'absent') => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));

    // For mobile, move to next student
    if (isMobile && currentSwipeIndex < DUMMY_STUDENTS.length - 1) {
      setTimeout(() => {
        setCurrentSwipeIndex((prev) => prev + 1);
      }, 300);
    }
  };

  const handleMarkMobile = (status: 'present' | 'absent') => {
    const currentStudent = DUMMY_STUDENTS[currentSwipeIndex];
    handleMark(currentStudent.id, status);
  };

  const handleSubmit = () => {
    if (totalMarked === 0) {
      showToast('Please mark attendance for at least one student', 'warning');
      return;
    }
    setSubmitted(true);
    showToast(`Attendance submitted for ${totalMarked} students`, 'success');
    setTimeout(() => {
      setSubmitted(false);
      setAttendance({});
      setCurrentSwipeIndex(0);
    }, 2000);
  };

  const handleReset = () => {
    setAttendance({});
    setCurrentSwipeIndex(0);
    showToast('Attendance reset', 'info');
  };

  const totalMarked = Object.keys(attendance).length;
  const totalStudents = DUMMY_STUDENTS.length;
  const presentCount = Object.values(attendance).filter((s) => s === 'present').length;
  const absentCount = Object.values(attendance).filter((s) => s === 'absent').length;

  // Get students not yet marked (for mobile view)
  const unmarkedStudents = DUMMY_STUDENTS.filter((s) => !attendance[s.id]);

  return (
    <PageWrapper title={t('attendance')} icon={<CalendarDays className="w-6 h-6" />}>
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Card className="text-center" variant="outlined">
          <div className="text-3xl font-bold text-blue-600">{totalStudents}</div>
          <p className="text-sm text-gray-600">Total Students</p>
        </Card>
        <Card className="text-center" variant="outlined">
          <div className="text-3xl font-bold text-green-600">{presentCount}</div>
          <p className="text-sm text-gray-600">Present</p>
        </Card>
        <Card className="text-center" variant="outlined">
          <div className="text-3xl font-bold text-red-600">{absentCount}</div>
          <p className="text-sm text-gray-600">Absent</p>
        </Card>
        <Card className="text-center" variant="outlined">
          <div className="text-3xl font-bold text-amber-600">{totalMarked}/{totalStudents}</div>
          <p className="text-sm text-gray-600">Marked</p>
        </Card>
      </div>

      {/* Date and Controls */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Attendance
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Grade 8 • Section A</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* MOBILE VIEW - Swipeable Cards */}
      {isMobile ? (
        <div>
          {/* Swipe Instructions */}
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <div className="flex gap-3">
              <div className="text-blue-600 text-lg">👆</div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Swipe to Mark Attendance</h3>
                <div className="flex justify-between gap-4 text-sm">
                  <div className="flex items-center gap-2 text-blue-800">
                    <ArrowLeft className="w-4 h-4" /> <strong>Swipe Left</strong> = Absent
                  </div>
                  <div className="flex items-center gap-2 text-blue-800">
                    <strong>Present</strong> = <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Swipe Stack */}
          {unmarkedStudents.length > 0 ? (
            <div className="relative h-96 mb-8">
              {unmarkedStudents.slice(0, 3).map((student, idx) => (
                <div
                  key={student.id}
                  className="absolute w-full"
                  style={{
                    zIndex: unmarkedStudents.length - idx,
                    transform: `translateY(${idx * 12}px)`,
                    opacity: idx < 2 ? 1 : 0.5,
                  }}
                >
                  <SwipeCard
                    student={student}
                    index={DUMMY_STUDENTS.indexOf(student)}
                    total={DUMMY_STUDENTS.length}
                    onMark={handleMarkMobile}
                    status={attendance[student.id]}
                  />
                </div>
              ))}
            </div>
          ) : (
            <Card className="mb-8 bg-green-50 border-green-200 text-center py-8">
              <Check className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <p className="text-green-900 font-semibold">All students marked! Ready to submit.</p>
            </Card>
          )}

          {/* Progress */}
          <Card className="mb-6 bg-gray-50">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">Progress</span>
                <span className="text-gray-600">{totalMarked} / {totalStudents}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(totalMarked / totalStudents) * 100}%` }}
                />
              </div>
            </div>
          </Card>
        </div>
      ) : (
        /* DESKTOP VIEW - Professional List */
        <div>
          {/* Instructions */}
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <div className="flex gap-3">
              <div className="text-blue-600 text-lg">📊</div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Mark Attendance</h3>
                <p className="text-sm text-blue-800">Click Present or Absent for each student. All must be marked before submitting.</p>
              </div>
            </div>
          </Card>

          {/* Desktop Grid */}
          <div className="space-y-3 mb-8">
            {DUMMY_STUDENTS.map((student) => (
              <DesktopAttendanceRow
                key={student.id}
                student={student}
                status={attendance[student.id]}
                onMark={(status) => handleMark(student.id, status)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <Card className="sticky bottom-0 bg-white border-t-2 border-gray-200 flex flex-col md:flex-row gap-3 md:justify-between md:items-center">
        <div className="flex-1">
          <p className="text-sm text-gray-600">
            {totalMarked === totalStudents
              ? '✅ All students marked. Ready to submit!'
              : `${totalStudents - totalMarked} more students to mark`}
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleReset}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Reset
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={totalMarked !== totalStudents}
            icon={<Save className="w-4 h-4" />}
          >
            {submitted ? '✓ Saved!' : 'Save Attendance'}
          </Button>
        </div>
      </Card>
    </PageWrapper>
  );
};
