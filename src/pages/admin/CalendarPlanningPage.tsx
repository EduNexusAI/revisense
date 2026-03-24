import React, { useState } from 'react';
import { Calendar, Plus, Edit2, Trash2, AlertCircle, Bell, Users, Clock, MapPin } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'exam' | 'holiday' | 'event' | 'announcement';
  location?: string;
  affectedClasses: string[];
  importance: 'high' | 'medium' | 'low';
}

const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: '1', title: 'First Term Exams Start', date: '2024-03-04', startTime: '09:00', endTime: '12:00', type: 'exam', affectedClasses: ['All'], importance: 'high', description: 'Commencement of first term exams' },
  { id: '2', title: 'Holi Holiday', date: '2024-03-25', startTime: '00:00', endTime: '23:59', type: 'holiday', affectedClasses: ['All'], importance: 'high', description: 'School will remain closed' },
  { id: '3', title: 'Annual Sports Day', date: '2024-04-10', startTime: '08:00', endTime: '16:00', type: 'event', location: 'School Ground', affectedClasses: ['All'], importance: 'medium', description: 'Sports competition for all students' },
  { id: '4', title: 'Parent-Teacher Meeting', date: '2024-03-15', startTime: '14:00', endTime: '17:00', type: 'event', location: 'School Hall', affectedClasses: ['IX-A', 'IX-B', 'IX-C'], importance: 'high', description: 'Discuss student performance' },
  { id: '5', title: 'Summer Vacation Starts', date: '2024-05-15', startTime: '00:00', endTime: '23:59', type: 'holiday', affectedClasses: ['All'], importance: 'high', description: '6 weeks summer break' },
  { id: '6', title: 'Skill Development Workshop', date: '2024-04-05', startTime: '10:00', endTime: '13:00', type: 'event', location: 'Auditorium', affectedClasses: ['IX', 'X'], importance: 'medium', description: 'Workshops on life skills and communication' },
];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const CalendarPlanningPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(2); // March
  const [currentYear, setCurrentYear] = useState(2024);
  const [selectedEventType, setSelectedEventType] = useState<'all' | 'exam' | 'holiday' | 'event' | 'announcement'>('all');
  const [showEventForm, setShowEventForm] = useState(false);

  const typeColors = {
    exam: 'bg-red-100 text-red-700 border-red-300',
    holiday: 'bg-green-100 text-green-700 border-green-300',
    event: 'bg-blue-100 text-blue-700 border-blue-300',
    announcement: 'bg-purple-100 text-purple-700 border-purple-300'
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      exam: '📝',
      holiday: '🎉',
      event: '📅',
      announcement: '📢'
    };
    return icons[type as keyof typeof icons] || '📅';
  };

  // Filter events
  const filteredEvents = CALENDAR_EVENTS.filter(event => {
    if (selectedEventType !== 'all' && event.type !== selectedEventType) return false;
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
  });

  // Generate calendar grid
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInCurrentMonth = DAYS_IN_MONTH[currentMonth];
  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    calendarDays.push(i);
  }

  const hasEvent = (day: number | null) => {
    if (!day) return false;
    return filteredEvents.some(e => {
      const eventDate = new Date(e.date);
      return eventDate.getDate() === day;
    });
  };

  const getEventsForDay = (day: number) => {
    return CALENDAR_EVENTS.filter(e => {
      const eventDate = new Date(e.date);
      return eventDate.getDate() === day && eventDate.getMonth() === currentMonth;
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar Planning</h1>
          <p className="text-gray-600">Plan academic events and holidays</p>
        </div>
        <Button
          onClick={() => setShowEventForm(!showEventForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
        >
          <Plus size={16} />
          Add Event
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{CALENDAR_EVENTS.length}</p>
              <p className="text-xs text-gray-600 mt-1">This academic year</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase">Exams Scheduled</p>
              <p className="text-2xl font-bold text-red-600">{CALENDAR_EVENTS.filter(e => e.type === 'exam').length}</p>
              <p className="text-xs text-gray-600 mt-1">Exam events</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase">Holidays</p>
              <p className="text-2xl font-bold text-green-600">{CALENDAR_EVENTS.filter(e => e.type === 'holiday').length}</p>
              <p className="text-xs text-gray-600 mt-1">Scheduled breaks</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase">Other Events</p>
              <p className="text-2xl font-bold text-blue-600">{CALENDAR_EVENTS.filter(e => e.type === 'event').length}</p>
              <p className="text-xs text-gray-600 mt-1">Activities & programs</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <div className="space-y-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">{MONTHS[currentMonth]} {currentYear}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (currentMonth === 0) {
                      setCurrentMonth(11);
                      setCurrentYear(currentYear - 1);
                    } else {
                      setCurrentMonth(currentMonth - 1);
                    }
                  }}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => {
                    if (currentMonth === 11) {
                      setCurrentMonth(0);
                      setCurrentYear(currentYear + 1);
                    } else {
                      setCurrentMonth(currentMonth + 1);
                    }
                  }}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-bold text-gray-700 text-sm py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, idx) => (
                <div
                  key={idx}
                  className={`aspect-square p-2 rounded border-2 flex items-center justify-center cursor-pointer ${
                    day === null
                      ? 'bg-gray-50 border-gray-100'
                      : hasEvent(day)
                      ? 'bg-blue-50 border-blue-300 hover:bg-blue-100'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {day && (
                    <div className="text-center w-full">
                      <p className="font-bold text-gray-900">{day}</p>
                      {hasEvent(day) && (
                        <div className="text-xs mt-1">
                          {getEventsForDay(day).length > 0 && (
                            <span className="inline-block px-1 py-0.5 bg-blue-600 text-white rounded text-xs">
                              {getEventsForDay(day).length}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Event Filter */}
        <div className="space-y-4">
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Filter Events</h3>
            <div className="space-y-2">
              {(['all', 'exam', 'holiday', 'event', 'announcement'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedEventType(type)}
                  className={`w-full text-left px-3 py-2 rounded transition font-semibold ${
                    selectedEventType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </Card>

          {/* Legend */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Legend</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-red-700">📝</span>
                <span>Exams</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-700">🎉</span>
                <span>Holidays</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-700">📅</span>
                <span>Events</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-700">📢</span>
                <span>Announcements</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Events List */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3">
          {MONTHS[currentMonth]} Events ({filteredEvents.length})
        </h3>
        <div className="space-y-2">
          {filteredEvents.length === 0 ? (
            <Card>
              <p className="text-gray-600 text-center py-4">No events scheduled for this month.</p>
            </Card>
          ) : (
            filteredEvents.map(event => (
              <Card
                key={event.id}
                className={`border-2 ${typeColors[event.type as keyof typeof typeColors]}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{getTypeIcon(event.type)}</span>
                      <h4 className="font-bold text-gray-900">{event.title}</h4>
                      {event.importance === 'high' && (
                        <AlertCircle size={16} className="text-red-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{event.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {event.startTime} - {event.endTime}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {event.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {event.affectedClasses.join(', ')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Notifications */}
      <Card className="bg-amber-50 border-amber-200">
        <div className="flex gap-3">
          <Bell size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900">Important Reminders</p>
            <ul className="text-sm text-amber-800 mt-2 space-y-1 ml-4 list-disc">
              <li>First Term Exams start on March 4, 2024</li>
              <li>Holi Holiday is scheduled for March 25, 2024</li>
              <li>Send notifications 7 days before major events</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};