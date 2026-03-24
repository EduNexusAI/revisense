import { cn } from '../../utils/cn';
import { getInitials } from '../../utils/formatters';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar = ({ src, alt, size = 'md', className }: AvatarProps) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-xl',
  };

  return (
    <div className={cn('rounded-full overflow-hidden flex items-center justify-center bg-accent text-white font-semibold border-4 border-white shadow-lg', sizes[size], className)}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span>{getInitials(alt)}</span>
      )}
    </div>
  );
};
