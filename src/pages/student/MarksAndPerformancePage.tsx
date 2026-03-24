import { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Award, TrendingUp, Zap, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Marks data
const subjectAssessments = [
  { subject: 'Mathematics', fa1: 18, fa2: 17, fa3: 19, midTerm: 42, annual: 85, grade: 'A', gpa: 4.0 },
  { subject: 'English', fa1: 16, fa2: 15, fa3: 17, midTerm: 38, annual: 78, grade: 'B+', gpa: 3.7 },
  { subject: 'Science', fa1: 19, fa2: 18, fa3: 19, midTerm: 40, annual: 88, grade: 'A', gpa: 4.0 },
  { subject: 'History', fa1: 17, fa2: 16, fa3: 18, midTerm: 39, annual: 82, grade: 'A-', gpa: 3.9 },
  { subject: 'Computer', fa1: 20, fa2: 19, fa3: 20, midTerm: 43, annual: 90, grade: 'A+', gpa: 4.0 },
  { subject: 'PE', fa1: 20, fa2: 20, fa3: 19, midTerm: 45, annual: 95, grade: 'A+', gpa: 4.0 },
];

// Performance data
const SUBJECT_PERFORMANCE = [
  { subject: 'Mathematics', score: 92, trend: 'up', change: 5 },
  { subject: 'English', score: 85, trend: 'up', change: 2 },
  { subject: 'Science', score: 88, trend: 'up', change: 4 },
  { subject: 'History', score: 82, trend: 'down', change: -2 },
  { subject: 'Computer', score: 90, trend: 'neutral', change: 0 },
];

const EXAM_PERFORMANCE = [
  { exam: 'Midterm', marks: 78 },
  { exam: 'Unit Test 1', marks: 82 },
  { exam: 'Unit Test 2', marks: 85 },
  { exam: 'Monthly Test', marks: 87 },
  { exam: 'Pre-Final', marks: 88 },
];

const SKILL_LEVELS = [
  { skill: 'Problem Solving', level: 85 },
  { skill: 'Communication', level: 78 },
  { skill: 'Analytical', level: 82 },
  { skill: 'Creative', level: 75 },
  { skill: 'Critical Thinking', level: 88 },
];

const CLASS_COMPARISON = [
  { exam: 'Midterm', yourScore: 78, classAvg: 72, topperScore: 95 },
  { exam: 'Unit Test 1', yourScore: 82, classAvg: 75, topperScore: 94 },
  { exam: 'Unit Test 2', yourScore: 85, classAvg: 78, topperScore: 96 },
  { exam: 'Monthly Test', yourScore: 87, classAvg: 80, topperScore: 98 },
  { exam: 'Pre-Final', yourScore: 88, classAvg: 82, topperScore: 97 },
];

export const MarksAndPerformancePage = () => {
  const [activeTab, setActiveTab] = useState<'marks' | 'performance'>('marks');

  // Calculate marks statistics
  const totalFA1 = subjectAssessments.reduce((sum, s) => sum + s.fa1, 0);
  const totalFA2 = subjectAssessments.reduce((sum, s) => sum + s.fa2, 0);
  const totalFA3 = subjectAssessments.reduce((sum, s) => sum + s.fa3, 0);
  const totalMidTerm = subjectAssessments.reduce((sum, s) => sum + s.midTerm, 0);
  const totalAnnual = subjectAssessments.reduce((sum, s) => sum + s.annual, 0);

  const avgFA1 = Math.round(totalFA1 / subjectAssessments.length);
  const avgFA2 = Math.round(totalFA2 / subjectAssessments.length);
  const avgFA3 = Math.round(totalFA3 / subjectAssessments.length);
  const avgMidTerm = Math.round(totalMidTerm / subjectAssessments.length);
  const avgAnnual = Math.round(totalAnnual / subjectAssessments.length);

  const overallGPA = Math.round(subjectAssessments.reduce((sum, s) => sum + s.gpa, 0) / subjectAssessments.length * 10) / 10;
  const projectedGPA = Math.min(4.0, overallGPA + 0.1).toFixed(2);
  const overallPercentage = avgAnnual;

  // Calculate performance statistics
  const overallAverage = Math.round(SUBJECT_PERFORMANCE.reduce((sum, s) => sum + s.score, 0) / SUBJECT_PERFORMANCE.length);
  const improvement = EXAM_PERFORMANCE.length > 0 ? EXAM_PERFORMANCE[EXAM_PERFORMANCE.length - 1].marks - EXAM_PERFORMANCE[0].marks : 0;

  const performanceData = [
    { test: 'FA1', marks: avgFA1, max: 20 },
    { test: 'FA2', marks: avgFA2, max: 20 },
    { test: 'FA3', marks: avgFA3, max: 20 },
    { test: 'Mid Term', marks: avgMidTerm, max: 50 },
    { test: 'Annual', marks: avgAnnual, max: 100 },
  ];

  const getGradeColor = (marks: number) => {
    if (marks >= 90) return 'text-green-600';
    if (marks >= 80) return 'text-blue-600';
    if (marks >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeBgColor = (marks: number) => {
    if (marks >= 90) return 'bg-green-50 border-green-200';
    if (marks >= 80) return 'bg-blue-50 border-blue-200';
    if (marks >= 70) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.9) return 'text-green-600';
    if (gpa >= 3.5) return 'text-blue-600';
    if (gpa >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-slate-200/50 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Marks & Performance
            </h1>
          </div>
          <p className="text-sm text-slate-600">Complete academic assessment with GPA tracking and performance analysis</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('marks')}
            className={`px-4 py-3 font-semibold border-b-2 transition ${
              activeTab === 'marks'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            📊 Marks & Assessment
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-4 py-3 font-semibold border-b-2 transition ${
              activeTab === 'performance'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            📈 Performance Analysis
          </button>
        </div>

        {/* MARKS TAB */}
        {activeTab === 'marks' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="shadow-soft hover:shadow-medium transition-all">
                <div className="p-4 lg:p-6 text-center">
                  <p className="text-xs text-gray-600 uppercase mb-2">Overall %</p>
                  <p className={`text-4xl lg:text-5xl font-bold mb-2 ${getGradeColor(overallPercentage)}`}>{overallPercentage}%</p>
                  <Badge variant="success" className="text-xs">Excellent</Badge>
                </div>
              </Card>

              <Card className="shadow-soft hover:shadow-medium transition-all">
                <div className="p-4 lg:p-6 text-center">
                  <p className="text-xs text-gray-600 uppercase mb-2">Current GPA</p>
                  <p className={`text-4xl lg:text-5xl font-bold mb-2 ${getGPAColor(overallGPA)}`}>{overallGPA.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">out of 4.0</p>
                </div>
              </Card>

              <Card className="shadow-soft hover:shadow-medium transition-all">
                <div className="p-4 lg:p-6 text-center">
                  <Zap className="w-6 lg:w-7 text-yellow-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 uppercase">Projected</p>
                  <p className="text-4xl lg:text-5xl font-bold text-green-600">{projectedGPA}</p>
                </div>
              </Card>

              <Card className="shadow-soft hover:shadow-medium transition-all">
                <div className="p-4 lg:p-6 text-center">
                  <p className="text-xs text-gray-600 uppercase mb-2">A Grade</p>
                  <p className="text-4xl lg:text-5xl font-bold text-green-600 mb-2">6</p>
                  <p className="text-xs text-gray-500">of 6</p>
                </div>
              </Card>
            </div>

            {/* Assessment Trend Chart */}
            <Card className="shadow-soft">
              <div className="p-4 lg:p-6">
                <h2 className="text-lg lg:text-2xl font-bold text-slate-900 mb-6">Assessment Trend</h2>
                <div className="h-64 lg:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="test" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: '#f1f5f9', border: 'none', borderRadius: '8px' }} />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Bar dataKey="marks" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Assessment Summary Table */}
            <Card className="shadow-soft overflow-x-auto">
              <div className="p-4 lg:p-6">
                <h2 className="text-lg lg:text-2xl font-bold text-slate-900 mb-6">Assessment Summary</h2>
                <div className="overflow-x-auto -mx-4 lg:-mx-6">
                  <div className="px-4 lg:px-6">
                    <table className="w-full border-collapse text-xs lg:text-sm">
                      <thead>
                        <tr className="border-b-2 border-slate-300 bg-gradient-to-r from-blue-50 to-purple-50">
                          <th className="p-3 text-left font-semibold text-slate-700 sticky left-0 z-10 bg-gradient-to-r from-blue-50 to-purple-50 whitespace-nowrap">Subject</th>
                          <th className="p-3 text-center font-semibold text-slate-700 bg-blue-100 whitespace-nowrap">FA1</th>
                          <th className="p-3 text-center font-semibold text-slate-700 bg-blue-100 whitespace-nowrap">FA2</th>
                          <th className="p-3 text-center font-semibold text-slate-700 bg-blue-100 whitespace-nowrap">FA3</th>
                          <th className="p-3 text-center font-semibold text-slate-700 bg-purple-100 whitespace-nowrap">Mid</th>
                          <th className="p-3 text-center font-semibold text-slate-700 bg-green-100 whitespace-nowrap">Annual</th>
                          <th className="p-3 text-center font-semibold text-slate-700 bg-amber-100 whitespace-nowrap">Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subjectAssessments.map((subject) => (
                          <tr key={subject.subject} className="border-b border-slate-200 hover:bg-slate-50">
                            <td className="p-3 font-semibold text-slate-900 sticky left-0 z-10 bg-white">{subject.subject}</td>
                            <td className="p-3 text-center bg-blue-50 font-semibold text-blue-800">{subject.fa1}%</td>
                            <td className="p-3 text-center bg-blue-50 font-semibold text-blue-800">{subject.fa2}%</td>
                            <td className="p-3 text-center bg-blue-50 font-semibold text-blue-800">{subject.fa3}%</td>
                            <td className="p-3 text-center bg-purple-50 font-semibold text-purple-800">{subject.midTerm}%</td>
                            <td className={`p-3 text-center ${getGradeColor(subject.annual)} bg-green-50 font-semibold`}>{subject.annual}%</td>
                            <td className="p-3 text-center bg-amber-50 font-semibold text-amber-800">#{subject.grade}</td>
                          </tr>
                        ))}
                        <tr className="bg-gradient-to-r from-slate-50 to-blue-50 font-semibold border-t-2 border-slate-300">
                          <td className="p-3 text-slate-900 sticky left-0 z-10 bg-slate-50">AVERAGE</td>
                          <td className="p-3 text-center text-blue-700 bg-blue-50">{avgFA1}%</td>
                          <td className="p-3 text-center text-blue-700 bg-blue-50">{avgFA2}%</td>
                          <td className="p-3 text-center text-blue-700 bg-blue-50">{avgFA3}%</td>
                          <td className="p-3 text-center text-purple-700 bg-purple-50">{avgMidTerm}%</td>
                          <td className={`p-3 text-center ${getGradeColor(avgAnnual)} bg-green-50`}>{avgAnnual}%</td>
                          <td className="p-3 text-center bg-amber-50">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Card>

            {/* Subject Performance */}
            <Card className="shadow-soft">
              <div className="p-4 lg:p-6">
                <h2 className="text-lg lg:text-2xl font-bold text-slate-900 mb-6">Subject Performance</h2>
                <div className="space-y-4">
                  {subjectAssessments.map((subject) => (
                    <div key={subject.subject} className={`p-4 rounded-lg border ${getGradeBgColor(subject.annual)}`}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <div className="flex-1 mb-2 md:mb-0">
                          <h3 className="font-semibold text-slate-900">{subject.subject}</h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">FA1: {subject.fa1}</Badge>
                            <Badge variant="outline" className="text-xs">FA2: {subject.fa2}</Badge>
                            <Badge variant="outline" className="text-xs">FA3: {subject.fa3}</Badge>
                            <Badge variant="outline" className="text-xs">Mid: {subject.midTerm}</Badge>
                          </div>
                        </div>
                        <div className="flex gap-3 items-end mt-2 md:mt-0">
                          <div className="text-right">
                            <p className={`text-2xl font-bold ${getGradeColor(subject.annual)}`}>{subject.annual}%</p>
                            <p className="text-xs text-slate-500">/ 100%</p>
                          </div>
                          <div>
                            <Badge variant={subject.annual >= 80 ? 'success' : 'warning'} className="text-xs">#{subject.grade}</Badge>
                            <p className={`text-xs font-bold mt-1 ${getGPAColor(subject.gpa)}`}>GPA: {subject.gpa.toFixed(1)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-300 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${
                            subject.annual >= 90
                              ? 'from-green-500 to-emerald-500'
                              : subject.annual >= 80
                              ? 'from-blue-500 to-cyan-500'
                              : 'from-yellow-500 to-orange-500'
                          }`}
                          style={{ width: `${subject.annual}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* PERFORMANCE TAB */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
                <div className="flex items-center justify-between p-4 lg:p-6">
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Overall Average</p>
                    <h3 className="text-4xl lg:text-5xl font-bold text-purple-600 mt-2">{overallAverage}%</h3>
                  </div>
                  <Target className="w-8 h-8 text-purple-600 opacity-20" />
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
                <div className="flex items-center justify-between p-4 lg:p-6">
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Best Subject</p>
                    <h3 className="text-2xl lg:text-3xl font-bold text-blue-600 mt-2">Mathematics</h3>
                    <p className="text-xs text-gray-600 mt-1">92%</p>
                  </div>
                  <Award className="w-8 h-8 text-blue-600 opacity-20" />
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
                <div className="flex items-center justify-between p-4 lg:p-6">
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Improvement</p>
                    <h3 className="text-4xl lg:text-5xl font-bold text-green-600 mt-2">{improvement > 0 ? '+' : ''}{improvement}%</h3>
                  </div>
                  <Zap className="w-8 h-8 text-green-600 opacity-20" />
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-200">
                <div className="flex items-center justify-between p-4 lg:p-6">
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Class Rank</p>
                    <h3 className="text-4xl lg:text-5xl font-bold text-orange-600 mt-2">#3</h3>
                    <p className="text-xs text-gray-600 mt-1">in class</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-600 opacity-20" />
                </div>
              </Card>
            </div>

            {/* Subject Performance */}
            <Card>
              <div className="p-4 lg:p-6">
                <h3 className="text-lg lg:text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Subject-wise Performance</h3>
                <div className="space-y-4">
                  {SUBJECT_PERFORMANCE.map((subject) => (
                    <div key={subject.subject} className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">{subject.subject}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">{subject.score}%</span>
                            <Badge variant={subject.trend === 'up' ? 'success' : subject.trend === 'down' ? 'danger' : 'info'}>
                              {subject.trend === 'up' ? `↑ ${subject.change}%` : subject.trend === 'down' ? `↓ ${subject.change}%` : '→'}
                            </Badge>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all"
                            style={{ width: `${subject.score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Exam Trend */}
            <Card>
              <div className="p-4 lg:p-6">
                <h3 className="text-lg lg:text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Exam Performance Trend</h3>
                <div className="h-64 lg:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={EXAM_PERFORMANCE}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="exam" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="marks" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Skill Assessment */}
            <Card>
              <div className="p-4 lg:p-6">
                <h3 className="text-lg lg:text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Skill Assessment</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={SKILL_LEVELS}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Radar name="Your Skills" dataKey="level" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Class Comparison */}
            <Card>
              <div className="p-4 lg:p-6">
                <h3 className="text-lg lg:text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Class Comparison</h3>
                <div className="h-64 lg:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={CLASS_COMPARISON}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="exam" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="yourScore" fill="#8b5cf6" name="Your Score" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="classAvg" fill="#94a3b8" name="Class Average" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="topperScore" fill="#fbbf24" name="Topper Score" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Insights */}
            <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
              <div className="p-4 lg:p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Insights & Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Strengths</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>✓ Excellent performance in Mathematics</li>
                      <li>✓ Consistent improvement over time</li>
                      <li>✓ Strong analytical skills</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Areas for Improvement</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Focus on English (85%)</li>
                      <li>• Practice communication skills</li>
                      <li>• Work on creative problem-solving</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
