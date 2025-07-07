'use client'
import CloseIcon from '@/components/Icons/CloseIcon.svg';
import FollowIcon from '@/components/Icons/FollowIcon.svg';
import OpenEmailIcon from '@/components/Icons/OpenEmailIcon.svg';
import DynamicTable from '@/components/Table';
import { useState } from 'react';

const MyApplications = () => {
  const [data, setData] = useState([
    {
      id: 1,
      position: 'UI/UX Designer',
      company: 'Tech Innovations Inc.',
      status: 'Applied',
      jobLocation: 'Remote',
      employmentType: 'Full Time',
      appliedOn: '2025-03-10',
      salary: '$85,000',
      followUp: false
    },
    {
      id: 2,
      position: 'Marketing Manager',
      company: 'Global Advertisers LLC',
      status: 'Submitted',
      jobLocation: 'On-site',
      employmentType: 'Part Time',
      appliedOn: '2025-03-10',
      salary: '$65,000',
      followUp: true
    },
    {
      id: 3,
      position: 'Software Engineer',
      company: 'CodeCraft Systems',
      status: 'Rejected',
      jobLocation: 'Hybrid',
      employmentType: 'Contract',
      appliedOn: '2025-03-09',
      salary: '$95,000',
      followUp: false
    },
    {
      id: 4,
      position: 'Data Analyst',
      company: 'InfoMetrics Solutions',
      status: 'Interview Scheduled',
      jobLocation: 'Remote',
      employmentType: 'Full Time',
      appliedOn: '2025-03-08',
      salary: '$75,000',
      followUp: true
    },
    {
      id: 5,
      position: 'Product Manager',
      company: 'Visionary Products',
      status: 'Offer Received',
      jobLocation: 'On-site',
      employmentType: 'Full Time',
      appliedOn: '2025-03-05',
      salary: '$110,000',
      followUp: false
    },
    {
      id: 6,
      position: 'DevOps Engineer',
      company: 'CloudNative Tech',
      status: 'Under Review',
      jobLocation: 'Hybrid',
      employmentType: 'Full Time',
      appliedOn: '2025-03-04',
      salary: '$120,000',
      followUp: true
    },
  ]);

  const [filters, setFilters] = useState({
    position: '',
    company: '',
    jobLocation: '',
    employmentType: '',
    status: '',
    appliedOn: ''
  });

  const handleFilterChange = (column, value) => {
    setFilters(prev => ({ ...prev, [column]: value }));
  };

  const handleAction = (id, actionType) => {
    switch (actionType) {
      case 'withdraw':
        setData(data.filter(item => item.id !== id));
        break;
      case 'follow':
        setData(data.map(item => 
          item.id === id ? { ...item, followUp: !item.followUp } : item
        ));
        break;
      case 'email':
        alert(`Opening email for application ${id}`);
        break;
      default:
        break;
    }
  };

  const filteredData = data.filter(row => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return String(row[key]).toLowerCase().includes(value.toLowerCase());
    });
  });

  const statusStyles = {
    Applied: 'text-[#707070] bg-[#70707026]',
    Submitted: 'text-[#17C653] bg-[#17C6531A]',
    Rejected: 'text-[#FF6B6B] bg-[#FF6B6B1A]',
    'Interview Scheduled': 'text-[#FFA500] bg-[#FFA5001A]',
    'Under Review': 'text-[#3498db] bg-[#3498db1A]',
    'Offer Received': 'text-[#9b59b6] bg-[#9b59b61A]'
  };

  const columns = [
    { 
      header: 'Position', 
      accessor: 'position',
      filter: true,
      render: (row) => (
        <div>
          <div className="font-medium text-[#191919]">{row.position}</div>
          <div className="text-xs text-[#666666]">{row.company}</div>
        </div>
      )
    },
    { 
      header: 'Job Location', 
      accessor: 'jobLocation',
      filter: true 
    },
    { 
      header: 'Employment Type', 
      accessor: 'employmentType',
      filter: true 
    },
    { 
      header: 'Status', 
      accessor: 'status',
      filter: true,
      render: (row) => (
        <span className={`px-2 py-1 text-xs rounded-full ${statusStyles[row.status]}`}>
          {row.status}
        </span>
      )
    },
    { 
      header: 'Salary', 
      accessor: 'salary',
      filter: false 
    },
    { 
      header: 'Applied On', 
      accessor: 'appliedOn',
      filter: true,
      render: (row) => new Date(row.appliedOn).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    },
    { 
      header: 'Actions', 
      accessor: 'actions',
      filter: false,
      render: (row) => (
        <div className="flex gap-2">
          <button 
            onClick={() => handleAction(row.id, 'withdraw')}
            className="min-h-10 min-w-10 flex justify-center items-center bg-[#FF6B6B1A] rounded-full hover:bg-[#FF6B6B33] transition-colors"
            title="Withdraw application"
          >
            <CloseIcon height={20} width={20} color="#FF6B6B" />
          </button>
          <button 
            onClick={() => handleAction(row.id, 'follow')}
            className={`min-h-10 min-w-10 flex justify-center items-center rounded-full transition-colors ${row.followUp ? 'bg-[#17C65333] hover:bg-[#17C6534D]' : 'bg-[#70707026] hover:bg-[#70707033]'}`}
            title={row.followUp ? 'Unfollow' : 'Follow'}
          >
            <FollowIcon height={20} width={20} color={row.followUp ? "#17C653" : "#707070"} />
          </button>
          <button 
            onClick={() => handleAction(row.id, 'email')}
            className="min-h-10 min-w-10 flex justify-center items-center bg-[#70707026] rounded-full hover:bg-[#70707033] transition-colors"
            title="Send email"
          >
            <OpenEmailIcon height={20} width={20} color="#707070" />
          </button>
        </div>
      )
    },
  ];

  return (
    <div className="p-6">
      <h1 className='font-semibold text-2xl text-[#191919] mb-6'>My Applications</h1>
      <DynamicTable 
        columns={columns} 
        data={filteredData} 
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default MyApplications;