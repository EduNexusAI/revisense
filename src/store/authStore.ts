import { create } from 'zustand';
import { User, School, AuthState } from '../types';

interface AuthStore extends AuthState {
  login: (email: string, password: string, role: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setSchool: (school: School) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateUserLanguage: (language: string) => void;
}

// Dummy users for demo (will be replaced with Supabase Auth)
const DUMMY_USERS: Record<string, { user: User; school: School }> = {
  admin: {
    user: {
      id: 'admin1',
      name: 'Rajesh Kumar',
      email: 'admin@revisense.com',
      role: 'admin',
      school_id: 'school1',
      status: 'active',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      preferred_language: 'hi',
    },
    school: {
      id: 'school1',
      name: 'Springfield High School',
      theme_primary: '#3B82F6',
      theme_secondary: '#10B981',
      default_language: 'en',
      subscription_plan: 'pro',
      subscription_status: 'active',
    },
  },
  teacher: {
    user: {
      id: 't1',
      name: 'Ravi Krishnamurthy',
      email: 'teacher@revisense.com',
      role: 'teacher',
      school_id: 'school1',
      status: 'active',
      avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
      preferred_language: 'kn',
    },
    school: {
      id: 'school1',
      name: 'Springfield High School',
      theme_primary: '#3B82F6',
      theme_secondary: '#10B981',
      default_language: 'en',
      subscription_plan: 'pro',
      subscription_status: 'active',
    },
  },
  student: {
    user: {
      id: 's1',
      name: 'Priya Nair',
      email: 'student@revisense.com',
      role: 'student',
      school_id: 'school1',
      status: 'active',
      avatar_url: 'https://images.unsplash.com/photo-1519085360771-9852efb5dbc4?w=200&h=200&fit=crop',
      preferred_language: 'ta',
      grade: 9,
    },
    school: {
      id: 'school1',
      name: 'Springfield High School',
      theme_primary: '#3B82F6',
      theme_secondary: '#10B981',
      default_language: 'en',
      subscription_plan: 'pro',
      subscription_status: 'active',
    },
  },
  parent: {
    user: {
      id: 'p1',
      name: 'Suresh Nair',
      email: 'parent@revisense.com',
      role: 'parent',
      school_id: 'school1',
      status: 'active',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      preferred_language: 'ml',
    },
    school: {
      id: 'school1',
      name: 'Springfield High School',
      theme_primary: '#3B82F6',
      theme_secondary: '#10B981',
      default_language: 'en',
      subscription_plan: 'pro',
      subscription_status: 'active',
    },
  },
  superadmin: {
    user: {
      id: 'sa1',
      name: 'Raj Patel',
      email: 'admin@edunexes.com',
      role: 'superadmin',
      school_id: 'edunexes',
      status: 'active',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      preferred_language: 'en',
    },
    school: {
      id: 'edunexes',
      name: 'EduNexes Technologies',
      theme_primary: '#4F46E5',
      theme_secondary: '#7C3AED',
      default_language: 'en',
      subscription_plan: 'enterprise',
      subscription_status: 'active',
    },
  },
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  school: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: (email, password, role) => {
    set({ isLoading: true, error: null });
    
    // Simulate API call — immediate state update for demo reliability
    const dummyData = DUMMY_USERS[role as keyof typeof DUMMY_USERS];
    
    if (dummyData) {
      // Small delay for UX feel, then update
      setTimeout(() => {
        set({
          user: dummyData.user,
          school: dummyData.school,
          isAuthenticated: true,
          isLoading: false,
        });
        
        // Persist to localStorage
        localStorage.setItem('auth_user', JSON.stringify(dummyData.user));
        localStorage.setItem('auth_school', JSON.stringify(dummyData.school));
        localStorage.setItem('auth_isAuthenticated', 'true');
      }, 300);
    } else {
      set({
        error: 'Invalid credentials',
        isLoading: false,
      });
    }
  },

  logout: () => {
    set({
      user: null,
      school: null,
      isAuthenticated: false,
      error: null,
    });
    
    // Clear localStorage
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_school');
    localStorage.removeItem('auth_isAuthenticated');
  },

  setUser: (user) => {
    set({ user });
    localStorage.setItem('auth_user', JSON.stringify(user));
  },
  setSchool: (school) => {
    set({ school });
    localStorage.setItem('auth_school', JSON.stringify(school));
  },
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  
  updateUserLanguage: () => {
    // Language switching disabled - site is English only
  },
}));

// Restore session from localStorage on app load
export const initAuthStore = () => {
  const user = localStorage.getItem('auth_user');
  const school = localStorage.getItem('auth_school');
  const isAuthenticated = localStorage.getItem('auth_isAuthenticated') === 'true';
  
  if (isAuthenticated && user && school) {
    useAuthStore.setState({
      user: JSON.parse(user),
      school: JSON.parse(school),
      isAuthenticated: true,
    });
  }
};
