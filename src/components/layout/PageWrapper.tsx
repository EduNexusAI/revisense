import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: ReactNode;
}

export const PageWrapper = ({ children, className, title, icon }: PageWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={cn('p-3 md:p-8 pb-24', className)}
    >
      {title && (
        <div className="flex items-center gap-4 mb-8">
          {icon && <div className="text-3xl">{icon}</div>}
          <h1 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight">{title}</h1>
        </div>
      )}
      {children}
    </motion.div>
  );
};
