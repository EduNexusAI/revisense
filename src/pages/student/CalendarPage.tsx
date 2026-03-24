import { useState, useMemo } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Calendar, Clock, MapPin, Bell, BookOpen, Award, AlertCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isBetween } from 'date-fns';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  endDate?: Date; // For exam date ranges
  time?: string;
  type: 'exam' | 'assignment' | 'event' | 'holiday';
  subject?: string;
  location?: string;
  importance: 'high' | 'medium' | 'low';
  isExamPeriod?: boolean;
}

const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Mathematics Mid-term Exam',
    description: 'Chapters 1-5: Algebra, Geometry, Trigonometry',
    date: addDays(new Date(), 2),
    time: '9:00 AM - 12:00 PM',
    type: 'exam',
    subject: 'Mathematics',
    location: 'Hall A',
    importance: 'high',
  },
  {
    id: '2',
    title: 'Science Project Submission',
    description: 'Submit your Physics project on semiconductor devices',
    date: addDays(new Date(), 3),
    time: '5:00 PM',
    type: 'assignment',
    subject: 'Science',
    importance: 'high',
  },
  {
    id: '3',
    title: 'English Essay Presentation',
    description: 'Present your essay on climate change (5-7 minutes)',
    date: addDays(new Date(), 5),
    time: '10:30 AM',
    type: 'assignment',
    subject: 'English',
    location: 'Class 9A',
    importance: 'medium',
  },
  {
    id: '4',
    title: 'Sports Day',
    description: 'Annual school sports day - all students participate',
    date: addDays(new Date(), 8),
    time: '8:00 AM - 4:00 PM',
    type: 'event',
    location: 'School Ground',
    importance: 'medium',
  },
  {
    id: '5',
    title: 'Mid-Term Exam Period',
    description: 'Comprehensive exams for all subjects (May 10-20)',
    date: new Date(2026, 4, 10),
    endDate: new Date(2026, 4, 20),
    type: 'exam',
    importance: 'high',
    isExamPeriod: true,
  },
  {
    id: '6',
    title: 'Spring Break Begins',
    description: 'School closed for 2 weeks',
    date: addDays(new Date(), 14),
    type: 'holiday',
    importance: 'low',
  },
  {
    id: '7',
    title: 'Hindi Literature Test',
    description: 'Short-answer questions and essay',
    date: addDays(new Date(), 7),
    time: '11:00 AM - 12:30 PM',
    type: 'exam',
    subject: 'Hindi',
    location: 'Hall A',
    importance: 'medium',
  },
];

const getEventIcon = (type: string) => {
  switch (type) {
    case 'exam':
      return <Award className="w-4 h-4" />;
    case 'assignment':
      return <BookOpen className="w-4 h-4" />;
    case 'event':
      return <Bell className="w-4 h-4" />;
    case 'holiday':
      return '🏖️';
    default:
      return <Calendar className="w-4 h-4" />;
  }
};

const getEventColor = (type: string) => {
  switch (type) {
    case 'exam':
      return { bg: 'bg-red-50', border: 'border-red-200', badge: 'alert', dot: 'bg-red-500', label: 'text-red-700' };
    case 'assignment':
      return { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'info', dot: 'bg-blue-500', label: 'text-blue-700' };
    case 'event':
      return { bg: 'bg-green-50', border: 'border-green-200', badge: 'success', dot: 'bg-green-500', label: 'text-green-700' };
    case 'holiday':
      return { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'warning', dot: 'bg-purple-500', label: 'text-purple-700' };
    default:
      return { bg: 'bg-gray-50', border: 'border-gray-200', badge: 'info', dot: 'bg-gray-500', label: 'text-gray-700' };
  }
};

