import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helpText?: string;
}

export const Input = ({ 
  label, 
  error, 
  className, 
  icon, 
  helpText,
  ...props 
}: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2.5">
          {icon && <span className="text-slate-500">{icon}</span>}
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-4 py-2.5 rounded-12 border border-slate-300 bg-white/80 placeholder:text-slate-400 text-slate-900',
          'transition-smooth duration-200',
          'focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white',
          'hover:border-slate-400 hover:bg-white',
          error && 'border-red-500 focus:border-red-600 focus:ring-red-100',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-600 font-medium flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
      {helpText && !error && (
        <p className="mt-1.5 text-xs text-slate-500">{helpText}</p>
      )}
    </div>
  );
};
