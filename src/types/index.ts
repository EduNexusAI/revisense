// User & Auth Types
export type UserRole = 'super_admin' | 'admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  school_id?: string;
  avatar_url?: string;
  preferred_language?: string;
  status: 'active' | 'inactive' | 'suspended';
  created_at?: string;
  grade?: number; // For students
}

export interface School {
  id: string;
  name: string;
  logo_url?: string;
  theme_primary: string;
  theme_secondary: string;
  custom_domain?: string;
  default_language: string;
  subscription_plan: 'free' | 'pro' | 'enterprise';
  subscription_status: 'active' | 'suspended' | 'trial';
  created_at?: string;
}

// Student Types
export interface Student {
  id: string;
  name: string;
  school_id: string;
  user_id: string;
  class_id: string;
  parent_id?: string;
  admission_number: string;
  photo_url?: string;
  dob: Date;
  phone?: string;
  email?: string;
  address?: string;
  grade: number;
  section: string;
  created_at?: string;
}

// Teacher Types
export interface Teacher {
  id: string;
  school_id: string;
  user_id: string;
  mentor_class_id?: string;
  subjects: string[];
  employee_id: string;
  joining_date?: Date;
  created_at?: string;
}

// Class Types
export interface Class {
  id: string;
  school_id: string;
  grade: number;
  section: string;
  mentor_id?: string;
  academic_year: string;
  created_at?: string;
}

// Subject Types
export interface Subject {
  id: string;
  school_id: string;
  name: string;
  code: string;
  grade: number;
  created_at?: string;
}

// Attendance Types
export interface AttendanceRecord {
  id: string;
  school_id: string;
  student_id: string;
  teacher_id?: string;
  date: Date;
  status: 'present' | 'absent' | 'late';
  marked_via: 'swipe' | 'manual';
  created_at?: string;
}

// Marks Types
export interface Mark {
  id: string;
  school_id: string;
  student_id: string;
  subject_id: string;
  exam_type: 'unit_test' | 'midterm' | 'final' | 'assignment';
  marks_obtained: number;
  total_marks: number;
  date: Date;
  uploaded_by: string;
  created_at?: string;
}

// AI Permissions
export interface AIPermission {
  id: string;
  school_id: string;
  student_id: string;
  subject_id: string;
  granted_by: string;
  access_type: 'offline' | 'online';
  granted_at: Date;
  expires_at?: Date;
  is_active: boolean;
}

// Fee Types
export interface Fee {
  id: string;
  school_id: string;
  student_id: string;
  fee_type: 'tuition' | 'transport' | 'exam' | 'activity';
  amount: number;
  due_date: Date;
  paid_date?: Date;
  status: 'pending' | 'paid' | 'overdue' | 'partial';
  emi_enabled: boolean;
  payment_ref?: string;
  created_at?: string;
}

// Homework Types
export interface Homework {
  id: string;
  school_id: string;
  class_id: string;
  subject_id: string;
  teacher_id: string;
  title: string;
  description?: string;
  due_date: Date;
  created_at?: string;
}

// Revision Types
export interface Revision {
  id: string;
  school_id: string;
  student_id: string;
  subject_id: string;
  assigned_by: string;
  type: 'daily' | 'weekly' | 'monthly';
  completion_status: 'not_started' | 'in_progress' | 'completed';
  flagged: boolean;
  assigned_at: Date;
  completed_at?: Date;
}

// Notification Types
export interface Notification {
  id: string;
  school_id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  created_at?: string;
}

// Auth State
export interface AuthState {
  user: User | null;
  school: School | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Component Props
export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}
