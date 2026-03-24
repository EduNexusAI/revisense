import React, { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Download, FileJson, FileText, CheckCircle, Loader } from 'lucide-react';
import * as XLSX from 'xlsx';

interface DataExportOption {
  id: string;
  name: string;
  description: string;
  format: 'xlsx' | 'json' | 'csv';
  icon: React.ReactNode;
  dataType: string;
  recordCount: number;
}

const DUMMY_EXPORT_DATA = {
  admins: [
    { id: 1, name: 'Admin 1', email: 'admin1@school.com', school: 'Cambridge International', joinDate: '2024-01-01' },
    { id: 2, name: 'Admin 2', email: 'admin2@school.com', school: 'Cambridge International', joinDate: '2024-02-15' },
  ],
  teachers: [
    { id: 1, name: 'Ravi Krishnamurthy', email: 'ravi@school.com', subject: 'Mathematics', class: 'Grade 8' },
    { id: 2, name: 'Anitha Suresh', email: 'anitha@school.com', subject: 'English', class: 'Grade 8' },
    { id: 3, name: 'Dr. Vikram Patel', email: 'vikram@school.com', subject: 'Science', class: 'Grade 9' },
  ],
  students: [
    { id: 1, name: 'Arjun Singh', email: 'arjun@school.com', class: 'Grade 8', section: 'A', admissionNo: 'ADM001' },
    { id: 2, name: 'Priya Sharma', email: 'priya@school.com', class: 'Grade 8', section: 'A', admissionNo: 'ADM002' },
    { id: 3, name: 'Ravi Kumar', email: 'ravi@school.com', class: 'Grade 8', section: 'A', admissionNo: 'ADM003' },
  ],
  parents: [
    { id: 1, name: 'Parent 1', email: 'parent1@email.com', phone: '9876543210', childName: 'Arjun Singh' },
    { id: 2, name: 'Parent 2', email: 'parent2@email.com', phone: '9876543211', childName: 'Priya Sharma' },
  ],
  attendance: [
    { date: '2026-03-22', class: 'Grade 8', section: 'A', totalStudents: 40, present: 36, absent: 4 },
    { date: '2026-03-21', class: 'Grade 8', section: 'B', totalStudents: 35, present: 33, absent: 2 },
  ],
  fees: [
    { studentId: 1, studentName: 'Arjun Singh', amount: 5000, dueDate: '2026-04-01', status: 'Pending' },
    { studentId: 2, studentName: 'Priya Sharma', amount: 5000, dueDate: '2026-04-01', status: 'Paid' },
  ],
};

const EXPORT_OPTIONS: DataExportOption[] = [
  {
    id: '1',
    name: 'All Admins Data',
    description: 'Export admin profiles, emails, and system access info',
    format: 'xlsx',
    icon: <FileText size={24} />,
    dataType: 'admins',
    recordCount: DUMMY_EXPORT_DATA.admins.length,
  },
  {
    id: '2',
    name: 'All Teachers Data',
    description: 'Export teacher information, subjects, and class assignments',
    format: 'xlsx',
    icon: <FileText size={24} />,
    dataType: 'teachers',
    recordCount: DUMMY_EXPORT_DATA.teachers.length,
  },
  {
    id: '3',
    name: 'All Students Data',
    description: 'Export student profiles, admission numbers, and class details',
    format: 'xlsx',
    icon: <FileText size={24} />,
    dataType: 'students',
    recordCount: DUMMY_EXPORT_DATA.students.length,
  },
  {
    id: '4',
    name: 'All Parents Data',
    description: 'Export parent information and contact details',
    format: 'xlsx',
    icon: <FileText size={24} />,
    dataType: 'parents',
    recordCount: DUMMY_EXPORT_DATA.parents.length,
  },
  {
    id: '5',
    name: 'Attendance Records',
    description: 'Export monthly attendance data for all classes',
    format: 'xlsx',
    icon: <FileText size={24} />,
    dataType: 'attendance',
    recordCount: DUMMY_EXPORT_DATA.attendance.length,
  },
  {
    id: '6',
    name: 'Fee Management Data',
    description: 'Export fee payments and dues information',
    format: 'xlsx',
    icon: <FileText size={24} />,
    dataType: 'fees',
    recordCount: DUMMY_EXPORT_DATA.fees.length,
  },
  {
    id: '7',
    name: 'Complete Database (JSON)',
    description: 'Export all system data in JSON format for backup',
    format: 'json',
    icon: <FileJson size={24} />,
    dataType: 'complete',
    recordCount: Object.values(DUMMY_EXPORT_DATA).reduce((sum, arr) => sum + arr.length, 0),
  },
];

