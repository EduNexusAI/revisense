import { ElementType } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';

interface NavItem {
  label: string;
  icon: ElementType;
  path: string;
}

interface BottomNavProps {
  items: NavItem[];
}

export const BottomNav = ({ items }: BottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen } = useUIStore();

  // Hide bottom nav when sidebar is open on mobile
  if (sidebarOpen) {
    return null;
  }

  // Arrange items: 2 left (items 1-2), home center (item 0), 2 right (items 3-4)
  const homeItem = items[0]; // Home is at index 0
  const leftItems = items.slice(1, 3);
  const rightItems = items.slice(3, 5);

  const renderNavItem = (item: NavItem) => {
    const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
    const Icon = item.icon;

    return (
      <button
        key={item.path}
        onClick={() => navigate(item.path)}
        className="relative flex flex-col items-center justify-center gap-1 flex-1 group transition-all duration-300"
      >
        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-gradient-to-br from-slate-800/40 to-black/30 rounded-xl blur-md"
            transition={{ type: 'spring', duration: 0.5 }}
          />
        )}
        <div
          className={`relative z-10 p-2 rounded-2xl transition-all duration-300 ${
            isActive
              ? 'bg-gradient-to-br from-slate-900 to-black text-white shadow-lg scale-105'
              : 'text-slate-700 group-hover:bg-slate-900/40 group-hover:text-white group-hover:shadow-md'
          }`}
        >
          <Icon size={19} />
        </div>
        <span
          className={`relative z-10 text-xs font-semibold transition-all duration-300 text-center leading-tight truncate max-w-14 px-1 ${
            isActive ? 'text-white font-bold' : 'text-slate-700 group-hover:text-white'
          }`}
        >
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <motion.div
      initial={{ y: 120, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 35 }}
      className="md:hidden fixed bottom-4 left-4 right-4 z-40"
    >
      <div className="bg-gradient-to-r from-slate-900/50 via-blue-900/50 to-slate-900/50 backdrop-blur-2xl border border-slate-400/20 rounded-3xl shadow-xl p-2.5">
        <div className="flex items-center justify-between gap-1.5">
          {/* Left items */}
          <div className="flex items-center justify-start flex-1 gap-1.5">
            {leftItems.map(renderNavItem)}
          </div>

          {/* Center Home item */}
          {homeItem && (
            <div className="flex-shrink-0 px-1.5">
              {renderNavItem(homeItem)}
            </div>
          )}

          {/* Right items */}
          <div className="flex items-center justify-end flex-1 gap-1.5">
            {rightItems.map(renderNavItem)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
