import { ElementType } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

export const StatCard = ({ title, value, icon: Icon, trend, color = 'bg-blue-600' }: StatCardProps) => {
  return (
    <Card hover className="relative overflow-hidden bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft hover:shadow-medium transition-all duration-200" variant="elevated">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-600 mb-3 uppercase tracking-wide">{title}</p>
          <h3 className="text-5xl font-bold text-slate-900 mb-3">{value}</h3>
          {trend && (
            <p className={`text-sm font-semibold ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last month
            </p>
          )}
        </div>
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className={`${color} bg-opacity-15 p-4 rounded-14 flex-shrink-0`}
        >
          <Icon className={`${color.replace('bg-', 'text-')} w-7 h-7`} />
        </motion.div>
      </div>
    </Card>
  );
};
