import React, { useState, useRef } from 'react';
import { User, Mail, Phone, MapPin, Users, Briefcase, Save, X, Edit2, Camera } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { showToast } from '../../utils/toast';

interface ParentProfile {
  id: string;
  parentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  occupation: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  joinDate: string;
  children: string;
  relation: string;
  profilePic?: string;
}

export const ParentProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ParentProfile>({
    id: 'PAR-2023-001',
    parentId: 'PARENT001',
    firstName: 'Mr. Vikram',
    lastName: 'Kumar',
    email: 'vikram.kumar@email.com',
    phone: '98765-43200',
    occupation: 'Software Engineer',
    address: '123 Residential Complex',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110003',
    joinDate: '2023-06-01',
    children: 'Rajesh Kumar (Class IX-A)',
    relation: 'Father',
    profilePic: undefined
  });

  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfile(prev => ({ ...prev, profilePic: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setTempProfile(profile);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setProfile(tempProfile);
      setSaving(false);
      setEditMode(false);
      showToast('Profile updated successfully!', 'success');
    }, 1500);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleChange = (field: keyof ParentProfile, value: string) => {
    setTempProfile(prev => ({ ...prev, [field]: value }));
  };

  const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500';
  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1';

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">View and manage your parent profile</p>
        </div>
        {!editMode && (
          <Button onClick={handleEdit} className="bg-amber-600 hover:bg-amber-700 text-white gap-2">
            <Edit2 size={16} />
            Edit Profile
          </Button>
        )}
      </div>

      {/* Profile Header Card */}
      <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
        <div className="flex items-start gap-8">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {tempProfile.profilePic && editMode ? (
              <img
                src={tempProfile.profilePic}
                alt="Profile"
                className="w-40 h-40 rounded-lg object-cover shadow-lg border-4 border-white"
              />
            ) : profile.profilePic ? (
              <img
                src={profile.profilePic}
                alt="Profile"
                className="w-40 h-40 rounded-lg object-cover shadow-lg border-4 border-white"
              />
            ) : (
              <div className="w-40 h-40 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center text-white text-5xl font-bold shadow-lg border-4 border-white">
                {profile.firstName[0]}{profile.lastName[0]}
              </div>
            )}
            {editMode && (
              <>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-white rounded-lg p-3 shadow-lg hover:bg-gray-50 border-4 border-amber-600 transition-all duration-200"
                >
                  <Camera size={20} className="text-amber-600" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
              </>
            )}
          </div>

          {/* Quick Info */}
          <div className="flex-1 pt-2">
            <h2 className="text-3xl font-bold text-gray-900">{profile.firstName} {profile.lastName}</h2>
            <p className="text-amber-600 font-semibold text-lg mt-1">{profile.relation}</p>
            <p className="text-gray-700 font-medium text-base mb-4">{profile.occupation}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white bg-opacity-60 rounded-lg p-3">
                <p className="text-gray-600 text-xs uppercase tracking-wide">Parent ID</p>
                <p className="font-bold text-gray-900">{profile.id}</p>
              </div>
              <div className="bg-white bg-opacity-60 rounded-lg p-3">
                <p className="text-gray-600 text-xs uppercase tracking-wide">Join Date</p>
                <p className="font-bold text-gray-900">{profile.joinDate}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <User size={18} className="text-amber-600" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className={labelClass}>First Name</label>
            {editMode ? (
              <input
                type="text"
                value={tempProfile.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className={inputClass}
              />
            ) : (
              <p className="text-gray-900 font-semibold">{profile.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className={labelClass}>Last Name</label>
            {editMode ? (
              <input
                type="text"
                value={tempProfile.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className={inputClass}
              />
            ) : (
              <p className="text-gray-900 font-semibold">{profile.lastName}</p>
            )}
          </div>

          {/* Relation */}
          <div>
            <label className={labelClass}>Relation to Student</label>
            {editMode ? (
              <input
                type="text"
                value={tempProfile.relation}
                onChange={(e) => handleChange('relation', e.target.value)}
                className={inputClass}
              />
            ) : (
              <p className="text-gray-900 font-semibold">{profile.relation}</p>
            )}
          </div>

          {/* Parent ID */}
          <div>
            <label className={labelClass}>Parent ID</label>
            <p className="text-gray-900 font-semibold">{profile.parentId}</p>
          </div>
        </div>
      </Card>

      {/* Contact Information */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Mail size={18} className="text-amber-600" />
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label className={labelClass}>Email</label>
            {editMode ? (
              <input
                type="email"
                value={tempProfile.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={inputClass}
              />
            ) : (
              <p className="text-gray-900">{profile.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className={labelClass}>
              <Phone size={14} className="inline mr-1" />
              Phone
            </label>
            {editMode ? (
              <input
                type="tel"
                value={tempProfile.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={inputClass}
              />
            ) : (
              <p className="text-gray-900">{profile.phone}</p>
            )}
          </div>
        </div>
      </Card>

      {/* Professional Information */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Briefcase size={18} className="text-amber-600" />
          Professional Information
        </h3>
        <div>
          <label className={labelClass}>Occupation</label>
          {editMode ? (
            <input
              type="text"
              value={tempProfile.occupation}
              onChange={(e) => handleChange('occupation', e.target.value)}
              className={inputClass}
            />
          ) : (
            <p className="text-gray-900">{profile.occupation}</p>
          )}
        </div>
      </Card>

      {/* Children Information */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Users size={18} className="text-amber-600" />
          Associated Students
        </h3>
        <div>
          <label className={labelClass}>Children in School</label>
          {editMode ? (
            <textarea
              value={tempProfile.children}
              onChange={(e) => handleChange('children', e.target.value)}
              rows={3}
              className={inputClass}
              placeholder="Enter student names and classes (one per line)"
            />
          ) : (
            <div className="space-y-1">
              {profile.children.split(',').map((child, idx) => (
                <p key={idx} className="text-gray-900 px-3 py-2 bg-amber-50 rounded border border-amber-200">
                  • {child.trim()}
                </p>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Address Information */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin size={18} className="text-amber-600" />
          Address
        </h3>
        <div className="space-y-4">
          {/* Street Address */}
          <div>
            <label className={labelClass}>Street Address</label>
            {editMode ? (
              <input
                type="text"
                value={tempProfile.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className={inputClass}
              />
            ) : (
              <p className="text-gray-900">{profile.address}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* City */}
            <div>
              <label className={labelClass}>City</label>
              {editMode ? (
                <input
                  type="text"
                  value={tempProfile.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className={inputClass}
                />
              ) : (
                <p className="text-gray-900">{profile.city}</p>
              )}
            </div>

            {/* State */}
            <div>
              <label className={labelClass}>State</label>
              {editMode ? (
                <input
                  type="text"
                  value={tempProfile.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className={inputClass}
                />
              ) : (
                <p className="text-gray-900">{profile.state}</p>
              )}
            </div>

            {/* Pincode */}
            <div>
              <label className={labelClass}>Pincode</label>
              {editMode ? (
                <input
                  type="text"
                  value={tempProfile.pincode}
                  onChange={(e) => handleChange('pincode', e.target.value)}
                  className={inputClass}
                />
              ) : (
                <p className="text-gray-900">{profile.pincode}</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      {editMode && (
        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white gap-2"
          >
            <Save size={16} />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button
            onClick={handleCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900"
          >
            <X size={16} />
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};