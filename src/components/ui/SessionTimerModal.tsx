import { Clock, LogOut, X, AlertTriangle, Zap } from 'lucide-react';
import { Button } from './Button';
import { useAuthStore } from '../../store/authStore';

interface SessionTimerModalProps {
  maxSessionTime: number;
  grade?: number;
  isPreview?: boolean;
  onClosePreview?: () => void;
}

export const SessionTimerModal = ({ maxSessionTime, grade, isPreview = false, onClosePreview }: SessionTimerModalProps) => {
  const { logout } = useAuthStore();

  const maxMinutes = maxSessionTime / 60;
  const isExtendedTime = grade && grade > 10;

  return (
    <>
      {/* Full Screen Blurred Background */}
      <div 
        className="animate-fade-in"
        onClick={isPreview ? onClosePreview : undefined}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(12px)',
          zIndex: 9998,
          cursor: isPreview ? 'pointer' : 'default'
        }}
      />

      {/* Full Screen Modal Container */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: 'max(6px, 1vw)',
          overflow: 'auto'
        }}
      >
        <div 
          className="animate-slide-up"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: window.innerWidth < 768 ? 'min(90vw, 320px)' : 'min(500px, 95vw)',
            backgroundColor: 'rgb(15, 23, 42)',
            backgroundImage: 'linear-gradient(to bottom right, rgb(15, 23, 42), rgb(30, 41, 59))',
            borderRadius: window.innerWidth < 768 ? '16px' : '20px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden',
            transform: 'auto',
            border: '1px solid rgba(71, 85, 105, 0.5)',
            maxHeight: window.innerWidth < 768 ? '80vh' : '90vh',
            overflowY: 'auto'
          }}
        >
          {/* Animated Background Gradient Orb */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />

          {/* Content Wrapper */}
          <div className="relative z-10">
            {/* Header with Gradient */}
            <div className="relative px-4 sm:px-8 py-6 sm:py-10 bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600/50">
              {/* Animated Red Attention Dots */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex gap-1.5">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>

              {/* Icon with Advanced Animation */}
              <div className="relative flex justify-center mb-4 sm:mb-6">
                <div className="relative">
                  {/* Outer pulse */}
                  <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse" style={{ animationDuration: '2s' }} />
                  {/* Icon container */}
                  <div className="relative p-4 sm:p-5 bg-gradient-to-br from-red-600/20 to-red-500/10 rounded-full backdrop-blur-sm border border-red-500/30">
                    <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 animate-bounce drop-shadow-lg" style={{ animationDuration: '2s' }} />
                  </div>
                </div>
              </div>

              {/* Preview Badge */}
              {isPreview && (
                <div className="inline-block bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mx-auto block mb-3 sm:mb-4 backdrop-blur-sm">
                  🧪 PREVIEW MODE
                </div>
              )}

              {/* Title with Gradient Text */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white text-center mb-2 sm:mb-3 drop-shadow-lg">
                <span className="bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent">
                  Session Expired
                </span>
              </h2>
              <p className="text-slate-300 text-center text-xs sm:text-sm font-semibold tracking-wide">
                Your app access time has ended
              </p>
            </div>

            {/* Content Section */}
            <div className="relative px-4 sm:px-8 py-6 sm:py-10 space-y-5 sm:space-y-7">
              {/* Critical Warning Box */}
              <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/30 rounded-2xl px-4 sm:px-6 py-4 sm:py-5 backdrop-blur-sm">
                <div className="flex gap-3 sm:gap-4 items-start">
                  <div className="p-2 bg-red-500/20 rounded-lg flex-shrink-0 border border-red-500/30">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm sm:text-base mb-1">App Access Restricted</p>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Your {maxMinutes === 45 ? '45-minute' : '2-hour'} session limit has been reached. The app will now be locked to maintain healthy digital habits.
                    </p>
                  </div>
                </div>
              </div>

              {/* Time Allocation Card - Advanced Design */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-10 blur transition-all duration-300" />
                <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-600/50 rounded-2xl p-5 sm:p-7 backdrop-blur-sm">
                  <p className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 sm:mb-4">Allowed Session Time</p>
                  <div className="flex items-baseline gap-3 sm:gap-4">
                    <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                      {isExtendedTime ? '2H' : '45M'}
                    </span>
                    <div className="flex-1">
                      <p className="text-white font-bold text-lg sm:text-xl">{isExtendedTime ? '2 Hours' : '45 Minutes'}</p>
                      {grade && (
                        <p className="text-slate-400 text-xs sm:text-sm mt-1">
                          {maxMinutes === 45 ? 'Classes 1-10' : 'Classes 11-12'} Student
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Educational Info Grid */}
              <div className="space-y-3">
                <p className="text-slate-300 font-bold text-xs sm:text-sm uppercase tracking-wider">Why This Limit?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: '🧠', title: 'Healthy Mind', desc: 'Balanced screen time' },
                    { icon: '⚡', title: 'Focus & Energy', desc: 'Regular study breaks' },
                    { icon: '🏃', title: 'Physical Health', desc: 'Movement & activity' },
                    { icon: '👁️', title: 'Eye Care', desc: 'Reduces eye strain' },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-800/50 border border-slate-600/30 rounded-xl px-3 sm:px-4 py-3 transition-all duration-300 hover:border-slate-500/50 hover:bg-slate-800/70">
                      <div className="text-lg sm:text-2xl mb-1">{item.icon}</div>
                      <p className="text-white text-xs sm:text-sm font-bold">{item.title}</p>
                      <p className="text-slate-400 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-slate-700/0 via-slate-600/50 to-slate-700/0" />

              {/* Action Section */}
              <div className="space-y-3">
                {isPreview ? (
                  <>
                    <button
                      onClick={onClosePreview}
                      className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
                    >
                      <X className="w-5 h-5" />
                      Close Preview
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-slate-400 text-center text-xs sm:text-sm">
                      You can log in again after some time to continue your studies.
                    </p>
                    <button
                      onClick={() => logout()}
                      className="w-full py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-red-500/50"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout Now
                    </button>
                  </>
                )}
              </div>

              {/* Footer Info */}
              <div className="text-center pt-2">
                <p className="text-slate-500 text-xs">
                  Need help? Contact your administrator or teacher.
                </p>
              </div>
            </div>

            {/* Advanced Footer Animated Line */}
            <div className="h-1 bg-gradient-to-r from-red-600/0 via-red-500 to-red-600/0 animate-pulse" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </>
  );
};
