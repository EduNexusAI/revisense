import React, { useState } from 'react';
import { Settings, Database, Webhook, Mail, Key, ToggleRight, FileText, Save } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const SettingsPage: React.FC = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
          <p className="text-sm text-gray-600">Configure system preferences, APIs, and features</p>
        </div>

        {/* System Information */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900">Platform Version</h3>
            <p className="text-2xl font-bold text-slate-600 mt-2">v3.2.1</p>
            <p className="text-xs text-slate-600 mt-1">Latest stable</p>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900">License Status</h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">Active</p>
            <p className="text-xs text-blue-700 mt-1">Expires: 2025-12-31</p>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <h3 className="text-sm font-semibold text-green-900">Servers Running</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">12</p>
            <p className="text-xs text-green-700 mt-1">All healthy</p>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <h3 className="text-sm font-semibold text-purple-900">Data Centers</h3>
            <p className="text-2xl font-bold text-purple-600 mt-2">4</p>
            <p className="text-xs text-purple-700 mt-1">Global distribution</p>
          </Card>
        </div>

        {/* Feature Toggle */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ToggleRight size={24} className="text-indigo-600" />
              Feature Controls
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-indigo-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Advanced Analytics</p>
                    <p className="text-xs text-gray-600 mt-1">AI-powered insights and recommendations</p>
                  </div>
                  <button
                    onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                    className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                      analyticsEnabled ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                      analyticsEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}></div>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg border border-indigo-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Email Notifications</p>
                    <p className="text-xs text-gray-600 mt-1">Alert admins about system events</p>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                      emailNotifications ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                      emailNotifications ? 'translate-x-6' : 'translate-x-0'
                    }`}></div>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg border border-indigo-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Maintenance Mode</p>
                    <p className="text-xs text-gray-600 mt-1">Limit access during system updates</p>
                  </div>
                  <button
                    onClick={() => setMaintenanceMode(!maintenanceMode)}
                    className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                      maintenanceMode ? 'bg-orange-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                      maintenanceMode ? 'translate-x-6' : 'translate-x-0'
                    }`}></div>
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* API Configuration */}
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Key size={24} className="text-emerald-600" />
              API Keys
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-emerald-200">
                <p className="text-xs font-semibold text-gray-500 uppercase">Production API Key</p>
                <p className="font-mono text-sm text-gray-900 mt-2 break-all">pk_live_51K2R4h2XxN7vL8q0M9w2A3z4B5c6D7e8F9g0H1i2J3k4L5m6N7o8P9q0</p>
                <p className="text-xs text-gray-600 mt-2">Created: 2025-01-12 | Requests: 2.4M</p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-emerald-200">
                <p className="text-xs font-semibold text-gray-500 uppercase">Development API Key</p>
                <p className="font-mono text-sm text-gray-900 mt-2 break-all">pk_test_51K2R4h2XxN7vL8q0M9w2A3z4B5c6D7e8F9g0H1i2J3k4L5m6N7o8P9q1</p>
                <p className="text-xs text-gray-600 mt-2">Created: 2025-01-15 | Requests: 459K</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Email Configuration */}
        <Card className="bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Mail size={20} className="text-rose-600" />
            Email Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border border-rose-200">
              <label className="block text-sm font-semibold text-gray-900 mb-2">SMTP Server</label>
              <p className="font-mono text-sm text-gray-600 bg-gray-50 p-2 rounded">smtp.sendgrid.net:587</p>
              <p className="text-xs text-gray-600 mt-2">Status: <span className="text-green-600 font-semibold">Connected</span></p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-rose-200">
              <label className="block text-sm font-semibold text-gray-900 mb-2">From Email</label>
              <p className="font-mono text-sm text-gray-600 bg-gray-50 p-2 rounded">noreply@edunexes.com</p>
              <p className="text-xs text-gray-600 mt-2">Emails sent today: <span className="font-semibold">3,427</span></p>
            </div>
          </div>
        </Card>

        {/* Webhook Management */}
        <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Webhook size={20} className="text-cyan-600" />
            Webhook Endpoints
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-lg border border-cyan-200">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Student Enrollment</p>
                  <p className="font-mono text-xs text-gray-600 mt-1">https://webhook.edunexes.com/student/enrolled</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">Active</span>
              </div>
              <p className="text-xs text-gray-600">Last triggered: 42 minutes ago | Success rate: 99.8%</p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-cyan-200">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Grade Updates</p>
                  <p className="font-mono text-xs text-gray-600 mt-1">https://webhook.edunexes.com/grades/updated</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">Active</span>
              </div>
              <p className="text-xs text-gray-600">Last triggered: 8 minutes ago | Success rate: 99.9%</p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-cyan-200">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Attendance Changes</p>
                  <p className="font-mono text-xs text-gray-600 mt-1">https://webhook.edunexes.com/attendance/changed</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">Active</span>
              </div>
              <p className="text-xs text-gray-600">Last triggered: 2 minutes ago | Success rate: 99.7%</p>
            </div>
          </div>
        </Card>

        {/* Database Management */}
        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Database size={20} className="text-purple-600" />
            Database Management
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-purple-200">
              <p className="text-sm font-semibold text-gray-900">Database Size</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">487 GB</p>
              <p className="text-xs text-gray-600 mt-2">Last backup: 2 hours ago | Status: Healthy</p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-purple-200">
              <p className="text-sm font-semibold text-gray-900">Query Performance</p>
              <p className="text-3xl font-bold text-green-600 mt-2">234 ms</p>
              <p className="text-xs text-gray-600 mt-2">Avg response time | Target: &lt;500ms</p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-purple-200">
              <p className="text-sm font-semibold text-gray-900">Connection Pool</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">87/100</p>
              <p className="text-xs text-gray-600 mt-2">Active connections | Limit: 100</p>
            </div>
          </div>
        </Card>

        {/* License Information */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={20} className="text-amber-600" />
            License Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-900">License Type</p>
              <p className="text-lg text-gray-600 mt-1">Enterprise Edition</p>
              <p className="text-xs text-gray-600 mt-2">Organization: EduNexes Global</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Expiration Date</p>
              <p className="text-lg text-green-600 mt-1">2025-12-31</p>
              <p className="text-xs text-gray-600 mt-2">Days remaining: 345</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white rounded-lg border border-amber-200">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">License Key</p>
            <p className="font-mono text-sm text-gray-600 break-all">EDUNEXES-ENT-2024-9X8Y7Z6W5V4U3T2S1R0Q</p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">Reset to Defaults</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <Save size={16} />
            Save Changes
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
};
