import { useEffect, ReactNode } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useSessionTimerStore, getMaxSessionTime } from '../../store/sessionTimerStore';
import { SessionTimerModal } from '../ui/SessionTimerModal';

interface SessionTimerProviderProps {
  children: ReactNode;
}

let timerInterval: NodeJS.Timeout | null = null;

export const SessionTimerProvider = ({ children }: SessionTimerProviderProps) => {
  const { user, isAuthenticated } = useAuthStore();
  const { startSession, updateElapsedTime, isTimeExpired, maxSessionTime, resetSession, elapsedTime } = useSessionTimerStore();

  // Start session timer for students
  useEffect(() => {
    if (isAuthenticated && user?.role === 'student') {
      const maxTime = getMaxSessionTime(user.grade);
      startSession(maxTime);
    } else if (!isAuthenticated) {
      resetSession();
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    }
  }, [isAuthenticated, user?.role, user?.grade, startSession, resetSession]);

  // Update elapsed time every second for students
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'student') {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      return;
    }

    if (timerInterval) {
      clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {
      const currentState = useSessionTimerStore.getState();
      updateElapsedTime(currentState.elapsedTime + 1);
    }, 1000);

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    };
  }, [isAuthenticated, user?.role, updateElapsedTime]);

  // Show modal when time expires for students
  if (isAuthenticated && user?.role === 'student' && isTimeExpired) {
    return (
      <>
        <SessionTimerModal maxSessionTime={maxSessionTime} grade={user.grade} />
        {children}
      </>
    );
  }

  return <>{children}</>;
};
