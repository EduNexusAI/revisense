import React, { useState } from 'react';
import { Search, Filter, Award, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';

export const TeacherSupervisionPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const teachers = [
    { id: 1, name: 'Ravi Krishnamurthy', school: 'Cambridge International', subject: 'Mathematics', students: 45, rating: '4.8', attendance: '96%', status: 'Active' },
    { id: 2, name: 'Anitha Suresh', school: 'Delhi Public School', subject: 'English', students: 38, rating: '4.5', attendance: '92%', status: 'Active' },
    { id: 3, name: 'Mohammed Farooq', school: 'St. Andrew\'s School', subject: 'Science', students: 52, rating: '4.6', attendance: '88%', status: 'Active' },
    { id: 4, name: 'Deepa Venkatesh', school: 'Ryan International', subject: 'History', students: 42, rating: '4.3', attendance: '85%', status: 'Inactive' },
    { id: 5, name: 'Priya Sharma', school: 'Doon School', subject: 'Computer Science', students: 48, rating: '4.9', attendance: '98%', status: 'Active' },
  ];

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Supervision</h1>
          <p className="text-sm text-gray-600">Monitor teacher performance, attendance, and student engagement</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <h3 className="text-sm font-semibold text-green-900">Active Teachers</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">2,847</p>
            <p className="text-xs text-green-700 mt-1">94.3% of total</p>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900">Total Students Taught</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">125K+</p>
            <p className="text-xs text-blue-700 mt-1">Average: 44 per teacher</p>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <h3 className="text-sm font-semibold text-purple-900">Avg Rating</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">4.62</p>
            <p className="text-xs text-purple-700 mt-1">Out of 5.0 stars</p>
          </Card>
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <h3 className="text-sm font-semibold text-amber-900">Avg Attendance</h3>
            <p className="text-3xl font-bold text-amber-600 mt-2">91.4%</p>
            <p className="text-xs text-amber-700 mt-1">Last 30 days</p>
          </Card>
        </div>

        {/* Search & Filter */}
        <Card>
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
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
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Teacher Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Subject</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Students</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Rating</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Attendance</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{teacher.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{teacher.subject}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{teacher.students}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Award size={16} className="text-amber-500" />
                        <span className="text-sm font-medium text-gray-900">{teacher.rating}/5.0</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} className={teacher.attendance === '98%' ? 'text-green-500' : 'text-amber-500'} />
                        <span className="text-sm font-medium text-gray-900">{teacher.attendance}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        teacher.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {teacher.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Performance Insights */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-600" />
            Performance Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-gray-900">Top Rated Teachers</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">486</p>
              <p className="text-xs text-gray-600 mt-1">Rating ≥ 4.5 stars</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-gray-900">High Attendance</p>
              <p className="text-2xl font-bold text-green-600 mt-2">2,201</p>
              <p className="text-xs text-gray-600 mt-1">Attendance ≥ 90%</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-gray-900">Needs Attention</p>
              <p className="text-2xl font-bold text-amber-600 mt-2">146</p>
              <p className="text-xs text-gray-600 mt-1">Rating &lt; 3.5 or attendance &lt; 80%</p>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};
