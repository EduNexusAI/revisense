import { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { BookOpen, CheckCircle, Clock, AlertCircle, FileText, Upload, User, Eye, X, MessageSquare, BookMarked, Sparkles, Lightbulb, Brain, BookMarked as BookMarkedIcon, Zap } from 'lucide-react';
import { showToast } from '../../utils/toast';

interface HomeworkItem {
  id: string;
  subject: string;
  teacher: string;
  title: string;
  description: string;
  dueDate: string;
  daysLeft: number;
  submitted: boolean;
  marks?: number;
  totalMarks?: number;
  attachmentCount: number;
  priority: 'high' | 'medium' | 'low';
}

interface MentorUpdate {
  id: string;
  mentorName: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface RevisionTopic {
  id: string;
  topic: string;
  subject: string;
  mentor: string;
  description: string;
  dueDate: string;
  daysLeft: number;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

const DUMMY_HOMEWORK: HomeworkItem[] = [
  // Today's homework (2024-03-06)
  {
    id: '1',
    subject: 'Mathematics',
    teacher: 'Mr. Rajesh Kumar',
    title: 'Chapter 5 - Quadratic Equations Exercise',
    description: 'Complete exercises 1-20 from page 145. Focus on solving using factorization and quadratic formula.',
    dueDate: '2024-03-06',
    daysLeft: 0,
    submitted: false,
    attachmentCount: 2,
    priority: 'high',
  },
  {
    id: '2',
    subject: 'English',
    teacher: 'Ms. Priya Singh',
    title: 'Reading Assignment: Pride and Prejudice',
    description: 'Read chapters 1-5 and write a summary of each chapter.',
    dueDate: '2024-03-06',
    daysLeft: 0,
    submitted: false,
    attachmentCount: 1,
    priority: 'medium',
  },
  // Tomorrow's homework (2024-03-07)
  {
    id: '3',
    subject: 'Science',
    teacher: 'Dr. Amit Patel',
    title: 'Lab Report: Acid-Base Reactions',
    description: 'Complete the lab report on acid-base reactions with observations and conclusions.',
    dueDate: '2024-03-07',
    daysLeft: 1,
    submitted: false,
    attachmentCount: 3,
    priority: 'high',
  },
  {
    id: '4',
    subject: 'History',
    teacher: 'Mr. Vikram Sharma',
    title: 'Ancient Rome Timeline',
    description: 'Create a visual timeline of major events in Ancient Rome from 27 BC to 476 AD.',
    dueDate: '2024-03-07',
    daysLeft: 1,
    submitted: false,
    attachmentCount: 1,
    priority: 'medium',
  },
  // Day after tomorrow (2024-03-08)
  {
    id: '5',
    subject: 'Geography',
    teacher: 'Ms. Nisha Verma',
    title: 'Map Labeling - South Asia',
    description: 'Label all countries, capitals, and major geographical features of South Asia.',
    dueDate: '2024-03-08',
    daysLeft: 2,
    submitted: false,
    attachmentCount: 2,
    priority: 'medium',
  },
  {
    id: '6',
    subject: 'Computer Science',
    teacher: 'Mr. Arjun Desai',
    title: 'Python Programming Exercise',
    description: 'Write Python programs for problems 1-10 from the exercise sheet.',
    dueDate: '2024-03-08',
    daysLeft: 2,
    submitted: false,
    attachmentCount: 1,
    priority: 'high',
  },
  // 2024-03-09
  {
    id: '7',
    subject: 'Biology',
    teacher: 'Dr. Sneha Gupta',
    title: 'Photosynthesis Diagram',
    description: 'Create a detailed labeled diagram showing the light and dark reactions of photosynthesis.',
    dueDate: '2024-03-09',
    daysLeft: 3,
    submitted: false,
    attachmentCount: 2,
    priority: 'medium',
  },
  // 2024-03-10
  {
    id: '8',
    subject: 'Literature',
    teacher: 'Ms. Priya Singh',
    title: 'Essay: Character Analysis',
    description: 'Write a 500-word essay analyzing the protagonist of the novel we discussed.',
    dueDate: '2024-03-10',
    daysLeft: 4,
    submitted: true,
    marks: 18,
    totalMarks: 20,
    attachmentCount: 1,
    priority: 'high',
  },
  // Past homework (2024-03-05 - Yesterday)
  {
    id: '9',
    subject: 'Physics',
    teacher: 'Mr. Sanjay Nair',
    title: 'Newton\'s Laws Problem Set',
    description: 'Solve problems 1-15 on Newton\'s Laws of Motion.',
    dueDate: '2024-03-05',
    daysLeft: -1,
    submitted: true,
    marks: 17,
    totalMarks: 20,
    attachmentCount: 1,
    priority: 'medium',
  },
];

const DUMMY_MENTORS_UPDATE: MentorUpdate[] = [
  {
    id: 'm1',
    mentorName: 'Mr. Rajesh Kumar',
    subject: 'Mathematics',
    message: 'Great progress on Quadratic Equations! Make sure to practice more problems on factorization method. Keep up the good work!',
    date: '2024-03-06',
    isRead: false,
    priority: 'high',
  },
  {
    id: 'm2',
    mentorName: 'Ms. Priya Singh',
    subject: 'English',
    message: 'Your reading comprehension has improved significantly. Continue reading more classics and write reflections on each chapter.',
    date: '2024-03-05',
    isRead: true,
    priority: 'medium',
  },
  {
    id: 'm3',
    mentorName: 'Dr. Amit Patel',
    subject: 'Science',
    message: 'Excellent lab report submission! Your observations were thorough. Don\'t forget to register for the upcoming science fair.',
    date: '2024-03-04',
    isRead: true,
    priority: 'medium',
  },
  {
    id: 'm4',
    mentorName: 'Mr. Arjun Desai',
    subject: 'Computer Science',
    message: 'Your Python code is becoming more efficient. Try implementing error handling in your next assignment.',
    date: '2024-03-03',
    isRead: true,
    priority: 'low',
  },
];

const DUMMY_REVISION: RevisionTopic[] = [
  {
    id: 'r1',
    topic: 'Quadratic Equations - Problem Solving',
    subject: 'Mathematics',
    mentor: 'Mr. Rajesh Kumar',
    description: 'Revise all methods of solving quadratic equations: factorization, completing the square, and quadratic formula.',
    dueDate: '2024-03-10',
    daysLeft: 4,
    completed: false,
    difficulty: 'medium',
  },
  {
    id: 'r2',
    topic: 'British Literature Period',
    subject: 'English',
    mentor: 'Ms. Priya Singh',
    description: 'Review the key authors and their works from the Victorian period. Focus on themes and literary devices used.',
    dueDate: '2024-03-12',
    daysLeft: 6,
    completed: false,
    difficulty: 'easy',
  },
  {
    id: 'r3',
    topic: 'Chemical Reactions & Equations',
    subject: 'Science',
    mentor: 'Dr. Amit Patel',
    description: 'Review types of chemical reactions (synthesis, decomposition, single replacement, double replacement) and balance equations.',
    dueDate: '2024-03-08',
    daysLeft: 2,
    completed: false,
    difficulty: 'hard',
  },
  {
    id: 'r4',
    topic: 'Ancient Civilizations - Egypt & Mesopotamia',
    subject: 'History',
    mentor: 'Mr. Vikram Sharma',
    description: 'Study the development of these early civilizations: government, culture, technology, and their influence on modern world.',
    dueDate: '2024-03-15',
    daysLeft: 9,
    completed: true,
    difficulty: 'easy',
  },
  {
    id: 'r5',
    topic: 'Data Structures - Arrays & Linked Lists',
    subject: 'Computer Science',
    mentor: 'Mr. Arjun Desai',
    description: 'Revise array operations, time complexity analysis, and implement a linked list from scratch.',
    dueDate: '2024-03-11',
    daysLeft: 5,
    completed: false,
    difficulty: 'hard',
  },
];

const getDayName = (date: Date): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
};

const getDateString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const getDateDisplay = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}/${month}`;
};

const getRelativeDateLabel = (dateStr: string, todayStr: string): string => {
  const date = new Date(dateStr);
  const today = new Date(todayStr);
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  return null;
};

export const HomeworkPage = () => {
  const [mainTab, setMainTab] = useState<'homework' | 'mentors' | 'revision'>('homework');
  const [homeworkList, setHomeworkList] = useState(DUMMY_HOMEWORK);
  const [mentorUpdates, setMentorUpdates] = useState(DUMMY_MENTORS_UPDATE);
  const [revisionTopics, setRevisionTopics] = useState(DUMMY_REVISION);
  const [selectedTab, setSelectedTab] = useState<'all' | 'pending' | 'submitted'>('all');
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [viewingHomework, setViewingHomework] = useState<HomeworkItem | null>(null);
  const [viewingAI, setViewingAI] = useState<{ topicId: string; feature: 'tips' | 'quiz' | 'summary' | 'plan' } | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Date filtering state - initialize to today
  const today = new Date('2024-03-06'); // Using fixed date for demo
  const todayStr = getDateString(today);
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  // Generate next 7 days for the date selector
  const generateWeekDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push(getDateString(date));
    }
    return dates;
  };

  const weekDates = generateWeekDates();

  // Filter by selected date first, then by tab
  const filteredList = homeworkList.filter((hw) => {
    // First filter by selected date
    if (hw.dueDate !== selectedDate) return false;
    
    // Then filter by tab
    if (selectedTab === 'pending') return !hw.submitted;
    if (selectedTab === 'submitted') return hw.submitted;
    return true;
  });

  // Get pending and submitted counts for selected date
  const pendingCountForDate = homeworkList.filter((hw) => hw.dueDate === selectedDate && !hw.submitted).length;
  const submittedCountForDate = homeworkList.filter((hw) => hw.dueDate === selectedDate && hw.submitted).length;
  const totalCountForDate = homeworkList.filter((hw) => hw.dueDate === selectedDate).length;

  const handleAIFeature = (topicId: string, feature: 'tips' | 'quiz' | 'summary' | 'plan') => {
    setViewingAI({ topicId, feature });
    setAiLoading(true);
    setTimeout(() => {
      setAiLoading(false);
    }, 1500);
  };

  const getAIContent = (topicId: string, feature: string) => {
    const topic = revisionTopics.find(t => t.id === topicId);
    if (!topic) return null;

    const aiResponses: Record<string, Record<string, string>> = {
      r1: {
        tips: '✓ Practice factorization daily with 10 problems\n✓ Use the quadratic formula for complex equations\n✓ Create flashcards for key formulas\n✓ Solve past exam papers (30 mins/day)\n✓ Group study with classmates twice weekly',
        quiz: 'Q1: Solve x² - 5x + 6 = 0\nQ2: Use quadratic formula for 2x² + 3x - 2 = 0\nQ3: Complete the square: x² + 4x + 1 = 0\nQ4: Discriminant check for real roots\nQ5: Word problems on projectile motion',
        summary: 'Quadratic equations are 2nd-degree polynomials solved using: (1) Factorization, (2) Completing the square, (3) Quadratic formula: x = [-b ± √(b²-4ac)]/2a. Discriminant (b²-4ac) determines solution type.',
        plan: 'Day 1-2: Learn factorization methods\nDay 3-4: Master quadratic formula\nDay 5: Complete-the-square technique\nDay 6: Practice mixed problems\nDay 7: Full revision & mock test',
      },
      r2: {
        tips: '✓ Read one Victorian author per day\n✓ Make notes on themes: morality, society, love\n✓ Watch BBC adaptations for context\n✓ Compare 2 poems daily\n✓ Practice essay writing (45 mins)',
        quiz: 'Q1: Main themes in Jane Eyre\nQ2: Victorian literature characteristics\nQ3: Compare Dickens vs Brontë\nQ4: Literary devices in poetry\nQ5: Essay: Social issues in Victorian era',
        summary: 'Victorian Literature (1837-1901) emphasizes morality, social criticism, and individualism. Key authors: Dickens, Brontë, Eliot. Common themes: class struggle, coming-of-age, gender roles. Use literary analysis framework for essays.',
        plan: 'Day 1-2: Study Jane Eyre\nDay 3-4: Explore poetry selections\nDay 5: Compare Dickens works\nDay 6: Essay planning & writing\nDay 7: Mock exam practice',
      },
      r3: {
        tips: '✓ Learn oxidation & reduction rules\n✓ Balance equations (AABB method)\n✓ Memorize reaction types with examples\n✓ Solve stoichiometry problems daily\n✓ Lab notebook review (20 mins)',
        quiz: 'Q1: Balance: Fe + O₂ → Fe₂O₃\nQ2: Identify synthesis reaction\nQ3: Calculate moles in 5g H₂SO₄\nQ4: Oxidation numbers in compounds\nQ5: Predict products & balance',
        summary: 'Chemical reactions: 4 types (synthesis, decomposition, single/double replacement). Balance using coefficients. Oxidation = electron loss, reduction = gain. Stoichiometry relates moles of reactants/products.',
        plan: 'Day 1: Reaction types mastery\nDay 2-3: Balancing & redox\nDay 4-5: Stoichiometry problems\nDay 6: Equation balancing drills\nDay 7: Full topic test',
      },
    };

    return aiResponses[topicId]?.[feature] || 'AI is generating personalized content...';
  };

  const getFeatureName = (feature: string) => {
    switch (feature) {
      case 'tips':
        return '🤖 AI Study Tips';
      case 'quiz':
        return '📝 AI Quiz';
      case 'summary':
        return '💡 AI Summary';
      case 'plan':
        return '🎯 Study Plan';
      default:
        return 'AI Content';
    }
  };

  const handleSubmitHomework = (id: string) => {
    setSubmitting(id);
    setTimeout(() => {
      setHomeworkList(prev =>
        prev.map(hw =>
          hw.id === id
            ? { ...hw, submitted: true, marks: Math.floor(Math.random() * 5) + 16, totalMarks: 20 }
            : hw
        )
      );
      setSubmitting(null);
      showToast('Homework submitted successfully!', 'success');
    }, 1500);
  };

  return (
    <PageWrapper title="Homework & Learning" icon={<BookOpen className="w-6 h-6" />}>
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-3 md:pb-4 lg:pb-6">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-900 mb-1">Homework & Learning</h1>
          <p className="text-xs md:text-sm text-gray-500">Manage assignments, mentors updates, and revision topics</p>
        </div>

        {/* Main Tab Navigation */}
        <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setMainTab('homework')}
            className={`px-4 py-3 font-semibold border-b-2 transition whitespace-nowrap text-sm md:text-base ${
              mainTab === 'homework'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            📚 Homework
          </button>
          <button
            onClick={() => setMainTab('mentors')}
            className={`px-4 py-3 font-semibold border-b-2 transition whitespace-nowrap text-sm md:text-base ${
              mainTab === 'mentors'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            👨‍🏫 Mentors Update
          </button>
          <button
            onClick={() => setMainTab('revision')}
            className={`px-4 py-3 font-semibold border-b-2 transition whitespace-nowrap text-sm md:text-base ${
              mainTab === 'revision'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            📖 Revision
          </button>
        </div>

        {/* HOMEWORK TAB */}
        {mainTab === 'homework' && (
          <div className="space-y-4 md:space-y-6">
            {/* Date Selection - Horizontal Scroll on Mobile, Full View on Desktop */}
            <div className="bg-gradient-to-b from-purple-50 to-white rounded-lg border border-purple-100 p-2.5 md:p-4">
          <p className="text-xs md:text-sm font-semibold text-gray-700 mb-2.5 md:mb-3 uppercase tracking-wide">Select Date</p>
          <div className="flex gap-1.5 md:gap-2.5 lg:gap-4 overflow-x-auto pb-2 md:pb-0">
            {weekDates.map((dateStr) => {
              const date = new Date(dateStr);
              const dayName = getDayName(date).slice(0, 3); // Mon, Tue, etc.
              const dateDisplay = getDateDisplay(date);
              const relativeLabel = getRelativeDateLabel(dateStr, todayStr);
              const isSelected = selectedDate === dateStr;

              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`flex-shrink-0 px-2.5 md:px-3.5 lg:px-4 py-2 md:py-2.5 rounded-lg font-medium transition-all text-center whitespace-nowrap ${
                    isSelected
                      ? 'bg-gradient-to-b from-purple-600 to-purple-700 text-white shadow-md'
                      : 'bg-white border border-gray-200 text-gray-900 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                >
                  <div className="text-xs md:text-sm font-bold">{dayName}</div>
                  <div className="text-xs text-gray-600 mt-0.5" style={isSelected ? { color: 'rgba(255,255,255,0.8)' } : {}}>
                    {dateDisplay}
                  </div>
                  {relativeLabel && (
                    <div className="text-xs font-semibold mt-0.5" style={isSelected ? { color: '#e0e7ff' } : { color: '#8b5cf6' }}>
                      {relativeLabel}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats for Selected Date */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Total</p>
                <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">{totalCountForDate}</h3>
              </div>
              <BookOpen className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-blue-600 opacity-20" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-white border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Pending</p>
                <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">{pendingCountForDate}</h3>
              </div>
              <Clock className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-yellow-600 opacity-20" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Submitted</p>
                <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">{submittedCountForDate}</h3>
              </div>
              <CheckCircle className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-green-600 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 md:gap-4 border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'all', label: 'All', count: totalCountForDate },
            { id: 'pending', label: 'Pending', count: pendingCountForDate },
            { id: 'submitted', label: 'Submitted', count: submittedCountForDate },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`px-3 md:px-4 py-2.5 md:py-3 font-medium transition-all border-b-2 -mb-[2px] text-xs md:text-sm whitespace-nowrap flex-shrink-0 ${
                selectedTab === tab.id
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              <span className="ml-1.5 md:ml-2 text-xs bg-gray-200 text-gray-700 px-1.5 md:px-2 py-0.5 rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Homework List */}
        <div className="space-y-3 md:space-y-4">
          {filteredList.map((hw) => (
            <Card key={hw.id} className="hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="text-sm md:text-base lg:text-lg font-bold text-gray-900">{hw.title}</h3>
                    <Badge variant={hw.priority === 'high' ? 'danger' : hw.priority === 'medium' ? 'warning' : 'success'}>
                      {hw.priority}
                    </Badge>
                  </div>

                  <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3 line-clamp-2">{hw.description}</p>

                  <div className="flex flex-wrap items-center gap-2 md:gap-3 lg:gap-4 text-xs md:text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <BookOpen className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate font-medium">{hw.subject}</span>
                    </div>

                    <div className="flex items-center gap-1 text-purple-600">
                      <User className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate font-medium text-purple-700">{hw.teacher}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {hw.daysLeft > 3 && (
                        <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      )}
                      {hw.daysLeft <= 3 && hw.daysLeft > 0 && (
                        <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                      )}
                      {hw.daysLeft === 0 && (
                        <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      )}
                      <span className={hw.daysLeft <= 2 ? 'text-red-600 font-medium' : 'text-gray-600'}>
                        {hw.daysLeft > 0 ? `${hw.daysLeft} days left` : hw.daysLeft === 0 ? 'Due today' : 'Overdue'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-600">
                      <FileText className="w-4 h-4 flex-shrink-0" />
                      <span>{hw.attachmentCount} files</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-stretch md:items-end gap-2 md:flex-shrink-0">
                  <div className="flex gap-2 flex-col md:flex-row w-full md:w-auto">
                    <button
                      type="button"
                      onClick={() => setViewingHomework(hw)}
                      className="flex items-center justify-center gap-1 px-2.5 md:px-3 py-1.5 md:py-2 text-xs md:text-sm font-semibold border-2 border-blue-500 text-blue-700 rounded-lg hover:bg-blue-50 hover:border-blue-600 transition-all active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      View
                    </button>
                    {hw.submitted ? (
                      <div className="text-left md:text-right w-full md:w-auto">
                        <div className="flex items-center gap-1 md:justify-end text-green-600 font-semibold mb-1 md:mb-2 text-xs md:text-sm">
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                          Submitted
                        </div>
                        {hw.marks !== undefined && (
                          <div className="text-sm md:text-base">
                            <span className="text-base md:text-lg lg:text-xl font-bold text-gray-900">{hw.marks}</span>
                            <span className="text-gray-600 text-xs md:text-sm">/{hw.totalMarks}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Button
                        variant="premium"
                        size="sm"
                        className="text-xs md:text-sm"
                        onClick={() => handleSubmitHomework(hw.id)}
                        disabled={submitting === hw.id}
                      >
                        <Upload className="w-4 h-4 mr-1" />
                        {submitting === hw.id ? 'Processing...' : 'Done'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredList.length === 0 && mainTab === 'homework' && (
          <Card className="text-center py-8 md:py-12 bg-gray-50 border-gray-200">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-sm md:text-base text-gray-600">No homework found for this {selectedTab} on this date</p>
          </Card>
        )}
          </div>
        )}

        {/* MENTORS UPDATE TAB */}
        {mainTab === 'mentors' && (
          <div className="space-y-4 md:space-y-6">
            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Total</p>
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">{mentorUpdates.length}</h3>
                  </div>
                  <MessageSquare className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-purple-600 opacity-20" />
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Unread</p>
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">{mentorUpdates.filter(m => !m.isRead).length}</h3>
                  </div>
                  <AlertCircle className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-orange-600 opacity-20" />
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Read</p>
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">{mentorUpdates.filter(m => m.isRead).length}</h3>
                  </div>
                  <CheckCircle className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-green-600 opacity-20" />
                </div>
              </Card>
            </div>

            {/* Mentors Updates List */}
            <div className="space-y-3 md:space-y-4">
              {mentorUpdates.map((update) => (
                <Card key={update.id} className={`hover:shadow-md transition-all border-l-4 ${update.isRead ? 'border-l-gray-300' : 'border-l-blue-600'}`}>
                  <div className="flex flex-col gap-3 md:gap-4">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {update.mentorName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <h3 className="text-sm md:text-base font-bold text-gray-900">{update.mentorName}</h3>
                          <Badge variant={update.priority === 'high' ? 'danger' : update.priority === 'medium' ? 'warning' : 'success'}>
                            {update.priority}
                          </Badge>
                          {!update.isRead && <Badge variant="danger" className="text-xs">New</Badge>}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm mb-2 md:mb-3">
                          <div className="flex items-center gap-1 text-blue-600">
                            <BookOpen className="w-4 h-4" />
                            <span className="font-medium">{update.subject}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{update.date}</span>
                          </div>
                        </div>
                        <p className="text-xs md:text-sm text-gray-700 leading-relaxed">{update.message}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* REVISION TAB */}
        {mainTab === 'revision' && (
          <div className="space-y-4 md:space-y-6">
            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Total</p>
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">{revisionTopics.length}</h3>
                  </div>
                  <BookMarked className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-blue-600 opacity-20" />
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-50 to-white border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Pending</p>
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">{revisionTopics.filter(r => !r.completed).length}</h3>
                  </div>
                  <Clock className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-yellow-600 opacity-20" />
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Completed</p>
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">{revisionTopics.filter(r => r.completed).length}</h3>
                  </div>
                  <CheckCircle className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-green-600 opacity-20" />
                </div>
              </Card>
            </div>

            {/* Revision Topics List */}
            <div className="space-y-3 md:space-y-4">
              {revisionTopics.map((topic) => (
                <Card key={topic.id} className={`hover:shadow-md transition-all ${topic.completed ? 'opacity-75 bg-gray-50' : ''}`}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className={`text-sm md:text-base lg:text-lg font-bold ${topic.completed ? 'text-gray-600 line-through' : 'text-gray-900'}`}>{topic.topic}</h3>
                        <Badge variant={topic.difficulty === 'hard' ? 'danger' : topic.difficulty === 'medium' ? 'warning' : 'success'}>
                          {topic.difficulty}
                        </Badge>
                        {topic.completed && <Badge variant="success">✓ Completed</Badge>}
                      </div>

                      <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3 line-clamp-2">{topic.description}</p>

                      <div className="flex flex-wrap items-center gap-2 md:gap-3 lg:gap-4 text-xs md:text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <BookOpen className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate font-medium">{topic.subject}</span>
                        </div>

                        <div className="flex items-center gap-1 text-purple-600">
                          <User className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate font-medium text-purple-700">{topic.mentor}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          {topic.daysLeft > 3 && (
                            <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          )}
                          {topic.daysLeft <= 3 && topic.daysLeft > 0 && (
                            <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                          )}
                          {topic.daysLeft === 0 && (
                            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                          )}
                          <span className={topic.daysLeft <= 2 ? 'text-red-600 font-medium' : 'text-gray-600'}>
                            {!topic.completed && (topic.daysLeft > 0 ? `${topic.daysLeft} days left` : topic.daysLeft === 0 ? 'Due today' : 'Overdue')}
                          </span>
                        </div>

                        <div className="text-xs md:text-sm text-gray-600">
                          Due: {topic.dueDate}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-stretch md:items-end gap-2 w-full md:w-auto md:flex-shrink-0">
                      <div className="flex gap-1.5 flex-wrap justify-end">
                        {!topic.completed && (
                          <>
                            <button
                              onClick={() => handleAIFeature(topic.id, 'tips')}
                              className="flex items-center justify-center gap-1 px-2 md:px-2.5 py-1.5 md:py-2 text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-md transition-all active:scale-95"
                              title="AI Study Tips"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              Tips
                            </button>
                            <button
                              onClick={() => handleAIFeature(topic.id, 'quiz')}
                              className="flex items-center justify-center gap-1 px-2 md:px-2.5 py-1.5 md:py-2 text-xs font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-md transition-all active:scale-95"
                              title="AI Quiz Generator"
                            >
                              <Brain className="w-3.5 h-3.5" />
                              Quiz
                            </button>
                            <button
                              onClick={() => handleAIFeature(topic.id, 'summary')}
                              className="flex items-center justify-center gap-1 px-2 md:px-2.5 py-1.5 md:py-2 text-xs font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:shadow-md transition-all active:scale-95"
                              title="AI Smart Summary"
                            >
                              <Lightbulb className="w-3.5 h-3.5" />
                              Sum
                            </button>
                            <button
                              onClick={() => handleAIFeature(topic.id, 'plan')}
                              className="flex items-center justify-center gap-1 px-2 md:px-2.5 py-1.5 md:py-2 text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-md transition-all active:scale-95"
                              title="AI Study Plan"
                            >
                              <Zap className="w-3.5 h-3.5" />
                              Plan
                            </button>
                          </>
                        )}
                      </div>
                      {!topic.completed && (
                        <Button
                          variant="premium"
                          size="sm"
                          className="text-xs md:text-sm w-full"
                          onClick={() => {
                            setRevisionTopics(prev =>
                              prev.map(t => t.id === topic.id ? { ...t, completed: true } : t)
                            );
                            showToast('Revision topic marked as completed!', 'success');
                          }}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Mark Done
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* AI REVISION MODAL */}
        {viewingAI && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center p-4" onClick={() => setViewingAI(null)}>
            <Card className="w-full max-w-2xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-bold text-gray-900">{getFeatureName(viewingAI.feature)}</h2>
                      <p className="text-xs text-gray-500">Powered by AI</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setViewingAI(null)}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>

                {/* Topic Info */}
                {revisionTopics.find(t => t.id === viewingAI.topicId) && (
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                      {revisionTopics.find(t => t.id === viewingAI.topicId)?.topic}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs md:text-sm">
                      <Badge variant="outline">{revisionTopics.find(t => t.id === viewingAI.topicId)?.subject}</Badge>
                      <Badge variant="outline">{revisionTopics.find(t => t.id === viewingAI.topicId)?.difficulty}</Badge>
                    </div>
                  </div>
                )}

                {/* AI Content */}
                <div className="mb-6">
                  {aiLoading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin mb-4" />
                      <p className="text-sm text-gray-600">🤖 AI is generating {getFeatureName(viewingAI.feature).toLowerCase()}...</p>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 md:p-6">
                      <p className="text-sm md:text-base text-gray-800 leading-relaxed whitespace-pre-wrap font-mono">
                        {getAIContent(viewingAI.topicId, viewingAI.feature)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-3 pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    className="flex-1 text-xs md:text-sm"
                    onClick={() => setViewingAI(null)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="premium"
                    className="flex-1 text-xs md:text-sm"
                    onClick={() => {
                      showToast(`${getFeatureName(viewingAI.feature)} saved to notes!`, 'success');
                      setViewingAI(null);
                    }}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Save to Notes
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Detailed View Modal */}
        {viewingHomework && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center p-4" onClick={() => setViewingHomework(null)}>
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-3 md:p-4 lg:p-6">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-4 md:mb-5 lg:mb-6">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Homework Details</h2>
                  <button
                    onClick={() => setViewingHomework(null)}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>

                {/* Subject & Teacher */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6 pb-4 md:pb-6 border-b border-gray-200">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 md:mb-2">Subject</p>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                      <p className="text-base md:text-lg font-bold text-gray-900">{viewingHomework.subject}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 md:mb-2">Teacher</p>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                      <p className="text-base md:text-lg font-bold text-gray-900">{viewingHomework.teacher}</p>
                    </div>
                  </div>
                </div>

                {/* Title & Priority */}
                <div className="mb-4 md:mb-6 pb-4 md:pb-6 border-b border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 md:mb-2">Task Title</p>
                  <div className="flex items-start gap-2 md:gap-3">
                    <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 flex-1">{viewingHomework.title}</h3>
                    <Badge variant={viewingHomework.priority === 'high' ? 'danger' : viewingHomework.priority === 'medium' ? 'warning' : 'success'}>
                      {viewingHomework.priority}
                    </Badge>
                  </div>
                </div>

                {/* Description / Tasks */}
                <div className="mb-4 md:mb-6 pb-4 md:pb-6 border-b border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 md:mb-3">Assignment & Tasks</p>
                  <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-lg p-3 md:p-4">
                    <p className="text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">{viewingHomework.description}</p>
                  </div>
                </div>

                {/* Due Date & Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6 pb-4 md:pb-6 border-b border-gray-200">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 md:mb-2">Due Date</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
                      <div>
                        <p className="text-base md:text-lg font-bold text-gray-900">{viewingHomework.dueDate}</p>
                        <p className={`text-xs md:text-sm font-medium ${
                          viewingHomework.daysLeft > 3 ? 'text-blue-600' :
                          viewingHomework.daysLeft > 0 ? 'text-orange-600' :
                          viewingHomework.daysLeft === 0 ? 'text-red-600' : 'text-red-700'
                        }`}>
                          {viewingHomework.daysLeft > 0 
                            ? `${viewingHomework.daysLeft} days left` 
                            : viewingHomework.daysLeft === 0 
                            ? 'Due today' 
                            : 'Overdue'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 md:mb-2">Status</p>
                    <div className="flex items-center gap-2">
                      {viewingHomework.submitted ? (
                        <>
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                          <div>
                            <p className="text-base md:text-lg font-bold text-green-600">Submitted</p>
                            {viewingHomework.marks !== undefined && (
                              <p className="text-xs md:text-sm font-medium text-gray-600">
                                Marks: {viewingHomework.marks}/{viewingHomework.totalMarks}
                              </p>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
                          <p className="text-base md:text-lg font-bold text-orange-600">Pending</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Attachments */}
                <div className="mb-4 md:mb-6">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 md:mb-3">Attachments</p>
                  <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-lg p-3 md:p-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                      <p className="text-sm md:text-base font-semibold text-gray-900">{viewingHomework.attachmentCount} file(s) attached</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-2 md:gap-3 pt-4 md:pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    className="flex-1 text-xs md:text-sm"
                    onClick={() => setViewingHomework(null)}
                  >
                    Close
                  </Button>
                  {!viewingHomework.submitted && (
                    <Button
                      variant="premium"
                      className="flex-1 text-xs md:text-sm"
                      onClick={() => {
                        handleSubmitHomework(viewingHomework.id);
                        setViewingHomework(null);
                      }}
                      disabled={submitting === viewingHomework.id}
                    >
                      <Upload className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 md:mr-2" />
                      {submitting === viewingHomework.id ? 'Processing...' : 'Done'}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
