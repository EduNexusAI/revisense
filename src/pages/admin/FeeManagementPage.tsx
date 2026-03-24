import React, { useState } from 'react';
import { TrendingUp, DollarSign, AlertCircle, Filter, Download, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface FeeDetail {
  id: string;
  studentName: string;
  studentRoll: string;
  class: string;
  month: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate?: string;
  parentPhone: string;
}

interface FeeStatistics {
  totalCollected: number;
  totalPending: number;
  totalOverdue: number;
  collectionRate: number;
}

const FEE_DATA: FeeDetail[] = [
  { id: '1', studentName: 'Rajesh Kumar', studentRoll: '001', class: 'IX-A', month: 'March 2024', amount: 5000, status: 'paid', dueDate: '2024-03-01', paidDate: '2024-03-02', parentPhone: '98765-43210' },
  { id: '2', studentName: 'Priya Singh', studentRoll: '012', class: 'IX-B', month: 'March 2024', amount: 5500, status: 'pending', dueDate: '2024-03-01', parentPhone: '98765-43211' },
  { id: '3', studentName: 'Arjun Patel', studentRoll: '023', class: 'IX-A', month: 'March 2024', amount: 5000, status: 'paid', dueDate: '2024-03-01', paidDate: '2024-03-01', parentPhone: '98765-43212' },
  { id: '4', studentName: 'Nisha Verma', studentRoll: '034', class: 'IX-C', month: 'February 2024', amount: 5000, status: 'overdue', dueDate: '2024-02-01', parentPhone: '98765-43213' },
  { id: '5', studentName: 'Vikram Joshi', studentRoll: '045', class: 'IX-A', month: 'March 2024', amount: 5000, status: 'pending', dueDate: '2024-03-01', parentPhone: '98765-43214' },
  { id: '6', studentName: 'Anjali Gupta', studentRoll: '056', class: 'IX-B', month: 'January 2024', amount: 5000, status: 'overdue', dueDate: '2024-01-01', parentPhone: '98765-43215' },
  { id: '7', studentName: 'Rohan Sharma', studentRoll: '067', class: 'IX-C', month: 'March 2024', amount: 5000, status: 'paid', dueDate: '2024-03-01', paidDate: '2024-03-05', parentPhone: '98765-43216' },
];

export const FeeManagementPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');

  // Calculate statistics
  const stats: FeeStatistics = {
    totalCollected: FEE_DATA.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0),
    totalPending: FEE_DATA.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0),
    totalOverdue: FEE_DATA.filter(f => f.status === 'overdue').reduce((sum, f) => sum + f.amount, 0),
    collectionRate: 65
  };

  // Filter data
  const filteredData = FEE_DATA.filter(f => {
    if (selectedStatus !== 'all' && f.status !== selectedStatus) return false;
    if (selectedClass !== 'all' && f.class !== selectedClass) return false;
    return true;
  });

  const classes = ['all', ...new Set(FEE_DATA.map(f => f.class))];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fee Management</h1>
          <p className="text-gray-600">Track and manage fee payments</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          <Download size={16} />
          Export Report
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase">Total Collected</p>
              <p className="text-2xl font-bold text-green-600">₹{stats.totalCollected.toLocaleString()}</p>
              <p className="text-xs text-gray-600 mt-1">This month</p>
            </div>
            <DollarSign size={24} className="text-green-600 opacity-50" />
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase">Pending</p>
              <p className="text-2xl font-bold text-amber-600">₹{stats.totalPending.toLocaleString()}</p>
              <p className="text-xs text-amber-600 mt-1">{FEE_DATA.filter(f => f.status === 'pending').length} students</p>
            </div>
            <Clock size={24} className="text-amber-600 opacity-50" />
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase">Overdue</p>
              <p className="text-2xl font-bold text-red-600">₹{stats.totalOverdue.toLocaleString()}</p>
              <p className="text-xs text-red-600 mt-1">{FEE_DATA.filter(f => f.status === 'overdue').length} students</p>
            </div>
            <AlertCircle size={24} className="text-red-600 opacity-50" />
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase">Collection Rate</p>
              <p className="text-2xl font-bold text-blue-600">{stats.collectionRate}%</p>
              <p className="text-xs text-green-600 mt-1">↑ 5% from last month</p>
            </div>
            <TrendingUp size={24} className="text-blue-600 opacity-50" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">Filter by:</span>
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            {(['all', 'paid', 'pending', 'overdue'] as const).map(status => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                  selectedStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Class Filter */}
          <div className="flex gap-2 ml-auto">
            {classes.map(cls => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-3 py-1 rounded text-sm font-semibold transition ${
                  selectedClass === cls
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cls === 'all' ? 'All Classes' : cls}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Fee Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left px-4 py-3 font-bold text-gray-900">Student</th>
                <th className="text-left px-4 py-3 font-bold text-gray-900">Class</th>
                <th className="text-left px-4 py-3 font-bold text-gray-900">Month</th>
                <th className="text-right px-4 py-3 font-bold text-gray-900">Amount</th>
                <th className="text-left px-4 py-3 font-bold text-gray-900">Due Date</th>
                <th className="text-left px-4 py-3 font-bold text-gray-900">Status</th>
                <th className="text-center px-4 py-3 font-bold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((fee, idx) => (
                <tr key={fee.id} className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold text-gray-900">{fee.studentName}</p>
                      <p className="text-xs text-gray-600">Roll: {fee.studentRoll}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-900">{fee.class}</td>
                  <td className="px-4 py-3 text-gray-900">{fee.month}</td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">₹{fee.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-900">{fee.dueDate}</td>
                  <td className="px-4 py-3">
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold w-fit ${
                      fee.status === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : fee.status === 'pending'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                      {fee.status === 'paid' ? 'Receipt' : 'Remind'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Bulk Actions */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900">Bulk Actions</p>
            <p className="text-sm text-gray-600">Manage multiple fee records at once</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Send Reminders to Pending
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Alert for Overdue
            </Button>
          </div>
        </div>
      </Card>

      {/* Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-600 uppercase mb-1">Total Students</p>
            <p className="text-2xl font-bold text-gray-900">{FEE_DATA.length}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase mb-1">Paid Students</p>
            <p className="text-2xl font-bold text-green-600">{FEE_DATA.filter(f => f.status === 'paid').length}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase mb-1">Previous Month</p>
            <p className="text-2xl font-bold text-blue-600">98%</p>
          </div>
        </div>
      </Card>
    </div>
  );
};