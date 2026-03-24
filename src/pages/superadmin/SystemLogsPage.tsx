import React, { useState } from 'react';
import { Search, Filter, Clock, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';

export const SystemLogsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const logs = [
    { id: 1, timestamp: '2024-03-22 14:35:22', user: 'Admin: Rajesh Kumar', action: 'Login', status: 'Success', details: 'Admin logged in from IP 192.168.1.100' },
    { id: 2, timestamp: '2024-03-22 14:33:45', user: 'Teacher: Ravi Krishnamurthy', action: 'Mark Attendance', status: 'Success', details: 'Marked attendance for class IX-A (45 students)' },
    { id: 3, timestamp: '2024-03-22 14:31:12', user: 'Parent: Suresh Nair', action: 'View Grades', status: 'Success', details: 'Viewed student grades and progress report' },
    { id: 4, timestamp: '2024-03-22 14:28:55', user: 'Student: Priya Nair', action: 'Submit Assignment', status: 'Success', details: 'Mathematics assignment submitted (Grade: A+)' },
    { id: 5, timestamp: '2024-03-22 14:25:33', user: 'Admin: Priya Sharma', action: 'Create User', status: 'Failed', details: 'Failed to create user - Duplicate email address' },
    { id: 6, timestamp: '2024-03-22 14:22:10', user: 'System', action: 'Database Backup', status: 'Success', details: 'Daily backup completed - 2.4GB data backed up' },
    { id: 7, timestamp: '2024-03-22 14:18:47', user: 'Teacher: Anitha Suresh', action: 'Upload Resources', status: 'Success', details: 'Uploaded 3 study materials for English class' },
    { id: 8, timestamp: '2024-03-22 14:15:22', user: 'Admin: Rajesh Kumar', action: 'Export Report', status: 'Success', details: 'Exported attendance report (Excel format)' },
  ];

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Activity Logs</h1>
          <p className="text-sm text-gray-600">Real-time audit trail of all system activities and user actions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
            <h3 className="text-sm font-semibold text-indigo-900">Total Logs Today</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">2.4M</p>
            <p className="text-xs text-indigo-700 mt-1">Real-time tracked</p>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <h3 className="text-sm font-semibold text-green-900">Successful Actions</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">2.39M</p>
            <p className="text-xs text-green-700 mt-1">Success rate: 99.6%</p>
          </Card>
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <h3 className="text-sm font-semibold text-red-900">Failed Actions</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">9.6K</p>
            <p className="text-xs text-red-700 mt-1">Error rate: 0.4%</p>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <h3 className="text-sm font-semibold text-purple-900">Avg Response Time</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">234ms</p>
            <p className="text-xs text-purple-700 mt-1">System performance</p>
          </Card>
        </div>

        {/* Search & Filter */}
        <Card>
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 font-medium">
              <Filter size={18} />
              Filter
            </button>
          </div>

          {/* Activity Log Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Timestamp</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">User / System</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Action</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Details</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={14} />
                        {log.timestamp}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{log.user}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{log.action}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${
                        log.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {log.status === 'Success' ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                        {log.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Real-time Monitor */}
        <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <RefreshCw size={20} className="text-indigo-600 animate-spin" />
            Real-time System Monitor
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-indigo-200">
              <p className="text-sm font-semibold text-gray-900">Current Active Users</p>
              <p className="text-2xl font-bold text-indigo-600 mt-2">3,247</p>
              <div className="mt-3 text-xs text-gray-600">
                <p>Admin: 248 | Teachers: 842 | Students: 1,845 | Parents: 312</p>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-indigo-200">
              <p className="text-sm font-semibold text-gray-900">Requests / Second</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">4.2K</p>
              <p className="text-xs text-gray-600 mt-1">Peak capacity: 8K req/s</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-indigo-200">
              <p className="text-sm font-semibold text-gray-900">System Status</p>
              <p className="text-2xl font-bold text-green-600 mt-2">All Green</p>
              <p className="text-xs text-gray-600 mt-1">Uptime: 99.87% | No alerts</p>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};
