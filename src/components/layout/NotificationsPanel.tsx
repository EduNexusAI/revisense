import React, { useState } from 'react';
import { Bell, X, CheckCircle, AlertCircle, Info, Trash2, Clock, IndianRupee, Users, TrendingDown, BookOpen, Heart, Megaphone } from 'lucide-react';

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

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
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

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose, userRole = 'parent' }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  
  // Use parent notifications if parent role, otherwise use sample
  const notifications = userRole === 'parent' ? PARENT_NOTIFICATIONS : PARENT_NOTIFICATIONS;
  
  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = selectedFilter === 'all' 
    ? notifications 
    : notifications.filter(n => n.category === selectedFilter);

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
      case 'fee': return <IndianRupee size={18} className="flex-shrink-0" />;
      case 'attendance': return <Users size={18} className="flex-shrink-0" />;
      case 'performance': return <TrendingDown size={18} className="flex-shrink-0" />;
      case 'assignment': return <BookOpen size={18} className="flex-shrink-0" />;
      case 'reminder': return <Clock size={18} className="flex-shrink-0" />;
      case 'followup': return <Heart size={18} className="flex-shrink-0" />;
      case 'event': return <Bell size={18} className="flex-shrink-0" />;
      case 'announcement': return <Megaphone size={18} className="flex-shrink-0" />;
      default: return <Bell size={18} className="flex-shrink-0" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={18} className="text-green-600" />;
      case 'warning':
        return <AlertCircle size={18} className="text-amber-600" />;
      case 'urgent':
        return <AlertCircle size={18} className="text-red-600 animate-pulse" />;
      case 'reminder':
        return <Clock size={18} className="text-blue-600" />;
      case 'info':
        return <Info size={18} className="text-blue-600" />;
      default:
        return <Bell size={18} className="text-gray-600" />;
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-16 right-4 w-96 max-h-[85vh] bg-white rounded-xl shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                <Bell size={20} className="text-blue-600" />
                Notifications
              </h2>
              {unreadCount > 0 && (
                <p className="text-xs text-slate-600 mt-1">
                  <span className="inline-flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 mr-1">{unreadCount}</span>
                  unread
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-200 rounded-lg transition"
            >
              <X size={20} className="text-slate-600" />
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              All
            </button>
            {['reminder', 'announcement'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedFilter === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <Bell size={32} className="text-slate-300 mb-3" />
              <p className="text-slate-600 font-medium">No notifications</p>
              <p className="text-xs text-slate-500 mt-1">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {filteredNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-slate-50 transition cursor-pointer border-l-4 ${
                    notification.type === 'success'
                      ? 'border-l-green-500'
                      : notification.type === 'urgent'
                      ? 'border-l-red-500 bg-red-50'
                      : notification.type === 'warning'
                      ? 'border-l-amber-500'
                      : notification.type === 'reminder'
                      ? 'border-l-blue-500'
                      : 'border-l-blue-400'
                  } ${!notification.read ? 'bg-blue-50' : 'bg-white'}`}
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {getTypeIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className={`text-sm font-semibold ${!notification.read ? 'text-slate-900' : 'text-slate-800'}`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryBadgeColor(notification.category)}`}>
                              {getCategoryIcon(notification.category)}
                              {getCategoryLabel(notification.category)}
                            </span>
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-slate-500 mt-2">
                        {notification.timestamp}
                      </p>
                    </div>

                    {/* Delete Button */}
                    <button
                      className="flex-shrink-0 text-slate-400 hover:text-red-600 transition opacity-0 hover:opacity-100 p-1"
                      title="Delete notification"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-3 bg-slate-50 rounded-b-lg">
          <button className="w-full px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded transition">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};