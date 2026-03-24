import React, { useState } from 'react';
import { Menu, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { Avatar } from '../ui/Avatar';
import { SessionTimerWidget } from '../ui/SessionTimerWidget';
import { NotificationsPanel } from './NotificationsPanel';

export const TopBar = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { toggleSidebar } = useUIStore();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleProfileClick = () => {
    if (user?.role === 'admin') {
      navigate('/admin/profile');
    } else if (user?.role === 'teacher') {
      navigate('/teacher/profile');
    } else if (user?.role === 'student') {
      navigate('/student/profile');
    } else if (user?.role === 'parent') {
      navigate('/parent/profile');
    }
  };

  const getRoleSpecificText = () => {
    switch (user?.role) {
      case 'student':
        return 'Grade 10';
      case 'teacher':
        return 'Mathematics';
      case 'parent':
        return 'Guardian';
      case 'admin':
        return 'Administrator';
      default:
        return 'User';
    }
  };

  const getSchoolOrOrgName = () => {
    switch (user?.role) {
      case 'student':
        return 'Cambridge International School';
      case 'teacher':
        return 'Cambridge International School';
      case 'parent':
        return 'Cambridge International School';
      case 'admin':
        return 'School Administration';
      default:
        return 'EduNexes';
    }
  };

  return (
    <>
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 px-2 md:px-8 py-3 md:py-4 flex items-center justify-between sticky top-0 z-40 shadow-soft">
        <div className="flex items-center gap-1.5 md:gap-6 flex-shrink-0">
          <button 
            onClick={toggleSidebar} 
            className="p-2.5 hover:bg-slate-100 active:bg-slate-200 rounded-12 transition-all duration-200 text-slate-700 hover:text-slate-900 flex-shrink-0"
            title="Toggle menu"
            type="button"
          >
            <Menu size={24} strokeWidth={2.5} />
          </button>

          {/* School/Organization Name - Smaller on mobile, larger on tablet+ */}
          {user && (
            <div className="flex flex-col justify-center px-1.5 sm:px-2 md:px-3 py-1.5 sm:py-2 border-r border-slate-200">
              <p className="text-xs text-slate-500 font-medium hidden sm:block">School</p>
              <p className="text-xs sm:text-sm md:text-base font-semibold text-slate-900 truncate max-w-[90px] sm:max-w-none">{getSchoolOrOrgName()}</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Session Timer for Students */}
          {user?.role === 'student' && (
            <SessionTimerWidget compact={true} />
          )}

          {/* Notification Bell */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 hover:bg-slate-100 active:bg-slate-200 rounded-12 transition-all duration-200 text-slate-700 hover:text-slate-900 flex-shrink-0"
            title="Notifications"
            type="button"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Avatar Only */}
          {user && (
            <div
              onClick={handleProfileClick}
              className="cursor-pointer hover:opacity-80 transition-all duration-200 flex-shrink-0"
              title="Profile"
            >
              <Avatar src={user.avatar_url} alt={user.name} size="sm" />
            </div>
          )}
        </div>
      </div>

      <NotificationsPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
};
