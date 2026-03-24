/**
 * Toast notification utility for showing temporary success/error/info messages
 */

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  duration?: number;
  position?: 'top' | 'bottom';
}

let toastQueue: Array<{
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}> = [];

export const showToast = (message: string, type: ToastType = 'success', options: ToastOptions = {}) => {
  const { duration = 3000 } = options;
  const id = Math.random().toString(36).substr(2, 9);

  const toast = { id, message, type, duration };
  toastQueue.push(toast);

  // Dispatch custom event for UI to listen to
  window.dispatchEvent(
    new CustomEvent('showToast', {
      detail: toast,
    })
  );

  return id;
};

export const dismissToast = (id: string) => {
  toastQueue = toastQueue.filter(t => t.id !== id);
  window.dispatchEvent(
    new CustomEvent('dismissToast', {
      detail: { id },
    })
  );
};
