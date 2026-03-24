import { useState, useRef } from 'react';
import { Save, X, Edit2, Camera } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { showToast } from '../../utils/toast';

interface SuperAdminProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  address: string;
  city: string;
  state: string;
  country: string;
  joinDate: string;
  profilePic?: string;
}

export const SuperAdminProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<SuperAdminProfile>({
    id: 'SA-2024-001',
    firstName: 'Raj',
    lastName: 'Patel',
    email: 'admin@edunexes.com',
    phone: '+91-98765-43210',
    company: 'EduNexes Technologies',
    position: 'System Administrator',
    address: 'Innovation Hub, Tech Park',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    joinDate: '2024-01-15',
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

  const handleChange = (field: keyof SuperAdminProfile, value: string) => {
    setTempProfile(prev => ({ ...prev, [field]: value }));
  };

  const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500';
  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1';

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Super Admin Profile</h1>
          <p className="text-gray-600">EduNexes System Administrator Account</p>
        </div>
        {!editMode && (
          <Button onClick={handleEdit} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
            <Edit2 size={16} />
            Edit Profile
          </Button>
        )}
      </div>

      {/* Profile Header Card */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <div className="flex items-start gap-6">
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
              <div className="w-40 h-40 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-lg flex items-center justify-center text-white text-5xl font-bold shadow-lg border-4 border-white">
                {profile.firstName[0]}{profile.lastName[0]}
              </div>
            )}
            {editMode && (
              <>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-white rounded-lg p-3 shadow-lg hover:bg-gray-50 border-4 border-indigo-600 transition-all duration-200"
                >
                  <Camera size={20} className="text-indigo-600" />
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
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{profile.firstName} {profile.lastName}</h2>
            <p className="text-indigo-600 font-semibold text-lg">Super Admin ID: {profile.id}</p>
            <p className="text-gray-600">{profile.position}</p>
            <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
              <p><span className="text-gray-600">Email:</span> <span className="font-semibold text-gray-900">{profile.email}</span></p>
              <p><span className="text-gray-600">Company:</span> <span className="font-semibold text-gray-900">{profile.company}</span></p>
              <p><span className="text-gray-600">Phone:</span> <span className="font-semibold text-gray-900">{profile.phone}</span></p>
              <p><span className="text-gray-600">Joined:</span> <span className="font-semibold text-gray-900">{profile.joinDate}</span></p>
            </div>
          </div>
        </div>
      </Card>

      {/* Edit Form */}
      {editMode ? (
        <Card className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>First Name</label>
                  <input
                    type="text"
                    value={tempProfile.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Last Name</label>
                  <input
                    type="text"
                    value={tempProfile.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    value={tempProfile.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input
                    type="tel"
                    value={tempProfile.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Organization Information */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Organization</h3>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Company</label>
                  <input
                    type="text"
                    value={tempProfile.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Position</label>
                  <input
                    type="text"
                    value={tempProfile.position}
                    onChange={(e) => handleChange('position', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>City</label>
                  <input
                    type="text"
                    value={tempProfile.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>State/Region</label>
                  <input
                    type="text"
                    value={tempProfile.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Street Address</label>
                  <input
                    type="text"
                    value={tempProfile.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Country</label>
                  <input
                    type="text"
                    value={tempProfile.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
            >
              <Save size={16} />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-900 gap-2"
            >
              <X size={16} />
              Cancel
            </Button>
          </div>
        </Card>
      ) : (
        // View Mode
        <Card className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-600 font-semibold">FIRST NAME</p>
                  <p className="text-gray-900 font-medium">{profile.firstName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold">LAST NAME</p>
                  <p className="text-gray-900 font-medium">{profile.lastName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold">EMAIL</p>
                  <p className="text-gray-900 font-medium">{profile.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold">PHONE</p>
                  <p className="text-gray-900 font-medium">{profile.phone}</p>
                </div>
              </div>
            </div>

            {/* Organization Information */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Organization</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-600 font-semibold">COMPANY</p>
                  <p className="text-gray-900 font-medium">{profile.company}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold">POSITION</p>
                  <p className="text-gray-900 font-medium">{profile.position}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold">CITY</p>
                  <p className="text-gray-900 font-medium">{profile.city}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold">STATE/REGION</p>
                  <p className="text-gray-900 font-medium">{profile.state}</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-gray-600 font-semibold">STREET ADDRESS</p>
                  <p className="text-gray-900 font-medium">{profile.address}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold">COUNTRY</p>
                  <p className="text-gray-900 font-medium">{profile.country}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
