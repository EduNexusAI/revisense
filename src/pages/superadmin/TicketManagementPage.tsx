import React, { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Ticket, CheckCircle, Clock, AlertCircle, MessageSquare, Edit } from 'lucide-react';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'issue' | 'bug' | 'feature';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdDate: string;
  raisedBy: string;
  raisedBySchool: string;
  resolution?: string;
  resolvedDate?: string;
  assignedTo?: string;
}

const DUMMY_TICKETS: SupportTicket[] = [
  {
    id: 'TKT001',
    title: 'Login page loading slowly',
    description: 'The admin login page is taking more than 10 seconds to load. This is affecting user experience.',
    category: 'issue',
    priority: 'high',
    status: 'in-progress',
    createdDate: '22/3/2026',
    raisedBy: 'Admin User',
    raisedBySchool: 'Cambridge International School',
    assignedTo: 'Tech Team',
  },
  {
    id: 'TKT002',
    title: 'Student data export not working',
    description: 'When trying to export student data to Excel, the system throws an error. Tried multiple times.',
    category: 'bug',
    priority: 'critical',
    status: 'open',
    createdDate: '22/3/2026',
    raisedBy: 'Admin User',
    raisedBySchool: 'St. Xavier School',
  },
  {
    id: 'TKT003',
    title: 'Attendance chart colors incorrect',
    description: 'The attendance pie chart is showing wrong colors. Green should be present, red for absent.',
    category: 'bug',
    priority: 'low',
    status: 'resolved',
    createdDate: '21/3/2026',
    raisedBy: 'Admin User',
    raisedBySchool: 'Delhi Public School',
    resolution: 'Fixed color mapping in attendance chart component. Deployed fix to production.',
    resolvedDate: '22/3/2026',
    assignedTo: 'Frontend Team',
  },
  {
    id: 'TKT004',
    title: 'Request: Dark mode theme',
    description: 'Many admins are requesting a dark mode theme to reduce eye strain.',
    category: 'feature',
    priority: 'medium',
    status: 'open',
    createdDate: '20/3/2026',
    raisedBy: 'Admin User',
    raisedBySchool: 'Mount Carmel School',
  },
];

