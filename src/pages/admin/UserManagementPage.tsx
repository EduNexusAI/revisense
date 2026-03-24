import React, { useState } from 'react';
import { Users, Plus, Search, Edit2, Trash2, Shield, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { showToast } from '../../utils/toast';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastLogin: string;
}

const USERS: User[] = [
  { id: '1', name: 'Rajesh Kumar', email: 'rajesh@greenvalley.edu', phone: '98765-43210', role: 'teacher', status: 'active', joinDate: '2023-01-15', lastLogin: '2024-03-02' },
  { id: '2', name: 'Priya Singh', email: 'priya@greenvalley.edu', phone: '98765-43211', role: 'teacher', status: 'active', joinDate: '2023-02-20', lastLogin: '2024-03-02' },
  { id: '3', name: 'Arjun Patel', email: 'arjun@greenvalley.edu', phone: '98765-43212', role: 'student', status: 'active', joinDate: '2023-06-01', lastLogin: '2024-03-02' },
  { id: '4', name: 'Nisha Verma', email: 'nisha@greenvalley.edu', phone: '98765-43213', role: 'student', status: 'active', joinDate: '2023-06-01', lastLogin: '2024-03-01' },
  { id: '5', name: 'Vikram Joshi', email: 'vikram@greenvalley.edu', phone: '98765-43214', role: 'parent', status: 'active', joinDate: '2023-06-02', lastLogin: '2024-02-28' },
  { id: '6', name: 'Anjali Gupta', email: 'anjali@greenvalley.edu', phone: '98765-43215', role: 'parent', status: 'inactive', joinDate: '2023-06-02', lastLogin: '2024-01-15' },
  { id: '7', name: 'Rohan Sharma', email: 'rohan@greenvalley.edu', phone: '98765-43216', role: 'student', status: 'pending', joinDate: '2024-03-01', lastLogin: '-' },
];



export const UserManagementPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<'all' | 'admin' | 'teacher' | 'student' | 'parent'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [users, setUsers] = useState(USERS);

  // Calculate role stats
  const roleStats = [
    { role: 'Teachers', color: 'green', count: users.filter(u => u.role === 'teacher').length, icon: Shield },
    { role: 'Students', color: 'purple', count: users.filter(u => u.role === 'student').length, icon: Users },
    { role: 'Parents', color: 'amber', count: users.filter(u => u.role === 'parent').length, icon: Users },
  ];

  // Filter users
  const filteredUsers = users.filter(user => {
    if (selectedRole !== 'all' && user.role !== selectedRole) return false;
    if (selectedStatus !== 'all' && user.status !== selectedStatus) return false;
    if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase()) && !user.email.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleAddUser = () => {
    showToast('Add User form opened', 'info');
  };

  const handleEditUser = (userId: string) => {
    showToast(`Edit mode activated for user ${userId}`, 'info');
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    showToast(`User "${userName}" deleted successfully`, 'success');
  };

  const handleSendInvitation = () => {
    showToast('Invitation sent to selected users', 'success');
  };

  const handleActivateSelected = () => {
    const selectedCount = filteredUsers.filter(u => u.status !== 'active').length;
    if (selectedCount === 0) {
      showToast('No inactive users to activate', 'warning');
      return;
    }
    setUsers(prev =>
      prev.map(u =>
        filteredUsers.some(f => f.id === u.id) ? { ...u, status: 'active' as const } : u
      )
    );
    showToast(`${selectedCount} user(s) activated successfully`, 'success');
  };

  const handleDeactivateSelected = () => {
    const selectedCount = filteredUsers.filter(u => u.status === 'active').length;
    if (selectedCount === 0) {
      showToast('No active users to deactivate', 'warning');
      return;
    }
    setUsers(prev =>
      prev.map(u =>
        filteredUsers.some(f => f.id === u.id) ? { ...u, status: 'inactive' as const } : u
      )
    );
    showToast(`${selectedCount} user(s) deactivated successfully`, 'success');
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-blue-100 text-blue-700';
      case 'teacher': return 'bg-green-100 text-green-700';
      case 'student': return 'bg-purple-100 text-purple-700';
      case 'parent': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage teachers, students, and parents</p>
        </div>
        <Button onClick={handleAddUser} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          <Plus size={16} />
          Add User
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              <p className="text-xs text-gray-600 mt-1">All roles</p>
            </div>
            <Users size={24} className="text-gray-600 opacity-50" />
          </div>
        </Card>

        {roleStats.map(stat => (
          <Card key={stat.role}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-600 uppercase">{stat.role}</p>
                <p className={`text-2xl font-bold text-${stat.color}-600`}>{stat.count}</p>
                <p className="text-xs text-gray-600 mt-1">Active users</p>
              </div>
              <Users size={24} className={`text-${stat.color}-600 opacity-50`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Search & Filters */}
      <Card>
        <div className="space-y-3">
          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="flex gap-2">
              <span className="text-sm font-semibold text-gray-700 self-center">Role:</span>
              {(['all', 'admin', 'teacher', 'student', 'parent'] as const).map(role => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-3 py-1 rounded text-sm font-semibold transition ${
                    selectedRole === role
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <span className="text-sm font-semibold text-gray-700 self-center">Status:</span>
              {(['all', 'active', 'inactive', 'pending'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1 rounded text-sm font-semibold transition ${
                    selectedStatus === status
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left px-4 py-3 font-bold text-gray-900">Name</th>
                <th className="text-left px-4 py-3 font-bold text-gray-900">Email</th>
                <th className="text-left px-4 py-3 font-bold text-gray-900">Phone</th>
                <th className="text-left px-4 py-3 font-bold text-gray-900">Role</th>
                <th className="text-left px-4 py-3 font-bold text-gray-900">Status</th>
                <th className="text-left px-4 py-3 font-bold text-gray-900">Last Login</th>
                <th className="text-center px-4 py-3 font-bold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr key={user.id} className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900">{user.name}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-900">{user.email}</td>
                  <td className="px-4 py-3 text-gray-900">{user.phone}</td>
                  <td className="px-4 py-3">
                    <div className={`px-2 py-1 rounded text-xs font-semibold w-fit ${getRoleBadgeColor(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {user.status === 'active' && <CheckCircle size={16} className="text-green-600" />}
                      {user.status === 'inactive' && <AlertCircle size={16} className="text-gray-600" />}
                      {user.status === 'pending' && <Lock size={16} className="text-amber-600" />}
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusBadgeColor(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-900 text-xs">{user.lastLogin}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className="text-blue-600 hover:text-blue-700 p-1"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id, user.name)}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No users found matching your filters.</p>
          </div>
        )}
      </Card>

      {/* Bulk Actions */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900">Bulk Actions</p>
            <p className="text-sm text-gray-600">Manage multiple users at once</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSendInvitation} className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
              Send Invitation
            </Button>
            <Button onClick={handleActivateSelected} className="bg-green-600 hover:bg-green-700 text-white text-sm">
              Activate Selected
            </Button>
            <Button onClick={handleDeactivateSelected} className="bg-red-600 hover:bg-red-700 text-white text-sm">
              Deactivate Selected
            </Button>
          </div>
        </div>
      </Card>

      {/* New User Form (Collapsed) */}
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900">Quick Add User</p>
            <p className="text-sm text-gray-600">Add a new teacher, student, or parent account</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Plus size={16} />
            Open Form
          </Button>
        </div>
      </Card>
    </div>
  );
};