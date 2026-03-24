import { ElementType, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

interface NavItem {
  label: string;
  icon: ElementType;
  path: string;
  badge?: number;
  isSection?: boolean;
}

interface SidebarProps {
  items: NavItem[];
}

export const Sidebar = ({ items }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { user, logout } = useAuthStore();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
    if (window.innerWidth < 768) toggleSidebar();
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

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={isMobile ? { x: sidebarOpen ? 0 : -300 } : { x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed md:static left-0 top-0 h-full w-64 bg-white border-r border-slate-200 shadow-medium z-50 md:z-auto flex flex-col"
      >
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">ReViSense.Ai</h1>
            <p className="text-xs text-slate-500 font-medium">Education Platform</p>
          </div>
          <button onClick={toggleSidebar} className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-smooth">
            <X size={20} />
          </button>
        </div>

        {/* Profile Section - 3 Lines */}
        {user && (
          <div
            onClick={handleProfileClick}
            className="p-4 border-b border-slate-200 cursor-pointer hover:bg-slate-50 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <Avatar src={user.avatar_url} alt={user.name} size="md" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                <p className="text-xs font-semibold text-blue-600 mt-1">{getRoleSpecificText()}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {items.map((item) => {
              // On mobile, hide AI Buddy (it's in bottom nav)
              if (isMobile && item.label === 'AI Buddy') {
                return null;
              }

              // Render section headers
              if (item.isSection) {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="mt-6 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase text-slate-500 tracking-wider">
                      <Icon size={14} />
                      <span>{item.label}</span>
                    </div>
                  </div>
                );
              }

              // Render regular nav items
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    if (window.innerWidth < 768) toggleSidebar();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-12 transition-smooth font-medium text-sm ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-soft'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="danger" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {user && (
          <div className="p-4 border-t border-slate-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-12 text-red-600 hover:bg-red-50 transition-smooth font-medium"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </motion.aside>
    </>
  );
};