export const TicketManagementPage = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(DUMMY_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [editingStatus, setEditingStatus] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    setTickets(
      tickets.map(ticket =>
        ticket.id === ticketId
          ? {
              ...ticket,
              status: newStatus as any,
              resolvedDate: newStatus === 'resolved' ? new Date().toLocaleDateString('en-IN') : ticket.resolvedDate,
            }
          : ticket
      )
    );
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket({
        ...selectedTicket,
        status: newStatus as any,
      });
    }
    setEditingStatus(null);
    alert(`✅ Ticket #${ticketId} status updated to ${newStatus}`);
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

  const filteredTickets = tickets.filter(ticket => {
    const statusMatch = filterStatus === 'all' || ticket.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || ticket.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const stats = {
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    critical: tickets.filter(t => t.priority === 'critical').length,
  };

  return (
    <PageWrapper title="Ticket Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Ticket size={32} className="text-purple-600" />
                Support Ticket Management
              </h1>
              <p className="text-slate-600 mt-2">Manage and resolve support tickets from schools</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="p-4">
            <p className="text-xs text-slate-600 uppercase font-medium mb-2">Total</p>
            <p className="text-3xl font-bold text-slate-900">{tickets.length}</p>
            <p className="text-xs text-slate-500 mt-2">All tickets</p>
          </Card>
          <Card className="p-4 border-l-4 border-l-red-500">
            <p className="text-xs text-slate-600 uppercase font-medium mb-2">Open</p>
            <p className="text-3xl font-bold text-red-600">{stats.open}</p>
            <p className="text-xs text-slate-500 mt-2">Pending</p>
          </Card>
          <Card className="p-4 border-l-4 border-l-blue-500">
            <p className="text-xs text-slate-600 uppercase font-medium mb-2">In Progress</p>
            <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
            <p className="text-xs text-slate-500 mt-2">Being worked on</p>
          </Card>
          <Card className="p-4 border-l-4 border-l-green-500">
            <p className="text-xs text-slate-600 uppercase font-medium mb-2">Resolved</p>
            <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
            <p className="text-xs text-slate-500 mt-2">Completed</p>
          </Card>
          <Card className="p-4 border-l-4 border-l-rose-500">
            <p className="text-xs text-slate-600 uppercase font-medium mb-2">Critical</p>
            <p className="text-3xl font-bold text-rose-600">{stats.critical}</p>
            <p className="text-xs text-slate-500 mt-2">Priority</p>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-200">
            <label className="text-sm font-medium text-gray-700 block mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div className="flex-1 min-w-200">
            <label className="text-sm font-medium text-gray-700 block mb-2">Filter by Priority</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-3">
          {filteredTickets.map(ticket => (
            <Card key={ticket.id} className="p-4 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between gap-4">
                <div
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setShowDetails(true);
                  }}
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-900">#{ticket.id}</h3>
                    <h4 className="font-semibold text-gray-900">{ticket.title}</h4>
                    <Badge className={`text-xs flex items-center gap-1 ${getStatusColor(ticket.status)}`}>
                      {getStatusIcon(ticket.status)}
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </Badge>
                    <Badge className={`text-xs ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-600 mb-2">
                    <div>
                      <span className="font-semibold">School:</span> {ticket.raisedBySchool}
                    </div>
                    <div>
                      <span className="font-semibold">Category:</span> {ticket.category}
                    </div>
                    <div>
                      <span className="font-semibold">Raised:</span> {ticket.createdDate}
                    </div>
                    <div>
                      <span className="font-semibold">Assigned:</span> {ticket.assignedTo || 'Unassigned'}
                    </div>
                    {ticket.resolvedDate && (
                      <div>
                        <span className="font-semibold">Resolved:</span> {ticket.resolvedDate}
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-1">{ticket.description}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTicket(ticket);
                      setShowDetails(true);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
                  >
                    View
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingStatus(ticket.id);
                    }}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
                  >
                    <Edit size={16} />
                    Update
                  </button>
                </div>
              </div>

              {editingStatus === ticket.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
                  <p className="text-sm font-semibold mb-2">Change Status:</p>
                  <div className="flex gap-2 flex-wrap">
                    {['open', 'in-progress', 'resolved', 'closed'].map(status => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(ticket.id, status)}
                        className="px-3 py-1 bg-white border border-purple-300 rounded hover:bg-purple-50 text-sm font-medium transition-all"
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Ticket Details Modal */}
        {showDetails && selectedTicket && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-3xl max-h-screen overflow-y-auto p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Ticket #{selectedTicket.id}</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Title</p>
                  <p className="text-lg font-bold text-gray-900">{selectedTicket.title}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
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
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Category</p>
                    <p className="text-gray-900">{selectedTicket.category}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">School</p>
                    <p className="text-gray-900">{selectedTicket.raisedBySchool}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Raised By</p>
                    <p className="text-gray-900">{selectedTicket.raisedBy}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Created Date</p>
                    <p className="text-gray-900">{selectedTicket.createdDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Assigned To</p>
                    <p className="text-gray-900">{selectedTicket.assignedTo || 'Unassigned'}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">Description</p>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded">{selectedTicket.description}</p>
                </div>

                {selectedTicket.resolution && (
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">Resolution</p>
                    <p className="text-gray-900 bg-green-50 p-4 rounded">{selectedTicket.resolution}</p>
                  </div>
                )}

                {selectedTicket.resolvedDate && (
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Resolved Date</p>
                    <p className="text-gray-900">{selectedTicket.resolvedDate}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Info Box */}
        <Card className="bg-purple-50 border border-purple-200 p-4">
          <div className="flex gap-3">
            <MessageSquare className="text-purple-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-purple-900">Ticket Management Guide</p>
              <p className="text-sm text-purple-700 mt-1">
                Review tickets from schools, update their status (Open → In Progress → Resolved), and provide resolutions. Critical and high-priority tickets require immediate attention. All changes are tracked for audit purposes.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};
