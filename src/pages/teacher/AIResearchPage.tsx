import React, { useState } from 'react';
import { BarChart3, Lightbulb, BookOpen, TrendingUp, User, Settings, Library, FileText, Play, Shield, CheckCircle2, Rocket, RadioTower } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { showToast } from '../../utils/toast';

interface GradeAIPolicy {
  id: string;
  grade: string;
  studentCount: number;
  contentLevel: 'easy' | 'medium' | 'hard';
  teachingStyle: 'socratic' | 'instructive' | 'exploratory';
  responseDepth: 'concise' | 'detailed' | 'comprehensive';
  safetyFilter: boolean;
  subjects: string[];
  maxTokensPerQuery: number;
  dailyQuotaEnabled: boolean;
  dailyQuota: number;
  enabledAt: string;
}

interface AISpecialFeature {
  id: string;
  name: string;
  description: string;
  icon: React.FC<any>;
  enabled: boolean;
  status: 'active' | 'beta' | 'coming';
}

interface ELibraryResource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'article' | 'worksheet';
  subject: string;
  grade: string;
  link: string;
  downloads: number;
}


// Grade-Based AI Policies
const GRADE_AI_POLICIES: GradeAIPolicy[] = [
  {
    id: '1',
    grade: 'Grade 8-9',
    studentCount: 42,
    contentLevel: 'medium',
    teachingStyle: 'instructive',
    responseDepth: 'detailed',
    safetyFilter: true,
    subjects: ['Math', 'Science', 'English', 'Social'],
    maxTokensPerQuery: 500,
    dailyQuotaEnabled: true,
    dailyQuota: 50,
    enabledAt: '2024-03-01'
  },
  {
    id: '2',
    grade: 'Grade 10-11',
    studentCount: 38,
    contentLevel: 'hard',
    teachingStyle: 'socratic',
    responseDepth: 'comprehensive',
    safetyFilter: true,
    subjects: ['Math', 'Science', 'English', 'Social'],
    maxTokensPerQuery: 800,
    dailyQuotaEnabled: true,
    dailyQuota: 100,
    enabledAt: '2024-03-01'
  },
  {
    id: '3',
    grade: 'Grade 12 & PUC',
    studentCount: 35,
    contentLevel: 'hard',
    teachingStyle: 'exploratory',
    responseDepth: 'comprehensive',
    safetyFilter: true,
    subjects: ['Math', 'Physics', 'Chemistry', 'Biology', 'English'],
    maxTokensPerQuery: 1000,
    dailyQuotaEnabled: false,
    dailyQuota: 999,
    enabledAt: '2024-03-01'
  }
];

// Advanced AI Special Features
const AI_SPECIAL_FEATURES: AISpecialFeature[] = [
  {
    id: '1',
    name: 'Conceptual Problem Solver',
    description: 'Step-by-step guided problem solving with explanations',
    icon: Lightbulb,
    enabled: true,
    status: 'active'
  },
  {
    id: '2',
    name: 'Learning Gap Detection',
    description: 'AI identifies knowledge gaps and suggests remediation',
    icon: CheckCircle2,
    enabled: true,
    status: 'active'
  },
  {
    id: '3',
    name: 'Personalized Study Plans',
    description: 'Auto-generates customized learning paths per student',
    icon: Rocket,
    enabled: true,
    status: 'beta'
  },
  {
    id: '4',
    name: 'Research Assistant',
    description: 'AI helps with research paper writing & academic integrity check',
    icon: RadioTower,
    enabled: false,
    status: 'coming'
  }
];

