import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Mail, Lock, LogIn } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { SuperAdminLoginModal } from '../../components/auth/SuperAdminLoginModal';
import { ROLES } from '../../constants/roles';

const roles = [
  { id: ROLES.SUPER_ADMIN, label: 'Super Admin' },
  { id: ROLES.ADMIN, label: 'Admin' },
  { id: ROLES.TEACHER, label: 'Teacher' },
  { id: ROLES.STUDENT, label: 'Student' },
  { id: ROLES.PARENT, label: 'Parent' },
];

const ROLE_ROUTES: Record<string, string> = {
  [ROLES.SUPER_ADMIN]: '/superadmin',
  [ROLES.ADMIN]: '/admin',
  [ROLES.TEACHER]: '/teacher',
  [ROLES.STUDENT]: '/student',
  [ROLES.PARENT]: '/parent',
};

export const LoginPage = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [selectedRole, setSelectedRole] = useState(window.innerWidth < 640 ? ROLES.STUDENT : ROLES.ADMIN);
  const [email, setEmail] = useState('admin@revisense.com');
  const [password, setPassword] = useState('demo');
  const [superAdminModalOpen, setSuperAdminModalOpen] = useState(false);

  const navigate = useNavigate();
  const { login, isLoading, isAuthenticated, user } = useAuthStore();

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (mobile && selectedRole === ROLES.ADMIN) {
        setSelectedRole(ROLES.STUDENT);
      } else if (!mobile && selectedRole === ROLES.STUDENT) {
        setSelectedRole(ROLES.ADMIN);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedRole]);

  // Navigate once auth state updates (reliable)
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(ROLE_ROUTES[user.role] || '/');
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, selectedRole);
  };

  const handleSuperAdminLogin = (superAdminEmail: string, superAdminPassword: string) => {
    login(superAdminEmail, superAdminPassword, ROLES.SUPER_ADMIN);
    setSuperAdminModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <div className="flex items-center justify-center mb-3 sm:mb-5">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-12 sm:rounded-16">
              <GraduationCap className="w-8 sm:w-10 h-8 sm:h-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">{t('app_name')}</h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium">{t('login_description')}</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-12 sm:rounded-16 p-4 sm:p-8 border border-slate-200 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            {/* Role Selector for Regular Roles */}
            <div>
              <label className="block text-center text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-4">
                {t('select_role')}
              </label>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {roles.filter(r => r.id !== ROLES.SUPER_ADMIN).map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`px-2 sm:px-4 py-3 sm:py-4 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 relative overflow-hidden backdrop-blur-sm ${
                      selectedRole === role.id
                        ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white shadow-xl hover:shadow-2xl border border-blue-400/60 hover:border-blue-300 transform hover:scale-105 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none'
                        : 'bg-gradient-to-br from-slate-50 to-slate-100 text-slate-700 border-2 border-slate-200 hover:border-slate-400 hover:bg-slate-100 transition-all hover:shadow-lg'
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Input */}
            <Input
              type="email"
              label={t('email')}
              icon={<Mail size={18} />}
              placeholder="admin@revisense.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Input */}
            <Input
              type="password"
              label={t('password')}
              icon={<Lock size={18} />}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Login Button */}
            <Button
              type="submit"
              variant="premium"
              size="lg"
              className="w-full text-sm sm:text-base py-2.5 sm:py-3"
              loading={isLoading}
              icon={<LogIn size={18} />}
            >
              {t('login')}
            </Button>
          </form>

          {/* Blue Violet Glassy Premium Divider */}
          <div className="my-4 sm:my-8 relative">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full opacity-50"></div>
            <div className="absolute inset-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full blur-sm opacity-40 -z-10"></div>
          </div>

          {/* Super Admin Section - Separate from others */}
          <div>
            <button
              onClick={() => setSuperAdminModalOpen(true)}
              disabled={isLoading}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-b from-slate-950 via-black to-slate-900 backdrop-blur-md border border-white/20 rounded-lg hover:border-white/30 disabled:opacity-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:shadow-black/70 relative overflow-hidden before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/10 before:to-transparent before:pointer-events-none"
            >
              Super Admin Login
            </button>
          </div>
        </div>
      </div>

      {/* Super Admin Login Modal */}
      <SuperAdminLoginModal
        isOpen={superAdminModalOpen}
        onClose={() => setSuperAdminModalOpen(false)}
        onLogin={handleSuperAdminLogin}
        isLoading={isLoading}
      />
    </div>
  );
};
