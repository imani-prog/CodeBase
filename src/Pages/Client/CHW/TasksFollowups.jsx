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
    { label: 'In Progress', value: tasks.inProgress.length, color: 'yellow' },
    { label: 'Due Today', value: '2', color: 'red' },
    { label: 'Completed This Week', value: '12', color: 'green' }
  ];

  const tabs = [
    { id: 'pending', label: 'Pending', count: tasks.pending.length },
    { id: 'inProgress', label: 'In Progress', count: tasks.inProgress.length },
    { id: 'completed', label: 'Completed', count: tasks.completed.length }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'border-red-500 bg-red-50';
      case 'high':
        return 'border-orange-500 bg-orange-50';
      default:
        return 'border-blue-500 bg-blue-50';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Medical Follow-up':
        return 'bg-purple-100 text-purple-800';
      case 'Medication':
        return 'bg-green-100 text-green-800';
      case 'Education':
        return 'bg-blue-100 text-blue-800';
      case 'Assessment':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks & Follow-ups</h1>
          <p className="text-gray-600 mt-2">
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
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
      <div className="bg-white rounded-xl shadow-md p-2">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
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
        <div className="space-y-4">
          {tasks.pending.map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-xl shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow ${getPriorityColor(task.priority)}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(task.category)}`}>
                      {task.category}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{task.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-gray-700">
                      <User className="w-5 h-5 mr-2 text-blue-600" />
                      <div>
                        <p className="font-semibold">{task.patient}</p>
                        <p className="text-sm text-gray-500">{task.patientId}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                      <div>
                        <p className="font-semibold">{new Date(task.dueDate).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500">Due Date</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      <div>
                        <p className="font-semibold">{task.dueTime}</p>
                        <p className="text-sm text-gray-500">Due Time</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
                      <CheckCircle className="w-4 h-4" />
                      <span>Mark Complete</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                      <ChevronRight className="w-4 h-4" />
                      <span>Start Task</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold transition-colors">
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button className="p-2 border border-red-300 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
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
        <div className="space-y-4">
          {tasks.inProgress.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                    <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(task.category)}`}>
                      {task.category}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{task.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-700">
                      <User className="w-5 h-5 mr-2 text-blue-600" />
                      <div>
                        <p className="font-semibold">{task.patient}</p>
                        <p className="text-sm text-gray-500">{task.patientId}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                      <div>
                        <p className="font-semibold">Started: {new Date(task.startedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Progress</span>
                      <span className="text-sm font-semibold text-gray-700">{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-yellow-500 h-3 rounded-full transition-all"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
                      <CheckCircle className="w-4 h-4" />
                      <span>Complete Task</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold transition-colors">
                      <Edit className="w-4 h-4" />
                      <span>Update Progress</span>
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
        <div className="space-y-4">
          {tasks.completed.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(task.category)}`}>
                      {task.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-700 mb-4">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    <div>
                      <p className="font-semibold">{task.patient}</p>
                      <p className="text-sm text-gray-500">{task.patientId}</p>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Completed:</span> {new Date(task.completedDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
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
