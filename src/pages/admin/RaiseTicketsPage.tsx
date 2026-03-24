import React, { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { AlertCircle, Ticket, Send, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface RaisedTicket {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'issue' | 'bug' | 'feature';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdDate: string;
  raisedBy: string;
  attachments?: string[];
  notes?: string;
}

const DUMMY_TICKETS: RaisedTicket[] = [
  {
    id: 'TKT001',
    title: 'Login page loading slowly',
    description: 'The admin login page is taking more than 10 seconds to load. This is affecting user experience.',
    category: 'issue',
    priority: 'high',
    status: 'in-progress',
    createdDate: '22/3/2026',
    raisedBy: 'Admin - Cambridge School',
  },
  {
    id: 'TKT002',
    title: 'Student data export not working',
    description: 'When trying to export student data to Excel, the system throws an error. Tried multiple times.',
    category: 'bug',
    priority: 'critical',
    status: 'open',
    createdDate: '22/3/2026',
    raisedBy: 'Admin - St. Xavier School',
  },
  {
    id: 'TKT003',
    title: 'Attendance chart colors incorrect',
    description: 'The attendance pie chart is showing wrong colors. Green should be present, red for absent.',
    category: 'bug',
    priority: 'low',
    status: 'resolved',
    createdDate: '21/3/2026',
    raisedBy: 'Admin - Delhi Public School',
  },
  {
    id: 'TKT004',
    title: 'Request: Dark mode theme',
    description: 'Many admins are requesting a dark mode theme for the dashboard to reduce eye strain during long work hours.',
    category: 'feature',
    priority: 'medium',
    status: 'open',
    createdDate: '20/3/2026',
    raisedBy: 'Admin - Mount Carmel School',
  },
];

export const RaiseTicketsPage = () => {
  const [tickets, setTickets] = useState<RaisedTicket[]>(DUMMY_TICKETS);
  const [showRaiseForm, setShowRaiseForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<RaisedTicket | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'technical' as const,
    priority: 'medium' as const,
  });

  const handleRaiseTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('Please fill all fields');
      return;
    }

    const newTicket: RaisedTicket = {
      id: `TKT${String(tickets.length + 1).padStart(3, '0')}`,
      ...formData,
      status: 'open',
      createdDate: new Date().toLocaleDateString('en-IN'),
      raisedBy: 'Admin - Current School',
    };

    setTickets([newTicket, ...tickets]);
    setFormData({ title: '', description: '', category: 'technical', priority: 'medium' });
    setShowRaiseForm(false);
    alert('✅ Ticket raised successfully! Ticket ID: ' + newTicket.id);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle size={16} />;
      case 'in-progress':
        return <Clock size={16} />;
      case 'resolved':
        return <CheckCircle size={16} />;
      default:
        return <Ticket size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;

  return (
    <PageWrapper title="Raise Support Tickets">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Ticket size={32} className="text-orange-600" />
                Support Tickets
              </h1>
              <p className="text-slate-600 mt-2">Raise and track issues, bugs, and technical problems</p>
            </div>
            <Button
              onClick={() => setShowRaiseForm(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white gap-2"
            >
              <AlertTriangle size={18} />
              Raise Ticket
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-xs text-slate-600 uppercase font-medium mb-2">Total Tickets</p>
            <p className="text-3xl font-bold text-slate-900">{tickets.length}</p>
            <p className="text-xs text-slate-500 mt-2">All time</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-slate-600 uppercase font-medium mb-2">Open</p>
            <p className="text-3xl font-bold text-red-600">{openTickets}</p>
            <p className="text-xs text-slate-500 mt-2">Pending</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-slate-600 uppercase font-medium mb-2">In Progress</p>
            <p className="text-3xl font-bold text-blue-600">{inProgressTickets}</p>
            <p className="text-xs text-slate-500 mt-2">Being worked on</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-slate-600 uppercase font-medium mb-2">Resolved</p>
            <p className="text-3xl font-bold text-green-600">{resolvedTickets}</p>
            <p className="text-xs text-slate-500 mt-2">Fixed</p>
          </Card>
        </div>

        {/* Raise Ticket Form Modal */}
        {showRaiseForm && (
          <Card className="p-6 bg-blue-50 border-2 border-blue-300">
            <h2 className="text-2xl font-bold mb-4">Raise New Support Ticket</h2>
            <form onSubmit={handleRaiseTicket} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ticket Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Brief title of the issue"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of the issue, steps to reproduce, and impact"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="technical">Technical Glitch</option>
                    <option value="issue">System Issue</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
                >
                  <Send size={18} />
                  Raise Ticket
                </button>
                <button
                  type="button"
                  onClick={() => setShowRaiseForm(false)}
                  className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Card>
        )}

        {/* Tickets List */}
        <div className="space-y-3">
          {tickets.map(ticket => (
            <Card
              key={ticket.id}
              onClick={() => {
                setSelectedTicket(ticket);
                setShowDetails(true);
              }}
              className="p-4 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-900">{ticket.title}</h3>
                    <Badge className={`text-xs flex items-center gap-1 ${getStatusColor(ticket.status)}`}>
                      {getStatusIcon(ticket.status)}
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-600 mb-2">
                    <div>
                      <span className="font-semibold">ID:</span> {ticket.id}
                    </div>
                    <div>
                      <span className="font-semibold">Category:</span> {ticket.category}
                    </div>
                    <div>
                      <Badge className={`text-xs ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-semibold">Raised:</span> {ticket.createdDate}
                    </div>
                    <div>
                      <span className="font-semibold">By:</span> {ticket.raisedBy}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">{ticket.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Ticket Details Modal */}
        {showDetails && selectedTicket && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-screen overflow-y-auto p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Ticket #{selectedTicket.id}</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Title</p>
                  <p className="text-lg font-bold text-gray-900">{selectedTicket.title}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Status</p>
                    <Badge className={`text-sm mt-1 flex items-center gap-1 w-fit ${getStatusColor(selectedTicket.status)}`}>
                      {getStatusIcon(selectedTicket.status)}
                      {selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Priority</p>
                    <Badge className={`text-sm mt-1 w-fit ${getPriorityColor(selectedTicket.priority)}`}>
                      {selectedTicket.priority.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Category</p>
                    <p className="text-gray-900">{selectedTicket.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Raised Date</p>
                    <p className="text-gray-900">{selectedTicket.createdDate}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-600">Raised By</p>
                  <p className="text-gray-900">{selectedTicket.raisedBy}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">Description</p>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded">{selectedTicket.description}</p>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Info Box */}
        <Card className="bg-blue-50 border border-blue-200 p-4">
          <div className="flex gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-blue-900">How to Use Support Tickets</p>
              <p className="text-sm text-blue-700 mt-1">
                Raise a ticket whenever you encounter technical issues, bugs, or need features. Provide detailed descriptions with steps to reproduce. SuperAdmins will review and respond to your tickets. Track progress in real-time.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};
