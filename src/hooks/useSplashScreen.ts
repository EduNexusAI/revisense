import { useEffect } from 'react';
import { SplashScreen } from '@capacitor/splash-screen';

/**
 * Professional Splash Screen Hook for ReViSense.Ai
 * Handles splash screen animations on iOS and Android
 */

export const useSplashScreen = () => {
  useEffect(() => {
    const initializeSplashScreen = async () => {
      if (!window.Capacitor || !window.Capacitor.isNative) {
        // Running on web, skip splash screen
        return;
      }

      try {
        // Show splash screen initially
        await SplashScreen.show({
          autoHide: false,
          fadeOutDuration: 300,
        });

        // Wait for DOM to be fully loaded and animations to complete
        // 3000ms for iOS, 3200ms for Android (account for both in web)
        await new Promise((resolve) => {
          const hideSplash = () => {
            SplashScreen.hide({
              fadeOutDuration: 300,
            }).catch(console.error);
            resolve(null);
          };

          // Use DOMContentLoaded as primary trigger
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', hideSplash);
          } else {
            // Page already loaded, schedule with animation buffer
            setTimeout(hideSplash, 3200);
          }
        });
      } catch (error) {
        console.error('Error managing splash screen:', error);
      }
    };

    initializeSplashScreen();
  }, []);
};

/**
 * Hook to get current platform splash animation config
 */
export const useSplashConfig = () => {
  const getPlatform = (): 'ios' | 'android' => {
    if (!window.Capacitor) return 'android';
    return window.Capacitor.getPlatform() as 'ios' | 'android';
  };

  const getThemeMode = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'light';
  };

  const platform = getPlatform();
  const theme = getThemeMode();

  return { platform, theme };
};

/**
 * Animation timing constants
 */
export const SPLASH_TIMING = {
  iOS: {
    lightMode: 3000,
    darkMode: 3000,
  },
  android: {
    lightMode: 3200,
    darkMode: 3200,
  },
  web: 3200, // Use longer duration for web as fallback
  fadeOut: 300,
};

/**
 * Color constants for splash screen
 */
export const SPLASH_COLORS = {
  light: {
    background: '#FFFFFF',
    foreground: '#0E0D08',
    primary: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
  },
  dark: {
    background: '#0E0D08',
    foreground: '#FFFFFF',
    primary: '#3B82F6',
    success: '#10B981',
    accent: '#EC4899',
  },
};

/**
 * Animation names for different platforms and themes
 */
export const ANIMATION_NAMES = {
  ios: {
    light: 'gradient-fade-slide',
    dark: 'neon-glow-ascend',
  },
  android: {
    light: 'material-hero-transition',
    dark: 'dark-mode-reveal',
  },
};

/**
 * Example usage in App component:
 *
 * import { useSplashScreen } from './hooks/useSplashScreen';
 *
 * export default function App() {
 *   useSplashScreen();
 *   return <YourAppContent />;
 * }
 */
