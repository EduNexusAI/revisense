import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, User, MapPin } from 'lucide-react';
import { Student } from '../../types';
import { formatPercentage } from '../../utils/formatters';
import { Badge } from '../ui/Badge';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface StudentCardProps {
  student: Student;
  enableSwipe?: boolean;
  onSwipe?: (studentId: string, status: 'present' | 'absent') => void;
}

export const StudentCard = ({ student, enableSwipe = false, onSwipe }: StudentCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const attendanceData = [
    { name: 'Present', value: student.attendance_percent },
    { name: 'Absent', value: 100 - student.attendance_percent },
  ];

  const avgMarks = student.subjects.reduce((sum, s) => sum + (s.marks / s.total) * 100, 0) / student.subjects.length;

  const revisionLightColor = {
    completed: 'bg-success',
    pending: 'bg-warning',
    not_assigned: 'bg-gray-300',
  }[student.ai_revision_status];

  return (
    <motion.div
      drag={enableSwipe}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={(_, info) => {
        if (!enableSwipe || !onSwipe) return;

        const swipeThreshold = 100;
        const velocityThreshold = 500;

        if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
          onSwipe(student.id, 'present');
        } else if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
          onSwipe(student.id, 'absent');
        } else if (info.offset.y < -swipeThreshold || info.velocity.y < -velocityThreshold) {
          onSwipe(student.id, 'present');
        } else if (info.offset.y > swipeThreshold || info.velocity.y > velocityThreshold) {
          onSwipe(student.id, 'absent');
        }
      }}
      className="w-72 h-96 perspective-1000 cursor-pointer"
      onClick={() => !enableSwipe && setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute w-full h-full backface-hidden">
          <div className="bg-card rounded-2xl shadow-lg p-6 h-full flex flex-col items-center relative">
            <div className="absolute -top-12 w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
              <img src={student.photo_url} alt={student.name} className="w-full h-full object-cover" />
            </div>
            <div className="mt-14 text-center flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">{student.name}</h3>
                <Badge className="mb-3">Grade {student.grade} - {student.section}</Badge>
                <div className="text-sm text-gray-600 space-y-2 mt-4">
                  <div className="flex items-center justify-center gap-2">
                    <MapPin size={14} />
                    <span className="text-xs">{student.address}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Phone size={14} />
                    <span>{student.parent_phone}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <User size={14} />
                    <span>{student.parent_name}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4">Tap to flip</p>
            </div>
          </div>
        </div>

        <div className="absolute w-full h-full backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
          <div className="bg-card rounded-2xl shadow-lg p-6 h-full flex flex-col">
            <h4 className="text-lg font-bold text-primary mb-4">Performance Overview</h4>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Attendance</p>
              <div className="flex items-center gap-4">
                <ResponsiveContainer width={80} height={80}>
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      innerRadius={25}
                      outerRadius={35}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      <Cell fill="#38A169" />
                      <Cell fill="#E2E8F0" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <span className="text-2xl font-bold text-primary">{formatPercentage(student.attendance_percent)}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Recent Marks</p>
              <div className="flex flex-wrap gap-2">
                {student.subjects.slice(0, 3).map((subject) => (
                  <Badge key={subject.name} variant={subject.marks >= 75 ? 'success' : subject.marks >= 50 ? 'warning' : 'danger'}>
                    {subject.name.slice(0, 4)}: {subject.marks}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Average: {Math.round(avgMarks)}%</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Mentor: {student.mentor_name}</p>
            </div>

            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600">AI Revision:</p>
              <div className={`w-3 h-3 rounded-full ${revisionLightColor}`}></div>
              <span className="text-xs text-gray-500 capitalize">{student.ai_revision_status.replace('_', ' ')}</span>
            </div>

            <p className="text-xs text-gray-400 mt-auto text-center">Tap to flip back</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
