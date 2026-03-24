export const ROUTES = {
  LOGIN: '/login',
  SUPER_ADMIN: '/super-admin',
  ADMIN: '/admin',
  TEACHER: '/teacher',
  MENTOR: '/mentor',
  STUDENT: '/student',
  PARENT: '/parent',
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/unauthorized',
} as const;

export const ROLE_HOME_ROUTES = {
  super_admin: '/super-admin',
  admin: '/admin',
  teacher: '/teacher',
  mentor: '/mentor',
  student: '/student',
  parent: '/parent',
} as const;
