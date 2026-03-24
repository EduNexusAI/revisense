import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Download, Printer, FileText, Calendar, AlertCircle, Send } from 'lucide-react';
import * as XLSX from 'xlsx';

interface StudentAttendance {
  id: string;
  name: string;
  admissionNumber: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  attendancePercent: number;
  status: 'excellent' | 'good' | 'average' | 'poor';
}

const DUMMY_ATTENDANCE: StudentAttendance[] = [
  {
    id: '1',
    name: 'Arjun Singh',
    admissionNumber: 'ADM001',
    totalDays: 20,
    presentDays: 18,
    absentDays: 2,
    attendancePercent: 90,
    status: 'excellent',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    admissionNumber: 'ADM002',
    totalDays: 20,
    presentDays: 19,
    absentDays: 1,
    attendancePercent: 95,
    status: 'excellent',
  },
  {
    id: '3',
    name: 'Ravi Kumar',
    admissionNumber: 'ADM003',
    totalDays: 20,
    presentDays: 17,
    absentDays: 3,
    attendancePercent: 85,
    status: 'good',
  },
  {
    id: '4',
    name: 'Anjali Verma',
    admissionNumber: 'ADM004',
    totalDays: 20,
    presentDays: 15,
    absentDays: 5,
    attendancePercent: 75,
    status: 'average',
  },
  {
    id: '5',
    name: 'Deepak Patel',
    admissionNumber: 'ADM005',
    totalDays: 20,
    presentDays: 12,
    absentDays: 8,
    attendancePercent: 60,
    status: 'poor',
  },
  {
    id: '6',
    name: 'Neha Gupta',
    admissionNumber: 'ADM006',
    totalDays: 20,
    presentDays: 18,
    absentDays: 2,
    attendancePercent: 90,
    status: 'excellent',
  },
  {
    id: '7',
    name: 'Vikram Singh',
    admissionNumber: 'ADM007',
    totalDays: 20,
    presentDays: 19,
    absentDays: 1,
    attendancePercent: 95,
    status: 'excellent',
  },
  {
    id: '8',
    name: 'Meera Reddy',
    admissionNumber: 'ADM008',
    totalDays: 20,
    presentDays: 17,
    absentDays: 3,
    attendancePercent: 85,
    status: 'good',
  },
  {
    id: '9',
    name: 'Saurav Nair',
    admissionNumber: 'ADM009',
    totalDays: 20,
    presentDays: 16,
    absentDays: 4,
    attendancePercent: 80,
    status: 'good',
  },
  {
    id: '10',
    name: 'Pooja Malhotra',
    admissionNumber: 'ADM010',
    totalDays: 20,
    presentDays: 18,
    absentDays: 2,
    attendancePercent: 90,
    status: 'excellent',
  },
  {
    id: '11',
    name: 'Aditya Kumar',
    admissionNumber: 'ADM011',
    totalDays: 20,
    presentDays: 14,
    absentDays: 6,
    attendancePercent: 70,
    status: 'average',
  },
  {
    id: '12',
    name: 'Isha Bansal',
    admissionNumber: 'ADM012',
    totalDays: 20,
    presentDays: 19,
    absentDays: 1,
    attendancePercent: 95,
    status: 'excellent',
  },
  {
    id: '13',
    name: 'Rajesh Yadav',
    admissionNumber: 'ADM013',
    totalDays: 20,
    presentDays: 17,
    absentDays: 3,
    attendancePercent: 85,
    status: 'good',
  },
  {
    id: '14',
    name: 'Divya Sinha',
    admissionNumber: 'ADM014',
    totalDays: 20,
    presentDays: 16,
    absentDays: 4,
    attendancePercent: 80,
    status: 'good',
  },
  {
    id: '15',
    name: 'Rohan Desai',
    admissionNumber: 'ADM015',
    totalDays: 20,
    presentDays: 15,
    absentDays: 5,
    attendancePercent: 75,
    status: 'average',
  },
  {
    id: '16',
    name: 'Sakshi Iyer',
    admissionNumber: 'ADM016',
    totalDays: 20,
    presentDays: 18,
    absentDays: 2,
    attendancePercent: 90,
    status: 'excellent',
  },
  {
    id: '17',
    name: 'Karan Chopra',
    admissionNumber: 'ADM017',
    totalDays: 20,
    presentDays: 13,
    absentDays: 7,
    attendancePercent: 65,
    status: 'poor',
  },
  {
    id: '18',
    name: 'Ananya Das',
    admissionNumber: 'ADM018',
    totalDays: 20,
    presentDays: 19,
    absentDays: 1,
    attendancePercent: 95,
    status: 'excellent',
  },
  {
    id: '19',
    name: 'Nikhil Gupta',
    admissionNumber: 'ADM019',
    totalDays: 20,
    presentDays: 17,
    absentDays: 3,
    attendancePercent: 85,
    status: 'good',
  },
  {
    id: '20',
    name: 'Tanya Arora',
    admissionNumber: 'ADM020',
    totalDays: 20,
    presentDays: 16,
    absentDays: 4,
    attendancePercent: 80,
    status: 'good',
  },
  {
    id: '21',
    name: 'Vishal Mishra',
    admissionNumber: 'ADM021',
    totalDays: 20,
    presentDays: 18,
    absentDays: 2,
    attendancePercent: 90,
    status: 'excellent',
  },
  {
    id: '22',
    name: 'Shreya Roy',
    admissionNumber: 'ADM022',
    totalDays: 20,
    presentDays: 15,
    absentDays: 5,
    attendancePercent: 75,
    status: 'average',
  },
  {
    id: '23',
    name: 'Amit Saxena',
    admissionNumber: 'ADM023',
    totalDays: 20,
    presentDays: 14,
    absentDays: 6,
    attendancePercent: 70,
    status: 'average',
  },
  {
    id: '24',
    name: 'Rinku Verma',
    admissionNumber: 'ADM024',
    totalDays: 20,
    presentDays: 19,
    absentDays: 1,
    attendancePercent: 95,
    status: 'excellent',
  },
  {
    id: '25',
    name: 'Siddharth Joshi',
    admissionNumber: 'ADM025',
    totalDays: 20,
    presentDays: 17,
    absentDays: 3,
    attendancePercent: 85,
    status: 'good',
  },
  {
    id: '26',
    name: 'Priya Nambiar',
    admissionNumber: 'ADM026',
    totalDays: 20,
    presentDays: 16,
    absentDays: 4,
    attendancePercent: 80,
    status: 'good',
  },
  {
    id: '27',
    name: 'Aryan Singh Tanwar',
    admissionNumber: 'ADM027',
    totalDays: 20,
    presentDays: 18,
    absentDays: 2,
    attendancePercent: 90,
    status: 'excellent',
  },
  {
    id: '28',
    name: 'Avni Kapoor',
    admissionNumber: 'ADM028',
    totalDays: 20,
    presentDays: 12,
    absentDays: 8,
    attendancePercent: 60,
    status: 'poor',
  },
  {
    id: '29',
    name: 'Varun Saxena',
    admissionNumber: 'ADM029',
    totalDays: 20,
    presentDays: 19,
    absentDays: 1,
    attendancePercent: 95,
    status: 'excellent',
  },
  {
    id: '30',
    name: 'Neelam Rao',
    admissionNumber: 'ADM030',
    totalDays: 20,
    presentDays: 17,
    absentDays: 3,
    attendancePercent: 85,
    status: 'good',
  },
  {
    id: '31',
    name: 'Harsh Kumar',
    admissionNumber: 'ADM031',
    totalDays: 20,
    presentDays: 15,
    absentDays: 5,
    attendancePercent: 75,
    status: 'average',
  },
  {
    id: '32',
    name: 'Nisha Patel',
    admissionNumber: 'ADM032',
    totalDays: 20,
    presentDays: 18,
    absentDays: 2,
    attendancePercent: 90,
    status: 'excellent',
  },
  {
    id: '33',
    name: 'Yash Tripathi',
    admissionNumber: 'ADM033',
    totalDays: 20,
    presentDays: 14,
    absentDays: 6,
    attendancePercent: 70,
    status: 'average',
  },
  {
    id: '34',
    name: 'Aisha Khan',
    admissionNumber: 'ADM034',
    totalDays: 20,
    presentDays: 19,
    absentDays: 1,
    attendancePercent: 95,
    status: 'excellent',
  },
  {
    id: '35',
    name: 'Sameer Bhattacharya',
    admissionNumber: 'ADM035',
    totalDays: 20,
    presentDays: 16,
    absentDays: 4,
    attendancePercent: 80,
    status: 'good',
  },
  {
    id: '36',
    name: 'Richa Bhat',
    admissionNumber: 'ADM036',
    totalDays: 20,
    presentDays: 17,
    absentDays: 3,
    attendancePercent: 85,
    status: 'good',
  },
  {
    id: '37',
    name: 'Mohit Singh',
    admissionNumber: 'ADM037',
    totalDays: 20,
    presentDays: 13,
    absentDays: 7,
    attendancePercent: 65,
    status: 'poor',
  },
  {
    id: '38',
    name: 'Garima Sharma',
    admissionNumber: 'ADM038',
    totalDays: 20,
    presentDays: 18,
    absentDays: 2,
    attendancePercent: 90,
    status: 'excellent',
  },
  {
    id: '39',
    name: 'Rahul Jain',
    admissionNumber: 'ADM039',
    totalDays: 20,
    presentDays: 19,
    absentDays: 1,
    attendancePercent: 95,
    status: 'excellent',
  },
  {
    id: '40',
    name: 'Sneha Chopra',
    admissionNumber: 'ADM040',
    totalDays: 20,
    presentDays: 16,
    absentDays: 4,
    attendancePercent: 80,
    status: 'good',
  },
];

