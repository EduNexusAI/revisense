import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Upload, Plus, Trash2, TrendingUp, Award, X, FileUp, BarChart3, Download } from 'lucide-react';
import { showToast } from '../../utils/toast';

// Dummy exam data
const DUMMY_MARKS_DATA = [
  { id: '1', name: 'Arjun Singh', hindi: 85, english: 78, math: 92, science: 88, social: 80, avg: 84.6 },
  { id: '2', name: 'Priya Sharma', hindi: 88, english: 85, math: 90, science: 92, social: 87, avg: 88.4 },
  { id: '3', name: 'Ravi Kumar', hindi: 72, english: 68, math: 75, science: 70, social: 73, avg: 71.6 },
  { id: '4', name: 'Sneha Patel', hindi: 91, english: 89, math: 94, science: 91, social: 90, avg: 91.0 },
  { id: '5', name: 'Vikram Desai', hindi: 78, english: 82, math: 85, science: 81, social: 79, avg: 81.0 },
  { id: '6', name: 'Divya Singh', hindi: 86, english: 84, math: 88, science: 89, social: 85, avg: 86.4 },
];

const SUBJECTS = ['Hindi', 'English', 'Math', 'Science', 'Social'];

const PERFORMANCE_TREND = [
  { exam: 'Midterm', avg: 78.5 },
  { exam: 'Unit Test 1', avg: 80.2 },
  { exam: 'Unit Test 2', avg: 81.8 },
  { exam: 'Pre-Final', avg: 83.7 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export const MarksUploadPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'manual' | 'upload' | 'analytics'>('manual');
  const [marks, setMarks] = useState(DUMMY_MARKS_DATA);
  const [exam, setExam] = useState('Pre-Final');
  const [selectedSubject, setSelectedSubject] = useState('Math');
  const [editMode, setEditMode] = useState(false);
  const [tempMarks, setTempMarks] = useState(DUMMY_MARKS_DATA);
  
  // Excel Upload State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // =====================
  // EXCEL UPLOAD HANDLERS
  // =====================
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.match(/\.(csv|xlsx|xls)$/i)) {
      showToast('Please upload a CSV or Excel file', 'warning');
      return;
    }

    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        
        const data = lines.slice(1).filter(line => line.trim()).map(line => {
          const values = line.split(',').map(v => v.trim());
          const row: any = {};
          headers.forEach((header, index) => {
            row[header] = isNaN(Number(values[index])) ? values[index] : Number(values[index]);
          });
          return row;
        });

        setPreviewData(data);
        setShowPreview(true);
        showToast(`File loaded successfully! ${data.length} records found`, 'success');
      } catch (error) {
        showToast('Error processing file', 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleImportFromExcel = () => {
    if (previewData.length === 0) {
      showToast('No data to import', 'warning');
      return;
    }

    try {
      const importedMarks = previewData.map((row, index) => {
        const avg = SUBJECTS.reduce((sum, subj) => sum + (Number(row[subj.toLowerCase()]) || 0), 0) / SUBJECTS.length;
        return {
          id: Date.now().toString() + index,
          name: row.name || row.student || `Student ${index + 1}`,
          hindi: Number(row.hindi) || 0,
          english: Number(row.english) || 0,
          math: Number(row.math) || 0,
          science: Number(row.science) || 0,
          social: Number(row.social) || 0,
          avg: isNaN(avg) ? 0 : avg,
        };
      });

      setMarks([...marks, ...importedMarks]);
      setShowPreview(false);
      setUploadedFile(null);
      setPreviewData([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
      showToast(`Successfully imported ${importedMarks.length} students!`, 'success');
    } catch (error) {
      showToast('Error importing data', 'error');
    }
  };

  // =====================
  // ANALYTICS FUNCTIONS
  // =====================
  const getSubjectAverages = () => {
    return SUBJECTS.map(subject => ({
      name: subject,
      average: (marks.reduce((sum, m) => sum + Number(m[subject.toLowerCase() as keyof typeof m]), 0) / marks.length).toFixed(1),
    }));
  };

  const getGradeDistribution = () => {
    const grades = { 'A (90+)': 0, 'B (80-89)': 0, 'C (70-79)': 0, 'D (60-69)': 0, 'F (<60)': 0 };
    marks.forEach(m => {
      if (m.avg >= 90) grades['A (90+)']++;
      else if (m.avg >= 80) grades['B (80-89)']++;
      else if (m.avg >= 70) grades['C (70-79)']++;
      else if (m.avg >= 60) grades['D (60-69)']++;
      else grades['F (<60)']++;
    });
    return Object.entries(grades).map(([name, value]) => ({ name, value }));
  };

  const classAverage = (marks.reduce((sum, m) => sum + m.avg, 0) / marks.length).toFixed(1);
  const highestScore = Math.max(...marks.map(m => m.avg)).toFixed(1);
  const lowestScore = Math.min(...marks.map(m => m.avg)).toFixed(1);

  return (
    <PageWrapper title={t('marks')} icon={<Award className="w-6 h-6" />}>
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
        <Card variant="outlined" className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-green-600">{classAverage}%</div>
          <p className="text-xs md:text-sm text-gray-600 mt-1">Class Average</p>
        </Card>
        <Card variant="outlined" className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-blue-600">{highestScore}%</div>
          <p className="text-xs md:text-sm text-gray-600 mt-1">Highest Score</p>
        </Card>
        <Card variant="outlined" className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-orange-600">{lowestScore}%</div>
          <p className="text-xs md:text-sm text-gray-600 mt-1">Lowest Score</p>
        </Card>
      </div>

      {/* Tab Navigation - Professional & Responsive */}
      <div className="flex gap-2 md:gap-4 mb-6 border-b-2 border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('manual')}
          className={`px-4 md:px-6 py-3 font-semibold text-sm md:text-base transition-all whitespace-nowrap border-b-2 flex items-center gap-2 ${
            activeTab === 'manual'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          }`}
        >
          <Plus className="w-5 h-5" />
          Manual Entry
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 md:px-6 py-3 font-semibold text-sm md:text-base transition-all whitespace-nowrap border-b-2 flex items-center gap-2 ${
            activeTab === 'upload'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          }`}
        >
          <FileUp className="w-5 h-5" />
          Excel Upload
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 md:px-6 py-3 font-semibold text-sm md:text-base transition-all whitespace-nowrap border-b-2 flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          Analytics
        </button>
      </div>

      {/* ===================================
          MANUAL ENTRY TAB
          =================================== */}
      {activeTab === 'manual' && (
        <div className="space-y-6">
          {/* Subject-wise Marks Entry */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">📝 Marks Entry by Subject</h3>
              <div className="flex gap-2">
                {!editMode ? (
                  <Button
                    onClick={() => {
                      setTempMarks([...marks]);
                      setEditMode(true);
                    }}
                    variant="premium"
                    className="flex items-center gap-1 md:gap-2 text-xs md:text-base px-2 md:px-4 py-2 md:py-2"
                  >
                    <Plus className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">Edit Marks</span>
                    <span className="sm:hidden">Edit</span>
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        setMarks([...tempMarks]);
                        setEditMode(false);
                        showToast('All marks saved successfully!', 'success');
                      }}
                      variant="premium"
                      className="flex items-center gap-1 md:gap-2 text-xs md:text-base px-2 md:px-4 py-2 md:py-2"
                    >
                      <Download className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="hidden sm:inline">Save All</span>
                      <span className="sm:hidden">Save</span>
                    </Button>
                    <Button
                      onClick={() => {
                        setTempMarks([...marks]);
                        setEditMode(false);
                      }}
                      variant="outline"
                      className="flex items-center gap-1 md:gap-2 text-xs md:text-base px-2 md:px-4 py-2 md:py-2"
                    >
                      <span className="hidden sm:inline">Cancel</span>
                      <span className="sm:hidden">✕</span>
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            {editMode && (
              <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="text-sm text-blue-800 font-semibold">✏️ Edit Mode Active - Enter marks and click "Save All" when done</p>
              </div>
            )}

            {/* Subject Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Select Subject to Enter Marks *</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                disabled={!editMode}
                className={`w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-semibold ${
                  !editMode ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : ''
                }`}
              >
                {SUBJECTS.map((subj) => (
                  <option key={subj} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>
            </div>

            {/* Two Column Table - Mobile Friendly */}
            <div className="overflow-y-auto max-h-96 border border-gray-300 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold w-1/2">Student Name</th>
                    <th className="px-4 py-3 text-center font-semibold w-1/2">
                      {selectedSubject} Marks {!editMode && '(View)'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(editMode ? tempMarks : marks).map((student) => {
                    const subjKey = selectedSubject.toLowerCase() as keyof typeof student;
                    const currentMarks = student[subjKey];
                    return (
                      <tr key={student.id} className="border-b border-gray-200 hover:bg-blue-50 transition">
                        <td className="px-4 py-3 font-medium text-gray-800">{student.name}</td>
                        <td className="px-4 py-3">
                          {editMode ? (
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={currentMarks}
                              onChange={(e) => {
                                const newValue = e.target.value ? Number(e.target.value) : 0;
                                const updatedMarks = tempMarks.map(m => {
                                  if (m.id === student.id) {
                                    const updated = { ...m, [subjKey]: newValue };
                                    const avg = SUBJECTS.reduce((sum, subj) => sum + (updated[subj.toLowerCase() as keyof typeof updated] || 0), 0) / SUBJECTS.length;
                                    return { ...updated, avg };
                                  }
                                  return m;
                                });
                                setTempMarks(updatedMarks);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center font-semibold"
                              placeholder="0-100"
                            />
                          ) : (
                            <div className="text-center py-2">
                              <span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold ${
                                Number(currentMarks) >= 80
                                  ? 'bg-green-100 text-green-800'
                                  : Number(currentMarks) >= 60
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {currentMarks}%
                              </span>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Stats for current subject */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-xs text-gray-600">Subject Average</p>
                <p className="text-2xl font-bold text-green-600">
                  {((editMode ? tempMarks : marks).reduce((sum, m) => sum + (Number(m[selectedSubject.toLowerCase() as keyof typeof m]) || 0), 0) / (editMode ? tempMarks : marks).length).toFixed(1)}%
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-gray-600">Entered</p>
                <p className="text-2xl font-bold text-blue-600">
                  {(editMode ? tempMarks : marks).filter(m => Number(m[selectedSubject.toLowerCase() as keyof typeof m]) > 0).length}/{(editMode ? tempMarks : marks).length}
                </p>
              </div>
            </div>

            {!editMode && (
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  💡 <span className="font-semibold">Workflow:</span> Click "Edit Marks" → Select subject → Enter all marks → Click "Save All"
                </p>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* ===================================
          EXCEL UPLOAD TAB
          =================================== */}
      {activeTab === 'upload' && (
        <div className="space-y-6">
          {/* Upload Area */}
          <Card>
            <h3 className="text-lg font-bold mb-4">Upload Marks from Excel</h3>
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-blue-50 hover:bg-blue-100 transition cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-800 mb-2">Drop your file or click to upload</p>
              <p className="text-sm text-gray-600 mb-4">Supports CSV and Excel files (.csv, .xlsx, .xls)</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button variant="premium" onClick={() => fileInputRef.current?.click()}>
                Select File
              </Button>
            </div>

            {uploadedFile && (
              <div className="mt-4 p-4 bg-green-50 border border-green-300 rounded-lg">
                <p className="text-sm text-green-700">
                  ✓ File selected: <span className="font-semibold">{uploadedFile.name}</span>
                </p>
              </div>
            )}
          </Card>

          {/* Preview */}
          {showPreview && previewData.length > 0 && (
            <Card>
              <h3 className="text-lg font-bold mb-4">Preview Data ({previewData.length} records)</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b-2 border-gray-300">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Name</th>
                      {SUBJECTS.map((subj) => (
                        <th key={subj} className="px-4 py-3 text-center font-semibold text-xs md:text-sm">
                          {subj}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.slice(0, 5).map((row, idx) => (
                      <tr key={idx} className="border-b border-gray-200">
                        <td className="px-4 py-3">{row.name || row.student || 'N/A'}</td>
                        {SUBJECTS.map((subj) => (
                          <td key={subj} className="px-4 py-3 text-center">
                            {row[subj.toLowerCase()] || '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {previewData.length > 5 && (
                <p className="text-sm text-gray-600 mb-6">... and {previewData.length - 5} more records</p>
              )}

              <div className="flex gap-3">
                <Button onClick={handleImportFromExcel} variant="premium" className="flex-1">
                  <Upload className="w-4 h-4" />
                  Import All Records
                </Button>
                <Button
                  onClick={() => {
                    setShowPreview(false);
                    setPreviewData([]);
                    setUploadedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </Card>
          )}

          {!showPreview && (
            <Card>
              <h3 className="text-lg font-bold mb-4">File Format Example</h3>
              <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-xs md:text-sm">
                <p className="font-semibold mb-2">Expected CSV Format:</p>
                <pre className="text-gray-700">name,hindi,english,math,science,social
Arjun Singh,85,78,92,88,80
Priya Sharma,88,85,90,92,87</pre>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* ===================================
          ANALYTICS TAB
          =================================== */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Performance Trend */}
          <Card>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Class Performance Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={PERFORMANCE_TREND}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="exam" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avg" stroke="#3b82f6" strokeWidth={2} name="Average Score" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Subject Averages */}
          <Card>
            <h3 className="text-lg font-bold mb-4">Subject-wise Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getSubjectAverages()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="average" fill="#8b5cf6" name="Average Marks" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Grade Distribution */}
          <Card>
            <h3 className="text-lg font-bold mb-4">Grade Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getGradeDistribution()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Detailed Statistics */}
          <Card>
            <h3 className="text-lg font-bold mb-6">Detailed Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-blue-600">{marks.length}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Class Average</p>
                <p className="text-2xl font-bold text-green-600">{classAverage}%</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Highest Score</p>
                <p className="text-2xl font-bold text-purple-600">{highestScore}%</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">Lowest Score</p>
                <p className="text-2xl font-bold text-orange-600">{lowestScore}%</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg">
                <p className="text-sm text-gray-600">Pass Rate (≥60)</p>
                <p className="text-2xl font-bold text-pink-600">
                  {((marks.filter(m => m.avg >= 60).length / marks.length) * 100).toFixed(0)}%
                </p>
              </div>
              <div className="p-4 bg-cyan-50 rounded-lg">
                <p className="text-sm text-gray-600">Merit Rate (≥90)</p>
                <p className="text-2xl font-bold text-cyan-600">
                  {((marks.filter(m => m.avg >= 90).length / marks.length) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </Card>

          {/* Top Performers */}
          <Card>
            <h3 className="text-lg font-bold mb-4">Top 5 Performers</h3>
            <div className="space-y-3">
              {marks
                .sort((a, b) => b.avg - a.avg)
                .slice(0, 5)
                .map((student, idx) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {idx + 1}
                      </div>
                      <span className="font-semibold text-gray-800">{student.name}</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">{student.avg.toFixed(1)}%</span>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      )}
    </PageWrapper>
  );
};
