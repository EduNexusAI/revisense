import React, { useState } from 'react';
import { Settings, Building2, Mail, Phone, MapPin, Clock, Globe, Upload, Save } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface SchoolSettings {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  website: string;
  principal: string;
  principalEmail: string;
  established: string;
  affiliation: string;
  board: string;
  timezone: string;
  language: string;
}

export const SchoolSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SchoolSettings>({
    name: 'Green Valley International School',
    email: 'admin@greenvalley.edu',
    phone: '+91-11-4567-8900',
    address: '123 School Road',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110003',
    website: 'www.greenvalley.edu',
    principal: 'Dr. Rajesh Kumar',
    principalEmail: 'principal@greenvalley.edu',
    established: '2005',
    affiliation: 'CBSE (2023456)',
    board: 'CBSE',
    timezone: 'IST (UTC+5:30)',
    language: 'English'
  });

  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);

  const handleEdit = () => {
    setEditMode(true);
    setTempSettings(settings);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSettings(tempSettings);
      setSaving(false);
      setEditMode(false);
      alert('Settings saved successfully!');
    }, 1500);
  };

  const handleChange = (field: keyof SchoolSettings, value: string) => {
    setTempSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">School Settings</h1>
          <p className="text-gray-600">Configure school branding and preferences</p>
        </div>
        {!editMode && (
          <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Settings size={16} />
            Edit Settings
          </Button>
        )}
      </div>

      {/* School Logo & Branding */}
      <Card>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-gray-900">School Logo & Branding</h3>
            <p className="text-sm text-gray-600">Upload logo and customize appearance</p>
          </div>
          {!editMode && (
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Building2 size={32} className="text-white" />
            </div>
          )}
        </div>

        {editMode && (
          <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-full h-24 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="text-center">
                <Upload size={24} className="text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload school logo</p>
              </div>
            </div>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Brand Color</span>
              <input
                type="color"
                defaultValue="#0066CC"
                className="mt-1 w-12 h-10 cursor-pointer rounded border border-gray-300"
              />
            </label>
          </div>
        )}
      </Card>

      {/* Basic Information */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* School Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">School Name</label>
            {editMode ? (
              <input
                type="text"
                value={tempSettings.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 font-semibold">{settings.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              <Mail size={14} className="inline mr-1" />
              Email
            </label>
            {editMode ? (
              <input
                type="email"
                value={tempSettings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{settings.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              <Phone size={14} className="inline mr-1" />
              Phone
            </label>
            {editMode ? (
              <input
                type="tel"
                value={tempSettings.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{settings.phone}</p>
            )}
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              <Globe size={14} className="inline mr-1" />
              Website
            </label>
            {editMode ? (
              <input
                type="url"
                value={tempSettings.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{settings.website}</p>
            )}
          </div>
        </div>
      </Card>

      {/* Address Information */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin size={18} />
          Address Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Street Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Street Address</label>
            {editMode ? (
              <input
                type="text"
                value={tempSettings.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{settings.address}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
            {editMode ? (
              <input
                type="text"
                value={tempSettings.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{settings.city}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">State</label>
            {editMode ? (
              <input
                type="text"
                value={tempSettings.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{settings.state}</p>
            )}
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Pincode</label>
            {editMode ? (
              <input
                type="text"
                value={tempSettings.pincode}
                onChange={(e) => handleChange('pincode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{settings.pincode}</p>
            )}
          </div>
        </div>
      </Card>

      {/* Academic Information */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Academic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Board */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Board</label>
            {editMode ? (
              <select
                value={tempSettings.board}
                onChange={(e) => handleChange('board', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>CBSE</option>
                <option>ICSE</option>
                <option>State Board</option>
              </select>
            ) : (
              <p className="text-gray-900">{settings.board}</p>
            )}
          </div>

          {/* Affiliation */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Affiliation Number</label>
            {editMode ? (
              <input
                type="text"
                value={tempSettings.affiliation}
                onChange={(e) => handleChange('affiliation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{settings.affiliation}</p>
            )}
          </div>

          {/* Established */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Year Established</label>
            {editMode ? (
              <input
                type="text"
                value={tempSettings.established}
                onChange={(e) => handleChange('established', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{settings.established}</p>
            )}
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              <Clock size={14} className="inline mr-1" />
              Timezone
            </label>
            {editMode ? (
              <select
                value={tempSettings.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>IST (UTC+5:30)</option>
                <option>EST (UTC-5:00)</option>
                <option>GMT (UTC+0:00)</option>
              </select>
            ) : (
              <p className="text-gray-900">{settings.timezone}</p>
            )}
          </div>
        </div>
      </Card>

      {/* Principal Information */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Principal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Principal Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
            {editMode ? (
              <input
                type="text"
                value={tempSettings.principal}
                onChange={(e) => handleChange('principal', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{settings.principal}</p>
            )}
          </div>

          {/* Principal Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            {editMode ? (
              <input
                type="email"
                value={tempSettings.principalEmail}
                onChange={(e) => handleChange('principalEmail', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{settings.principalEmail}</p>
            )}
          </div>
        </div>
      </Card>

      {/* Save/Cancel Buttons */}
      {editMode && (
        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <Save size={16} />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button
            onClick={() => setEditMode(false)}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};