import React, { useState } from 'react';
import { X, Mail, Lock, User, Copy, Check, Eye, EyeOff } from 'lucide-react';
import { Card } from '../ui/Card';

interface GeneratedCredential {
  email: string;
  password: string;
  name: string;
  role: string;
}

interface CredentialGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (credential: GeneratedCredential) => void;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  creatorRole: string;
}

export const CredentialGenerationModal: React.FC<CredentialGenerationModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
  role,
  creatorRole,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    schoolName: '',
    placeName: '',
    email: '',
    generatePassword: true,
  });

  const [generatedCredential, setGeneratedCredential] = useState<GeneratedCredential | null>(null);
  const [copied, setCopied] = useState<'email' | 'password' | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = (firstName: string = '', lastName: string = '', schoolName: string = '', placeName: string = '') => {
    // Create meaningful password based on name or school details
    // For admin: SchoolName + placeNameInitial
    // For others: FirstName + LastNameInitial
    let passwordBase = '';
    let nameInitial = '';
    
    if (role === 'admin' && schoolName) {
      passwordBase = schoolName.substring(0, Math.min(6, schoolName.length));
      nameInitial = placeName.charAt(0).toUpperCase();
    } else {
      passwordBase = firstName.substring(0, Math.min(6, firstName.length));
      nameInitial = lastName.charAt(0).toUpperCase();
    }
    
    const year = new Date().getFullYear();
    const specialChars = ['@', '#', '$', '!'];
    const randomSpecial = specialChars[Math.floor(Math.random() * specialChars.length)];
    const randomNum = Math.floor(Math.random() * 99) + 1; // 1-99
    
    return `${passwordBase}${randomNum}${randomSpecial}${year}${nameInitial}`;
  };

  const handleGenerate = () => {
    if (role === 'admin') {
      if (!formData.schoolName || !formData.placeName || !formData.email) {
        alert('Please fill in all fields (School Name, Place Name, Email)');
        return;
      }
    } else {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        alert('Please fill in all fields');
        return;
      }
    }

    let name = '';
    if (role === 'admin') {
      name = `${formData.schoolName} - ${formData.placeName}`;
    } else {
      name = `${formData.firstName} ${formData.lastName}`;
    }

    const credential: GeneratedCredential = {
      name,
      email: formData.email,
      password: formData.generatePassword 
        ? generatePassword(formData.firstName, formData.lastName, formData.schoolName, formData.placeName) 
        : 'TempPass123!',
      role,
    };

    setGeneratedCredential(credential);
  };

  const handleConfirm = () => {
    if (generatedCredential) {
      onGenerate(generatedCredential);
      setFormData({ firstName: '', lastName: '', schoolName: '', placeName: '', email: '', generatePassword: true });
      setGeneratedCredential(null);
      onClose();
    }
  };

  const copyToClipboard = (text: string, field: 'email' | 'password') => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!isOpen) return null;

  const roleLabels = {
    admin: 'Administrator',
    teacher: 'Teacher',
    student: 'Student',
    parent: 'Parent',
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Create {roleLabels[role]} Credentials
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!generatedCredential ? (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
                As a {creatorRole}, you can create credentials for {roleLabels[role]}s. Share these credentials securely.
              </div>

              {/* Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {role === 'admin' ? (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                        <User size={16} /> School Name
                      </label>
                      <input
                        type="text"
                        value={formData.schoolName}
                        onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Delhi Public School"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                        <User size={16} /> Place Name
                      </label>
                      <input
                        type="text"
                        value={formData.placeName}
                        onChange={(e) => setFormData({ ...formData, placeName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., New Delhi"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                        <User size={16} /> First Name
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., John"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                        <User size={16} /> Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Smith"
                      />
                    </div>
                  </>
                )}

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Mail size={16} /> Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={role === 'admin' ? 'e.g., admin@dps.edu' : 'e.g., john.smith@school.edu'}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.generatePassword}
                      onChange={(e) => setFormData({ ...formData, generatePassword: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Auto-generate secure password</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerate}
                  className="flex-1 px-4 py-2 bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white font-bold rounded-lg hover:from-gray-800 hover:via-gray-900 hover:to-black transition shadow-lg"
                >
                  Generate Credentials
                </button>
              </div>
            </div>
          ) : (
            /* Generated Credentials Display */
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-700 flex items-center gap-2">
                <Check size={20} />
                Credentials generated successfully! Share them securely with the user.
              </div>

              <div className="space-y-3">
                {/* Name */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 mb-1">NAME</p>
                  <p className="text-lg font-bold text-gray-900">{generatedCredential.name}</p>
                </div>

                {/* Email */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                        <Mail size={14} /> EMAIL
                      </p>
                      <p className="text-lg font-mono font-bold text-gray-900">{generatedCredential.email}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(generatedCredential.email, 'email')}
                      className="p-2 hover:bg-gray-200 rounded-lg transition"
                      title="Copy to clipboard"
                    >
                      {copied === 'email' ? (
                        <Check size={18} className="text-green-600" />
                      ) : (
                        <Copy size={18} className="text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                        <Lock size={14} /> PASSWORD
                      </p>
                      <p className="text-lg font-mono font-bold text-gray-900">
                        {showPassword ? generatedCredential.password : '••••••••••••'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-2 hover:bg-gray-200 rounded-lg transition"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff size={18} className="text-gray-600" />
                        ) : (
                          <Eye size={18} className="text-gray-600" />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(generatedCredential.password, 'password')}
                        className="p-2 hover:bg-gray-200 rounded-lg transition"
                        title="Copy to clipboard"
                      >
                        {copied === 'password' ? (
                          <Check size={18} className="text-green-600" />
                        ) : (
                          <Copy size={18} className="text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-xs text-yellow-800">
                <p className="font-semibold mb-1">⚠️ Important Security Note:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Share these credentials securely (email/message is NOT secure)</li>
                  <li>User should change password on first login</li>
                  <li>Do not share publicly or store in plain text</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setGeneratedCredential(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
                >
                  Create Another
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-4 py-2 bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white font-bold rounded-lg hover:from-gray-800 hover:via-gray-900 hover:to-black transition shadow-lg"
                >
                  Confirm & Close
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
