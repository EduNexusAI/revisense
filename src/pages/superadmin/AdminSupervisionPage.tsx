import React, { useState } from 'react';
import { Search, Filter, Edit, Trash2, Shield, AlertCircle, Check } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const AdminSupervisionPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const admins = [
    { id: 1, name: 'Rajesh Kumar', school: 'Cambridge International', status: 'Active', actions: '2.4K', lastSeen: '2 min ago', permissions: 'Full' },
    { id: 2, name: 'Priya Sharma', school: 'Delhi Public School', status: 'Active', actions: '1.8K', lastSeen: '5 min ago', permissions: 'Standard' },
    { id: 3, name: 'Amit Patel', school: 'St. Andrew\'s School', status: 'Inactive', actions: '890', lastSeen: '2 days ago', permissions: 'Limited' },
    { id: 4, name: 'Neha Singh', school: 'Ryan International', status: 'Active', actions: '3.1K', lastSeen: '1 min ago', permissions: 'Full' },
    { id: 5, name: 'Vikram Malhotra', school: 'Doon School', status: 'Suspended', actions: '45', lastSeen: '5 days ago', permissions: 'Blocked' },
  ];

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Supervision</h1>
          <p className="text-sm text-gray-600">Monitor and manage all administrator accounts across the platform</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900">Total Admins</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">512</p>
            <p className="text-xs text-blue-700 mt-1">+12 this month</p>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <h3 className="text-sm font-semibold text-green-900">Active Now</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">248</p>
            <p className="text-xs text-green-700 mt-1">48.4% of total</p>
          </Card>
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <h3 className="text-sm font-semibold text-amber-900">Inactive</h3>
            <p className="text-3xl font-bold text-amber-600 mt-2">94</p>
            <p className="text-xs text-amber-700 mt-1">Last 30 days</p>
          </Card>
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <h3 className="text-sm font-semibold text-red-900">Suspended</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">8</p>
            <p className="text-xs text-red-700 mt-1">Security review</p>
          </Card>
        </div>

        {/* Search & Filter */}
        <Card>
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search admins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
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
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Admin Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">School</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions Today</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Permissions</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Last Seen</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Controls</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{admin.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{admin.school}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        admin.status === 'Active' ? 'bg-green-100 text-green-700' :
                        admin.status === 'Inactive' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {admin.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{admin.actions}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{admin.permissions}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{admin.lastSeen}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button className="p-2 hover:bg-blue-100 rounded-lg text-blue-600">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 hover:bg-red-100 rounded-lg text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Alerts */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle size={20} className="text-amber-600" />
            Admin Alerts & Actions
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg border border-amber-200">
              <p className="text-sm font-medium text-gray-900">Unusual Activity Detected</p>
              <p className="text-xs text-gray-600 mt-1">Admin Vikram Malhotra attempted 5 failed logins in 10 minutes. Account temporarily locked.</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-green-200">
              <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <Check size={14} className="text-green-600" />
                Compliance Status Updated
              </p>
              <p className="text-xs text-gray-600 mt-1">All 512 admins have completed mandatory security training. Compliance: 100%</p>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};
