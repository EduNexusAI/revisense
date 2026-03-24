import React, { useState } from 'react';
import { UserPlus, Users, CheckCircle, AlertCircle, Eye, EyeOff, Trash2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CredentialGenerationModal } from '../../components/features/CredentialGenerationModal';

interface CreatedAdmin {
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export const SuperAdminCreateAdminPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdAdmins, setCreatedAdmins] = useState<CreatedAdmin[]>([]);
  const [visiblePasswords, setVisiblePasswords] = useState<Set<number>>(new Set());

  const handleAdminCreated = (credential: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    const newAdmin: CreatedAdmin = {
      name: credential.name,
      email: credential.email,
      password: credential.password,
      createdAt: new Date().toLocaleDateString(),
    };
    setCreatedAdmins([newAdmin, ...createdAdmins]);
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

  const deleteAdmin = (index: number) => {
    setCreatedAdmins(createdAdmins.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-purple-100 rounded-lg">
            <UserPlus size={28} className="text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Administrator Credentials</h1>
            <p className="text-gray-600 mt-1">Generate and manage admin accounts for your institution</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Card */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <div className="p-6">
              <div className="flow-root">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200 mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">Generate New Admin Account</h2>
                  <p className="text-gray-700 text-sm mb-4">
                    Create new administrator credentials. You can generate multiple admin accounts for different departments or schools.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Secure password generation with 12 characters</li>
                    <li>Email format validation</li>
                    <li>Admins can create teachers and manage content</li>
                    <li>Share credentials securely in person or encrypted message</li>
                  </ul>
                </div>

                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="premium"
                  className="w-full mb-6"
                >
                  <UserPlus size={18} className="mr-2" />
                  Generate New Admin Credentials
                </Button>

                {createdAdmins.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle size={22} className="text-green-600" />
                      Recently Created Admins
                    </h3>
                    <div className="space-y-3">
                      {createdAdmins.map((admin, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-green-50 border border-green-200 rounded-lg hover:shadow-md transition"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                            <div>
                              <p className="text-xs text-gray-600 font-semibold mb-1">NAME</p>
                              <p className="text-sm font-bold text-gray-900">{admin.name}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 font-semibold mb-1">EMAIL</p>
                              <p className="text-sm font-mono text-gray-900">{admin.email}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 font-semibold mb-1">PASSWORD</p>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-mono text-gray-900">
                                  {visiblePasswords.has(idx) ? admin.password : '••••••••••••'}
                                </p>
                                <button
                                  onClick={() => togglePasswordVisibility(idx)}
                                  className="p-1 hover:bg-green-200 rounded transition"
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
                            <p className="text-xs text-gray-500">Created on {admin.createdAt}</p>
                            <button
                              onClick={() => deleteAdmin(idx)}
                              className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
                              title="Delete this admin"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {createdAdmins.length === 0 && (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                    <Users size={40} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No admins created yet. Click the button above to create your first admin account.</p>
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
                <AlertCircle size={20} className="text-blue-600" />
                Admin Permissions
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-gray-900">Can Do:</p>
                  <ul className="list-disc list-inside text-gray-600 mt-1 space-y-1">
                    <li>Create teacher accounts</li>
                    <li>Manage school settings</li>
                    <li>View system analytics</li>
                    <li>Manage attendance policies</li>
                  </ul>
                </div>
                <div className="border-t pt-3">
                  <p className="font-semibold text-gray-900">Cannot Do:</p>
                  <ul className="list-disc list-inside text-gray-600 mt-1 space-y-1">
                    <li>Create student accounts</li>
                    <li>Access super admin controls</li>
                    <li>Modify system security</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          <Card className="shadow-lg bg-blue-50 border border-blue-200">
            <div className="p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">Pro Tip:</h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                Always share admin credentials securely. Consider delivering them in person or through an encrypted communication channel. Instruct admins to change their password on first login.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Modal */}
      <CredentialGenerationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerate={handleAdminCreated}
        role="admin"
        creatorRole="Super Administrator"
      />
    </div>
  );
};
