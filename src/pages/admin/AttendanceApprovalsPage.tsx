import React, { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { FileText, Download, Eye, Check, Clock, Trash2 } from 'lucide-react';

interface SubmittedAttendance {
  id: string;
  class: string;
  section: string;
  subject: string;
  teacherName: string;
  submittedDate: string;
  submittedTime: string;
  status: 'pending' | 'approved';
  studentCount: number;
}

const DUMMY_SUBMISSIONS: SubmittedAttendance[] = [
  {
    id: '1',
    class: 'Grade 8',
    section: 'A',
    subject: 'Mathematics',
    teacherName: 'Ravi Krishnamurthy',
    submittedDate: '22/3/2026',
    submittedTime: '10:30 AM',
    status: 'pending',
    studentCount: 6,
  },
  {
    id: '2',
    class: 'Grade 8',
    section: 'B',
    subject: 'English',
    teacherName: 'Anitha Suresh',
    submittedDate: '22/3/2026',
    submittedTime: '09:15 AM',
    status: 'approved',
    studentCount: 5,
  },
  {
    id: '3',
    class: 'Grade 9',
    section: 'A',
    subject: 'Science',
    teacherName: 'Dr. Vikram Patel',
    submittedDate: '21/3/2026',
    submittedTime: '02:45 PM',
    status: 'approved',
    studentCount: 7,
  },
  {
    id: '4',
    class: 'Grade 10',
    section: 'C',
    subject: 'History',
    teacherName: 'Ms. Priya Singh',
    submittedDate: '21/3/2026',
    submittedTime: '01:20 PM',
    status: 'pending',
    studentCount: 8,
  },
];

export const AttendanceApprovalsPage = () => {
  const [submissions, setSubmissions] = useState<SubmittedAttendance[]>(DUMMY_SUBMISSIONS);
  const [selectedSubmission, setSelectedSubmission] = useState<SubmittedAttendance | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Get today's date - currently 22/3/2026
  const todayDate = '22/3/2026';
  
  // Filter submissions to only show today's submissions
  const todaySubmissions = submissions.filter(s => s.submittedDate === todayDate);

  const handleApprove = (id: string) => {
    setSubmissions(submissions.map(s => s.id === id ? { ...s, status: 'approved' } : s));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all today\'s submissions? This action cannot be undone.')) {
      setSubmissions(submissions.filter(s => s.submittedDate !== todayDate));
    }
  };

  const handlePrint = (submission: SubmittedAttendance) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Attendance Sheet</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: Arial, sans-serif; padding: 10px; background: white; }
              .container { max-width: 100%; margin: 0 auto; }
              
              .school-header { text-align: center; margin-bottom: 5px; }
              .school-header h1 { font-size: 16px; font-weight: bold; color: #000; }
              
              .title { text-align: center; margin-bottom: 10px; }
              .title h2 { font-size: 13px; font-weight: bold; color: #000; margin-bottom: 5px; }
              
              .details-box { border: 2px solid #000; margin-bottom: 10px; padding: 0; }
              .details-row { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; border-bottom: 1px solid #000; }
              .detail-item { border-right: 1px solid #000; padding: 4px 6px; }
              .detail-item.last { border-right: none; }
              .detail-label { font-size: 9px; font-weight: bold; }
              .detail-value { font-size: 11px; font-weight: bold; margin-top: 2px; }
              
              .two-column-table { page-break-inside: avoid; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
              .column-section { border: 1px solid #ccc; }
              .column-section table { width: 100%; border-collapse: collapse; }
              .column-section th { background: #333; color: white; border: 1px solid #000; padding: 2px 3px; font-size: 9px; font-weight: bold; }
              .column-section td { border: 1px solid #ccc; padding: 2px 3px; font-size: 9px; }
              
              .attendance-table { width: 100%; border-collapse: collapse; margin-bottom: 10px; border: 1px solid #000; }
              .attendance-table thead tr { background: #333; color: white; }
              .attendance-table th { border: 1px solid #000; padding: 6px; font-size: 11px; font-weight: bold; }
              .attendance-table td { border: 1px solid #000; padding: 6px; font-size: 11px; }
              
              .summary { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 10px 0; }
              .summary-item { text-align: center; border: 2px solid #000; padding: 10px; }
              .summary-number { font-size: 18px; font-weight: bold; }
              .summary-label { font-size: 10px; font-weight: bold; margin-top: 3px; }
              
              .signature-section { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px; }
              .signature-item { text-align: center; }
              .signature-line { border-bottom: 2px solid #000; height: 40px; margin-bottom: 5px; }
              .signature-label { font-size: 10px; font-weight: bold; }
              
              @media print {
                html, body { margin: 0; padding: 0; width: 100%; height: 100%; }
                .container { page-break-after: avoid; }
              }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="school-header">
                <h1>Cambridge International School</h1>
              </div>
              
              <div class="title">
                <h2>Daily Attendance Record</h2>
              </div>
              
              <div class="details-box">
                <div class="details-row">
                  <div class="detail-item">
                    <div class="detail-label">CLASS</div>
                    <div class="detail-value">${submission.class}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">SECTION</div>
                    <div class="detail-value">${submission.section}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">SUBJECT</div>
                    <div class="detail-value">${submission.subject}</div>
                  </div>
                  <div class="detail-item last">
                    <div class="detail-label">DATE</div>
                    <div class="detail-value">${submission.submittedDate}</div>
                  </div>
                </div>
                <div class="details-row" style="grid-template-columns: 1fr 1fr;">
                  <div class="detail-item">
                    <div class="detail-label">TEACHER NAME</div>
                    <div class="detail-value">${submission.teacherName}</div>
                  </div>
                  <div class="detail-item last">
                    <div class="detail-label">SUBMITTED AT</div>
                    <div class="detail-value">${submission.submittedTime}</div>
                  </div>
                </div>
              </div>
              
              <style>
                .two-column-table { page-break-inside: avoid; display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
                .column-section { border: 1px solid #ccc; font-size: 11px; }
                .column-section table { width: 100%; border-collapse: collapse; }
                .column-section th { background: #333; color: white; border: 1px solid #000; padding: 4px; font-size: 10px; font-weight: bold; }
                .column-section td { border: 1px solid #ccc; padding: 3px; font-size: 10px; }
              </style>
              
              <div class="two-column-table">
                <div class="column-section">
                  <table>
                    <thead>
                      <tr>
                        <th style="width: 8%;">S.No</th>
                        <th style="width: 50%;">Name of Student</th>
                        <th style="width: 20%;">Attendance</th>
                        <th style="width: 22%;">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>1</td><td>Arjun Kumar Singh</td><td>Present</td><td></td></tr>
                      <tr><td>2</td><td>Priya Sharma</td><td>Present</td><td></td></tr>
                      <tr><td>3</td><td>Ravi Patel</td><td>Absent</td><td></td></tr>
                      <tr><td>4</td><td>Anjali Verma</td><td>Present</td><td></td></tr>
                      <tr><td>5</td><td>Deepak Gupta</td><td>Present</td><td></td></tr>
                      <tr><td>6</td><td>Neha Singh</td><td>Absent</td><td></td></tr>
                      <tr><td>7</td><td>Vikram Reddy</td><td>Present</td><td></td></tr>
                      <tr><td>8</td><td>Pooja Desai</td><td>Present</td><td></td></tr>
                      <tr><td>9</td><td>Aditya Nair</td><td>Present</td><td></td></tr>
                      <tr><td>10</td><td>Harsh Jain</td><td>Absent</td><td></td></tr>
                      <tr><td>11</td><td>Simran Kaur</td><td>Present</td><td></td></tr>
                      <tr><td>12</td><td>Nikhil Rao</td><td>Present</td><td></td></tr>
                      <tr><td>13</td><td>Meera Nambiar</td><td>Present</td><td></td></tr>
                      <tr><td>14</td><td>Samir Khan</td><td>Absent</td><td></td></tr>
                      <tr><td>15</td><td>Divya Iyer</td><td>Present</td><td></td></tr>
                      <tr><td>16</td><td>Rohan Malhotra</td><td>Present</td><td></td></tr>
                      <tr><td>17</td><td>Tara Mishra</td><td>Present</td><td></td></tr>
                      <tr><td>18</td><td>Varun Chopra</td><td>Absent</td><td></td></tr>
                      <tr><td>19</td><td>Isha Bhatia</td><td>Present</td><td></td></tr>
                      <tr><td>20</td><td>Karan Shetty</td><td>Present</td><td></td></tr>
                    </tbody>
                  </table>
                </div>
                
                <div class="column-section">
                  <table>
                    <thead>
                      <tr>
                        <th style="width: 8%;">S.No</th>
                        <th style="width: 50%;">Name of Student</th>
                        <th style="width: 20%;">Attendance</th>
                        <th style="width: 22%;">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>21</td><td>Ananya Chatterjee</td><td>Present</td><td></td></tr>
                      <tr><td>22</td><td>Abhishek Sengupta</td><td>Absent</td><td></td></tr>
                      <tr><td>23</td><td>Shreya Bhatt</td><td>Present</td><td></td></tr>
                      <tr><td>24</td><td>Arun Krishnan</td><td>Present</td><td></td></tr>
                      <tr><td>25</td><td>Nisha Pillai</td><td>Present</td><td></td></tr>
                      <tr><td>26</td><td>Sanjay Dixit</td><td>Absent</td><td></td></tr>
                      <tr><td>27</td><td>Ritika Saxena</td><td>Present</td><td></td></tr>
                      <tr><td>28</td><td>Gaurav Singh</td><td>Present</td><td></td></tr>
                      <tr><td>29</td><td>Aisha Kapoor</td><td>Present</td><td></td></tr>
                      <tr><td>30</td><td>Nirvaan Tiwari</td><td>Absent</td><td></td></tr>
                      <tr><td>31</td><td>Divyam Sharma</td><td>Present</td><td></td></tr>
                      <tr><td>32</td><td>Poorna Pandey</td><td>Present</td><td></td></tr>
                      <tr><td>33</td><td>Yashant Sinha</td><td>Present</td><td></td></tr>
                      <tr><td>34</td><td>Sakshi Mhatre</td><td>Absent</td><td></td></tr>
                      <tr><td>35</td><td>Anirudh Menon</td><td>Present</td><td></td></tr>
                      <tr><td>36</td><td>Kanika Bose</td><td>Present</td><td></td></tr>
                      <tr><td>37</td><td>Siddharth Das</td><td>Present</td><td></td></tr>
                      <tr><td>38</td><td>Natasha Singh</td><td>Absent</td><td></td></tr>
                      <tr><td>39</td><td>Mehul Sharma</td><td>Present</td><td></td></tr>
                      <tr><td>40</td><td>Priyanka Dutta</td><td>Present</td><td></td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-top: 15px; margin-bottom: 20px;">
                <div style="text-align: center; border: 2px solid #000; padding: 10px;">
                  <div style="font-size: 20px; font-weight: bold;">30</div>
                  <div style="font-size: 11px; font-weight: bold; margin-top: 5px;">Total Present</div>
                </div>
                <div style="text-align: center; border: 2px solid #000; padding: 10px;">
                  <div style="font-size: 20px; font-weight: bold;">10</div>
                  <div style="font-size: 11px; font-weight: bold; margin-top: 5px;">Total Absent</div>
                </div>
                <div style="text-align: center; border: 2px solid #000; padding: 10px;">
                  <div style="font-size: 20px; font-weight: bold;">40</div>
                  <div style="font-size: 11px; font-weight: bold; margin-top: 5px;">Total Students</div>
                </div>
              </div>
              
              <div class="signature-section">
                <div class="signature-item">
                  <div class="signature-line"></div>
                  <div class="signature-label">Teacher Signature</div>
                </div>
                <div class="signature-item">
                  <div class="signature-line"></div>
                  <div class="signature-label">Admin Approval Sign</div>
                </div>
              </div>
            </div>
            
            <script>
              window.print();
              window.onafterprint = function() { window.close(); };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const pendingCount = todaySubmissions.filter(s => s.status === 'pending').length;
  const approvedCount = todaySubmissions.filter(s => s.status === 'approved').length;

  return (
    <PageWrapper title="Attendance Approvals">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <FileText size={32} className="text-blue-600" />
                Attendance Approvals
              </h1>
              <p className="text-slate-600 mt-2">Today's submissions - {todayDate}</p>
            </div>
            <button
              onClick={handleClearAll}
              disabled={todaySubmissions.length === 0}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg transition-all flex items-center gap-2"
            >
              <Trash2 size={18} />
              Clear All
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-xs text-slate-600 uppercase font-medium mb-2">Pending</p>
            <p className="text-3xl font-bold text-amber-600">{pendingCount}</p>
            <p className="text-xs text-slate-500 mt-2">Awaiting review</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-slate-600 uppercase font-medium mb-2">Approved</p>
            <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
            <p className="text-xs text-slate-500 mt-2">Signed off</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-slate-600 uppercase font-medium mb-2">Total</p>
            <p className="text-3xl font-bold text-blue-600">{todaySubmissions.length}</p>
            <p className="text-xs text-slate-500 mt-2">Today's Submissions</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-slate-600 uppercase font-medium mb-2">Classes</p>
            <p className="text-3xl font-bold text-slate-900">{new Set(todaySubmissions.map(s => s.class)).size}</p>
            <p className="text-xs text-slate-500 mt-2">Reporting Today</p>
          </Card>
        </div>

        {/* Submissions List */}
        {todaySubmissions.length === 0 ? (
          <Card className="p-12 text-center bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-dashed border-gray-300">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No submissions yet</h3>
            <p className="text-gray-600">All submissions for today have been cleared or no submissions have been made yet.</p>
            <p className="text-gray-500 text-sm mt-3">Check back tomorrow for new submissions.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {todaySubmissions.map(submission => (
            <Card key={submission.id} className="p-4 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-900">
                      {submission.class} - Section {submission.section}
                    </h3>
                    <Badge className={submission.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}>
                      {submission.status === 'pending' ? (
                        <><Clock size={14} className="mr-1" /> Pending</>
                      ) : (
                        <><Check size={14} className="mr-1" /> Approved</>
                      )}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                    <div>
                      <span className="font-semibold">Subject:</span> {submission.subject}
                    </div>
                    <div>
                      <span className="font-semibold">Teacher:</span> {submission.teacherName}
                    </div>
                    <div>
                      <span className="font-semibold">Students:</span> {submission.studentCount}
                    </div>
                    <div>
                      <span className="font-semibold">Submitted:</span> {submission.submittedDate} {submission.submittedTime}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setSelectedSubmission(submission);
                      setShowPreview(true);
                    }}
                    variant="outline"
                    className="gap-2"
                  >
                    <Eye size={16} />
                    Preview
                  </Button>
                  <Button
                    onClick={() => handlePrint(submission)}
                    variant="outline"
                    className="gap-2"
                  >
                    <Download size={16} />
                    Print
                  </Button>
                  {submission.status === 'pending' && (
                    <Button
                      onClick={() => handleApprove(submission.id)}
                      className="bg-green-600 hover:bg-green-700 text-white gap-2"
                    >
                      <Check size={16} />
                      Approve
                    </Button>
                  )}
                </div>
              </div>
            </Card>
            ))}
          </div>
        )}

        {/* Preview Modal */}
        {showPreview && selectedSubmission && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl max-h-screen overflow-y-auto p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Attendance Sheet Preview</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="text-center mb-6 pb-6 border-b-2">
                <h3 className="text-2xl font-bold">Cambridge International School</h3>
                <p className="text-gray-600 mt-1">Daily Attendance Record</p>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded">
                <div>
                  <p className="text-xs font-bold text-gray-600">CLASS</p>
                  <p className="text-lg font-bold">{selectedSubmission.class}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-600">SECTION</p>
                  <p className="text-lg font-bold">{selectedSubmission.section}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-600">SUBJECT</p>
                  <p className="text-lg font-bold">{selectedSubmission.subject}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-600">DATE</p>
                  <p className="text-lg font-bold">{selectedSubmission.submittedDate}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-bold text-gray-700">TEACHER: {selectedSubmission.teacherName}</p>
              </div>

              <div className="text-center">
                <p className="text-gray-600">Attendance sheet preview content</p>
              </div>

              <div className="flex gap-3 mt-8">
                <Button
                  onClick={() => handlePrint(selectedSubmission)}
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                >
                  <Download size={16} />
                  Print & Sign
                </Button>
                <Button
                  onClick={() => setShowPreview(false)}
                  variant="outline"
                >
                  Close
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
