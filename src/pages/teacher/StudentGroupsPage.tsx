import React, { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Users, Plus, Trash2, Edit2, BarChart3, Zap, AlertCircle } from 'lucide-react';
import { showToast } from '../../utils/toast';

interface Student {
  id: string;
  name: string;
  avg: number;
}

interface StudentGroup {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: React.FC<any>;
  students: Student[];
  createdAt: string;
}

// Dummy students data
const DUMMY_STUDENTS: Student[] = [
  { id: '1', name: 'Arjun Singh', avg: 84.6 },
  { id: '2', name: 'Priya Sharma', avg: 88.4 },
  { id: '3', name: 'Ravi Kumar', avg: 71.6 },
  { id: '4', name: 'Sneha Patel', avg: 91.0 },
  { id: '5', name: 'Vikram Desai', avg: 81.0 },
  { id: '6', name: 'Divya Singh', avg: 86.4 },
  { id: '7', name: 'Amit Verma', avg: 65.2 },
  { id: '8', name: 'Zara Khan', avg: 95.5 },
];

const INITIAL_GROUPS: StudentGroup[] = [
  {
    id: '1',
    name: '⭐ Toppers',
    description: 'High performers (>85%)',
    color: 'from-yellow-400 to-amber-500',
    icon: Zap,
    students: DUMMY_STUDENTS.filter(s => s.avg > 85),
    createdAt: '2024-03-10'
  },
  {
    id: '2',
    name: '📈 Average Performers',
    description: 'Mid-range performers (70-85%)',
    color: 'from-blue-400 to-cyan-500',
    icon: BarChart3,
    students: DUMMY_STUDENTS.filter(s => s.avg >= 70 && s.avg <= 85),
    createdAt: '2024-03-10'
  },
  {
    id: '3',
    name: '⚠️ Slow Learners',
    description: 'Need more attention (<70%)',
    color: 'from-red-400 to-pink-500',
    icon: AlertCircle,
    students: DUMMY_STUDENTS.filter(s => s.avg < 70),
    createdAt: '2024-03-10'
  }
];

