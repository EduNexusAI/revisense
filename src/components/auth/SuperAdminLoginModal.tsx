import React, { useState } from 'react';
import { X, Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface SuperAdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  isLoading?: boolean;
}

export const SuperAdminLoginModal: React.FC<SuperAdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  isLoading = false,
}) => {
  const [email, setEmail] = useState('superadmin@revisense.com');
  const [password, setPassword] = useState('demo');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotEmail) {
      // Simulate sending reset email
      setResetSent(true);
      setTimeout(() => {
        setResetSent(false);
        setShowForgotPassword(false);
        setForgotEmail('');
      }, 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-black px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-lg sm:text-xl font-bold text-white">
            {showForgotPassword ? 'Reset Password' : 'Super Admin Login'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {showForgotPassword ? (
            // Forgot Password Form
            <form onSubmit={handleForgotPassword} className="space-y-3 sm:space-y-4">
              <p className="text-xs sm:text-sm text-gray-600 break-words">
                Enter your email address and we'll send you a password reset link.
              </p>

              <Input
                type="email"
                label="Email Address"
                icon={<Mail size={18} />}
                placeholder="superadmin@revisense.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />

              {resetSent && (
                <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs sm:text-sm text-green-700 font-medium break-words">
                    ✓ Password reset link sent to {forgotEmail}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 text-sm sm:text-base py-2.5 sm:py-3"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setForgotEmail('');
                    setResetSent(false);
                  }}
                >
                  <ArrowLeft size={16} />
                  Back
                </Button>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-2.5 sm:py-3"
                  disabled={!forgotEmail || resetSent}
                >
                  Send Reset Link
                </Button>
              </div>
            </form>
          ) : (
            // Login Form
            <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
              <Input
                type="email"
                label="Email Address"
                icon={<Mail size={18} />}
                placeholder="superadmin@revisense.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                type="password"
                label="Password"
                icon={<Lock size={18} />}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex flex-col gap-3 text-xs sm:text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded w-4 h-4" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors text-left"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-b from-slate-950 via-black to-slate-900 hover:from-slate-900 hover:via-black hover:to-slate-800 text-white font-semibold flex items-center justify-center gap-2 border border-white/20 py-3 sm:py-4 text-sm sm:text-base"
                loading={isLoading}
                icon={<LogIn size={18} />}
              >
                Sign In
              </Button>
            </form>
          )}
        </div>

        {/* Modal Footer Info */}
        <div className="bg-slate-50 px-4 sm:px-6 py-2.5 sm:py-3 border-t border-slate-200">
          <p className="text-xs text-gray-600 text-center break-words">
            For super admin access only. Unauthorized access prohibited.
          </p>
        </div>
      </div>
    </div>
  );
};

