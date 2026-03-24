import React, { useState, useRef } from 'react';
import { Student } from '../../types';
import { CheckCircle, XCircle } from 'lucide-react';

interface StudentCardProps {
  student: Student;
  onMark?: (studentId: string, status: 'present' | 'absent') => void;
  isInteractive?: boolean;
}

export const StudentCardFlip: React.FC<StudentCardProps> = ({ 
  student, 
  onMark, 
  isInteractive = true 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [marked, setMarked] = useState<'present' | 'absent' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;

    if (isUpSwipe) {
      setMarked('present');
      onMark?.(student.id, 'present');
    } else if (isDownSwipe) {
      setMarked('absent');
      onMark?.(student.id, 'absent');
    }
  };

  return (
    <div
      ref={cardRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClick={() => setIsFlipped(!isFlipped)}
      className={`w-full max-w-sm h-64 cursor-pointer transition-all duration-300 perspective ${
        marked
          ? marked === 'present'
            ? 'ring-4 ring-green-500'
            : 'ring-4 ring-red-500'
          : ''
      }`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="relative w-full h-full transition-transform duration-300"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front Face */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white flex flex-col justify-between shadow-lg"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-center">
            {student.photo_url ? (
              <img
                src={student.photo_url}
                alt={student.name}
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full mx-auto bg-blue-400 flex items-center justify-center border-4 border-white shadow-lg text-3xl font-bold">
                {student.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold">{student.name}</h3>
            <p className="text-sm text-blue-100">
              Grade {student.grade} • Section {student.section}
            </p>
          </div>

          <div className="text-xs text-blue-100 space-y-1">
            <p>Admission: {student.admission_number}</p>
            <p className="text-center mt-2">👆 Tap to flip • Swipe to mark</p>
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white flex flex-col justify-between shadow-lg"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div>
            <h4 className="font-bold mb-2 text-sm">Academic Performance</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Avg Score:</span>
                <span className="font-semibold">78%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Attendance:</span>
                <span className="font-semibold">94%</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-sm">Mentor</h4>
            <p className="text-sm text-purple-100">Rajesh Kumar</p>
          </div>

          <div className="text-xs text-purple-100 text-center">
            AI Revision Status: 
            <div className="mt-1">
              <span className="inline-block w-3 h-3 rounded-full bg-yellow-300 mr-1"></span>
              Pending
            </div>
          </div>
        </div>
      </div>

      {/* Marked Indicator */}
      {marked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black bg-opacity-50 pointer-events-none">
          {marked === 'present' ? (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-2" />
              <p className="text-white font-bold text-lg">Present ✓</p>
            </div>
          ) : (
            <div className="text-center">
              <XCircle className="w-16 h-16 text-red-400 mx-auto mb-2" />
              <p className="text-white font-bold text-lg">Absent ✗</p>
            </div>
          )}
        </div>
      )}

      {/* Swipe Hint */}
      {!marked && isInteractive && (
        <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-gray-500 mt-2">
          {!isFlipped && '↑ Swipe UP = Present | Swipe DOWN = Absent'}
        </div>
      )}
    </div>
  );
};
