import React, { useState } from 'react';
import { Shield, Lock, AlertTriangle, CheckCircle, Key, Smartphone } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const SecurityPage: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Controls</h1>
          <p className="text-sm text-gray-600">Manage system security, encryption, and threat detection</p>
        </div>

        {/* Security Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <h3 className="text-sm font-semibold text-green-900">Security Score</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">98/100</p>
            <p className="text-xs text-green-700 mt-1">Excellent security posture</p>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900">Active Threats</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
            <p className="text-xs text-blue-700 mt-1">No threats detected</p>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <h3 className="text-sm font-semibold text-purple-900">SSL Certificates</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">4</p>
            <p className="text-xs text-purple-700 mt-1">All valid & updated</p>
          </Card>
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <h3 className="text-sm font-semibold text-amber-900">Failed Login Attempts</h3>
            <p className="text-3xl font-bold text-amber-600 mt-2">342</p>
            <p className="text-xs text-amber-700 mt-1">Blocked today</p>
          </Card>
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Authentication Security */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Lock size={24} className="text-blue-600" />
              Authentication Security
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Smartphone size={16} className="text-blue-600" />
                    Two-Factor Authentication (2FA)
                  </p>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                      twoFactorEnabled ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                      twoFactorEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}></div>
                  </button>
                </div>
                <p className="text-xs text-gray-600">
                  {twoFactorEnabled ? '✓ Enabled for all admin accounts' : '✗ Currently disabled'}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Key size={16} className="text-blue-600" />
                  Password Policy
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Minimum 12 characters | Alphanumeric + Special chars required | Expiry: 90 days
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-green-200">
                <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  Session Management
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Session timeout: 30 mins | Max 3 concurrent sessions | IP whitelisting: Enabled
                </p>
              </div>
            </div>
          </Card>

          {/* Data Protection */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Shield size={24} className="text-green-600" />
              Data Protection
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-900">End-to-End Encryption</p>
                  <button
                    onClick={() => setEncryptionEnabled(!encryptionEnabled)}
                    className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                      encryptionEnabled ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                      encryptionEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}></div>
                  </button>
                </div>
                <p className="text-xs text-gray-600">
                  {encryptionEnabled ? '✓ AES-256 encryption enabled' : '✗ Disabled'}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-green-200">
                <p className="text-sm font-semibold text-gray-900">SSL/TLS Certificate</p>
                <p className="text-xs text-gray-600 mt-2">
                  TLS 1.3 | Certificate: *.edunexes.com | Valid until: 2026-12-31
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-green-200">
                <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  Daily Backups
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Automated daily backups | Geo-redundant storage | 99.99% durability
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Firewall & DDoS Protection */}
        <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-600" />
            Threat Protection
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-red-200">
              <p className="text-sm font-semibold text-gray-900">Firewall Rules</p>
              <p className="text-2xl font-bold text-red-600 mt-2">847</p>
              <p className="text-xs text-gray-600 mt-1">Active firewall rules deployed</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-red-200">
              <p className="text-sm font-semibold text-gray-900">DDoS Attacks Blocked</p>
              <p className="text-2xl font-bold text-red-600 mt-2">2.4K</p>
              <p className="text-xs text-gray-600 mt-1">Last 30 days</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-red-200">
              <p className="text-sm font-semibold text-gray-900">Malware Scans</p>
              <p className="text-2xl font-bold text-green-600 mt-2">Clean</p>
              <p className="text-xs text-gray-600 mt-1">Last scan: 2 hours ago</p>
            </div>
          </div>
        </Card>

        {/* Security Alerts */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Security Alerts</h3>
          <div className="space-y-2">
            <div className="p-3 bg-white rounded-lg border border-amber-200 flex items-start gap-3">
              <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">All Security Patches Applied</p>
                <p className="text-xs text-gray-600 mt-1">System is up-to-date with all security patches</p>
              </div>
            </div>
            <div className="p-3 bg-white rounded-lg border border-green-200 flex items-start gap-3">
              <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">SSL Certificate Valid</p>
                <p className="text-xs text-gray-600 mt-1">SSL certificate will expire in 287 days</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};
