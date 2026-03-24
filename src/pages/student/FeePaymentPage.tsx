import React from 'react';
import { DollarSign, CheckCircle, AlertCircle, Download, TrendingUp, Calendar } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { PageWrapper } from '../../components/layout/PageWrapper';

interface FeeRecord {
  id: string;
  month: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate?: string;
  transactionId?: string;
}

const FEE_RECORDS: FeeRecord[] = [
  { id: '1', month: 'March 2024', amount: 5000, status: 'paid', dueDate: '2024-03-01', paidDate: '2024-03-01', transactionId: 'TXN-001234' },
  { id: '2', month: 'February 2024', amount: 5000, status: 'paid', dueDate: '2024-02-01', paidDate: '2024-02-02', transactionId: 'TXN-001233' },
  { id: '3', month: 'January 2024', amount: 5000, status: 'paid', dueDate: '2024-01-01', paidDate: '2024-01-03', transactionId: 'TXN-001232' },
  { id: '4', month: 'December 2023', amount: 5000, status: 'paid', dueDate: '2023-12-01', paidDate: '2023-12-05', transactionId: 'TXN-001231' },
  { id: '5', month: 'November 2023', amount: 5000, status: 'paid', dueDate: '2023-11-01', paidDate: '2023-11-08', transactionId: 'TXN-001230' }
];

export const FeePaymentPage: React.FC = () => {

  const totalOutstanding = 0;
  const totalPaid = FEE_RECORDS.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);
  const feePerMonth = 5000;

  return (
    <PageWrapper title="Fees">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <DollarSign size={32} className="text-blue-600" />
            Fee Status & Details
          </h1>
          <p className="text-slate-600 mt-2">View your fees, payment status, and history</p>
        </div>

        {/* Fee Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 uppercase tracking-wide font-medium mb-2">Total Paid This Year</p>
                <p className="text-3xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle size={24} className="text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 uppercase tracking-wide font-medium mb-2">Outstanding Balance</p>
                <p className="text-3xl font-bold text-blue-600">₹{totalOutstanding.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <AlertCircle size={24} className="text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 uppercase tracking-wide font-medium mb-2">Current Month Fee</p>
                <p className="text-3xl font-bold text-amber-600">₹{feePerMonth.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <Calendar size={24} className="text-amber-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Fee Statistics */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-200 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-600" />
            Fee Statistics
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{FEE_RECORDS.filter(f => f.status === 'paid').length}</p>
              <p className="text-sm text-slate-700 mt-2">Paid Months</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <p className="text-2xl font-bold text-amber-600">{FEE_RECORDS.filter(f => f.status === 'pending').length}</p>
              <p className="text-sm text-slate-700 mt-2">Pending</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{FEE_RECORDS.filter(f => f.status === 'overdue').length}</p>
              <p className="text-sm text-slate-700 mt-2">Overdue</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{FEE_RECORDS.length}</p>
              <p className="text-sm text-slate-700 mt-2">Total Records</p>
            </div>
          </div>
        </Card>

        {/* Fee History */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Fee History & Details</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Month</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Fee Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Due Date</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Paid Date</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {FEE_RECORDS.map((record, idx) => (
                  <tr
                    key={record.id}
                    className={`border-b border-slate-100 transition-colors ${
                      idx % 2 === 0 ? 'bg-white hover:bg-slate-50' : 'bg-slate-50/50 hover:bg-slate-100'
                    }`}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">{record.month}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">₹{record.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{new Date(record.dueDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {record.paidDate ? new Date(record.paidDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700 font-mono">
                      {record.transactionId || '-'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge
                        className={
                          record.status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : record.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }
                      >
                        {record.status === 'paid' ? '✓ Paid' : record.status === 'pending' ? '⏱ Pending' : '✗ Overdue'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Payment Status */}
        <Card className="bg-green-50 border border-green-200 p-6">
          <div className="flex gap-4">
            <CheckCircle size={24} className="text-green-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-green-900 text-lg">Payment Status</p>
              <p className="text-sm text-green-800 mt-2">
                All fees are paid up! No outstanding balance. Next fee due on April 1, 2024.
              </p>
            </div>
          </div>
        </Card>

        {/* Information Box */}
        <Card className="bg-blue-50 border border-blue-200 p-6">
          <h4 className="font-semibold text-blue-900 mb-3">Fee Information</h4>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Monthly fee: ₹{feePerMonth.toLocaleString()}</li>
            <li>• Due date: 1st of every month</li>
            <li>• Late fee after 15 days of due date</li>
            <li>• For payment inquiries, contact the school office</li>
          </ul>
        </Card>
      </div>
    </PageWrapper>
  );
};