const getDaysUntil = (date: Date) => {
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  
  const upcomingEvents = CALENDAR_EVENTS.sort((a, b) => a.date.getTime() - b.date.getTime());
  const examCount = upcomingEvents.filter((e) => e.type === 'exam').length;
  const assignmentCount = upcomingEvents.filter((e) => e.type === 'assignment').length;

  // Get calendar days for current month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const firstDayOfWeek = monthStart.getDay(); // 0 = Sunday
  
  // Get all events for the current month
  const monthEvents = useMemo(() => {
    return CALENDAR_EVENTS.filter(event => {
      if (event.isExamPeriod && event.endDate) {
        // For exam periods, check if the month overlaps with the exam range
        return (event.date <= monthEnd && event.endDate >= monthStart);
      }
      return (
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
      );
    });
  }, [currentDate]);

  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return CALENDAR_EVENTS.filter(event => {
      if (event.isExamPeriod && event.endDate) {
        // Check if day is within exam period range
        const dayStart = new Date(day);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(day);
        dayEnd.setHours(23, 59, 59, 999);
        
        const eventStart = new Date(event.date);
        eventStart.setHours(0, 0, 0, 0);
        const eventEnd = new Date(event.endDate);
        eventEnd.setHours(23, 59, 59, 999);
        
        return dayStart >= eventStart && dayStart <= eventEnd;
      }
      return isSameDay(event.date, day);
    });
  };

  // Check if day is within exam period
  const isInExamPeriod = (day: Date) => {
    return CALENDAR_EVENTS.some(event => {
      if (event.isExamPeriod && event.endDate) {
        const dayStart = new Date(day);
        dayStart.setHours(0, 0, 0, 0);
        const eventStart = new Date(event.date);
        eventStart.setHours(0, 0, 0, 0);
        const eventEnd = new Date(event.endDate);
        eventEnd.setHours(23, 59, 59, 999);
        
        return dayStart >= eventStart && dayStart <= eventEnd;
      }
      return false;
    });
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDayClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const calendarDays = Array(firstDayOfWeek).fill(null).concat(daysInMonth);

  return (
    <PageWrapper title="My Calendar" icon={<Calendar className="w-6 h-6" />}>
      <div className={`space-y-6 ${selectedEvent ? 'overflow-hidden' : ''}`} style={selectedEvent ? { maxHeight: '100vh', overflow: 'hidden' } : {}}>
        {/* Header */}
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Calendar</h1>
          <p className="text-sm text-gray-500">View upcoming events, exams, and deadlines</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-red-50 to-white border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wide font-medium">Upcoming Exams</p>
                <h3 className="text-3xl font-bold text-red-600 mt-2">{examCount}</h3>
              </div>
              <Award className="w-8 h-8 text-red-600 opacity-20" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wide font-medium">Assignments</p>
                <h3 className="text-3xl font-bold text-blue-600 mt-2">{assignmentCount}</h3>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600 opacity-20" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wide font-medium">Total Events</p>
                <h3 className="text-3xl font-bold text-purple-600 mt-2">{upcomingEvents.length}</h3>
              </div>
              <Bell className="w-8 h-8 text-purple-600 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Calendar Grid */}
        <Card className="shadow-lg">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Previous month"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Next month"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-bold text-gray-700 text-sm py-2 text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, idx) => {
              if (!day) {
                return <div key={`empty-${idx}`} className="aspect-square" />;
              }

              const eventsForDay = getEventsForDay(day);
              const inExamPeriod = isInExamPeriod(day);
              const isToday = isSameDay(day, new Date());

              // Get the exam period event if this day is in an exam period
              const examPeriodEvent = CALENDAR_EVENTS.find(e => e.isExamPeriod && e.endDate && inExamPeriod);

              return (
                <button
                  key={day.toString()}
                  onClick={() => {
                    if (examPeriodEvent) handleDayClick(examPeriodEvent);
                    else if (eventsForDay.length > 0) handleDayClick(eventsForDay[0]);
                  }}
                  className={`aspect-square p-2 rounded-lg border-2 transition flex flex-col ${
                    inExamPeriod
                      ? 'bg-red-100 border-red-400 shadow-sm cursor-pointer hover:shadow-lg hover:bg-red-200'
                      : eventsForDay.length > 0
                      ? 'bg-blue-50 border-blue-300 hover:shadow-md cursor-pointer'
                      : isToday
                      ? 'bg-yellow-50 border-yellow-300'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {/* Date Number */}
                  <div className={`text-sm font-bold ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                    {format(day, 'd')}
                  </div>

                  {/* Exam Period Label */}
                  {inExamPeriod && (
                    <div className="text-xs font-semibold text-red-700 mb-1">EXAM</div>
                  )}

                  {/* Event Indicators */}
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {eventsForDay.slice(0, 2).map((event) => {
                      const colors = getEventColor(event.type);
                      return (
                        <div
                          key={event.id}
                          className={`w-2 h-2 rounded-full ${colors.dot}`}
                          title={event.title}
                        />
                      );
                    })}
                    {eventsForDay.length > 2 && (
                      <div className="text-xs font-semibold text-gray-600">+{eventsForDay.length - 2}</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Legend */}
        <Card className="bg-gray-50 border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Event Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm text-gray-700">Exam</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-700">Assignment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-gray-700">Event</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-sm text-gray-700">Holiday</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full h-4 bg-gradient-to-r from-red-100 to-red-200 rounded border border-red-400" />
              <span className="text-sm text-gray-700 whitespace-nowrap">Exam Period</span>
            </div>
          </div>
        </Card>

        {/* Upcoming Events List */}
        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Upcoming Events</h3>
          <div className="space-y-4">
            {upcomingEvents.slice(0, 5).map((event) => {
              const daysLeft = getDaysUntil(event.date);
              const colors = getEventColor(event.type);

              return (
                <div
                  key={event.id}
                  className={`p-4 rounded-lg border ${colors.bg} ${colors.border} hover:shadow-md transition-shadow cursor-pointer`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-lg">{typeof getEventIcon(event.type) === 'string' ? getEventIcon(event.type) : <span className="text-lg">📅</span>}</div>
                        <h4 className="text-lg font-bold text-gray-900">{event.title}</h4>
                        <Badge variant={event.importance === 'high' ? 'danger' : event.importance === 'medium' ? 'warning' : 'success'}>
                          {event.importance}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">{event.description}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {event.isExamPeriod && event.endDate
                              ? `${format(event.date, 'MMM dd')} - ${format(event.endDate, 'MMM dd, yyyy')}`
                              : format(event.date, 'MMM dd, yyyy')
                            }
                          </span>
                        </div>

                        {event.time && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                        )}

                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        )}

                        {event.subject && (
                          <div className="px-2 py-1 rounded bg-white bg-opacity-70">
                            <span>{event.subject}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      {daysLeft > 0 && (
                        <div className={`text-lg font-bold ${daysLeft <= 3 ? 'text-red-600' : daysLeft <= 7 ? 'text-orange-600' : 'text-green-600'}`}>
                          {daysLeft}
                        </div>
                      )}
                      <p className="text-xs text-gray-600">{daysLeft === 0 ? 'Today' : daysLeft === 1 ? 'Tomorrow' : daysLeft > 0 ? 'days left' : 'Overdue'}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <>
            {/* Backdrop Blur */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
              onClick={() => setSelectedEvent(null)}
            />

            {/* Centered Modal - Fixed to viewport */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
              <div className="w-full max-w-2xl max-h-[85vh] pointer-events-auto animate-scale-in rounded-lg bg-white shadow-2xl overflow-hidden flex flex-col">
                {/* Header with Close Button */}
                <div className="flex items-start justify-between p-6 border-b border-gray-200 flex-shrink-0">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`text-3xl ${getEventColor(selectedEvent.type).label}`}>
                      {typeof getEventIcon(selectedEvent.type) === 'string'
                        ? getEventIcon(selectedEvent.type)
                        : getEventIcon(selectedEvent.type)
                      }
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
                      <Badge
                        variant={
                          selectedEvent.importance === 'high'
                            ? 'danger'
                            : selectedEvent.importance === 'medium'
                            ? 'warning'
                            : 'success'
                        }
                      >
                        {selectedEvent.importance} Priority
                      </Badge>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition flex-shrink-0"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1 p-6">
                  {/* Description */}
                  <p className="text-gray-700 mb-6 p-4 bg-gray-50 rounded-lg">{selectedEvent.description}</p>

                  {/* Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Date</p>
                        <p className="text-gray-900">
                          {selectedEvent.isExamPeriod && selectedEvent.endDate
                            ? `${format(selectedEvent.date, 'MMM dd')} - ${format(selectedEvent.endDate, 'MMM dd, yyyy')}`
                            : format(selectedEvent.date, 'EEEE, MMMM dd, yyyy')
                          }
                        </p>
                      </div>
                    </div>

                    {selectedEvent.time && (
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Time</p>
                          <p className="text-gray-900">{selectedEvent.time}</p>
                        </div>
                      </div>
                    )}

                    {selectedEvent.location && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Location</p>
                          <p className="text-gray-900">{selectedEvent.location}</p>
                        </div>
                      </div>
                    )}

                    {selectedEvent.subject && (
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Subject</p>
                          <p className="text-gray-900">{selectedEvent.subject}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Exam Period Label */}
                  {selectedEvent.isExamPeriod && (
                    <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg">
                      <p className="text-red-700 font-bold text-lg">📝 Exam Period</p>
                      <p className="text-red-600 text-sm mt-1">
                        This is an exam period. All exams and assessments scheduled during this range should be prepared for.
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer with Close Button */}
                <div className="p-6 border-t border-gray-200 flex-shrink-0">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
};