// Dummy E-Library Resources
const DUMMY_ELIBRARY_RESOURCES: ELibraryResource[] = [
  {
    id: '1',
    title: 'Mathematics Fundamentals Guide',
    description: 'Complete guide to algebra and geometry basics',
    type: 'pdf',
    subject: 'Math',
    grade: '8-9',
    link: '#',
    downloads: 245
  },
  {
    id: '2',
    title: 'Physics Concepts Explained (Video Series)',
    description: '15-part video series explaining core physics concepts',
    type: 'video',
    subject: 'Science',
    grade: '9-10',
    link: '#',
    downloads: 189
  },
  {
    id: '3',
    title: 'English Literature Analysis Worksheets',
    description: 'Interactive worksheets for analysis of classic texts',
    type: 'worksheet',
    subject: 'English',
    grade: '8-10',
    link: '#',
    downloads: 312
  },
  {
    id: '4',
    title: 'Social Studies Complete Notes',
    description: 'Chapter-wise comprehensive notes for all topics',
    type: 'article',
    subject: 'Social',
    grade: '9-10',
    link: '#',
    downloads: 421
  },
  {
    id: '5',
    title: 'Advanced Calculus Tutorials',
    description: 'Detailed tutorials for calculus applications',
    type: 'video',
    subject: 'Math',
    grade: '11-12',
    link: '#',
    downloads: 156
  }
];