export const DownloadDataPage = () => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [completedDownloads, setCompletedDownloads] = useState<Set<string>>(new Set());

  const handleDownload = (option: DataExportOption) => {
    setDownloadingId(option.id);

    setTimeout(() => {
      if (option.format === 'json') {
        const jsonData = JSON.stringify(DUMMY_EXPORT_DATA, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `school-database-${new Date().toISOString().slice(0, 10)}.json`;
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        const data = DUMMY_EXPORT_DATA[option.dataType as keyof typeof DUMMY_EXPORT_DATA];
        if (data) {
          const worksheet = XLSX.utils.json_to_sheet(data);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, option.name);

          // Style header
          const headerStyle = {
            font: { bold: true, color: { rgb: 'FFFFFF' } },
            fill: { fgColor: { rgb: '9333EA' } },
            alignment: { horizontal: 'center', vertical: 'center' },
          };

          const colCount = Object.keys(data[0]).length;
          for (let i = 0; i < colCount; i++) {
            const cell = worksheet[XLSX.utils.encode_cell({ r: 0, c: i })];
            if (cell) cell.s = headerStyle;
          }

          worksheet['!cols'] = Array(colCount).fill({ wch: 15 });

          XLSX.writeFile(workbook, `${option.name}-${new Date().toISOString().slice(0, 10)}.xlsx`);
        }
      }

      setCompletedDownloads(new Set([...completedDownloads, option.id]));
      setDownloadingId(null);

      setTimeout(() => {
        setCompletedDownloads(new Set([...completedDownloads].filter(id => id !== option.id)));
      }, 2000);
    }, 800);
  };

  const handleDownloadAll = () => {
    alert('Downloading all data... This may take a moment.');
    EXPORT_OPTIONS.forEach((option, index) => {
      setTimeout(() => handleDownload(option), index * 500);
    });
  };

  return (
    <PageWrapper title="Download Data">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Download size={32} className="text-green-600" />
                Download School Data
              </h1>
              <p className="text-slate-600 mt-2">Export system data in various formats for analysis and backup</p>
            </div>
            <Button
              onClick={handleDownloadAll}
              className="bg-green-600 hover:bg-green-700 text-white gap-2"
            >
              <Download size={20} />
              Download All
            </Button>
          </div>
        </div>

        {/* Info */}
        <Card className="bg-blue-50 border border-blue-200 p-4">
          <div className="flex gap-3">
            <FileText className="text-blue-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-blue-900">Data Export Information</p>
              <p className="text-sm text-blue-700 mt-1">
                You can download individual datasets in Excel format (.xlsx) or export the complete database in JSON format. All data is exported with current timestamps and includes all records in the system.
              </p>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-xs text-slate-600 uppercase font-medium mb-2">Total Records</p>
            <p className="text-3xl font-bold text-green-600">
              {Object.values(DUMMY_EXPORT_DATA).reduce((sum, arr) => sum + arr.length, 0)}
            </p>
            <p className="text-xs text-slate-500 mt-2">All data</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-slate-600 uppercase font-medium mb-2">Export Options</p>
            <p className="text-3xl font-bold text-blue-600">{EXPORT_OPTIONS.length}</p>
            <p className="text-xs text-slate-500 mt-2">Available</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-slate-600 uppercase font-medium mb-2">File Formats</p>
            <p className="text-3xl font-bold text-purple-600">2</p>
            <p className="text-xs text-slate-500 mt-2">XLSX, JSON</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-slate-600 uppercase font-medium mb-2">Last Export</p>
            <p className="text-3xl font-bold text-gray-600">—</p>
            <p className="text-xs text-slate-500 mt-2">Never</p>
          </Card>
        </div>

        {/* Export Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXPORT_OPTIONS.map(option => (
            <Card key={option.id} className="p-6 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-green-600">{option.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{option.name}</h3>
                    <Badge className="bg-green-100 text-green-800 text-xs mt-1">
                      {option.format.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{option.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">
                  <strong>{option.recordCount}</strong> records
                </span>
              </div>

              <button
                onClick={() => handleDownload(option)}
                disabled={downloadingId === option.id || completedDownloads.has(option.id)}
                className={`w-full px-4 py-2 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                  completedDownloads.has(option.id)
                    ? 'bg-green-100 text-green-800'
                    : downloadingId === option.id
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {downloadingId === option.id ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Downloading...
                  </>
                ) : completedDownloads.has(option.id) ? (
                  <>
                    <CheckCircle size={18} />
                    Downloaded!
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    Download
                  </>
                )}
              </button>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <Card className="bg-slate-50 p-4">
          <p className="text-xs text-slate-600 mb-2">
            <span className="font-semibold">Data Privacy & Security:</span>
          </p>
          <p className="text-xs text-slate-600">
            All data exports contain sensitive information. Please keep downloaded files secure and share only with authorized personnel. Exports include timestamps for audit trails. Regular backups are recommended.
          </p>
        </Card>
      </div>
    </PageWrapper>
  );
};