export const AttendanceReportPage = () => {
  const { t } = useTranslation();
  const [selectedMonth, setSelectedMonth] = useState<string>('2026-03');
  const [students] = useState<StudentAttendance[]>(DUMMY_ATTENDANCE);
  const [viewMode, setViewMode] = useState<'summary' | 'sheet'>('summary');
  const [isSent, setIsSent] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleSendToAdmin = () => {
    setIsSent(true);
    // Show success message
    alert('✅ Attendance sheet sent to Admin successfully!');
    setTimeout(() => setIsSent(false), 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'average':
        return 'bg-yellow-100 text-yellow-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'excellent':
        return '✓ Excellent';
      case 'good':
        return '✓ Good';
      case 'average':
        return '⚠ Average';
      case 'poor':
        return '✗ Poor';
      default:
        return 'N/A';
    }
  };

  const exportToExcel = () => {
    const data = students.map(student => ({
      'Admission No.': student.admissionNumber,
      'Student Name': student.name,
      'Total Days': student.totalDays,
      'Present Days': student.presentDays,
      'Absent Days': student.absentDays,
      'Attendance %': student.attendancePercent,
      'Status': getStatusLabel(student.status),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Report');

    // Style the header row
    const headerStyle = {
      font: { bold: true, color: { rgb: 'FFFFFF' } },
      fill: { fgColor: { rgb: '0066CC' } },
      alignment: { horizontal: 'center', vertical: 'center' },
    };

    for (let i = 0; i < 7; i++) {
      const cell = worksheet[XLSX.utils.encode_cell({ r: 0, c: i })];
      if (cell) {
        cell.s = headerStyle;
      }
    }

    // Set column widths
    worksheet['!cols'] = [
      { wch: 15 },
      { wch: 20 },
      { wch: 12 },
      { wch: 13 },
      { wch: 12 },
      { wch: 15 },
      { wch: 15 },
    ];

    XLSX.writeFile(workbook, `Attendance_Report_${selectedMonth}.xlsx`);
  };

  const handlePrint = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Attendance Sheet</title>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
        </head>
        <body>
          <div id="pdf-content">
            <div style="text-align: center; margin-bottom: 6px;">
              <h2 style="margin: 0; font-size: 18px; font-weight: bold;">Cambridge International School</h2>
            </div>
            
            <div style="text-align: center; margin-bottom: 10px;">
              <h3 style="margin: 0; font-size: 13px; font-weight: bold;">Daily Attendance Record</h3>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px; border: 1px solid #000;">
              <tr style="border-bottom: 1px solid #000;">
                <td style="border-right: 1px solid #000; padding: 5px; width: 25%;">
                  <strong style="font-size: 9px;">CLASS</strong><br>
                  <span style="font-size: 11px; font-weight: bold;">Grade 8</span>
                </td>
                <td style="border-right: 1px solid #000; padding: 5px; width: 25%;">
                  <strong style="font-size: 9px;">SECTION</strong><br>
                  <span style="font-size: 11px; font-weight: bold;">A</span>
                </td>
                <td style="border-right: 1px solid #000; padding: 5px; width: 25%;">
                  <strong style="font-size: 9px;">SUBJECT</strong><br>
                  <span style="font-size: 11px; font-weight: bold;">Mathematics</span>
                </td>
                <td style="padding: 5px; width: 25%;">
                  <strong style="font-size: 9px;">DATE</strong><br>
                  <span style="font-size: 11px; font-weight: bold;">${new Date(selectedMonth).toLocaleDateString('en-IN')}</span>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="border-right: 1px solid #000; padding: 5px;">
                  <strong style="font-size: 9px;">TEACHER NAME</strong><br>
                  <span style="font-size: 11px; font-weight: bold;">Ravi Krishnamurthy</span>
                </td>
              </tr>
            </table>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #000;">
              <thead>
                <tr style="background: #333; color: white;">
                  <th style="border: 1px solid #000; padding: 4px; width: 10%; font-size: 9px;">S.No</th>
                  <th style="border: 1px solid #000; padding: 4px; width: 50%; font-size: 9px;">Student Name</th>
                  <th style="border: 1px solid #000; padding: 4px; width: 20%; font-size: 9px;">Attendance</th>
                  <th style="border: 1px solid #000; padding: 4px; width: 20%; font-size: 9px;">Remarks</th>
                </tr>
              </thead>
              <tbody>
                <!-- Left Column -->
                <tr><td colspan="4" style="padding: 0; border: none;"><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                  <table style="width: 100%; border-collapse: collapse; border: 1px solid #000; font-size: 9px;">
                    <tbody>
                      ${students.slice(0, Math.ceil(students.length / 2)).map((student, idx) => `
                        <tr style="background: ${idx % 2 === 0 ? '#fff' : '#f9f9f9'};">
                          <td style="border: 1px solid #000; padding: 3px; width: 10%; text-align: center; font-size: 8px;">${idx + 1}</td>
                          <td style="border: 1px solid #000; padding: 3px; width: 50%; font-size: 8px;">${student.name.substring(0, 20)}</td>
                          <td style="border: 1px solid #000; padding: 3px; width: 20%; text-align: center; font-size: 8px; font-weight: bold;">${student.attendancePercent >= 80 ? 'P' : 'A'}</td>
                          <td style="border: 1px solid #000; padding: 3px; width: 20%; font-size: 8px;"></td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                  <table style="width: 100%; border-collapse: collapse; border: 1px solid #000; font-size: 9px;">
                    <tbody>
                      ${students.slice(Math.ceil(students.length / 2)).map((student, idx) => `
                        <tr style="background: ${idx % 2 === 0 ? '#fff' : '#f9f9f9'};">
                          <td style="border: 1px solid #000; padding: 3px; width: 10%; text-align: center; font-size: 8px;">${Math.ceil(students.length / 2) + idx + 1}</td>
                          <td style="border: 1px solid #000; padding: 3px; width: 50%; font-size: 8px;">${student.name.substring(0, 20)}</td>
                          <td style="border: 1px solid #000; padding: 3px; width: 20%; text-align: center; font-size: 8px; font-weight: bold;">${student.attendancePercent >= 80 ? 'P' : 'A'}</td>
                          <td style="border: 1px solid #000; padding: 3px; width: 20%; font-size: 8px;"></td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div></td></tr>
              </tbody>
            </table>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="border: 2px solid #000; padding: 10px; text-align: center; width: 33.33%;">
                  <div style="font-size: 18px; font-weight: bold;">
                    ${students.filter(s => s.attendancePercent >= 80).length}
                  </div>
                  <div style="font-size: 10px; font-weight: bold; margin-top: 3px;">Total Present</div>
                </td>
                <td style="border: 2px solid #000; padding: 10px; text-align: center; width: 33.33%;">
                  <div style="font-size: 18px; font-weight: bold;">
                    ${students.filter(s => s.attendancePercent < 80).length}
                  </div>
                  <div style="font-size: 10px; font-weight: bold; margin-top: 3px;">Total Absent</div>
                </td>
                <td style="border: 2px solid #000; padding: 10px; text-align: center; width: 33.33%;">
                  <div style="font-size: 18px; font-weight: bold;">
                    ${students.length}
                  </div>
                  <div style="font-size: 10px; font-weight: bold; margin-top: 3px;">Total Students</div>
                </td>
              </tr>
            </table>
            
            <table style="width: 100%; margin-top: 15px;">
              <tr>
                <td style="width: 50%; text-align: center;">
                  <div style="border-bottom: 2px solid #000; height: 30px; margin-bottom: 4px;"></div>
                  <div style="font-size: 9px; font-weight: bold;">Signature of the Teacher</div>
                </td>
                <td style="width: 50%; text-align: center;">
                  <div style="border-bottom: 2px solid #000; height: 30px; margin-bottom: 4px;"></div>
                  <div style="font-size: 9px; font-weight: bold;">Admin Approval Sign</div>
                </td>
              </tr>
            </table>
          </div>
          
          <script>
            const element = document.getElementById('pdf-content');
            const opt = {
              margin: 10,
              filename: 'Attendance_Sheet_${selectedMonth}.pdf',
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { scale: 2 },
              jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
            };
            html2pdf().set(opt).from(element).save();
          </script>
        </body>
      </html>
    `;
    
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    }
  };

  const averageAttendance = Math.round(
    students.reduce((sum, s) => sum + s.attendancePercent, 0) / students.length
  );

  const excellentCount = students.filter(s => s.status === 'excellent').length;
  const poorCount = students.filter(s => s.status === 'poor').length;

  return (
    <PageWrapper title="Attendance Report">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <FileText size={32} className="text-blue-600" />
                Attendance Report
              </h1>
              <p className="text-slate-600 mt-2">Class 8A - March 2026</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={exportToExcel}
                variant="gradient-blue"
                className="flex items-center gap-2"
              >
                <Download size={18} />
                Export to Excel
              </Button>
              <Button
                onClick={handlePrint}
                variant="secondary"
                className="flex items-center gap-2"
              >
                <Printer size={18} />
                Print
              </Button>
            </div>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex gap-2 sticky top-0 z-10 bg-white p-2 rounded-lg border border-gray-200">
          <button
            onClick={() => setViewMode('summary')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              viewMode === 'summary'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📊 Summary Report
          </button>
          <button
            onClick={() => setViewMode('sheet')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              viewMode === 'sheet'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📋 Attendance Sheet
          </button>
        </div>

        {viewMode === 'sheet' ? (
          /* ===== ATTENDANCE SHEET FORMAT ===== */
          <Card className="p-8 bg-white">
            {/* Header */}
            <div className="text-center mb-6 pb-6 border-b-2 border-gray-300">
              <h2 className="text-2xl font-bold text-gray-900">Cambridge International School</h2>
              <p className="text-gray-600 mt-1">Daily Attendance Record</p>
            </div>

            {/* Class Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">Class</label>
                <p className="text-lg font-bold text-gray-900">Grade 8</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">Section</label>
                <p className="text-lg font-bold text-gray-900">A</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">Subject</label>
                <p className="text-lg font-bold text-gray-900">Mathematics</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">Date</label>
                <p className="text-lg font-bold text-gray-900">{new Date(selectedMonth).toLocaleDateString()}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 uppercase">Teacher Name</label>
                <p className="text-lg font-bold text-gray-900">Ravi Krishnamurthy</p>
              </div>
            </div>

            {/* Attendance Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="border border-gray-300 p-3 text-left font-bold w-12">S.No</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Name of Student</th>
                    <th className="border border-gray-300 p-3 text-center font-bold w-20">Attendance</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, idx) => (
                    <tr key={student.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 p-3 text-center font-semibold">{idx + 1}</td>
                      <td className="border border-gray-300 p-3 font-medium">{student.name}</td>
                      <td className="border border-gray-300 p-3 text-center">
                        <span className={`inline-block px-3 py-1 rounded-md font-bold ${
                          student.attendancePercent >= 80
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {student.attendancePercent >= 80 ? 'Present' : 'Absent'}
                        </span>
                      </td>
                      <td className="border border-gray-300 p-3 text-gray-600">
                        <input
                          type="text"
                          placeholder="Add remarks"
                          className="w-full px-2 py-1 border border-gray-200 rounded text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(students.reduce((sum, s) => sum + s.presentDays, 0) / students.length)}
                </p>
                <p className="text-xs font-semibold text-gray-600 uppercase">Total Present</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {Math.round(students.reduce((sum, s) => sum + s.absentDays, 0) / students.length)}
                </p>
                <p className="text-xs font-semibold text-gray-600 uppercase">Total Absent</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-600">{students.length}</p>
                <p className="text-xs font-semibold text-gray-600 uppercase">Total Students</p>
              </div>
            </div>

            {/* Signature Space */}
            <div className="grid grid-cols-2 gap-12 pt-8 border-t-2 border-gray-300">
              <div className="text-center">
                <div className="h-16 border-b-2 border-gray-400 mb-2"></div>
                <p className="text-sm font-semibold text-gray-900">Signature of the Teacher</p>
              </div>
              <div className="text-center">
                <div className="h-16 border-b-2 border-gray-400 mb-2"></div>
                <p className="text-sm font-semibold text-gray-900">Class Coordinator's Sign</p>
              </div>
            </div>

            {/* Print Button */}
            <div className="mt-8 flex gap-3 flex-wrap">
              <button
                onClick={() => window.print()}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-lg transition-all"
              >
                🖨️ Print Sheet
              </button>
              <button
                onClick={handleSendToAdmin}
                disabled={isSent}
                className={`px-6 py-3 font-semibold rounded-lg shadow-lg transition-all flex items-center gap-2 ${
                  isSent
                    ? 'bg-green-600 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                <Send size={18} />
                {isSent ? '✓ Sent to Admin' : 'Send to Admin'}
              </button>
              <button
                onClick={() => setViewMode('summary')}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
              >
                ← Back to Summary
              </button>
            </div>
          </Card>
        ) : (
          /* ===== SUMMARY REPORT VIEW ===== */
          <>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card className="p-4">
            <p className="text-xs text-slate-600 uppercase tracking-wide font-medium mb-2">
              Average Attendance
            </p>
            <p className="text-2xl md:text-3xl font-bold text-blue-600">{averageAttendance}%</p>
            <p className="text-xs text-slate-500 mt-2">School Average</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-slate-600 uppercase tracking-wide font-medium mb-2">
              Total Students
            </p>
            <p className="text-2xl md:text-3xl font-bold text-slate-900">{students.length}</p>
            <p className="text-xs text-slate-500 mt-2">Registered</p>
          </Card>
          <Card className="p-4 border-l-4 border-l-green-500">
            <p className="text-xs text-slate-600 uppercase tracking-wide font-medium mb-2">
              Excellent
            </p>
            <p className="text-2xl md:text-3xl font-bold text-green-600">{excellentCount}</p>
            <p className="text-xs text-slate-500 mt-2">Students</p>
          </Card>
          <Card className="p-4 border-l-4 border-l-red-500">
            <p className="text-xs text-slate-600 uppercase tracking-wide font-medium mb-2">
              Needs Attention
            </p>
            <p className="text-2xl md:text-3xl font-bold text-red-600">{poorCount}</p>
            <p className="text-xs text-slate-500 mt-2">Students</p>
          </Card>
        </div>

        {/* Month/Period Filter */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-blue-600" />
            <label className="text-sm font-medium text-slate-700">Report Period:</label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </Card>

        {/* Attendance Table */}
        <Card variant="elevated" ref={printRef}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800 text-white border border-gray-300">
                  <th className="border border-gray-300 px-4 py-3 text-left font-bold">Admission No.</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-bold">Student Name</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-bold">Total Days</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-bold">Present</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-bold">Absent</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-bold">Attendance %</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr
                    key={student.id}
                    className="border border-gray-300 hover:bg-gray-100"
                  >
                    <td className="border border-gray-300 px-4 py-3">
                      {student.admissionNumber}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      {student.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      {student.totalDays}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center font-semibold">
                      {student.presentDays}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center font-semibold">
                      {student.absentDays}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center font-semibold">
                      {student.attendancePercent}%
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      {getStatusLabel(student.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Alert for low attendance */}
        {poorCount > 0 && (
          <Card className="bg-red-50 border border-red-200 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">
                  {poorCount} student{poorCount > 1 ? 's' : ''} need{poorCount > 1 ? '' : 's'} attention
                </p>
                <p className="text-sm text-red-700 mt-1">
                  Attendance below 70% requires immediate parent contact and intervention.
                </p>
              </div>
            </div>
          </Card>
        )}
        </>
        )}

        {/* Footer Info */}
        <Card className="bg-slate-50 p-4">
          <p className="text-xs text-slate-600">
            <span className="font-semibold">Report Generated:</span> {new Date().toLocaleDateString('en-IN')} at{' '}
            {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="text-xs text-slate-500 mt-2">
            This is a SATS-friendly report generated from the Student Management System. Use Print or Export to
            share with administration.
          </p>
        </Card>
      </div>
    </PageWrapper>
  );
};
