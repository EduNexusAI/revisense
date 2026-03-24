import React, { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Bell, Trash2, CheckCircle, AlertCircle, Info, Clock, IndianRupee, Users, TrendingDown, BookOpen, Heart, Megaphone } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'reminder' | 'urgent';
  category: 'fee' | 'attendance' | 'performance' | 'assignment' | 'reminder' | 'followup' | 'event' | 'announcement';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const PARENT_NOTIFICATIONS: Notification[] = [
  // Reminders
  {
    id: '1',
    title: 'Parent-Teacher Meeting',
    message: 'PTM scheduled for March 25, 2026 at 4:00 PM. Discuss progress with teachers.',
    type: 'reminder',
    category: 'reminder',
    timestamp: '3 days ago',
    read: false,
  },
  {
    id: '2',
    title: 'School Event Coming Up',
    message: 'Annual Sports Day on March 28. Registration closes on March 23.',
    type: 'info',
    category: 'reminder',
    timestamp: '1 week ago',
    read: true,
  },
  {
    id: '3',
    title: 'Sports Day Reminder',
    message: 'Don\'t forget to register your child for the upcoming sports day.',
    type: 'reminder',
    category: 'reminder',
    timestamp: '5 days ago',
    read: true,
  },

  // School Announcements/Updates
  {
    id: '4',
    title: 'School Closed - Holi Holiday',
    message: 'School will remain closed on March 25-26, 2026 for Holi celebration. Regular classes resume on March 27.',
    type: 'info',
    category: 'announcement',
    timestamp: '1 day ago',
    read: false,
  },
  {
    id: '5',
    title: 'Summer Camp Registration Open',
    message: 'Summer activities camp registration is now open! Limited seats available. Register by April 10, 2026.',
    type: 'info',
    category: 'announcement',
    timestamp: '2 days ago',
    read: false,
  },
  {
    id: '6',
    title: 'Board Exam Schedule Released',
    message: 'Class X and XII board exams schedule has been released. Check the portal for complete details and admit card.',
    type: 'info',
    category: 'announcement',
    timestamp: '3 days ago',
    read: true,
  },
  {
    id: '7',
    title: 'New Traffic Route Effective Tomorrow',
    message: 'Due to road construction, school traffic route has been changed. Updated route details are in the notice board.',
    type: 'warning',
    category: 'announcement',
    timestamp: '4 days ago',
    read: true,
  },
];

export const NotificationsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [notifications, setNotifications] = useState<Notification[]>(PARENT_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = selectedFilter === 'all'
    ? notifications
    : notifications.filter(n => n.category === selectedFilter);

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getCategoryBadgeColor = (category: string) => {
    switch(category) {
      case 'fee': return 'bg-blue-100 text-blue-800';
      case 'attendance': return 'bg-green-100 text-green-800';
      case 'performance': return 'bg-purple-100 text-purple-800';
      case 'assignment': return 'bg-yellow-100 text-yellow-800';
      case 'reminder': return 'bg-orange-100 text-orange-800';
      case 'followup': return 'bg-pink-100 text-pink-800';
      case 'event': return 'bg-indigo-100 text-indigo-800';
      case 'announcement': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'fee': return <IndianRupee size={20} className="flex-shrink-0" />;
      case 'attendance': return <Users size={20} className="flex-shrink-0" />;
      case 'performance': return <TrendingDown size={20} className="flex-shrink-0" />;
      case 'assignment': return <BookOpen size={20} className="flex-shrink-0" />;
      case 'reminder': return <Clock size={20} className="flex-shrink-0" />;
      case 'followup': return <Heart size={20} className="flex-shrink-0" />;
      case 'event': return <Bell size={20} className="flex-shrink-0" />;
      case 'announcement': return <Megaphone size={20} className="flex-shrink-0" />;
      default: return <Bell size={20} className="flex-shrink-0" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'warning':
        return <AlertCircle size={20} className="text-amber-600" />;
      case 'urgent':
        return <AlertCircle size={20} className="text-red-600 animate-pulse" />;
      case 'reminder':
        return <Clock size={20} className="text-blue-600" />;
      case 'info':
        return <Info size={20} className="text-blue-600" />;
      default:
        return <Bell size={20} className="text-gray-600" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      fee: 'Fees',
      attendance: 'Attendance',
      performance: 'Performance',
      assignment: 'Assignments',
      reminder: 'Reminders',
      followup: 'Follow-ups',
      event: 'Events',
      announcement: 'Announcements',
    };
    return labels[category] || category;
  };

  return (
    <PageWrapper title="Notifications">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Bell size={32} className="text-blue-600" />
                All Notifications
              </h1>
              {unreadCount > 0 && (
                <p className="text-slate-600 mt-2">
                  <span className="inline-flex items-center justify-center bg-red-500 text-white text-sm font-bold rounded-full w-6 h-6 mr-2">{unreadCount}</span>
                  unread notifications
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 px-1">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
              selectedFilter === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            All ({notifications.length})
          </button>
          {['reminder', 'announcement'].map(cat => {
            const count = notifications.filter(n => n.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedFilter === cat
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {getCategoryLabel(cat)} ({count})
              </button>
            );
          })}
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <Card className="py-16 text-center">
            <Bell size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No notifications</h3>
            <p className="text-slate-500">You're all caught up!</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-4 border-l-4 transition-all hover:shadow-md ${
                  notification.type === 'urgent'
                    ? 'border-l-red-600 bg-red-50'
                    : notification.type === 'warning'
                    ? 'border-l-amber-600 bg-amber-50'
                    : notification.type === 'success'
                    ? 'border-l-green-600 bg-green-50'
                    : 'border-l-blue-600 bg-blue-50'
                }`}
              >
                <div className="flex gap-4">
                  {/* Category Icon */}
                  <div className={`p-3 rounded-lg flex-shrink-0 ${getCategoryBadgeColor(notification.category)}`}>
                    {getCategoryIcon(notification.category)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-lg">{notification.title}</h3>
                        {!notification.read && (
                          <span className="inline-flex items-center justify-center bg-blue-600 text-white text-xs font-bold rounded-full w-2.5 h-2.5"></span>
                        )}
                      </div>
                      {getTypeIcon(notification.type)}
                    </div>

                    <p className="text-slate-700 text-sm mb-3">{notification.message}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {getCategoryLabel(notification.category)}
                        </Badge>
                        <span className="text-xs text-slate-500">{notification.timestamp}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteNotification(notification.id)}
                        className="p-2 hover:bg-slate-200 rounded-lg transition text-slate-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
