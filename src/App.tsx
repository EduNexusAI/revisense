import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore, initAuthStore } from './store/authStore';
import { SessionTimerProvider } from './components/layout/SessionTimerProvider';
import { AppShell } from './components/layout/AppShell';
import { ToastContainer } from './components/ui/ToastContainer';
import { LoginPage } from './pages/auth/LoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProfilePage } from './pages/admin/AdminProfilePage';
import { AdminCreateTeacherPage } from './pages/admin/AdminCreateTeacherPage';
import { SchoolSettingsPage } from './pages/admin/SchoolSettingsPage';
import { FeeManagementPage } from './pages/admin/FeeManagementPage';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { CalendarPlanningPage } from './pages/admin/CalendarPlanningPage';
import { AttendanceApprovalsPage } from './pages/admin/AttendanceApprovalsPage';
import { ELibraryPage } from './pages/admin/ELibraryPage';
import { DownloadDataPage } from './pages/admin/DownloadDataPage';
import { RaiseTicketsPage } from './pages/admin/RaiseTicketsPage';
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { TeacherProfilePage } from './pages/teacher/TeacherProfilePage';
import { TeacherCreateStudentPage } from './pages/teacher/TeacherCreateStudentPage';
import { AttendanceMarkingPage } from './pages/teacher/AttendanceMarkingPage';
import { AttendanceReportPage } from './pages/teacher/AttendanceReportPage';
import { MarksUploadPage } from './pages/teacher/MarksUploadPage';
import { HomeworkManagementPage } from './pages/teacher/HomeworkManagementPage';
import { TeacherWorklogPage } from './pages/teacher/TeacherWorklogPage';
import { StudentGroupsPage } from './pages/teacher/StudentGroupsPage';
import { AIResearchPage } from './pages/teacher/AIResearchPage';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentProfilePage } from './pages/student/StudentProfilePage';
import { HomeworkPage } from './pages/student/HomeworkPage';
import { MarksAndPerformancePage } from './pages/student/MarksAndPerformancePage';
import { AIBuddyPage } from './pages/student/AIBuddyPage';
import { CalendarPage } from './pages/student/CalendarPage';
import { TimeTablePage } from './pages/student/TimeTablePage';
import { MyAttendancePage } from './pages/student/MyAttendancePage';
import { StudyMaterialsPage } from './pages/student/StudyMaterialsPage';
import { NoticesPage } from './pages/student/NoticesPage';
import { BusTrackingPage } from './pages/student/BusTrackingPage';
import { FeePaymentPage } from './pages/student/FeePaymentPage';
import { ParentDashboard } from './pages/parent/ParentDashboard';
import { ParentProfilePage } from './pages/parent/ParentProfilePage';
import { NotificationsPage } from './pages/parent/NotificationsPage';
import { SuperAdminDashboard } from './pages/superadmin/SuperAdminDashboard';
import { SuperAdminProfilePage } from './pages/superadmin/SuperAdminProfilePage';
import { SuperAdminCreateAdminPage } from './pages/superadmin/SuperAdminCreateAdminPage';
import { AdminSupervisionPage } from './pages/superadmin/AdminSupervisionPage';
import { TeacherSupervisionPage } from './pages/superadmin/TeacherSupervisionPage';
import { StudentSupervisionPage } from './pages/superadmin/StudentSupervisionPage';
import { ParentSupervisionPage } from './pages/superadmin/ParentSupervisionPage';
import { SystemLogsPage } from './pages/superadmin/SystemLogsPage';
import { AnalyticsPage } from './pages/superadmin/AnalyticsPage';
import { SecurityPage } from './pages/superadmin/SecurityPage';
import { TicketManagementPage } from './pages/superadmin/TicketManagementPage';
import { SettingsPage } from './pages/superadmin/SettingsPage';
import { ComingSoon } from './components/ui/ComingSoon';
import { adminNav, teacherNav, studentNav, parentNav, superAdminNav } from './config/navigation';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  const { isAuthenticated, user } = useAuthStore();

  // Initialize auth from localStorage on app load
  useEffect(() => {
    initAuthStore();
  }, []);

  const getNavItems = () => {
    if (!user) return [];

    switch (user.role) {
      case 'admin':
        return adminNav;
      case 'teacher':
        return teacherNav;
      case 'student':
        return studentNav;
      case 'parent':
        return parentNav;
      case 'superadmin':
        return superAdminNav;
      default:
        return [];
    }
  };

  return (
    <SessionTimerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to={`/${user?.role}`} /> : <LoginPage />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AppShell navItems={adminNav}>
                <Routes>
                  <Route index element={<AdminDashboard />} />
                  <Route path="profile" element={<AdminProfilePage />} />
                  <Route path="create-teacher" element={<AdminCreateTeacherPage />} />
                  <Route path="users" element={<UserManagementPage />} />
                  <Route path="fees" element={<FeeManagementPage />} />
                  <Route path="calendar" element={<CalendarPlanningPage />} />
                  <Route path="settings" element={<SchoolSettingsPage />} />
                  <Route path="attendance-approvals" element={<AttendanceApprovalsPage />} />
                  <Route path="raise-tickets" element={<RaiseTicketsPage />} />
                  <Route path="e-library" element={<ELibraryPage />} />
                  <Route path="download-data" element={<DownloadDataPage />} />
                </Routes>
              </AppShell>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/*"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <AppShell navItems={teacherNav}>
                <Routes>
                  <Route index element={<TeacherDashboard />} />
                  <Route path="profile" element={<TeacherProfilePage />} />
                  <Route path="create-student" element={<TeacherCreateStudentPage />} />
                  <Route path="attendance" element={<AttendanceMarkingPage />} />
                  <Route path="attendance-report" element={<AttendanceReportPage />} />
                  <Route path="marks" element={<MarksUploadPage />} />
                  <Route path="homework" element={<HomeworkManagementPage />} />
                  <Route path="worklog" element={<TeacherWorklogPage />} />
                  <Route path="groups" element={<StudentGroupsPage />} />
                  <Route path="ai" element={<AIResearchPage />} />
                </Routes>
              </AppShell>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <AppShell navItems={studentNav}>
                <Routes>
                  <Route index element={<StudentDashboard />} />
                  <Route path="profile" element={<StudentProfilePage />} />
                  <Route path="homework" element={<HomeworkPage />} />
                  <Route path="performance" element={<MarksAndPerformancePage />} />
                  <Route path="ai" element={<AIBuddyPage />} />
                  <Route path="calendar" element={<CalendarPage />} />
                  <Route path="timetable" element={<TimeTablePage />} />
                  <Route path="attendance" element={<MyAttendancePage />} />
                  <Route path="marks" element={<MarksAndPerformancePage />} />
                  <Route path="study-materials" element={<StudyMaterialsPage />} />
                  <Route path="notices" element={<NoticesPage />} />
                  <Route path="bus" element={<BusTrackingPage />} />
                  <Route path="fees" element={<FeePaymentPage />} />
                </Routes>
              </AppShell>
            </ProtectedRoute>
          }
        />

        <Route
          path="/parent/*"
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <AppShell navItems={parentNav}>
                <Routes>
                  <Route index element={<ParentDashboard />} />
                  <Route path="profile" element={<ParentProfilePage />} />
                  <Route path="children" element={<ComingSoon title="My Children" description="Switch between your children's profiles." />} />
                  <Route path="fees" element={<FeePaymentPage />} />
                  <Route path="bus" element={<BusTrackingPage />} />
                  <Route path="notifications" element={<NotificationsPage />} />
                </Routes>
              </AppShell>
            </ProtectedRoute>
          }
        />

        <Route
          path="/superadmin/*"
          element={
            <ProtectedRoute allowedRoles={['superadmin']}>
              <AppShell navItems={superAdminNav}>
                <Routes>
                  <Route index element={<SuperAdminDashboard />} />
                  <Route path="profile" element={<SuperAdminProfilePage />} />
                  <Route path="create-admin" element={<SuperAdminCreateAdminPage />} />
                  <Route path="admin-supervision" element={<AdminSupervisionPage />} />
                  <Route path="teacher-supervision" element={<TeacherSupervisionPage />} />
                  <Route path="student-supervision" element={<StudentSupervisionPage />} />
                  <Route path="parent-supervision" element={<ParentSupervisionPage />} />
                  <Route path="ticket-management" element={<TicketManagementPage />} />
                  <Route path="system-logs" element={<SystemLogsPage />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="security" element={<SecurityPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Routes>
              </AppShell>
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
    </SessionTimerProvider>
  );
}

export default App;
