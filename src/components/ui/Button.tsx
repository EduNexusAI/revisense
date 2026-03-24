import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'glass' | 'gradient-purple' | 'gradient-emerald' | 'gradient-amber' | 'gradient-pink' | 'premium';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className, 
  icon,
  iconPosition = 'left',
  loading = false,
  disabled,
  ...props 
}: ButtonProps) => {
  const baseStyles = 'font-semibold rounded-12 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center gap-2 active:scale-95';

  const variants = {
    primary: 'bg-gradient-to-br from-blue-600 via-blue-650 to-blue-700 text-white hover:from-blue-700 hover:via-blue-750 hover:to-blue-800 shadow-soft hover:shadow-medium focus:ring-blue-300 focus:ring-offset-white',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 shadow-soft hover:shadow-medium focus:ring-slate-300',
    outline: 'border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 focus:ring-slate-300',
    ghost: 'text-slate-700 hover:bg-slate-100 focus:ring-slate-300',
    danger: 'bg-gradient-to-br from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-soft hover:shadow-medium focus:ring-red-300',
    glass: 'glass-sm text-slate-900 hover:glass-base focus:ring-blue-300',
    'gradient-purple': 'bg-gradient-to-br from-purple-600 via-purple-650 to-purple-700 text-white hover:from-purple-700 hover:via-purple-750 hover:to-purple-800 shadow-soft hover:shadow-medium focus:ring-purple-300',
    'gradient-emerald': 'bg-gradient-to-br from-emerald-600 via-emerald-650 to-emerald-700 text-white hover:from-emerald-700 hover:via-emerald-750 hover:to-emerald-800 shadow-soft hover:shadow-medium focus:ring-emerald-300',
    'gradient-amber': 'bg-gradient-to-br from-amber-600 via-amber-650 to-amber-700 text-white hover:from-amber-700 hover:via-amber-750 hover:to-amber-800 shadow-soft hover:shadow-medium focus:ring-amber-300',
    'gradient-pink': 'bg-gradient-to-br from-pink-600 via-pink-650 to-pink-700 text-white hover:from-pink-700 hover:via-pink-750 hover:to-pink-800 shadow-soft hover:shadow-medium focus:ring-pink-300',
    premium: 'bg-gradient-to-b from-slate-950 to-black text-white border border-white/10 shadow-2xl hover:shadow-xl hover:shadow-black/80 active:shadow-lg relative overflow-hidden focus:ring-slate-700 focus:ring-offset-white transition-all duration-300 hover:border-white/15',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3.5 text-lg',
  };

  const isDisabled = disabled || loading;

  const displayIcon = loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon;

  const content = iconPosition === 'left' 
    ? <>{displayIcon && <span className="flex-shrink-0">{displayIcon}</span>}{children}</>
    : <>{children}{displayIcon && <span className="flex-shrink-0">{displayIcon}</span>}</>;

  return (
    <motion.button
      whileTap={isDisabled ? undefined : { scale: 0.94 }}
      whileHover={isDisabled ? undefined : { y: -2, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      className={cn(
        baseStyles, 
        variants[variant], 
        sizes[size], 
        isDisabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {content}
    </motion.button>
  );
};