export const AIResearchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'controls' | 'elibrary'>('dashboard');
  const [gradePolicies, setGradePolicies] = useState<GradeAIPolicy[]>(GRADE_AI_POLICIES);
  const [aiFeatures, setAIFeatures] = useState<AISpecialFeature[]>(AI_SPECIAL_FEATURES);
  const [editingGrade, setEditingGrade] = useState<string | null>(null);

  const handleUpdateGradePolicy = (gradeId: string, field: string, value: any) => {
    setGradePolicies(gradePolicies.map(policy => {
      if (policy.id === gradeId) {
        return { ...policy, [field]: value };
      }
      return policy;
    }));
    showToast('Grade policy updated successfully', 'success');
  };

  const handleToggleFeature = (featureId: string) => {
    setAIFeatures(aiFeatures.map(feature => {
      if (feature.id === featureId) {
        return { ...feature, enabled: !feature.enabled };
      }
      return feature;
    }));
    const feature = aiFeatures.find(f => f.id === featureId);
    showToast(`${feature?.name} ${feature?.enabled ? 'disabled' : 'enabled'}`, 'success');
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Research Ground</h1>
        <p className="text-gray-600">Advanced analytics and AI-powered insights for better teaching</p>
      </div>

      <div className="flex gap-2 md:gap-4 mb-6 border-b-2 border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 md:px-6 py-3 font-semibold text-sm md:text-base transition-all whitespace-nowrap border-b-2 flex items-center gap-2 ${
            activeTab === 'dashboard'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          AI Dashboard
        </button>
        <button
          onClick={() => setActiveTab('controls')}
          className={`px-4 md:px-6 py-3 font-semibold text-sm md:text-base transition-all whitespace-nowrap border-b-2 flex items-center gap-2 ${
            activeTab === 'controls'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          }`}
        >
          <Settings className="w-5 h-5" />
          AI Controls
        </button>
        <button
          onClick={() => setActiveTab('elibrary')}
          className={`px-4 md:px-6 py-3 font-semibold text-sm md:text-base transition-all whitespace-nowrap border-b-2 flex items-center gap-2 ${
            activeTab === 'elibrary'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-600 border-transparent hover:text-gray-900'
          }`}
        >
          <Library className="w-5 h-5" />
          E-Library
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Advanced AI Features */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-blue-600" />
              Advanced AI Special Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiFeatures.map(feature => {
                const IconComp = feature.icon;
                const statusColor = {
                  active: 'border-green-200 bg-green-50',
                  beta: 'border-blue-200 bg-blue-50',
                  coming: 'border-gray-200 bg-gray-50'
                };
                const statusBadge = {
                  active: 'bg-green-100 text-green-700',
                  beta: 'bg-blue-100 text-blue-700',
                  coming: 'bg-gray-100 text-gray-700'
                };

                return (
                  <Card key={feature.id} className={`border-2 ${statusColor[feature.status]} cursor-pointer transition hover:shadow-md`}>
                    <div className="flex items-start justify-between mb-2">
                      <IconComp className="w-6 h-6 text-gray-700" />
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${statusBadge[feature.status]}`}>
                        {feature.status.toUpperCase()}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{feature.name}</h4>
                    <p className="text-xs text-gray-600 mb-3">{feature.description}</p>
                    <button
                      onClick={() => handleToggleFeature(feature.id)}
                      disabled={feature.status === 'coming'}
                      className={`w-full py-2 rounded text-sm font-semibold transition ${
                        feature.enabled
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : feature.status === 'coming'
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {feature.status === 'coming' ? 'Coming Soon' : feature.enabled ? 'Enabled' : 'Enable'}
                    </button>
                  </Card>
                );
              })}
            </div>
          </Card>

          {/* AI Performance Timeline */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">AI Usage Trends (Last 30 Days)</h3>
            <div className="space-y-3">
              {[
                { week: 'Week 1', usage: 65, queries: 284, avgRating: 3.8 },
                { week: 'Week 2', usage: 71, queries: 312, avgRating: 4.0 },
                { week: 'Week 3', usage: 76, queries: 378, avgRating: 4.1 },
                { week: 'Week 4', usage: 78, queries: 405, avgRating: 4.2 }
              ].map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-gray-900">{stat.week}</span>
                    <span className="text-gray-600">Usage: {stat.usage}% | Queries: {stat.queries} | Rating: {stat.avgRating}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div style={{ width: `${stat.usage}%` }} className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'controls' && (
        <div className="space-y-6">
          {/* Grade-Based AI Policies */}
          {gradePolicies.map(policy => (
            <Card key={policy.id} className="border-2 border-blue-100">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{policy.grade}</h3>
                    <p className="text-sm text-gray-600">{policy.studentCount} students</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingGrade(editingGrade === policy.id ? null : policy.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition text-sm"
                >
                  {editingGrade === policy.id ? 'Done Editing' : 'Edit Policy'}
                </button>
              </div>

              {/* Policy Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Content Level */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Content Difficulty Level</label>
                  <select
                    value={policy.contentLevel}
                    onChange={(e) => handleUpdateGradePolicy(policy.id, 'contentLevel', e.target.value)}
                    disabled={editingGrade !== policy.id}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold disabled:bg-gray-50 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="easy">Easy - Simplified Concepts</option>
                    <option value="medium">Medium - Standard Content</option>
                    <option value="hard">Hard - Advanced Topics</option>
                  </select>
                </div>

                {/* Teaching Style */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">AI Teaching Style</label>
                  <select
                    value={policy.teachingStyle}
                    onChange={(e) => handleUpdateGradePolicy(policy.id, 'teachingStyle', e.target.value)}
                    disabled={editingGrade !== policy.id}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold disabled:bg-gray-50 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="instructive">Instructive - Direct Teaching</option>
                    <option value="socratic">Socratic - Question-Based</option>
                    <option value="exploratory">Exploratory - Discovery-Based</option>
                  </select>
                </div>

                {/* Response Depth */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Response Depth</label>
                  <select
                    value={policy.responseDepth}
                    onChange={(e) => handleUpdateGradePolicy(policy.id, 'responseDepth', e.target.value)}
                    disabled={editingGrade !== policy.id}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold disabled:bg-gray-50 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="concise">Concise - Brief Answers</option>
                    <option value="detailed">Detailed - Full Explanations</option>
                    <option value="comprehensive">Comprehensive - In-Depth Analysis</option>
                  </select>
                </div>

                {/* Safety Filter */}
                <div className="flex items-end">
                  <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Content Safety & Filtering</label>
                    <button
                      onClick={() => handleUpdateGradePolicy(policy.id, 'safetyFilter', !policy.safetyFilter)}
                      disabled={editingGrade !== policy.id}
                      className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                        policy.safetyFilter
                          ? 'bg-green-100 text-green-700 border-2 border-green-300'
                          : 'bg-red-100 text-red-700 border-2 border-red-300'
                      } ${editingGrade !== policy.id ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                      {policy.safetyFilter ? (
                        <>
                          <Shield className="w-5 h-5" />
                          Enabled - Age Appropriate
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5" />
                          Disabled
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="mt-6 pt-6 border-t-2 border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Max Tokens */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Max Tokens per Query</label>
                  <input
                    type="number"
                    value={policy.maxTokensPerQuery}
                    onChange={(e) => handleUpdateGradePolicy(policy.id, 'maxTokensPerQuery', parseInt(e.target.value))}
                    disabled={editingGrade !== policy.id}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 disabled:bg-gray-50 focus:border-blue-500 focus:outline-none"
                  />
                  <p className="text-xs text-gray-600 mt-1">Limit response length</p>
                </div>

                {/* Daily Quota */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Daily Query Quota</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={policy.dailyQuota}
                      onChange={(e) => handleUpdateGradePolicy(policy.id, 'dailyQuota', parseInt(e.target.value))}
                      disabled={editingGrade !== policy.id || !policy.dailyQuotaEnabled}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 disabled:bg-gray-50 focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={() => handleUpdateGradePolicy(policy.id, 'dailyQuotaEnabled', !policy.dailyQuotaEnabled)}
                      disabled={editingGrade !== policy.id}
                      className={`px-3 py-2 rounded font-semibold transition ${
                        policy.dailyQuotaEnabled
                          ? 'bg-blue-200 text-blue-700'
                          : 'bg-gray-200 text-gray-700'
                      } ${editingGrade !== policy.id ? 'opacity-60' : ''}`}
                    >
                      {policy.dailyQuotaEnabled ? 'On' : 'Off'}
                    </button>
                  </div>
                </div>

                {/* Subjects */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Enabled Subjects</label>
                  <div className="flex flex-wrap gap-2">
                    {policy.subjects.map(subject => (
                      <span key={subject} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {/* Global AI Safety & Compliance */}
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-600" />
              Global AI Safety & Compliance Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-red-200">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">AI Plagiarism Detection</p>
                  <p className="text-xs text-gray-600">Enabled - Detects AI-generated content</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-red-200">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Academic Integrity Monitoring</p>
                  <p className="text-xs text-gray-600">Enabled - Tracks unusual patterns</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-red-200">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Data Privacy Compliance</p>
                  <p className="text-xs text-gray-600">GDPR & school regulations followed</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-red-200">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Off-Campus Usage Logging</p>
                  <p className="text-xs text-gray-600">All queries logged for audit</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'elibrary' && (
        <div className="space-y-6">
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Learning Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DUMMY_ELIBRARY_RESOURCES.map(resource => {
                const IconComponent = 
                  resource.type === 'pdf' ? FileText :
                  resource.type === 'video' ? Play :
                  resource.type === 'article' ? BookOpen : FileText;
                
                return (
                  <Card key={resource.id} className="flex flex-col hover:shadow-lg transition">
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${
                      resource.type === 'pdf' ? 'bg-red-50' :
                      resource.type === 'video' ? 'bg-blue-50' :
                      resource.type === 'article' ? 'bg-green-50' :
                      'bg-yellow-50'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        resource.type === 'pdf' ? 'text-red-600' :
                        resource.type === 'video' ? 'text-blue-600' :
                        resource.type === 'article' ? 'text-green-600' :
                        'text-yellow-600'
                      }`} />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{resource.title}</p>
                        <p className="text-xs text-gray-600">{resource.type.toUpperCase()}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 flex-1">{resource.description}</p>
                    <div className="flex gap-2 mt-3">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{resource.subject}</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{resource.grade}</span>
                    </div>
                    <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded font-semibold text-sm hover:bg-blue-700 transition">
                      Access Resource
                    </button>
                  </Card>
                );
              })}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
