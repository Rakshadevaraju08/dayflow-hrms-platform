import React from 'react';
import { 
  Search, Plus, Filter, Download, ChevronDown, MoreHorizontal 
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../lib/utils';

// Mock Data
const SUMMARY = [
  { label: 'Total Employees', value: '142' },
  { label: 'Active', value: '128' },
  { label: 'On Leave', value: '12' },
  { label: 'New This Month', value: '6' },
];

const EMPLOYEES = [
  { id: 'DF-042', name: 'Arjun Mehta', email: 'arjun.m@dayflow.co', role: 'Software Engineer', dept: 'Engineering', location: 'Bengaluru, India', joined: 'Oct 12, 2024', type: 'Full-time', status: 'Active' },
  { id: 'DF-055', name: 'Priya Sharma', email: 'priya.s@dayflow.co', role: 'Product Manager', dept: 'Product', location: 'Remote', joined: 'Jan 05, 2025', type: 'Full-time', status: 'On Leave' },
  { id: 'DF-089', name: 'Rohan Kumar', email: 'rohan.k@dayflow.co', role: 'UX Designer', dept: 'Design', location: 'Mumbai, India', joined: 'Mar 18, 2025', type: 'Contract', status: 'Active' },
  { id: 'DF-091', name: 'Sneha Patel', email: 'sneha.p@dayflow.co', role: 'QA Engineer', dept: 'Engineering', location: 'Bengaluru, India', joined: 'Apr 22, 2025', type: 'Full-time', status: 'Inactive' },
  { id: 'DF-104', name: 'Michael Chen', email: 'michael.c@dayflow.co', role: 'Data Analyst', dept: 'Data', location: 'Remote', joined: 'Jun 01, 2025', type: 'Full-time', status: 'Active' },
  { id: 'DF-112', name: 'Sarah Jones', email: 'sarah.j@dayflow.co', role: 'HR Business Partner', dept: 'Human Resources', location: 'New York, USA', joined: 'Aug 15, 2025', type: 'Full-time', status: 'Active' },
];

const FILTERS = ['Columns', 'Department', 'Site/Location', 'Employment Type', 'Status', 'Role'];

export function Employees() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-surface-900 mb-1">People</h1>
          <p className="text-surface-500 font-medium">Manage your organization's workforce.</p>
        </div>
        <Button className="shrink-0">
          <Plus size={18} className="mr-2" /> Add Employee
        </Button>
      </div>

      {/* Summary Metrics */}
      <div className="flex gap-8 border-y border-surface-200 py-4 overflow-x-auto hide-scrollbar">
        {SUMMARY.map((item, idx) => (
          <div key={idx} className={cn("flex flex-col min-w-[120px]", idx !== 0 && "pl-8 border-l border-surface-200")}>
            <span className="text-2xl font-bold text-surface-900">{item.value}</span>
            <span className="text-sm font-semibold text-surface-500">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="space-y-4">
        
        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          
          <div className="flex flex-wrap gap-2 items-center">
            {FILTERS.map((filter) => (
              <button 
                key={filter}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-white border border-surface-200 rounded-full hover:bg-surface-50 text-surface-700 transition-colors"
              >
                {filter} <ChevronDown size={14} className="text-surface-400" />
              </button>
            ))}
          </div>

          <div className="flex gap-2 items-center lg:justify-end shrink-0 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" size={16} />
              <Input placeholder="Search employees..." className="pl-9 h-9 text-sm rounded-full" />
            </div>
            <Button variant="outline" size="sm" className="h-9 px-3 rounded-full">
              <Filter size={16} />
            </Button>
            <Button variant="outline" size="sm" className="h-9 px-3 rounded-full">
              <Download size={16} />
            </Button>
          </div>
        </div>

        {/* Employee Table */}
        <Card className="border-transparent shadow-soft overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs font-semibold text-surface-500 uppercase bg-surface-50 border-b border-surface-100">
                <tr>
                  <th className="px-6 py-5 font-semibold tracking-wider">Employee</th>
                  <th className="px-6 py-5 font-semibold tracking-wider">ID</th>
                  <th className="px-6 py-5 font-semibold tracking-wider">Job Title</th>
                  <th className="px-6 py-5 font-semibold tracking-wider">Department</th>
                  <th className="px-6 py-5 font-semibold tracking-wider">Location</th>
                  <th className="px-6 py-5 font-semibold tracking-wider">Joining Date</th>
                  <th className="px-6 py-5 font-semibold tracking-wider">Type</th>
                  <th className="px-6 py-5 font-semibold tracking-wider">Status</th>
                  <th className="px-6 py-5 font-semibold tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {EMPLOYEES.map((emp) => (
                  <tr key={emp.id} className="hover:bg-surface-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm shrink-0">
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-surface-900">{emp.name}</p>
                          <p className="text-xs font-medium text-surface-500">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-surface-600">{emp.id}</td>
                    <td className="px-6 py-4 text-surface-700 font-medium">{emp.role}</td>
                    <td className="px-6 py-4 text-surface-600">{emp.dept}</td>
                    <td className="px-6 py-4 text-surface-600">{emp.location}</td>
                    <td className="px-6 py-4 text-surface-600">{emp.joined}</td>
                    <td className="px-6 py-4 text-surface-600">{emp.type}</td>
                    <td className="px-6 py-4">
                      <Badge variant={emp.status === 'Active' ? 'success' : emp.status === 'On Leave' ? 'warning' : 'default'} className="px-2.5 py-1 text-xs">
                        {emp.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-surface-400 hover:text-surface-900 hover:bg-surface-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-surface-100 flex items-center justify-between text-sm text-surface-500">
            <span>Showing 1 to 6 of 142 employees</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
