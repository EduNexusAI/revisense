import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'outlined' | 'glass' | 'elevated';
  size?: 'sm' | 'md' | 'lg';
}

export const Card = ({ 
  children, 
  className, 
  hover = true, 
  onClick, 
  variant = 'default',
  size = 'md'
}: CardProps) => {
  const Component = onClick ? motion.button : motion.div;

  const sizeStyles = {
    sm: 'p-3 md:p-4',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8',
  };

  const variantStyles = {
    default: 'bg-white border border-slate-200 rounded-16 shadow-soft hover:shadow-medium',
    outlined: 'bg-white/50 border border-slate-300 rounded-16 shadow-soft',
    glass: 'glass-base rounded-16 shadow-soft hover:shadow-medium hover:backdrop-blur-lg hover:bg-white/95',
    elevated: 'bg-white border border-slate-100 rounded-16 shadow-medium hover:shadow-elevated',
  };

  return (
    <Component
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        'transition-smooth',
        sizeStyles[size],
        variantStyles[variant],
        onClick && 'cursor-pointer text-left w-full',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};
