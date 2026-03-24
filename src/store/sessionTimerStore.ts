import { create } from 'zustand';

interface SessionTimerStore {
  // Time in milliseconds
  sessionStartTime: number | null;
  elapsedTime: number; // in seconds
  maxSessionTime: number; // in seconds
  isTimeExpired: boolean;
  isPaused: boolean;
  
  // Actions
  startSession: (maxTimeInSeconds: number) => void;
  updateElapsedTime: (seconds: number) => void;
  resetSession: () => void;
  pauseSession: () => void;
  resumeSession: () => void;
  checkTimeExpired: () => boolean;
}

export const useSessionTimerStore = create<SessionTimerStore>((set, get) => ({
  sessionStartTime: null,
  elapsedTime: 0,
  maxSessionTime: 2700, // Default 45 mins in seconds
  isTimeExpired: false,
  isPaused: false,

  startSession: (maxTimeInSeconds: number) => {
    set({
      sessionStartTime: Date.now(),
      maxSessionTime: maxTimeInSeconds,
      elapsedTime: 0,
      isTimeExpired: false,
      isPaused: false,
    });
  },

  updateElapsedTime: (seconds: number) => {
    const state = get();
    if (state.isPaused) return;

    const newElapsedTime = seconds;
    const isExpired = newElapsedTime >= state.maxSessionTime;

    set({
      elapsedTime: newElapsedTime,
      isTimeExpired: isExpired,
    });
  },

  resetSession: () => {
    set({
      sessionStartTime: null,
      elapsedTime: 0,
      maxSessionTime: 2700,
      isTimeExpired: false,
      isPaused: false,
    });
  },

  pauseSession: () => {
    set({ isPaused: true });
  },

  resumeSession: () => {
    set({ isPaused: false });
  },

  checkTimeExpired: () => {
    const state = get();
    return state.elapsedTime >= state.maxSessionTime;
  },
}));

/**
 * Get max session time based on student grade
 * Classes 1-10: 45 minutes
 * Classes 11-12: 2 hours
 */
export const getMaxSessionTime = (grade?: number): number => {
  if (!grade) return 2700; // Default 45 mins
  
  if (grade <= 10) {
    return 45 * 60; // 45 minutes in seconds
  } else {
    return 2 * 60 * 60; // 2 hours in seconds
  }
};

/**
 * Format seconds to HH:MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

/**
 * Get time remaining in seconds
 */
export const getTimeRemaining = (elapsedTime: number, maxTime: number): number => {
  return Math.max(0, maxTime - elapsedTime);
};

/**
 * Get session time as percentage (0-100)
 */
export const getSessionPercentage = (elapsedTime: number, maxTime: number): number => {
  return Math.min(100, (elapsedTime / maxTime) * 100);
};
