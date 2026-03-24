import { useEffect, useState } from 'react';
import { Clock, AlertCircle, Eye, Zap } from 'lucide-react';
import { useSessionTimerStore, formatTime, getTimeRemaining, getSessionPercentage } from '../../store/sessionTimerStore';
import { SessionTimerModal } from './SessionTimerModal';
import { useAuthStore } from '../../store/authStore';

interface SessionTimerWidgetProps {
  compact?: boolean;
  maxSessionTime?: number;
}

export const SessionTimerWidget = ({ compact = false, maxSessionTime: initialMaxTime }: SessionTimerWidgetProps) => {
  const { elapsedTime, maxSessionTime, isTimeExpired } = useSessionTimerStore();
  const { user } = useAuthStore();
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(elapsedTime, maxSessionTime));
  const [showPreview, setShowPreview] = useState(false);
  const percentage = getSessionPercentage(elapsedTime, maxSessionTime);
  const isWarning = percentage > 80;
  const isCritical = percentage > 95;

  useEffect(() => {
    setTimeRemaining(getTimeRemaining(elapsedTime, maxSessionTime));
  }, [elapsedTime, maxSessionTime]);

  if (elapsedTime === 0) {
    return null;
  }

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  if (compact) {
    return (
      <>
        {/* Mobile Compact Timer - White Background with Dark Text */}
        <div className="flex items-center gap-0.5 px-2 py-1.5 rounded-lg" 
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,248,248,0.93) 100%)',
            borderRadius: '8px',
            border: '1.5px solid rgba(200,200,200,0.5)',
            backdropFilter: 'blur(12px)',
            webkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12), inset 0 1px 2px rgba(255,255,255,0.8)',
            position: 'relative',
            overflow: 'hidden'
          }}>
          
          {/* Clock Icon - Dark Black */}
          <div className="relative flex-shrink-0 z-10">
            <Clock className="w-3.5 h-3.5" style={{ 
              color: '#1a1a1a',
              fontWeight: 'bold',
              animation: isCritical 
                ? 'pulse 1s cubic-bezier(0.4,0,0.6,1) infinite' 
                : 'none',
              filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
            }} />
            {isCritical && (
              <div className="absolute -top-1 -right-0.5 w-1 h-1 bg-red-600 rounded-full animate-pulse" />
            )}
          </div>

          {/* Timer Display - Dark Black Bold */}
          <span className="font-mono font-black text-xs z-10 relative"
            style={{
              color: '#1a1a1a',
              fontWeight: '900',
              textShadow: '0 1px 2px rgba(255,255,255,0.8)',
              minWidth: '30px'
            }}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>

          {/* Preview Button - Dark Icons */}
          <button
            onClick={() => setShowPreview(true)}
            className="p-1 rounded transition-all duration-300 transform hover:scale-110 active:scale-95 z-10 relative flex-shrink-0"
            style={{
              background: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(3px)',
              border: '0.5px solid rgba(150,150,150,0.3)',
              cursor: 'pointer'
            }}
            title="Preview"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(230,230,230,0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.6)';
            }}>
            <Eye className="w-3 h-3" style={{ color: '#1a1a1a', fontWeight: 'bold' }} />
          </button>

          {/* Critical Indicators */}
          {isCritical && (
            <div className="w-0.5 h-0.5 bg-red-600 rounded-full animate-pulse z-10" 
              style={{ boxShadow: '0 0 4px rgba(220,38,38,0.6)' }} 
            />
          )}
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <SessionTimerModal
            maxSessionTime={maxSessionTime}
            grade={user?.grade}
            isPreview={true}
            onClosePreview={() => setShowPreview(false)}
          />
        )}
      </>
    );
  }

  return (
    <>
      {/* Desktop Professional Timer - White Background with Dark Text */}
      <div className="rounded-3xl overflow-hidden border-2 transition-all duration-300 transform shadow-2xl backdrop-blur-lg"
        style={{
          borderColor: 'rgba(180,180,180,0.6)',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(250,250,250,0.96) 50%, rgba(248,248,248,0.97) 100%)',
          backdropFilter: 'blur(16px)',
          webkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 25px 70px rgba(0,0,0,0.15), 0 10px 30px rgba(0,0,0,0.10), inset 0 1px 2px rgba(255,255,255,0.8)'
        }}>
        
        {/* Premium Header with Depth - Dark Text */}
        <div className="px-8 py-7 relative" 
          style={{
            background: 'linear-gradient(135deg, rgba(245,245,245,1) 0%, rgba(240,240,240,1) 30%, rgba(235,235,235,1) 100%)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)'
          }}>
          
          {/* Decorative gradient overlays */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.1), transparent)' }} />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.05), transparent)' }} />
          </div>

          {/* Header Content */}
          <div className="relative z-10 flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* Icon Container with Glass Effect */}
              <div className="relative p-3 rounded-2xl flex-shrink-0" style={{ 
                background: 'rgba(230,230,230,0.6)', 
                backdropFilter: 'blur(8px)', 
                border: '1.5px solid rgba(180,180,180,0.4)',
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5), 0 4px 12px rgba(0,0,0,0.08)'
              }}>
                <Clock className="w-8 h-8 flex-shrink-0" style={{
                  color: '#1a1a1a',
                  fontWeight: 'bold',
                  animation: isCritical ? 'pulse 1.5s cubic-bezier(0.4,0,0.6,1) infinite' : 'none',
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))'
                }} />
                {isCritical && (
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-600 rounded-full animate-pulse" 
                    style={{ boxShadow: '0 0 12px rgba(220,38,38,0.7)' }} 
                  />
                )}
              </div>

              {/* Text Info - Dark */}
              <div className="min-w-0">
                <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest">Session Duration</p>
                <p className="text-slate-900 font-black text-lg">Time Remaining</p>
              </div>

            </div>

            {/* Timer Display - Premium Size - Dark Bold */}
            <div className="text-right flex-shrink-0 ml-6">
              <span className={`text-5xl font-black font-mono block tracking-tighter`}
                style={{
                  color: '#1a1a1a',
                  textShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  lineHeight: '1.2',
                  letterSpacing: '0.05em'
                }}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
              <p className="text-slate-600 text-xs font-semibold mt-1">Min : Sec</p>
            </div>

          </div>
        </div>

        {/* Content Section - Professional Spacing */}
        <div className="px-8 py-7 space-y-6">
          
          {/* Progress Metrics Section */}
          <div className="space-y-3">
            {/* Metric Header - Dark Text */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-wider text-slate-700">
                Session Progress
              </span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black" style={{ color: '#1a1a1a' }}>
                  {Math.round(percentage)}%
                </span>
                <span className="text-xs font-medium" style={{ color: '#666666' }}>of {Math.floor(maxSessionTime / 60)} min</span>
              </div>
            </div>

            {/* Advanced Progress Bar */}
            <div className={`relative p-1.5 rounded-2xl`} style={{
              background: 'linear-gradient(135deg, rgba(230,230,230,0.4), rgba(220,220,220,0.3))'
            }}>
              <div className="w-full h-5 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(200,200,200,0.4)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
                <div
                  className={`h-full transition-all duration-300 relative`}
                  style={{
                    width: `${Math.min(percentage, 100)}%`,
                    background: isCritical
                      ? 'linear-gradient(90deg, rgba(220,38,38,1) 0%, rgba(239,68,68,1) 50%, rgba(220,38,38,1) 100%)'
                      : isWarning
                      ? 'linear-gradient(90deg, rgba(234,88,12,1) 0%, rgba(251,146,60,1) 50%, rgba(234,88,12,1) 100%)'
                      : 'linear-gradient(90deg, rgba(37,99,235,1) 0%, rgba(96,165,250,1) 50%, rgba(37,99,235,1) 100%)',
                    boxShadow: isCritical
                      ? '0 0 24px rgba(220,38,38,0.6), inset 0 1px 0 rgba(255,255,255,0.3)'
                      : isWarning
                      ? '0 0 24px rgba(234,88,12,0.5), inset 0 1px 0 rgba(255,255,255,0.3)'
                      : '0 0 20px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                    animation: isCritical ? 'pulse 1.5s cubic-bezier(0.4,0,0.6,1) infinite' : 'none'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Professional Status Card */}
          <div className={`rounded-2xl px-5 py-4 flex items-center gap-4 border-2 transition-all duration-300 backdrop-blur-sm`}
            style={{
              borderColor: isCritical ? 'rgba(220,38,38,0.25)' : isWarning ? 'rgba(234,88,12,0.25)' : 'rgba(180,180,180,0.25)',
              background: 'linear-gradient(135deg, rgba(248,248,248,0.8) 0%, rgba(240,240,240,0.7) 100%)',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
            }}>
            <div className="flex-shrink-0">
              {isCritical ? (
                <Zap className="w-6 h-6" style={{ 
                  color: '#dc2626',
                  filter: 'drop-shadow(0 0 8px rgba(220,38,38,0.35))',
                  animation: 'pulse 1.5s cubic-bezier(0.4,0,0.6,1) infinite'
                }} />
              ) : (
                <AlertCircle className={`w-6 h-6 transition-all duration-300`} style={{
                  color: isWarning ? '#ea580c' : '#3b82f6'
                }} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-base text-slate-900 transition-colors duration-300">
                {isCritical
                  ? '⚠️ Session ends soon - Save immediately!'
                  : isWarning
                  ? '⚠️ Please save your work'
                  : `⏱️ ${formatTime(timeRemaining)} remaining`}
              </p>
              <p className="text-xs font-medium mt-0.5 text-slate-700">
                {percentage > 50 ? 'More than half your session used' : 'Session is progressing normally'}
              </p>
            </div>
          </div>

          {/* Premium Preview Button */}
          <button
            onClick={() => setShowPreview(true)}
            className={`w-full px-6 py-4 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2`}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(245,245,245,0.85) 100%)',
              color: '#1a1a1a',
              border: '1.5px solid rgba(180,180,180,0.4)',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)',
              focusRingColor: 'rgba(100,100,100,0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            title="Click to preview session expiration modal"
          >
            <Eye className="w-5 h-5" style={{ color: '#1a1a1a', fontWeight: 'bold', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))' }} />
            <span style={{ color: '#1a1a1a', fontWeight: '700' }}>Preview Expiration Modal</span>
          </button>
        </div>

        {/* Premium Footer Accent */}
        <div className={`h-1 transition-all duration-300`} 
          style={{
            background: isCritical 
              ? 'linear-gradient(90deg, rgba(220,38,38,0.8) 0%, rgba(239,68,68,0.8) 50%, rgba(220,38,38,0.8) 100%)'
              : isWarning 
              ? 'linear-gradient(90deg, rgba(234,88,12,0.8) 0%, rgba(251,146,60,0.8) 50%, rgba(234,88,12,0.8) 100%)'
              : 'linear-gradient(90deg, rgba(200,200,200,0.6) 0%, rgba(180,180,180,0.5) 50%, rgba(200,200,200,0.6) 100%)',
            animation: isCritical ? 'pulse 1.5s cubic-bezier(0.4,0,0.6,1) infinite' : 'none'
          }} 
        />
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <SessionTimerModal
          maxSessionTime={maxSessionTime}
          grade={user?.grade}
          isPreview={true}
          onClosePreview={() => setShowPreview(false)}
        />
      )}
    </>
  );
};
