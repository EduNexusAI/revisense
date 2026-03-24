import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Bell, AlertCircle, CheckCircle, Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';

const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const parseDate = (dateStr: string) => {
  const parts = dateStr.split(' ');
  const monthStr = parts[0];
  const dayStr = parts[1].replace(',', '');
  const yearStr = parts[2];
  
  const monthIndex = monthNames.indexOf(monthStr);
  return new Date(parseInt(yearStr), monthIndex, parseInt(dayStr));
};

interface Notice {
  id: number;
  title: string;
  category: string;
  importance: string;
  date: string;
  dateRange?: { start: string; end: string };
  content: string;
  isRead: boolean;
}

export const NoticesPage = () => {
  const [showCalendar, setShowCalendar] = useState<number | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date(2024, 4, 1)); // May 2024
  const notices = [
    {
      id: 1,
      title: 'Summer Vacation Schedule',
      category: 'Holiday',
      importance: 'high',
      date: 'May 15, 2024',
      content:
        'Dear students and parents, the summer vacation will commence from June 15th, 2024 and will end on July 31st, 2024. Classes will resume on August 1st, 2024.',
      isRead: false,
    },
    {
      id: 2,
      title: 'Annual Sports Day - May 25th',
      category: 'Event',
      importance: 'medium',
      date: 'May 10, 2024',
      content:
        'Our Annual Sports Day will be held on May 25th, 2024. All students are required to participate. Details about events and timings will be shared soon.',
      isRead: true,
    },
    {
      id: 3,
      title: 'Mid-Term Examination 2024',
      category: 'Exam',
      importance: 'high',
      date: 'May 10, 2024',
      dateRange: { start: 'May 10, 2024', end: 'May 20, 2024' },
      content:
        'Mid-term examinations will commence from May 10th and conclude on May 20th, 2024. Students are required to be present for all subjects. Admit cards will be issued on May 8th. Study schedule and detailed timetable will be shared shortly.',
      isRead: false,
    },
    {
      id: 4,
      title: 'Important: Exam Schedule Update',
      category: 'Exam',
      importance: 'high',
      date: 'May 8, 2024',
      content:
        'The final examination schedule has been revised. Please check the attached timetable carefully. Any changes will be notified in advance.',
      isRead: false,
    },
    {
      id: 5,
      title: 'School Open House - June 1st',
      category: 'Event',
      importance: 'medium',
      date: 'May 5, 2024',
      content:
        'Parents are invited to our annual open house. Meet with teachers and discuss your child\'s progress. Refreshments will be served.',
      isRead: true,
    },
    {
      id: 6,
      title: 'Library Extended Hours',
      category: 'Announcement',
      importance: 'low',
      date: 'May 1, 2024',
      content:
        'The school library will remain open until 6 PM on weekdays during the examination period for student study sessions.',
      isRead: true,
    },
    {
      id: 7,
      title: 'New Parking Policy',
      category: 'Announcement',
      importance: 'low',
      date: 'April 28, 2024',
      content:
        'A new parking policy has been implemented for the school premises. Please ensure all vehicles are parked in designated areas only.',
      isRead: true,
    },
  ];

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-slate-200 bg-slate-50';
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Holiday':
        return 'success';
      case 'Event':
        return 'primary';
      case 'Exam':
        return 'danger';
      default:
        return 'default';
    }
  };

  const unreadCount = notices.filter((n) => !n.isRead).length;

  return (
    <PageWrapper>
      <div className="space-y-8">
        <div className="border-b border-slate-200/50 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Notices & Circulars
            </h1>
          </div>
          <p className="text-slate-600">Stay updated with important school announcements</p>
        </div>

        {unreadCount > 0 && (
          <Card className="shadow-soft bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
            <div className="p-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-slate-900">You have {unreadCount} unread notice(s)</p>
                <p className="text-sm text-slate-600">Check the latest updates below</p>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-3 md:space-y-4">
          {notices.map((notice) => (
            <Card
              key={notice.id}
              className={`shadow-soft hover:shadow-medium transition-all duration-300 border ${getImportanceColor(
                notice.importance
              )}`}
            >
              <div className="p-3 md:p-4 lg:p-6">
                <div className="flex items-start justify-between gap-3 md:gap-4 mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    {!notice.isRead && (
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base md:text-lg font-semibold text-slate-900">{notice.title}</h3>
                        {notice.isRead && (
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mb-2 md:mb-3">
                        <Badge variant={getCategoryBadge(notice.category)}>{notice.category}</Badge>
                        {notice.importance === 'high' && (
                          <Badge variant="danger">Important</Badge>
                        )}
                      </div>
                      <button
                        onClick={() => setShowCalendar(showCalendar === notice.id ? null : notice.id)}
                        className="inline-flex items-center gap-1.5 mb-2 md:mb-3 text-xs md:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors relative"
                      >
                        <Calendar className="w-4 h-4" />
                        {notice.dateRange ? (
                          <span>
                            <span className="font-bold text-blue-600">{notice.dateRange.start}</span>
                            <span className="mx-1">to</span>
                            <span className="font-bold text-blue-600">{notice.dateRange.end}</span>
                          </span>
                        ) : (
                          notice.date
                        )}
                      </button>
                      
                      {/* Calendar Popup */}
                      {showCalendar === notice.id && (
                        <div className="mb-3 p-4 bg-white border border-slate-200 rounded-lg shadow-lg animation transition-all duration-300 ease-out opacity-100 scale-100" style={{animation: 'fadeInScale 0.2s ease-out'}}>
                          <div className="flex items-center justify-between mb-4">
                            <button
                              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                              className="p-1 hover:bg-slate-100 rounded transition-colors"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h3 className="text-sm font-semibold text-slate-900">
                              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </h3>
                            <button
                              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                              className="p-1 hover:bg-slate-100 rounded transition-colors"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </div>
                          
                          {/* Day headers */}
                          <div className="grid grid-cols-7 gap-1 mb-2">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                              <div key={day} className="text-xs font-semibold text-slate-600 text-center py-1">
                                {day}
                              </div>
                            ))}
                          </div>
                          
                          {/* Calendar days */}
                          <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, i) => (
                              <div key={`empty-${i}`} className="h-8"></div>
                            ))}
                            {Array.from({ length: getDaysInMonth(currentDate) }).map((_, i) => {
                              const day = i + 1;
                              let isInRange = false;
                              let isSingleDate = false;
                              
                              if (notice.dateRange) {
                                const startDate = parseDate(notice.dateRange.start);
                                const endDate = parseDate(notice.dateRange.end);
                                const currentDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                
                                isInRange = currentDayDate >= startDate && currentDayDate <= endDate;
                              } else {
                                const noticeDate = parseDate(notice.date);
                                const currentDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                
                                isSingleDate = noticeDate.toDateString() === currentDayDate.toDateString();
                              }
                              
                              return (
                                <button
                                  key={day}
                                  onClick={() => setShowCalendar(null)}
                                  className={`h-8 text-xs font-medium rounded transition-colors ${
                                    isInRange
                                      ? 'bg-red-500 text-white font-bold hover:bg-red-600'
                                      : isSingleDate
                                      ? 'bg-blue-500 text-white font-bold hover:bg-blue-600'
                                      : 'text-slate-900 hover:bg-gray-100 hover:text-blue-600'
                                  }`}
                                >
                                  {day}
                                </button>
                              );
                            })}
                          </div>

                          <style>{`
                            @keyframes fadeInScale {
                              from {
                                opacity: 0;
                                transform: scale(0.95) translateY(-8px);
                              }
                              to {
                                opacity: 1;
                                transform: scale(1) translateY(0);
                              }
                            }
                          `}</style>
                        </div>
                      )}
                      <p className="text-sm text-slate-700 leading-relaxed mb-2 md:mb-3">{notice.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="shadow-soft bg-slate-50 border border-slate-200">
          <div className="p-4 md:p-5 lg:p-6">
            <h2 className="text-base md:text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Bell size={16} className="md:w-5 md:h-5" />
              Stay Informed
            </h2>
            <p className="text-sm md:text-base text-slate-600 mb-3 md:mb-4">
              Enable notifications to receive important notices and circulars directly on your device. Never miss an important update!
            </p>
            <button className="px-4 py-2 md:px-6 text-sm md:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Enable Notifications
            </button>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};
