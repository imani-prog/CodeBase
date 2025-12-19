import { useState } from 'react';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Calendar,
  Plus,
  Filter,
  Search,
  Edit,
  Trash2,
  ChevronRight
} from 'lucide-react';

const TasksFollowups = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample tasks data
  const tasks = {
    pending: [
      {
        id: 1,
        title: 'Follow-up Blood Pressure Check',
        patient: 'Sarah Wanjiru',
        patientId: 'PT-2023-001',
        priority: 'high',
        dueDate: '2024-10-25',
        dueTime: '2:00 PM',
        description: 'Check blood pressure after medication adjustment',
        category: 'Medical Follow-up'
      },
      {
        id: 2,
        title: 'Medication Adherence Check',
        patient: 'John Kamau',
        patientId: 'PT-2023-045',
        priority: 'urgent',
        dueDate: '2024-10-25',
        dueTime: '4:00 PM',
        description: 'Verify patient is taking prescribed medications correctly',
        category: 'Medication'
      },
      {
        id: 3,
        title: 'Nutrition Counseling Session',
        patient: 'Grace Akinyi',
        patientId: 'PT-2023-156',
        priority: 'normal',
        dueDate: '2024-10-26',
        dueTime: '10:00 AM',
        description: 'Discuss meal planning and dietary improvements',
        category: 'Education'
      },
      {
        id: 4,
        title: 'Home Safety Assessment',
        patient: 'Peter Ochieng',
        patientId: 'PT-2023-112',
        priority: 'normal',
        dueDate: '2024-10-27',
        dueTime: '11:00 AM',
        description: 'Evaluate home environment for elderly patient',
        category: 'Assessment'
      },
      {
        id: 5,
        title: 'Prenatal Check-in',
        patient: 'Mary Njoki',
        patientId: 'PT-2023-089',
        priority: 'high',
        dueDate: '2024-10-28',
        dueTime: '9:00 AM',
        description: 'Monitor pregnancy progress and address concerns',
        category: 'Medical Follow-up'
      }
    ],
    inProgress: [
      {
        id: 6,
        title: 'Diabetes Education Series',
        patient: 'David Mwangi',
        patientId: 'PT-2023-201',
        priority: 'normal',
        startedDate: '2024-10-20',
        description: 'Ongoing education about diabetes management',
        category: 'Education',
        progress: 60
      },
      {
        id: 7,
        title: 'Mental Health Check-in',
        patient: 'Jane Wambui',
        patientId: 'PT-2023-178',
        priority: 'high',
        startedDate: '2024-10-23',
        description: 'Weekly mental health support and counseling',
        category: 'Medical Follow-up',
        progress: 40
      }
    ],
    completed: [
      {
        id: 8,
        title: 'Initial Health Assessment',
        patient: 'Grace Akinyi',
        patientId: 'PT-2023-156',
        completedDate: '2024-10-22',
        notes: 'Completed comprehensive health assessment. Patient responding well to treatment.',
        category: 'Assessment'
      },
      {
        id: 9,
        title: 'Medication Review',
        patient: 'Sarah Wanjiru',
        patientId: 'PT-2023-001',
        completedDate: '2024-10-21',
        notes: 'Reviewed all medications. No changes needed. Patient adherent.',
        category: 'Medication'
      }
    ]
  };

  const stats = [
    { label: 'Pending Tasks', value: tasks.pending.length, color: 'blue' },
    { label: 'In Progress', value: tasks.inProgress.length, color: 'blue' },
    { label: 'Due Today', value: '2', color: 'blue' },
    { label: 'Completed This Week', value: '12', color: 'blue' }
  ];

  const tabs = [
    { id: 'pending', label: 'Pending', count: tasks.pending.length },
    { id: 'inProgress', label: 'In Progress', count: tasks.inProgress.length },
    { id: 'completed', label: 'Completed', count: tasks.completed.length }
  ];


  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-800';
      case 'high':
        return 'text-orange-800';
      default:
        return 'text-blue-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Medical Follow-up':
        return 'text-blue-800';
      case 'Medication':
        return 'text-blue-800';
      case 'Education':
        return 'text-blue-800';
      case 'Assessment':
        return 'text-blue-800';
      default:
        return 'text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks & Follow-ups</h1>
          <p className="mt-2">
            Manage patient tasks and follow-up activities
          </p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-md">
          <Plus className="w-5 h-5" />
          <span>New Task</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <p className="mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'tborder-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Pending Tasks */}
      {activeTab === 'pending' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {tasks.pending.map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow max-w-md `}
            >
              <div className="flex flex-col mb-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-base font-bold">{task.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getPriorityBadge(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor(task.category)}`}>
                      {task.category}
                    </span>
                  </div>
                  <p className="mb-3">{task.description}</p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center text-gray-700 text-sm">
                      <User className="w-4 h-4 mr-2 text-blue-600" />
                      <div>
                        <p className="font-medium">{task.patient}</p>
                        <p className="text-xs text-gray-500">{task.patientId}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-700 text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      <div>
                        <p className="font-medium">{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        <p className="text-xs text-gray-500">Due Date</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-700 text-sm">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      <div>
                        <p className="font-medium">{task.dueTime}</p>
                        <p className="text-xs text-gray-500">Due Time</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors">
                      <CheckCircle className="w-3 h-3" />
                      <span>Complete</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors">
                      <ChevronRight className="w-3 h-3" />
                      <span>Start</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded font-medium transition-colors">
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button className="p-1.5 border border-red-300 hover:bg-red-50 text-red-600 rounded transition-colors">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* In Progress Tasks */}
      {activeTab === 'inProgress' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {tasks.inProgress.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 max-w-md"
            >
              <div className="flex flex-col mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                    <h3 className="text-base font-bold">{task.title}</h3>
                  </div>
                  <div className="mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor(task.category)}`}>
                      {task.category}
                    </span>
                  </div>
                  <p className="mb-3">{task.description}</p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center text-gray-700">
                      <User className="w-4 h-4 mr-2 text-blue-600" />
                      <div>
                        <p className="font-medium">{task.patient}</p>
                        <p className="text-xs text-gray-500">{task.patientId}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-700 text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      <div>
                        <p className="font-medium">Started: {new Date(task.startedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-700">Progress</span>
                      <span className="text-xs font-semibold text-gray-700">{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors">
                      <CheckCircle className="w-3 h-3" />
                      <span>Complete</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded font-medium transition-colors">
                      <Edit className="w-3 h-3" />
                      <span>Update</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completed Tasks */}
      {activeTab === 'completed' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {tasks.completed.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 max-w-md"
            >
              <div className="flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <h3 className="text-base font-bold">{task.title}</h3>
                  </div>
                  <div className="mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor(task.category)}`}>
                      {task.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <User className="w-4 h-4 mr-2 text-blue-600" />
                    <div>
                      <p className="font-medium">{task.patient}</p>
                      <p className="text-xs text-gray-500">{task.patientId}</p>
                    </div>
                  </div>

                  <div className="p-2">
                    <p className="text-gray-700">
                      <span className="font-semibold">Completed:</span> {new Date(task.completedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-gray-700 mt-1">
                      <span className="font-semibold">Notes:</span> {task.notes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksFollowups;
