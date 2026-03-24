import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, AlertTriangle, Zap, TrendingUp, Eye, Settings, Sliders } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';

export const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [roleMaintenance, setRoleMaintenance] = useState({
    admin: false,
    teacher: false,
    student: false,
    parent: false,
  });

  const roles = [
    { key: 'admin', label: 'Admin Panel', color: 'bg-blue-100 border-blue-300' },
    { key: 'teacher', label: 'Teacher Module', color: 'bg-green-100 border-green-300' },
    { key: 'student', label: 'Student Module', color: 'bg-purple-100 border-purple-300' },
    { key: 'parent', label: 'Parent Module', color: 'bg-amber-100 border-amber-300' },
  ];

  const toggleGlobalMaintenance = () => {
    setMaintenanceMode(!maintenanceMode);
  };

  const toggleRoleMaintenance = (role: keyof typeof roleMaintenance) => {
    setRoleMaintenance(prev => ({ ...prev, [role]: !prev[role] }));
  };

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 cursor-pointer hover:opacity-75 transition" onClick={() => navigate('/superadmin/profile')}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Admin Control Center</h1>
          <p className="text-sm text-gray-500">EduNexes System Management & Supervision Dashboard</p>
        </div>

        {/* Global Maintenance Alert */}
        {maintenanceMode && (
          <div className="bg-gradient-to-r from-red-900 to-red-800 rounded-xl p-5 border border-red-700 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="relative">
                <AlertTriangle className="text-red-300 relative z-10" size={28} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-red-100 text-lg">SYSTEM MAINTENANCE IN PROGRESS</h3>
                <p className="text-red-200 text-sm mt-1">All users are currently blocked from accessing the platform. Expected completion: [Set time]</p>
              </div>
            </div>
          </div>
        )}

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Schools" value="248" icon={Users} color="bg-blue-600" />
          <StatCard title="Active Admins" value="512" icon={Users} color="bg-green-600" />
          <StatCard title="System Uptime" value="99.8%" icon={TrendingUp} color="bg-purple-600" />
          <StatCard title="API Calls/min" value="4.2K" icon={Zap} color="bg-orange-600" />
        </div>

        {/* Global Maintenance Control */}
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-2xl overflow-hidden">
          <div className="relative">
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-2xl opacity-5 ${maintenanceMode ? 'bg-red-500' : 'bg-green-500'}`}></div>
            
            <div className="relative z-10 flex items-center justify-between p-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${maintenanceMode ? 'bg-red-500' : 'bg-green-500'}`}></div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <AlertTriangle size={28} className={maintenanceMode ? 'text-red-400' : 'text-green-400'} />
                    Global System Maintenance
                  </h2>
                </div>
                <p className="text-gray-400 text-sm mt-2">Master control to disable the entire platform for infrastructure updates</p>
                <div className="mt-4 flex gap-4">
                  <div className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                    Status: <span className={maintenanceMode ? 'text-red-400 font-bold' : 'text-green-400 font-bold'}>{maintenanceMode ? 'MAINTENANCE' : 'OPERATIONAL'}</span>
                  </div>
                  <div className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                    Users Affected: <span className="text-white font-bold">{maintenanceMode ? '∞' : '0'}</span>
                  </div>
                </div>
              </div>
              
              {/* Professional Toggle Switch */}
              <button
                onClick={toggleGlobalMaintenance}
                className={`relative w-20 h-12 rounded-full transition-all duration-300 shadow-lg ${
                  maintenanceMode
                    ? 'bg-red-600'
                    : 'bg-green-600'
                }`}
              >
                <div className={`absolute top-1 left-1 w-10 h-10 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  maintenanceMode ? 'translate-x-8' : 'translate-x-0'
                }`}></div>
              </button>
            </div>
          </div>
        </Card>

        {/* Per-Role Maintenance Control */}
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Sliders size={28} />
            Module-Level Control Panel
          </h2>
          <p className="text-gray-400 text-sm mb-6">Manage individual platform modules independently for targeted maintenance</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => {
              const isActive = !roleMaintenance[role.key as keyof typeof roleMaintenance];
              return (
                <div
                  key={role.key}
                  className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-6 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl"
                >
                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isActive ? 'bg-gradient-to-br from-green-500/10 to-transparent' : 'bg-gradient-to-br from-red-500/10 to-transparent'
                  }`}></div>
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <h3 className="text-lg font-bold text-white">{role.label}</h3>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isActive 
                            ? 'bg-green-500/20 text-green-300 border border-green-500/50' 
                            : 'bg-red-500/20 text-red-300 border border-red-500/50'
                        }`}>
                          {isActive ? 'ONLINE' : 'OFFLINE'}
                        </div>
                        <div className="px-3 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                          {isActive ? 'Users: 2.4K' : 'Users: 0'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Professional Mini Toggle */}
                    <button
                      onClick={() => toggleRoleMaintenance(role.key as keyof typeof roleMaintenance)}
                      className={`relative w-16 h-9 rounded-full transition-all duration-300 shadow-lg ml-4 flex-shrink-0 ${
                        isActive
                          ? 'bg-green-600'
                          : 'bg-red-600'
                      }`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-8 h-8 bg-white rounded-full shadow-md transition-transform duration-300 ${
                        isActive ? 'translate-x-7' : 'translate-x-0'
                      }`}></div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Supervision & Control */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Role Supervision */}
          <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Eye size={24} className="text-blue-400" />
              Role Supervision
            </h3>
            <p className="text-blue-200 text-sm mb-6">Monitor and supervise activity across all user roles</p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/superadmin/admin-supervision')}
                className="w-full p-4 bg-gradient-to-r from-blue-800 to-blue-700 hover:from-blue-700 hover:to-blue-600 rounded-lg text-left font-semibold text-white transition-all duration-300 hover:shadow-lg border border-blue-600 group"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Admin Accounts Supervision
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <p className="text-xs text-blue-300 mt-2">512 Active Admins | Monitor actions & permissions</p>
              </button>
              <button
                onClick={() => navigate('/superadmin/teacher-supervision')}
                className="w-full p-4 bg-gradient-to-r from-green-800 to-green-700 hover:from-green-700 hover:to-green-600 rounded-lg text-left font-semibold text-white transition-all duration-300 hover:shadow-lg border border-green-600 group"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Teachers Supervision
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <p className="text-xs text-green-300 mt-2">2.8K Active Teachers | Track performance & attendance</p>
              </button>
              <button
                onClick={() => navigate('/superadmin/student-supervision')}
                className="w-full p-4 bg-gradient-to-r from-purple-800 to-purple-700 hover:from-purple-700 hover:to-purple-600 rounded-lg text-left font-semibold text-white transition-all duration-300 hover:shadow-lg border border-purple-600 group"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    Students Supervision
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <p className="text-xs text-purple-300 mt-2">18.5K Active Students | Monitor progress & engagement</p>
              </button>
              <button
                onClick={() => navigate('/superadmin/parent-supervision')}
                className="w-full p-4 bg-gradient-to-r from-amber-800 to-amber-700 hover:from-amber-700 hover:to-amber-600 rounded-lg text-left font-semibold text-white transition-all duration-300 hover:shadow-lg border border-amber-600 group"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                    Parents Supervision
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <p className="text-xs text-amber-300 mt-2">12.3K Active Parents | Monitor engagement & notifications</p>
              </button>
            </div>
          </Card>

          {/* System Controls */}
          <Card className="bg-gradient-to-br from-purple-900 to-purple-800 border-purple-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Settings size={24} className="text-purple-400" />
              System Administration
            </h3>
            <p className="text-purple-200 text-sm mb-6">Advanced system configuration and monitoring tools</p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/superadmin/system-logs')}
                className="w-full p-4 bg-gradient-to-r from-indigo-800 to-indigo-700 hover:from-indigo-700 hover:to-indigo-600 rounded-lg text-left font-semibold text-white transition-all duration-300 hover:shadow-lg border border-indigo-600 group"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                    System Activity Logs
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <p className="text-xs text-indigo-300 mt-2">Real-time audit trails | 2.4M records today</p>
              </button>
              <button
                onClick={() => navigate('/superadmin/analytics')}
                className="w-full p-4 bg-gradient-to-r from-pink-800 to-pink-700 hover:from-pink-700 hover:to-pink-600 rounded-lg text-left font-semibold text-white transition-all duration-300 hover:shadow-lg border border-pink-600 group"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    Analytics & Reports
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <p className="text-xs text-pink-300 mt-2">Comprehensive analytics | AI-powered insights</p>
              </button>
              <button
                onClick={() => navigate('/superadmin/security')}
                className="w-full p-4 bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 rounded-lg text-left font-semibold text-white transition-all duration-300 hover:shadow-lg border border-red-600 group"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    Security Controls
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <p className="text-xs text-red-300 mt-2">2FA, encryption, firewall | 0 threats detected</p>
              </button>
              <button
                onClick={() => navigate('/superadmin/settings')}
                className="w-full p-4 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-lg text-left font-semibold text-white transition-all duration-300 hover:shadow-lg border border-gray-600 group"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    System Settings
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <p className="text-xs text-gray-300 mt-2">Configuration | API keys | Webhooks</p>
              </button>
            </div>
          </Card>
        </div>

        {/* System Health */}
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-8">Infrastructure Health Monitor</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Primary Database', status: 'Healthy', latency: '2.3ms', uptime: '99.99%' },
              { name: 'API Gateway', status: 'Healthy', latency: '1.8ms', uptime: '99.98%' },
              { name: 'Cache Layer', status: 'Healthy', latency: '0.8ms', uptime: '100%' },
              { name: 'Load Balancer', status: 'Healthy', latency: '0.5ms', uptime: '99.99%' },
            ].map((service, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all group">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-white">{service.name}</h4>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Status</span>
                      <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs font-bold rounded-full border border-green-500/50">
                        {service.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Response</span>
                      <span className="text-sm font-mono text-green-400">{service.latency}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Uptime</span>
                      <span className="text-sm font-mono text-blue-400">{service.uptime}</span>
                    </div>
                    
                    {/* Health Bar */}
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};
