import React from 'react';
import { TrendingUp, BarChart3, PieChart, Calendar, Download } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';

export const AnalyticsPage: React.FC = () => {
  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
          <p className="text-sm text-gray-600">Comprehensive system analytics and AI-powered insights</p>
        </div>

        {/* Date Range Selector */}
        <Card>
          <div className="flex gap-3 items-center">
            <Calendar size={18} className="text-gray-500" />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>This Year</option>
            </select>
            <button className="ml-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 font-medium">
              <Download size={18} />
              Export Report
            </button>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
            <h3 className="text-sm font-semibold text-pink-900">Total Platform Users</h3>
            <p className="text-3xl font-bold text-pink-600 mt-2">32,847</p>
            <p className="text-xs text-pink-700 mt-1">↑ 12.4% from last month</p>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900">Active Schools</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">248</p>
            <p className="text-xs text-blue-700 mt-1">↑ 8.2% from last month</p>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <h3 className="text-sm font-semibold text-green-900">Transactions</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">18.2M</p>
            <p className="text-xs text-green-700 mt-1">↑ 24.3% from last month</p>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <h3 className="text-sm font-semibold text-purple-900">Avg Session Time</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">42min</p>
            <p className="text-xs text-purple-700 mt-1">↑ 5.1% from last month</p>
          </Card>
        </div>

        {/* Analytics Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth Analytics */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-600" />
              User Growth Trends
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">Students</p>
                <div className="mt-2 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{width: '78%'}}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">18,542 users (+15% monthly)</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Teachers</p>
                <div className="mt-2 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{width: '82%'}}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">2,847 users (+8% monthly)</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Parents</p>
                <div className="mt-2 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-amber-600 h-2.5 rounded-full" style={{width: '71%'}}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">12,340 users (+12% monthly)</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Admins</p>
                <div className="mt-2 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '45%'}}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">512 users (+3% monthly)</p>
              </div>
            </div>
          </Card>

          {/* Engagement Analytics */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 size={20} className="text-green-600" />
              Engagement Metrics
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-white rounded-lg border border-green-200">
                <p className="text-sm font-semibold text-gray-900">Daily Active Users</p>
                <p className="text-2xl font-bold text-green-600 mt-1">24,347</p>
                <p className="text-xs text-gray-600 mt-1">85.3% of total users</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-green-200">
                <p className="text-sm font-semibold text-gray-900">Weekly Active Users</p>
                <p className="text-2xl font-bold text-green-600 mt-1">29,562</p>
                <p className="text-xs text-gray-600 mt-1">94.2% of total users</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-green-200">
                <p className="text-sm font-semibold text-gray-900">Avg Pages Per Session</p>
                <p className="text-2xl font-bold text-green-600 mt-1">8.4</p>
                <p className="text-xs text-gray-600 mt-1">Good engagement level</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Feature Usage */}
        <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <PieChart size={20} className="text-pink-600" />
            Feature Usage Analytics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-pink-200">
              <p className="text-sm font-semibold text-gray-900">Attendance Tracking</p>
              <p className="text-3xl font-bold text-pink-600 mt-2">94%</p>
              <p className="text-xs text-gray-600 mt-1">Most used feature</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-pink-200">
              <p className="text-sm font-semibold text-gray-900">Grade Management</p>
              <p className="text-3xl font-bold text-pink-600 mt-2">87%</p>
              <p className="text-xs text-gray-600 mt-1">Heavily used by admins</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-pink-200">
              <p className="text-sm font-semibold text-gray-900">Communication</p>
              <p className="text-3xl font-bold text-pink-600 mt-2">76%</p>
              <p className="text-xs text-gray-600 mt-1">Growing feature usage</p>
            </div>
          </div>
        </Card>

        {/* AI-Powered Insights */}
        <Card className="bg-gradient-to-r from-indigo-900 to-purple-900 border-indigo-700 text-white">
          <h3 className="text-lg font-bold mb-4">🤖 AI-Powered Insights</h3>
          <div className="space-y-3">
            <div className="p-3 bg-indigo-800 rounded-lg">
              <p className="text-sm font-semibold">Peak Usage Time</p>
              <p className="text-xs text-indigo-200 mt-1">System experiences highest load between 2-4 PM during school hours. Consider scheduling maintenance during off-peak hours (8-10 PM)</p>
            </div>
            <div className="p-3 bg-purple-800 rounded-lg">
              <p className="text-sm font-semibold">User Retention Trend</p>
              <p className="text-xs text-purple-200 mt-1">User retention improved by 12% this month. New onboarding process is effective. Consider applying similar strategies to other modules</p>
            </div>
            <div className="p-3 bg-indigo-800 rounded-lg">
              <p className="text-sm font-semibold">Recommended Action</p>
              <p className="text-xs text-indigo-200 mt-1">Expand teacher communication tools - 76% usage shows high demand. Investment ROI expected within 2 quarters</p>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};