export const StudentGroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<StudentGroup[]>(INITIAL_GROUPS);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  const [autoGenerateMode, setAutoGenerateMode] = useState(false);

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      showToast('Please enter group name', 'warning');
      return;
    }
    const newGroup: StudentGroup = {
      id: Date.now().toString(),
      name: newGroupName,
      description: newGroupDesc,
      color: 'from-purple-400 to-indigo-500',
      icon: Users,
      students: [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setGroups([...groups, newGroup]);
    setNewGroupName('');
    setNewGroupDesc('');
    setShowCreateGroup(false);
    showToast('Group created successfully!', 'success');
  };

  const handleAutoGenerate = () => {
    const newGroups: StudentGroup[] = [
      {
        id: Date.now().toString(),
        name: '🏆 Excellence Group (>90%)',
        description: 'Highest performers - Merit students',
        color: 'from-yellow-400 to-amber-500',
        icon: Zap,
        students: DUMMY_STUDENTS.filter(s => s.avg > 90),
        createdAt: new Date().toISOString().split('T')[0]
      },
      {
        id: (Date.now() + 1).toString(),
        name: '👍 Good Performers (80-90%)',
        description: 'Need improvement in specific areas',
        color: 'from-green-400 to-emerald-500',
        icon: BarChart3,
        students: DUMMY_STUDENTS.filter(s => s.avg >= 80 && s.avg <= 90),
        createdAt: new Date().toISOString().split('T')[0]
      },
      {
        id: (Date.now() + 2).toString(),
        name: '⚡ Needs More Pressure (70-80%)',
        description: 'Capable but need motivation',
        color: 'from-orange-400 to-red-500',
        icon: AlertCircle,
        students: DUMMY_STUDENTS.filter(s => s.avg >= 70 && s.avg < 80),
        createdAt: new Date().toISOString().split('T')[0]
      },
      {
        id: (Date.now() + 3).toString(),
        name: '🆘 Intervention Needed (<70%)',
        description: 'Critical - requires special attention',
        color: 'from-red-500 to-pink-600',
        icon: AlertCircle,
        students: DUMMY_STUDENTS.filter(s => s.avg < 70),
        createdAt: new Date().toISOString().split('T')[0]
      }
    ];
    setGroups(newGroups);
    setAutoGenerateMode(false);
    showToast('Groups auto-generated based on performance!', 'success');
  };

  const handleDeleteGroup = (id: string) => {
    setGroups(groups.filter(g => g.id !== id));
    showToast('Group deleted', 'success');
  };

  const handleRemoveStudent = (groupId: string, studentId: string) => {
    setGroups(groups.map(g => {
      if (g.id === groupId) {
        return { ...g, students: g.students.filter(s => s.id !== studentId) };
      }
      return g;
    }));
    showToast('Student removed from group', 'success');
  };

  const handleAddStudent = (groupId: string, studentId: string) => {
    const student = DUMMY_STUDENTS.find(s => s.id === studentId);
    if (!student) return;

    setGroups(groups.map(g => {
      if (g.id === groupId && !g.students.find(s => s.id === studentId)) {
        return { ...g, students: [...g.students, student] };
      }
      return g;
    }));
    showToast('Student added to group', 'success');
  };

  const unassignedStudents = DUMMY_STUDENTS.filter(
    s => !groups.some(g => g.students.find(st => st.id === s.id))
  );

  return (
    <PageWrapper title="Student Groups" icon={<Users className="w-6 h-6" />}>
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Organize Student Groups</h2>
            <p className="text-gray-600 text-sm mt-1">Group students by performance to manage learning better</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowCreateGroup(!showCreateGroup)} variant="outline" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create Group</span>
              <span className="sm:hidden">New</span>
            </Button>
            <Button onClick={handleAutoGenerate} variant="premium" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Auto Generate</span>
              <span className="sm:hidden">Auto</span>
            </Button>
          </div>
        </div>

        {/* Create Group Form */}
        {showCreateGroup && (
          <Card className="bg-blue-50 border border-blue-200">
            <h3 className="font-bold mb-4">Create New Group</h3>
            <div className="space-y-3">
              <Input
                placeholder="Group name (e.g., Advanced Learners)"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
              <Input
                placeholder="Description (e.g., Students ready for advanced topics)"
                value={newGroupDesc}
                onChange={(e) => setNewGroupDesc(e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={handleCreateGroup} variant="premium" className="flex-1">
                  Create Group
                </Button>
                <Button onClick={() => setShowCreateGroup(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Groups Grid */}
        <div className="space-y-4">
          {groups.length === 0 ? (
            <Card className="text-center py-8">
              <p className="text-gray-600">No groups created yet. Create a group or use Auto Generate!</p>
            </Card>
          ) : (
            groups.map((group) => {
              const GroupIcon = group.icon;
              return (
                <Card key={group.id} className="border-l-4 border-blue-500">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{group.name}</h3>
                      <p className="text-sm text-gray-600">{group.description}</p>
                    </div>
                    <Button
                      onClick={() => handleDeleteGroup(group.id)}
                      variant="outline"
                      className="text-red-600 hover:bg-red-50 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Students in Group */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                      Students ({group.students.length})
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {group.students.length === 0 ? (
                        <p className="text-xs text-gray-500 italic">No students in this group yet</p>
                      ) : (
                        group.students.map((student) => (
                          <div
                            key={student.id}
                            className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            <span>{student.name}</span>
                            <span className="text-xs font-bold">{student.avg}%</span>
                            <button
                              onClick={() => handleRemoveStudent(group.id, student.id)}
                              className="text-blue-600 hover:text-red-600 ml-1"
                            >
                              ✕
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Available Students to Add */}
                  {unassignedStudents.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-600 mb-2">Add Students</p>
                      <div className="flex flex-wrap gap-2">
                        {unassignedStudents.map((student) => (
                          <button
                            key={student.id}
                            onClick={() => handleAddStudent(group.id, student.id)}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-medium transition"
                          >
                            + {student.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              );
            })
          )}
        </div>

        {/* Stats Summary */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <h3 className="font-bold mb-4">Group Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{groups.length}</p>
              <p className="text-xs text-gray-600">Total Groups</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {groups.reduce((sum, g) => sum + g.students.length, 0)}/{DUMMY_STUDENTS.length}
              </p>
              <p className="text-xs text-gray-600">Students Grouped</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{unassignedStudents.length}</p>
              <p className="text-xs text-gray-600">Unassigned</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {(groups.reduce((sum, g) => sum + g.students.length, 0) / DUMMY_STUDENTS.length * 100).toFixed(0)}%
              </p>
              <p className="text-xs text-gray-600">Grouped</p>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};
