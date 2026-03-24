export const ROLES = {
  SUPER_ADMIN: 'superadmin',
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
  PARENT: 'parent',
} as const;

export const ROLE_LABELS = {
  superadmin: 'Super Admin',
  admin: 'School Admin',
  teacher: 'Teacher',
  student: 'Student',
  parent: 'Parent',
} as const;

export const GRADES = {
  LOWER_PRIMARY: [1, 2, 3, 4],
  UPPER_PRIMARY: [5, 6],
  LOWER_SECONDARY: [7, 8, 9, 10],
  HIGHER_SECONDARY: [11, 12],
  PUC: ['PUC1', 'PUC2'],
} as const;

export const STUDENT_AGE_GROUPS = {
  EARLY: { label: '6-11 years (1st-6th)', grades: [1, 2, 3, 4, 5, 6] },
  TEEN: { label: '12-16 years (7th-10th)', grades: [7, 8, 9, 10] },
  SENIOR: { label: '16+ years (PUC/Degree)', grades: [11, 12, 13, 14] },
} as const;

export const LANGUAGES = {
  en: 'English',
  hi: 'हिन्दी (Hindi)',
  kn: 'ಕನ್ನಡ (Kannada)',
  ta: 'தமிழ் (Tamil)',
  te: 'తెలుగు (Telugu)',
  ml: 'മലയാളം (Malayalam)',
} as const;

export const DEFAULT_COLORS = {
  primary: '#3B82F6',
  secondary: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
  gray: '#6B7280',
} as const;
