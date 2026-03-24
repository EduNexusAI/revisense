import React, { useState } from 'react';
import { Search, Filter, MessageSquare, TrendingUp, AlertCircle, Users } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';

export const ParentSupervisionPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const parents = [
    { id: 1, name: 'Suresh Nair', children: 'Priya Nair (IX-A)', engagement: '95%', lastActive: '2 hours ago', status: 'Active' },
    { id: 2, name: 'Meera Sharma', children: 'Arjun Sharma (IX-B)', engagement: '82%', lastActive: '1 day ago', status: 'Active' },
    { id: 3, name: 'Lakshmi Menon', children: 'Rahul Menon (XI-A)', engagement: '98%', lastActive: '30 min ago', status: 'Active' },
    { id: 4, name: 'Vikram Kumar', children: 'Kavya Reddy (II-B)', engagement: '45%', lastActive: '5 days ago', status: 'Inactive' },
    { id: 5, name: 'Priya Sharma', children: 'Aditya Kumar (VIII-A)', engagement: '88%', lastActive: '3 hours ago', status: 'Active' },
  ];

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Parent Supervision</h1>
          <p className="text-sm text-gray-600">Monitor parent engagement and communication on the platform</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <h3 className="text-sm font-semibold text-amber-900">Total Parents</h3>
            <p className="text-3xl font-bold text-amber-600 mt-2">12,340</p>
            <p className="text-xs text-amber-700 mt-1">Registered on platform</p>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <h3 className="text-sm font-semibold text-green-900">Active Parents</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">11,264</p>
            <p className="text-xs text-green-700 mt-1">91.3% engagement rate</p>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900">Avg Engagement</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">84.7%</p>
            <p className="text-xs text-blue-700 mt-1">Across all parents</p>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <h3 className="text-sm font-semibold text-purple-900">Messages Sent</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">28.4K</p>
            <p className="text-xs text-purple-700 mt-1">This week</p>
          </Card>
        </div>

        {/* Search & Filter */}
        <Card>
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search parents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 font-medium">
              <Filter size={18} />
              Filter
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Parent Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Children</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Engagement Rate</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Last Active</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {parents.map((parent) => (
                  <tr key={parent.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{parent.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{parent.children}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} className={parent.engagement === '98%' || parent.engagement === '95%' ? 'text-green-500' : parent.engagement === '45%' ? 'text-red-500' : 'text-amber-500'} />
                        <span className="text-sm font-medium text-gray-900">{parent.engagement}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{parent.lastActive}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        parent.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {parent.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Communication & Feedback */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare size={20} className="text-amber-600" />
            Communication Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-amber-200">
              <p className="text-sm font-semibold text-gray-900">Messages Sent</p>
              <p className="text-2xl font-bold text-amber-600 mt-2">28.4K</p>
              <p className="text-xs text-gray-600 mt-1">This week</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-amber-200">
              <p className="text-sm font-semibold text-gray-900">Response Rate</p>
              <p className="text-2xl font-bold text-green-600 mt-2">76.3%</p>
              <p className="text-xs text-gray-600 mt-1">Average response time</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-amber-200">
              <p className="text-sm font-semibold text-gray-900">Satisfaction</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">4.6/5.0</p>
              <p className="text-xs text-gray-600 mt-1">Parent satisfaction score</p>
            </div>
          </div>
        </Card>

        {/* Inactive Parents Alert */}
        <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle size={20} className="text-red-600" />
            Inactive Parents (Action Required)
          </h3>
          <div className="space-y-2">
            <div className="p-3 bg-white rounded-lg border border-red-200">
              <p className="text-sm font-medium text-gray-900">Vikram Kumar</p>
              <p className="text-xs text-gray-600 mt-1">Low engagement (45%) - Last active 5 days ago | 1 child: Kavya Reddy (II-B)</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-red-200">
              <p className="text-sm font-medium text-gray-900">1,076 other parents</p>
              <p className="text-xs text-gray-600 mt-1">Below average engagement - Consider sending re-engagement campaigns</p>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};
