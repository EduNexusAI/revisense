import React, { useState } from 'react';
import { UserPlus, BookOpen, CheckCircle, CheckSquare, Eye, EyeOff, Trash2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CredentialGenerationModal } from '../../components/features/CredentialGenerationModal';

interface CreatedTeacher {
  name: string;
  email: string;
  password: string;
  isClassTeacher: boolean;
  createdAt: string;
}

export const AdminCreateTeacherPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdTeachers, setCreatedTeachers] = useState<CreatedTeacher[]>([]);
  const [visiblePasswords, setVisiblePasswords] = useState<Set<number>>(new Set());

  const handleTeacherCreated = (credential: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    // In a real scenario, you'd get this from the form
    const newTeacher: CreatedTeacher = {
      name: credential.name,
      email: credential.email,
      password: credential.password,
      isClassTeacher: false, // This would come from the form
      createdAt: new Date().toLocaleDateString(),
    };
    setCreatedTeachers([newTeacher, ...createdTeachers]);
  };

  const togglePasswordVisibility = (index: number) => {
    const newVisible = new Set(visiblePasswords);
    if (newVisible.has(index)) {
      newVisible.delete(index);
    } else {
      newVisible.add(index);
    }
    setVisiblePasswords(newVisible);
  };

  const deleteTeacher = (index: number) => {
    setCreatedTeachers(createdTeachers.filter((_, i) => i !== index));
  };

  const classTeacherCount = createdTeachers.filter((t) => t.isClassTeacher).length;
  const totalTeachers = createdTeachers.length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-blue-100 rounded-lg">
            <UserPlus size={28} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Teacher Credentials</h1>
            <p className="text-gray-600 mt-1">Generate and manage teacher accounts for your school</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Card */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <div className="p-6">
              <div className="flow-root">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200 mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">Generate New Teacher Account</h2>
                  <p className="text-gray-700 text-sm mb-4">
                    Create new teacher credentials. Mark teachers as "Class Teacher" if they will manage students and parents.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Secure password generation with 12 characters</li>
                    <li>Email format validation</li>
                    <li>Class Teachers can create student and parent accounts</li>
                    <li>Subject specialists and support staff also supported</li>
                  </ul>
                </div>

                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="premium"
                  className="w-full mb-6"
                >
                  <UserPlus size={18} className="mr-2" />
                  Generate New Teacher Credentials
                </Button>

                {/* Statistics */}
                {totalTeachers > 0 && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                      <p className="text-xs text-blue-600 font-semibold mb-1">TOTAL TEACHERS</p>
                      <p className="text-3xl font-bold text-blue-900">{totalTeachers}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                      <p className="text-xs text-purple-600 font-semibold mb-1">CLASS TEACHERS</p>
                      <p className="text-3xl font-bold text-purple-900">{classTeacherCount}</p>
                    </div>
                  </div>
                )}

                {createdTeachers.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle size={22} className="text-green-600" />
                      Recently Created Teachers
                    </h3>
                    <div className="space-y-3">
                      {createdTeachers.map((teacher, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg hover:shadow-md transition border ${
                            teacher.isClassTeacher
                              ? 'bg-purple-50 border-purple-200'
                              : 'bg-green-50 border-green-200'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <p className="text-xs text-gray-600 font-semibold mb-1">NAME</p>
                              <p className="text-sm font-bold text-gray-900">{teacher.name}</p>
                            </div>
                            {teacher.isClassTeacher && (
                              <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                                <CheckSquare size={14} />
                                Class Teacher
                              </div>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-xs text-gray-600 font-semibold mb-1">EMAIL</p>
                              <p className="text-sm font-mono text-gray-900">{teacher.email}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 font-semibold mb-1">PASSWORD</p>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-mono text-gray-900">
                                  {visiblePasswords.has(idx) ? teacher.password : '••••••••••••'}
                                </p>
                                <button
                                  onClick={() => togglePasswordVisibility(idx)}
                                  className="p-1 hover:bg-gray-200 rounded transition"
                                  title={visiblePasswords.has(idx) ? 'Hide password' : 'Show password'}
                                >
                                  {visiblePasswords.has(idx) ? (
                                    <EyeOff size={16} className="text-gray-600" />
                                  ) : (
                                    <Eye size={16} className="text-gray-600" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">Created on {teacher.createdAt}</p>
                            <button
                              onClick={() => deleteTeacher(idx)}
                              className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
                              title="Delete this teacher"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {createdTeachers.length === 0 && (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                    <BookOpen size={40} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No teachers created yet. Click the button above to create your first teacher account.</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          <Card className="shadow-lg">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckSquare size={20} className="text-purple-600" />
                Class Teacher Role
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p className="text-gray-600">
                  "Class Teachers" are designated teachers who manage students in their class. They have special permissions:
                </p>
                <div>
                  <p className="font-semibold text-gray-900 mt-2">Can Do:</p>
                  <ul className="list-disc list-inside text-gray-600 mt-1 space-y-1">
                    <li>Create student accounts</li>
                    <li>Create parent accounts</li>
                    <li>View class attendance</li>
                    <li>Manage student grades</li>
                  </ul>
                </div>
                <div className="border-t pt-3">
                  <p className="font-semibold text-gray-900">Other Teachers:</p>
                  <p className="text-gray-600 mt-1">
                    Support instructors can view class info but cannot create accounts.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="shadow-lg bg-yellow-50 border border-yellow-200">
            <div className="p-6">
              <h3 className="text-lg font-bold text-yellow-900 mb-3">Important:</h3>
              <p className="text-sm text-yellow-800 leading-relaxed">
                Only eligible teachers should be marked as "Class Teacher". Verify faculty position before granting student account creation rights.
              </p>
            </div>
          </Card>

          <Card className="shadow-lg bg-blue-50 border border-blue-200">
            <div className="p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">Pro Tip:</h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                Share credentials securely. Teachers should change passwords on first login. Consider using encrypted email or in-person delivery.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Modal */}
      <CredentialGenerationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerate={handleTeacherCreated}
        role="teacher"
        creatorRole="Administrator"
      />
    </div>
  );
};
