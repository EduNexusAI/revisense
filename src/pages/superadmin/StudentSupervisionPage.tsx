import React, { useState } from 'react';
import { Search, Filter, BarChart3, TrendingUp, AlertCircle, BookOpen } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';

export const StudentSupervisionPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    { id: 1, name: 'Priya Nair', class: 'IX-A', grade: 'A+', attendance: '95%', avgScore: '92%', status: 'Excellent' },
    { id: 2, name: 'Arjun Sharma', class: 'IX-B', grade: 'A', attendance: '88%', avgScore: '85%', status: 'Good' },
    { id: 3, name: 'Rahul Menon', class: 'XI-A', grade: 'A+', attendance: '98%', avgScore: '94%', status: 'Excellent' },
    { id: 4, name: 'Kavya Reddy', class: 'II-B', grade: 'B+', attendance: '75%', avgScore: '78%', status: 'Average' },
    { id: 5, name: 'Aditya Kumar', class: 'VIII-A', grade: 'A', attendance: '82%', avgScore: '88%', status: 'Good' },
  ];

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Supervision</h1>
          <p className="text-sm text-gray-600">Track student performance, attendance, and academic progress</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <h3 className="text-sm font-semibold text-purple-900">Total Students</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">18,542</p>
            <p className="text-xs text-purple-700 mt-1">Active on platform</p>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <h3 className="text-sm font-semibold text-green-900">High Performers</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">7,845</p>
            <p className="text-xs text-green-700 mt-1">Grade A & A+ students</p>
          </Card>
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <h3 className="text-sm font-semibold text-amber-900">Avg Attendance</h3>
            <p className="text-3xl font-bold text-amber-600 mt-2">89.3%</p>
            <p className="text-xs text-amber-700 mt-1">All students combined</p>
          </Card>
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <h3 className="text-sm font-semibold text-red-900">Needs Support</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">2,134</p>
            <p className="text-xs text-red-700 mt-1">Below average performance</p>
          </Card>
        </div>

        {/* Search & Filter */}
        <Card>
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
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
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Student Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Class</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Grade</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Attendance</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Avg Score</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Performance</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{student.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{student.class}</td>
                    <td className="px-4 py-3">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                        {student.grade}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{student.attendance}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <BarChart3 size={16} className="text-green-500" />
                        <span className="text-sm font-medium text-gray-900">{student.avgScore}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        student.status === 'Excellent' ? 'bg-green-100 text-green-700' :
                        student.status === 'Good' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Engagement Metrics */}
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen size={20} className="text-purple-600" />
            Student Engagement Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-lg border border-purple-200">
              <p className="text-sm font-semibold text-gray-900">Homework Completion</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">87.2%</p>
              <p className="text-xs text-gray-600 mt-1">This month</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-purple-200">
              <p className="text-sm font-semibold text-gray-900">Class Participation</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">81.5%</p>
              <p className="text-xs text-gray-600 mt-1">Average score</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-purple-200">
              <p className="text-sm font-semibold text-gray-900">Platform Usage</p>
              <p className="text-2xl font-bold text-green-600 mt-2">12.4h</p>
              <p className="text-xs text-gray-600 mt-1">Per week average</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-purple-200">
              <p className="text-sm font-semibold text-gray-900">Test Scores</p>
              <p className="text-2xl font-bold text-amber-600 mt-2">86.8%</p>
              <p className="text-xs text-gray-600 mt-1">Average across all students</p>
            </div>
          </div>
        </Card>

        {/* At-Risk Students */}
        <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle size={20} className="text-red-600" />
            At-Risk Students (Requires Attention)
          </h3>
          <div className="space-y-2">
            <div className="p-3 bg-white rounded-lg border border-red-200">
              <p className="text-sm font-medium text-gray-900">Kavya Reddy - II-B</p>
              <p className="text-xs text-gray-600 mt-1">Low attendance (75%) and below-average scores (78%)</p>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};
