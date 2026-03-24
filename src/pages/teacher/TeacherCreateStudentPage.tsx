import React, { useState } from 'react';
import { UserPlus, Users, CheckCircle, AlertCircle, Lock, Eye, EyeOff, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CredentialGenerationModal } from '../../components/features/CredentialGenerationModal';

interface ParentCredential {
  email: string;
  password: string;
  parentNumber: number;
}

interface CreatedStudent {
  name: string;
  email: string;
  password: string;
  rollNumber: string;
  parents: ParentCredential[];
  createdAt: string;
}

export const TeacherCreateStudentPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdStudents, setCreatedStudents] = useState<CreatedStudent[]>([]);
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set());
  const [expandedStudents, setExpandedStudents] = useState<Set<number>>(new Set());
  const [isClassTeacher] = useState(true); // This would come from auth context
  const SCHOOL_NAME = 'dsu'; // School identifier for email domain

  const generateParentPassword = (studentName: string, parentNumber: number) => {
    const studentInitials = studentName.split(' ').map(n => n.charAt(0)).join('').substring(0, 3);
    const year = new Date().getFullYear();
    const specialChars = ['@', '#', '$', '!'];
    const randomSpecial = specialChars[Math.floor(Math.random() * specialChars.length)];
    const randomNum = Math.floor(Math.random() * 99) + 1;
    
    return `${studentInitials}${parentNumber}${randomNum}${randomSpecial}${year}`;
  };

  const handleStudentCreated = (credential: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    // Create 1 parent account per student with unique email
    // Parents can link multiple child accounts in their dashboard
    const parentCredentials: ParentCredential[] = [];
    const studentFirstName = credential.name.split(' ')[0].toLowerCase();
    
    parentCredentials.push({
      parentNumber: 1,
      email: `${studentFirstName}parent@${SCHOOL_NAME}.com`,
      password: generateParentPassword(credential.name, 1),
    });

    const newStudent: CreatedStudent = {
      name: credential.name,
      email: credential.email,
      password: credential.password,
      rollNumber: `STU-${Date.now()}`,
      parents: parentCredentials,
      createdAt: new Date().toLocaleDateString(),
    };
    setCreatedStudents([newStudent, ...createdStudents]);
  };

  const togglePasswordVisibility = (key: string) => {
    const newVisible = new Set(visiblePasswords);
    if (newVisible.has(key)) {
      newVisible.delete(key);
    } else {
      newVisible.add(key);
    }
    setVisiblePasswords(newVisible);
  };

  const toggleStudentExpanded = (index: number) => {
    const newExpanded = new Set(expandedStudents);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedStudents(newExpanded);
  };

  const deleteStudent = (index: number) => {
    setCreatedStudents(createdStudents.filter((_, i) => i !== index));
  };

  if (!isClassTeacher) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
        <Card className="shadow-lg max-w-2xl mx-auto">
          <div className="p-8 text-center">
            <Lock size={48} className="text-red-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-4">
              Only class teachers can create student accounts. Please contact your administrator if you need this access.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-emerald-100 rounded-lg">
            <UserPlus size={28} className="text-emerald-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Student Credentials</h1>
            <p className="text-gray-600 mt-1">Generate and manage student accounts for your class</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Card */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <div className="p-6">
              <div className="flow-root">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-200 mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">Generate New Student Account</h2>
                  <p className="text-gray-700 text-sm mb-4">
                    Create student credentials for your class. Parent accounts are automatically generated.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Secure password generation based on student name</li>
                    <li>Automatic unique parent account per student</li>
                    <li>Parent email: studentfirstname + parent@dsu.com</li>
                    <li>✨ Parents can link multiple child IDs in their dashboard</li>
                    <li>View & integrate all children's data from one account</li>
                    <li>Student-friendly dashboard access</li>
                  </ul>
                </div>

                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="premium"
                  className="w-full mb-6"
                >
                  <UserPlus size={18} className="mr-2" />
                  Generate New Student Credentials
                </Button>

                {/* Statistics */}
                {createdStudents.length > 0 && (
                  <div className="mb-6">
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200">
                      <p className="text-xs text-emerald-600 font-semibold mb-1">STUDENTS IN YOUR CLASS</p>
                      <p className="text-4xl font-bold text-emerald-900">{createdStudents.length}</p>
                    </div>
                  </div>
                )}

                {createdStudents.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle size={22} className="text-green-600" />
                      Students Created
                    </h3>
                    <div className="space-y-3">
                      {createdStudents.map((student, idx) => (
                        <div key={idx} className="bg-emerald-50 border border-emerald-200 rounded-lg hover:shadow-md transition">
                          {/* Student Credentials Row */}
                          <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                              <div>
                                <p className="text-xs text-gray-600 font-semibold mb-1">NAME</p>
                                <p className="text-sm font-bold text-gray-900">{student.name}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-600 font-semibold mb-1">ROLL NUMBER</p>
                                <p className="text-sm font-mono text-gray-900">{student.rollNumber}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-600 font-semibold mb-1">EMAIL</p>
                                <p className="text-sm font-mono text-gray-900">{student.email}</p>
                              </div>
                            </div>
                            <div className="mb-3">
                              <p className="text-xs text-gray-600 font-semibold mb-1">PASSWORD</p>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-mono text-gray-900">
                                  {visiblePasswords.has(`student-${idx}`) ? student.password : '••••••••••••'}
                                </p>
                                <button
                                  onClick={() => togglePasswordVisibility(`student-${idx}`)}
                                  className="p-1 hover:bg-emerald-200 rounded transition"
                                  title={visiblePasswords.has(`student-${idx}`) ? 'Hide password' : 'Show password'}
                                >
                                  {visiblePasswords.has(`student-${idx}`) ? (
                                    <EyeOff size={16} className="text-gray-600" />
                                  ) : (
                                    <Eye size={16} className="text-gray-600" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <p className="text-xs text-gray-500">Created on {student.createdAt}</p>
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                                  ✓ Active
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => toggleStudentExpanded(idx)}
                                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-200 transition flex items-center gap-1"
                                  title={expandedStudents.has(idx) ? 'Hide parent' : 'Show parent'}
                                >
                                  {expandedStudents.has(idx) ? (
                                    <>
                                      Hide Parent <ChevronUp size={14} />
                                    </>
                                  ) : (
                                    <>
                                      Show Parent <ChevronDown size={14} />
                                    </>
                                  )}
                                </button>
                                <button
                                  onClick={() => deleteStudent(idx)}
                                  className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
                                  title="Delete this student"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>

                            {/* Parent Credentials - Expandable */}
                            {expandedStudents.has(idx) && student.parents.length > 0 && (
                              <div className="mt-4 pt-4 border-t border-emerald-200 space-y-3">
                                <div>
                                  <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Users size={16} /> Parent/Guardian Credentials (Auto-created)
                                  </p>
                                  <p className="text-xs text-blue-600 bg-blue-50 border border-blue-100 rounded-lg p-3 mt-2 mb-3">
                                    ✨ <strong>Multiple Children:</strong> After login, parents can add other child accounts in their dashboard 
                                    by entering the student email/ID. All children's data will integrate and be accessible from one dashboard.
                                  </p>
                                </div>
                                {student.parents.map((parent, pIdx) => (
                                  <div
                                    key={pIdx}
                                    className="bg-white border border-emerald-100 rounded-lg p-3 space-y-2"
                                  >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      <div>
                                        <p className="text-xs text-gray-600 font-semibold mb-1">PARENT {parent.parentNumber} EMAIL</p>
                                        <p className="text-xs font-mono text-gray-900 bg-gray-50 p-2 rounded">{parent.email}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-600 font-semibold mb-1">PASSWORD</p>
                                        <div className="flex items-center gap-1 bg-gray-50 p-2 rounded">
                                          <p className="text-xs font-mono text-gray-900 flex-1">
                                            {visiblePasswords.has(`parent-${idx}-${pIdx}`) ? parent.password : '••••••••••••'}
                                          </p>
                                          <button
                                            onClick={() => togglePasswordVisibility(`parent-${idx}-${pIdx}`)}
                                            className="p-1 hover:bg-gray-200 rounded transition"
                                            title={visiblePasswords.has(`parent-${idx}-${pIdx}`) ? 'Hide' : 'Show'}
                                          >
                                            {visiblePasswords.has(`parent-${idx}-${pIdx}`) ? (
                                              <EyeOff size={14} className="text-gray-600" />
                                            ) : (
                                              <Eye size={14} className="text-gray-600" />
                                            )}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded">
                                      💡 Parent can add their name and other details in their dashboard after first login
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {createdStudents.length === 0 && (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                    <Users size={40} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No students created yet. Click the button above to create your first student account.</p>
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
                <AlertCircle size={20} className="text-emerald-600" />
                Automatic Parent Setup
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <p className="font-semibold text-emerald-900 mb-2">✨ What's New:</p>
                  <ul className="text-emerald-800 space-y-1 text-xs">
                    <li>✓ 1 parent account auto-created per student</li>
                    <li>✓ Parent email: studentname + parent@dsu.com</li>
                    <li>✓ Secure password generated automatically</li>
                    <li>✓ Parents add names in their dashboard</li>
                  </ul>
                </div>
                <div className="border-t pt-3">
                  <p className="font-semibold text-gray-900 mb-2">Parent Email Format:</p>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono text-gray-800">
                    &lt;studentfirstname&gt;parent@dsu.com
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="shadow-lg">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users size={20} className="text-emerald-600" />
                Student Dashboard Access
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p className="text-gray-600">
                  Each student account includes:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Personal learning dashboard</li>
                  <li>Attendance tracking</li>
                  <li>Grade/performance view</li>
                  <li>Homework assignments</li>
                  <li>Parent communication</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="shadow-lg bg-blue-50 border border-blue-200">
            <div className="p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">📋 Distribution:</h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                Share student and parent credentials securely. Parents will set up their profiles on first login.
              </p>
            </div>
          </Card>

          <Card className="shadow-lg bg-yellow-50 border border-yellow-200">
            <div className="p-6">
              <h3 className="text-lg font-bold text-yellow-900 mb-3">⚠️ Important:</h3>
              <p className="text-sm text-yellow-800 leading-relaxed">
                Keep all credentials secure. Distribute only to authorized guardians. Parents can update their details after login.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Modal */}
      <CredentialGenerationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerate={handleStudentCreated}
        role="student"
        creatorRole="Class Teacher"
      />
    </div>
  );
};
