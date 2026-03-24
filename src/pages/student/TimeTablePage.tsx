import { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Clock, X, User, BookOpen } from 'lucide-react';

export const TimeTablePage = () => {
  const [selectedSubject, setSelectedSubject] = useState<{ name: string; teacher: string } | null>(null);

  // Subject to teacher mapping
  const subjectTeachers: { [key: string]: string } = {
    'English': 'Mrs. Sarah Anderson',
    'Mathematics': 'Mr. James Wilson',
    'Science': 'Dr. Emily Rodriguez',
    'History': 'Prof. David Thompson',
    'PE': 'Coach Michael Johnson',
    'Social Studies': 'Ms. Jennifer Martinez',
    'Computer': 'Mr. Alex Kumar',
    'Arts': 'Ms. Lisa Patterson',
    'Music': 'Mr. Christopher Lee',
    'Assembly': 'Principal Office',
  };

  const timetable = [
    { day: 'Monday', periods: ['English', 'Mathematics', 'Science', 'History', 'PE', 'Computer', 'Arts', 'Music'] },
    { day: 'Tuesday', periods: ['Mathematics', 'Science', 'Social Studies', 'English', 'Computer', 'History', 'PE', 'Music'] },
    { day: 'Wednesday', periods: ['Science', 'History', 'English', 'Mathematics', 'Arts', 'Computer', 'Social Studies', 'PE'] },
    { day: 'Thursday', periods: ['PE', 'Mathematics', 'English', 'Science', 'Music', 'Arts', 'Computer', 'History'] },
    { day: 'Friday', periods: ['Computer', 'English', 'Mathematics', 'Science', 'Assembly', 'Arts', 'PE', 'Social Studies'] },
    { day: 'Saturday', periods: ['English', 'Mathematics', 'Science', 'Social Studies'] },
  ];

  const days = timetable.map(d => d.day);
  const periods = [1, 2, 3, 4, 'LUNCH', 5, 6, 7, 8] as (number | string)[];
  const timeSlots = [
    '09:00 - 09:45',
    '09:45 - 10:30',
    '10:30 - 11:15',
    '11:15 - 12:00',
    '12:00 - 12:45',
    '12:45 - 13:30',
    '13:30 - 14:15',
    '14:15 - 15:00',
    '15:00 - 15:45',
  ];
  const displayPeriods = ['P1', 'P2', 'P3', 'P4', 'LUNCH', 'P5', 'P6', 'P7', 'P8'];

  return (
    <PageWrapper>
      <div className="space-y-8">
        <div className="border-b border-slate-200/50 pb-6">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <Clock className="w-6 md:w-8 h-6 md:h-8 text-blue-600" />
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My TimeTable
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-600">Your class schedule for the week - Click on any subject to see teacher details</p>
        </div>

        {/* Weekly Table View */}
        <Card className="shadow-soft border border-slate-200 overflow-x-auto">
          <div className="p-3 md:p-4 lg:p-6">
            <h2 className="text-base md:text-lg lg:text-2xl font-bold text-slate-900 mb-3 md:mb-4">Weekly Schedule</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-300">
                    <th className="p-1 md:p-2 lg:p-3 text-left bg-gradient-to-r from-blue-100 to-purple-100 rounded-tl-lg font-semibold text-slate-700 text-xs md:text-sm whitespace-nowrap sticky left-0 z-20">
                      Day
                    </th>
                    {periods.map((period, idx) => {
                      const isLunchBreak = period === 'LUNCH';
                      return (
                        <th
                          key={`header-${idx}`}
                          className={`p-1 md:p-2 lg:p-3 text-center font-semibold text-slate-700 text-xs md:text-sm min-w-fit whitespace-nowrap ${
                            isLunchBreak
                              ? 'bg-gradient-to-r from-amber-100 to-orange-100'
                              : 'bg-gradient-to-r from-blue-100 to-purple-100'
                          }`}
                        >
                          <div className={`font-bold ${isLunchBreak ? 'text-amber-700' : 'text-blue-600'}`}>{displayPeriods[idx]}</div>
                          {!isLunchBreak && <div className="text-xs text-slate-500">{timeSlots[idx]}</div>}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {days.map((day, dayIdx) => {
                    const isHalfDay = day === 'Saturday';
                    return (
                    <tr key={day} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="p-1 md:p-2 lg:p-3 font-semibold text-slate-700 text-xs md:text-sm bg-slate-50 sticky left-0 z-10 whitespace-nowrap">
                        <div className="flex flex-col items-start">
                          <span className="md:hidden">{day.slice(0, 3)}</span>
                          <span className="hidden md:inline">{day}</span>
                          {isHalfDay && <span className="text-xs text-blue-600 font-bold mt-0.5">Half Day</span>}
                        </div>
                      </td>
                      {periods.map((period, idx) => {
                        const isLunchBreak = period === 'LUNCH';
                        const isAfternoon = !isLunchBreak && typeof period === 'number' && period > 4;
                        
                        // Skip lunch and afternoon periods for Saturday
                        if (isHalfDay && (isLunchBreak || isAfternoon)) {
                          return null;
                        }
                        
                        if (isLunchBreak) {
                          return (
                            <td
                              key={`${day}-lunch`}
                              className="p-2 md:p-3 text-center bg-gradient-to-r from-amber-50 to-orange-50"
                            >
                              <div className="text-amber-900 font-bold text-xs">LUNCH</div>
                            </td>
                          );
                        }
                        const subject = timetable[dayIdx].periods[idx < 4 ? idx : idx - 1];
                        const subjectColor = [
                          'from-blue-100 to-blue-50',
                          'from-purple-100 to-purple-50',
                          'from-green-100 to-green-50',
                          'from-amber-100 to-amber-50',
                          'from-pink-100 to-pink-50',
                          'from-cyan-100 to-cyan-50',
                          'from-rose-100 to-rose-50',
                          'from-indigo-100 to-indigo-50',
                        ];
                        return (
                          <td
                            key={`${day}-${period}`}
                            className="p-1 md:p-2 lg:p-3 text-center"
                          >
                            <button
                              onClick={() => setSelectedSubject({
                                name: subject,
                                teacher: subjectTeachers[subject] || 'TBA',
                              })}
                              className={`w-full px-1 md:px-2 lg:px-3 py-2 md:py-3 bg-gradient-to-br ${
                                subjectColor[(idx < 4 ? idx : idx - 1) % 8]
                              } rounded-lg border border-slate-200 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer group text-xs md:text-sm font-semibold text-slate-900 active:scale-95 md:active:scale-100`}
                            >
                              <span className="inline-block group-hover:text-blue-600 transition-colors">
                                {subject}
                              </span>
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Teacher Popup Modal */}
        {selectedSubject && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 md:p-4 z-50">
            <Card className="shadow-2xl w-full max-w-sm border border-slate-300 animate-fade-in">
              <div className="p-4 md:p-6">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="absolute top-3 right-3 md:top-4 md:right-4 p-1.5 md:p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={20} className="md:w-6 md:h-6 text-slate-600" />
                </button>

                {/* Content */}
                <div className="space-y-3 md:space-y-4 mt-6">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 md:p-4 rounded-lg">
                    <div className="flex items-center gap-2 md:gap-3">
                      <BookOpen size={24} className="md:w-8 md:h-8 text-blue-600 flex-shrink-0" />
                      <h3 className="text-lg md:text-2xl font-bold text-slate-900">{selectedSubject.name}</h3>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 md:p-4 rounded-lg border border-slate-200">
                    <div className="flex items-start gap-2 md:gap-3">
                      <User size={20} className="md:w-6 md:h-6 text-green-600 flex-shrink-0 mt-0.5 md:mt-1" />
                      <div>
                        <p className="text-xs md:text-xs text-slate-500 font-semibold uppercase tracking-wide">Teacher</p>
                        <p className="text-base md:text-lg font-semibold text-slate-900 mt-1">{selectedSubject.teacher}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedSubject(null)}
                    className="w-full py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm md:text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
