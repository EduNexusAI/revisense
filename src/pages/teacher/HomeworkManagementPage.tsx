import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { BookOpen, Plus, Edit2, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { showToast } from '../../utils/toast';

interface Homework {
  id: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  class: string;
  submittedCount: number;
  totalStudents: number;
  status: 'active' | 'completed' | 'overdue';
}

const DUMMY_HOMEWORK: Homework[] = [
  {
    id: '1',
    subject: 'Math',
    title: 'Algebraic Expressions Exercise',
    description: 'Complete Chapter 5 exercises 1-15 from textbook and submit solutions.',
    dueDate: '2024-01-20',
    class: 'Grade 9A',
    submittedCount: 28,
    totalStudents: 35,
    status: 'active',
  },
  {
    id: '2',
    subject: 'English',
    title: 'Essay on Environmental Conservation',
    description: 'Write a 500-word essay on environmental conservation and its importance.',
    dueDate: '2024-01-18',
    class: 'Grade 9A',
    submittedCount: 33,
    totalStudents: 35,
    status: 'active',
  },
  {
    id: '3',
    subject: 'Science',
    title: 'Biology Project - Plant Lifecycle',
    description: 'Create a presentation on plant lifecycle with diagrams and explanations.',
    dueDate: '2024-01-15',
    class: 'Grade 9A',
    submittedCount: 35,
    totalStudents: 35,
    status: 'completed',
  },
  {
    id: '4',
    subject: 'Social Studies',
    title: 'Historical Timeline Project',
    description: 'Prepare a timeline of historical events during Ancient India period.',
    dueDate: '2024-01-10',
    class: 'Grade 9A',
    submittedCount: 35,
    totalStudents: 35,
    status: 'completed',
  },
];

export const HomeworkManagementPage: React.FC = () => {
  const { t } = useTranslation();
  const [homework, setHomework] = useState<Homework[]>(DUMMY_HOMEWORK);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    subject: '',
    title: '',
    description: '',
    dueDate: '',
    class: 'Grade 9A',
  });

  const handleOpenModal = (id?: string) => {
    if (id) {
      const hw = homework.find((h) => h.id === id);
      if (hw) {
        setFormData({
          subject: hw.subject,
          title: hw.title,
          description: hw.description,
          dueDate: hw.dueDate,
          class: hw.class,
        });
        setEditingId(id);
      }
    } else {
      setFormData({
        subject: '',
        title: '',
        description: '',
        dueDate: '',
        class: 'Grade 9A',
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.subject || !formData.title || !formData.dueDate) {
      showToast('Please fill all required fields', 'warning');
      return;
    }

    if (editingId) {
      setHomework(
        homework.map((h) =>
          h.id === editingId ? { ...h, ...formData, status: 'active' } : h
        )
      );
      showToast('Homework updated successfully', 'success');
    } else {
      const newHw: Homework = {
        id: String(Date.now()),
        ...formData,
        submittedCount: 0,
        totalStudents: 35,
        status: 'active',
      };
      setHomework([newHw, ...homework]);
      showToast('Homework created successfully', 'success');
    }

    handleCloseModal();
  };

  const handleDelete = (id: string, title: string) => {
    setHomework(homework.filter((h) => h.id !== id));
    showToast(`Homework "${title}" deleted successfully`, 'success');
  };

  const getStatusBadge = (status: string, dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const isOverdue = status === 'active' && due < today;

    if (isOverdue) {
      return <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold"><AlertCircle className="w-3 h-3" /> Overdue</span>;
    } else if (status === 'completed') {
      return <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold"><CheckCircle className="w-3 h-3" /> Completed</span>;
    }
    return <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold"><Clock className="w-3 h-3" /> Active</span>;
  };

  const stats = {
    active: homework.filter((h) => h.status === 'active').length,
    pending: homework.filter((h) => h.submittedCount < h.totalStudents).length,
    completed: homework.filter((h) => h.status === 'completed').length,
  };

  return (
    <PageWrapper title={t('homework')} icon={<BookOpen className="w-6 h-6" />}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card variant="outlined" className="text-center">
          <div className="text-3xl font-bold text-blue-600">{stats.active}</div>
          <p className="text-sm text-gray-600">Active Homework</p>
        </Card>
        <Card variant="outlined" className="text-center">
          <div className="text-3xl font-bold text-orange-600">{stats.pending}</div>
          <p className="text-sm text-gray-600">Pending Submissions</p>
        </Card>
        <Card variant="outlined" className="text-center">
          <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
          <p className="text-sm text-gray-600">Completed</p>
        </Card>
      </div>

      {/* Create Button */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">Homework List</h2>
        <Button icon={<Plus className="w-4 h-4" />} onClick={() => handleOpenModal()}>
          Create Homework
        </Button>
      </div>

      {/* Homework List */}
      <div className="space-y-4">
        {homework.map((hw) => (
          <Card key={hw.id} className="hover:shadow-md transition">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:items-start md:justify-between">
              <div className="md:col-span-2">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg text-primary">{hw.title}</h3>
                    <p className="text-sm text-gray-600">{hw.subject} • {hw.class}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 pl-6">{hw.description}</p>
              </div>

              <div className="md:col-span-1">
                <div className="mb-2">
                  {getStatusBadge(hw.status, hw.dueDate)}
                </div>
                <p className="text-sm text-gray-600">
                  Due: <span className="font-semibold">{format(new Date(hw.dueDate), 'dd MMM yyyy')}</span>
                </p>
              </div>

              <div className="md:col-span-1">
                <div className="mb-3">
                  <div className="text-sm text-gray-600 mb-1">Submissions</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${(hw.submittedCount / hw.totalStudents) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {hw.submittedCount}/{hw.totalStudents} submitted
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(hw.id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(hw.id, hw.title)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{editingId ? 'Edit Homework' : 'Create New Homework'}</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Subject</option>
                  <option value="Math">Math</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="Social Studies">Social Studies</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Chapter 5 Exercises"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter homework description..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                  <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                  <select
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Grade 9A">Grade 9A</option>
                    <option value="Grade 9B">Grade 9B</option>
                    <option value="Grade 8A">Grade 8A</option>
                    <option value="Grade 8B">Grade 8B</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleCloseModal} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="flex-1">
                  {editingId ? 'Update' : 'Create'} Homework
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </PageWrapper>
  );
};
