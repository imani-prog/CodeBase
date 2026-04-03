import { useEffect, useState } from 'react';
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
  ChevronRight,
  X,
  Save
} from 'lucide-react';
import { syncTaskWorkItems } from '../../../Services/chwAssignmentsStore';

const CHW_TASK_META = {
  chwId: 1,
  chwCode: 'CHW-001',
  chwName: 'Grace Akinyi Achieng',
};

const CATEGORIES = ['Medical Follow-up', 'Medication', 'Education', 'Assessment', 'Other'];
const PRIORITIES = ['normal', 'high', 'urgent'];

const emptyForm = {
  title: '',
  patient: '',
  patientId: '',
  priority: 'normal',
  category: 'Medical Follow-up',
  dueDate: '',
  dueTime: '',
  description: ''
};

const TasksFollowups = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');

  // ── Live task state ──────────────────────────────────────────────────
  const [tasks, setTasks] = useState({
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
  });

  useEffect(() => {
    syncTaskWorkItems(tasks, CHW_TASK_META);
  }, [tasks]);

  //  Modal states
  const [newTaskModal, setNewTaskModal] = useState({ open: false, form: emptyForm, errors: {} });
  const [editModal, setEditModal] = useState({ open: false, task: null, tab: null, form: emptyForm, errors: {} });
  const [completeModal, setCompleteModal] = useState({ open: false, task: null, tab: null, notes: '' });
  const [startModal, setStartModal] = useState({ open: false, task: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, task: null, tab: null });

  //  Helpers
  const today = new Date().toISOString().split('T')[0];

  const filteredList = (list) => {
    if (!searchTerm.trim()) return list;
    const q = searchTerm.toLowerCase();
    return list.filter(t =>
      t.title?.toLowerCase().includes(q) ||
      t.patient?.toLowerCase().includes(q) ||
      t.patientId?.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q) ||
      t.category?.toLowerCase().includes(q)
    );
  };

  const formatTime = (raw) => {
    if (!raw) return '';
    const [h, m] = raw.split(':');
    const hour = parseInt(h, 10);
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  const validateTaskForm = (form, isEdit = false) => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.patient.trim()) errs.patient = 'Patient name is required';
    if (!form.patientId.trim()) errs.patientId = 'Patient ID is required';
    if (!isEdit) {
      if (!form.dueDate) errs.dueDate = 'Due date is required';
      if (!form.dueTime) errs.dueTime = 'Due time is required';
    }
    return errs;
  };

  //  New Task
  const openNewTaskModal = () =>
    setNewTaskModal({ open: true, form: emptyForm, errors: {} });

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTaskModal(prev => ({
      ...prev,
      form: { ...prev.form, [name]: value },
      errors: { ...prev.errors, [name]: '' }
    }));
  };

  const handleNewTaskSubmit = (e) => {
    e.preventDefault();
    const errs = validateTaskForm(newTaskModal.form);
    if (Object.keys(errs).length > 0) {
      setNewTaskModal(prev => ({ ...prev, errors: errs }));
      return;
    }
    const f = newTaskModal.form;
    setTasks(prev => ({
      ...prev,
      pending: [
        ...prev.pending,
        {
          id: Date.now(),
          title: f.title.trim(),
          patient: f.patient.trim(),
          patientId: f.patientId.trim(),
          priority: f.priority,
          category: f.category,
          dueDate: f.dueDate,
          dueTime: formatTime(f.dueTime),
          description: f.description.trim()
        }
      ]
    }));
    setNewTaskModal({ open: false, form: emptyForm, errors: {} });
  };

  //  Edit 
  const openEditModal = (task, tab) => {
    setEditModal({
      open: true,
      task,
      tab,
      form: {
        title: task.title || '',
        patient: task.patient || '',
        patientId: task.patientId || '',
        priority: task.priority || 'normal',
        category: task.category || 'Medical Follow-up',
        dueDate: task.dueDate || task.startedDate || '',
        dueTime: '',
        description: task.description || '',
        progress: task.progress ?? 0
      },
      errors: {}
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditModal(prev => ({
      ...prev,
      form: { ...prev.form, [name]: value },
      errors: { ...prev.errors, [name]: '' }
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const { task, tab, form } = editModal;
    const errs = validateTaskForm(form, true);
    if (Object.keys(errs).length > 0) {
      setEditModal(prev => ({ ...prev, errors: errs }));
      return;
    }
    setTasks(prev => ({
      ...prev,
      [tab]: prev[tab].map(t =>
        t.id === task.id
          ? {
              ...t,
              title: form.title.trim(),
              patient: form.patient.trim(),
              patientId: form.patientId.trim(),
              priority: form.priority,
              category: form.category,
              ...(tab === 'pending' && { dueDate: form.dueDate || t.dueDate }),
              ...(tab === 'inProgress' && { startedDate: form.dueDate || t.startedDate, progress: Number(form.progress ?? t.progress) }),
              ...(form.dueTime && tab === 'pending' && { dueTime: formatTime(form.dueTime) }),
              description: form.description.trim()
            }
          : t
      )
    }));
    setEditModal({ open: false, task: null, tab: null, form: emptyForm, errors: {} });
  };

  //  Start (pending → inProgress) 
  const openStartModal = (task) => setStartModal({ open: true, task });

  const handleStartConfirm = () => {
    const { task } = startModal;
    setTasks(prev => ({
      ...prev,
      pending: prev.pending.filter(t => t.id !== task.id),
      inProgress: [
        ...prev.inProgress,
        { ...task, startedDate: today, progress: 0 }
      ]
    }));
    setStartModal({ open: false, task: null });
  };

  //  Complete (pending or inProgress → completed)
  const openCompleteModal = (task, tab) => setCompleteModal({ open: true, task, tab, notes: '' });

  const handleCompleteSubmit = () => {
    const { task, tab, notes } = completeModal;
    setTasks(prev => ({
      ...prev,
      [tab]: prev[tab].filter(t => t.id !== task.id),
      completed: [
        { ...task, completedDate: today, notes: notes.trim() || 'Task completed successfully' },
        ...prev.completed
      ]
    }));
    setCompleteModal({ open: false, task: null, tab: null, notes: '' });
  };

  //  Delete ────────────────────────────────────────────────────────────
  const openDeleteModal = (task, tab) => setDeleteModal({ open: true, task, tab });

  const handleDeleteConfirm = () => {
    const { task, tab } = deleteModal;
    setTasks(prev => ({
      ...prev,
      [tab]: prev[tab].filter(t => t.id !== task.id)
    }));
    setDeleteModal({ open: false, task: null, tab: null });
  };

  //  Derived stats ─────────────────────────────────────────────────────
  const dueToday = tasks.pending.filter(t => t.dueDate === today).length;

  const stats = [
    { label: 'Pending Tasks', value: tasks.pending.length },
    { label: 'In Progress', value: tasks.inProgress.length },
    { label: 'Due Today', value: dueToday },
    { label: 'Completed', value: tasks.completed.length }
  ];

  const tabs = [
    { id: 'pending', label: 'Pending', count: tasks.pending.length },
    { id: 'inProgress', label: 'In Progress', count: tasks.inProgress.length },
    { id: 'completed', label: 'Completed', count: tasks.completed.length }
  ];


  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-700';
      case 'high': return 'text-orange-700';
      default: return 'text-blue-700';
    }
  };

  const getCategoryColor = () => 'text-blue-700';

  // ── Shared UI pieces ──────────────────────────────────────────────────
  const Field = ({ label, error, children }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
        </p>
      )}
    </div>
  );

  const inputCls = (err) =>
    `w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${err ? 'border-red-500' : 'border-gray-300'}`;

  const TaskFormFields = ({ form, errors, onChange, isEdit }) => (
    <div className="space-y-6">
      {/* Patient Details */}
      <div>
        <p className="text-xs font-semibold  uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-blue-600" /> Patient Details
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Field label="Task Title *" error={errors.title}>
              <input name="title" value={form.title} onChange={onChange}
                className={inputCls(errors.title)} placeholder="e.g. Blood Pressure Check" />
            </Field>
          </div>
          <Field label="Patient Name *" error={errors.patient}>
            <input name="patient" value={form.patient} onChange={onChange}
              className={inputCls(errors.patient)} placeholder="Full name" />
          </Field>
          <Field label="Patient ID *" error={errors.patientId}>
            <input name="patientId" value={form.patientId} onChange={onChange}
              className={inputCls(errors.patientId)} placeholder="PT-2023-XXX" />
          </Field>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Task Details */}
      <div>
        <p className="text-xs font-semibold  uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-blue-600" /> Task Details
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
            <div className="flex items-center gap-2 h-[50px]">
              {['normal', 'high', 'urgent'].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => onChange({ target: { name: 'priority', value: val } })}
                  className={`flex-1 h-full border-2 rounded-xl text-sm font-semibold transition-colors ${
                    form.priority === val
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 text-gray-600 hover:border-blue-400'
                  }`}
                >
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <Field label="Category">
            <select name="category" value={form.category} onChange={onChange} className={inputCls(false)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Schedule */}
      <div>
        <p className="text-xs font-semibold  uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-blue-600" /> Schedule
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label={isEdit ? 'Date' : 'Due Date *'} error={errors.dueDate}>
            <input type="date" name="dueDate" value={form.dueDate} onChange={onChange}
              className={inputCls(errors.dueDate)} />
          </Field>
          <Field label={isEdit ? 'Time (leave blank to keep)' : 'Due Time *'} error={errors.dueTime}>
            <input type="time" name="dueTime" value={form.dueTime} onChange={onChange}
              className={inputCls(errors.dueTime)} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Description">
              <textarea name="description" value={form.description} onChange={onChange} rows={3}
                className={`${inputCls(false)} resize-none`} placeholder="Brief description of the task..." />
            </Field>
          </div>
        </div>
      </div>
    </div>
  );

  const Modal = ({ title, icon: Icon, subtitle, onClose, children, footer }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white shadow-2xl max-w-2xl w-full h-full sm:h-auto sm:max-h-[90vh] flex flex-col rounded-none sm:rounded-2xl">
        <div className="bg-blue-950 border-b border-gray-200 text-white px-4 py-4 sm:px-8 sm:py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg flex-shrink-0">
              {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
              {subtitle && <p className="text-xs sm:text-sm text-blue-200">{subtitle}</p>}
            </div>
          </div>
          <button type="button" onClick={onClose}
            className="font-bold hover:text-blue-600 hover:bg-blue-300 rounded-full transition-colors">
            <X className="w-8 h-8" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">{children}</div>
        {footer && (
          <div className="bg-gray-50 px-4 py-3 sm:px-8 sm:py-4 border-t border-gray-200 flex justify-between items-center gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  const btnPrimary = 'px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl';
  const btnSecondary = 'px-6 py-2.5 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Tasks &amp; Follow-ups</h1>
          
        </div>
        <button
          onClick={openNewTaskModal}
          className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-md text-sm sm:text-base shrink-0"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>New Task</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-4 sm:p-6 border border-gray-200">
            <p className="text-xs sm:text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium shrink-0">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="">
        <div className="flex w-full sm:w-auto sm:inline-flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 py-3 px-4 sm:px-6 border-b-2 font-medium text-xs sm:text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="truncate">{tab.label}</span>
              <span className={`shrink-0 min-w-[1.25rem] px-1.5 py-0.5 rounded-full text-xs font-bold ${
                activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── PENDING TASKS ── */}
      {activeTab === 'pending' && (
        <>
          {/* ── TABLE (lg+) ── */}
          <div className="hidden lg:block bg-white border border-gray-200 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">Task</th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">Patient</th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">Priority</th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">Category</th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">Due Date</th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">Due Time</th>
                  <th className="px-5 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredList(tasks.pending).length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-14 text-center">
                      {searchTerm.trim() ? (
                        <div className="flex flex-col items-center gap-2">
                          <Search className="w-10 h-10 text-gray-300" />
                          <p className="text-gray-600 font-medium">No results for &ldquo;<span className="text-gray-800">{searchTerm}</span>&rdquo;</p>
                          <p className="text-sm text-gray-400">Try a different name, patient ID, or category.</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Clock className="w-10 h-10 text-gray-300" />
                          <p className="text-gray-500 font-medium">No pending tasks</p>
                          <p className="text-sm text-gray-400">All caught up! Add a new task to get started.</p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
                {filteredList(tasks.pending).map((task) => (
                  <tr key={task.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-5 py-4 max-w-[220px]">
                      <p className="font-semibold text-gray-800 leading-snug">{task.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{task.description}</p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-800">{task.patient}</p>
                      <p className="text-xs text-gray-400">{task.patientId}</p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(task.priority)}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryColor()}`}>
                        {task.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-gray-700">
                      {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-gray-700">{task.dueTime}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        <button onClick={() => openCompleteModal(task, 'pending')} className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-900 text-white border border-gray-300 rounded text-xs font-medium transition-colors">
                          <CheckCircle className="w-3 h-3" /><span>Complete</span>
                        </button>
                        <button onClick={() => openStartModal(task)} className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
                          <ChevronRight className="w-3 h-3" /><span>Start</span>
                        </button>
                        <button onClick={() => openEditModal(task, 'pending')} className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-950 rounded text-xs font-medium transition-colors">
                          <Edit className="w-3 h-3" /><span>Edit</span>
                        </button>
                        <button onClick={() => openDeleteModal(task, 'pending')} className="p-1.5 border border-red-300 hover:bg-red-50 text-red-600 rounded transition-colors">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── CARDS (< lg) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {filteredList(tasks.pending).length === 0 && (
              <div className="col-span-2 flex flex-col items-center gap-2 py-12">
                {searchTerm.trim() ? (
                  <>
                    <Search className="w-10 h-10 text-gray-300" />
                    <p className="text-gray-600 font-medium">No results for &ldquo;<span className="text-gray-800">{searchTerm}</span>&rdquo;</p>
                    <p className="text-sm text-gray-400">Try a different name, patient ID, or category.</p>
                  </>
                ) : (
                  <>
                    <Clock className="w-10 h-10 text-gray-300" />
                    <p className="text-gray-500 font-medium">No pending tasks</p>
                    <p className="text-sm text-gray-400">All caught up! Add a new task to get started.</p>
                  </>
                )}
              </div>
            )}
            {filteredList(tasks.pending).map((task) => (
              <div key={task.id} className="bg-white border border-gray-200 p-4 hover:shadow-md transition-shadow flex flex-col gap-3">
                <div>
                  <h3 className="font-bold text-gray-800 leading-snug mb-1">{task.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getPriorityBadge(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor()}`}>
                      {task.category}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{task.description}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-start gap-1.5 text-gray-700">
                    <User className="w-4 h-4 mt-0.5 text-blue-600 shrink-0" />
                    <div>
                      <p className="font-medium leading-tight">{task.patient}</p>
                      <p className="text-xs text-gray-400">{task.patientId}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1.5 text-gray-700">
                    <Calendar className="w-4 h-4 mt-0.5 text-blue-600 shrink-0" />
                    <div>
                      <p className="font-medium leading-tight">
                        {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      <p className="text-xs text-gray-400">Due Date</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1.5 text-gray-700 col-span-2">
                    <Clock className="w-4 h-4 mt-0.5 text-blue-600 shrink-0" />
                    <div>
                      <p className="font-medium leading-tight">{task.dueTime}</p>
                      <p className="text-xs text-gray-400">Due Time</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100">
                  <button onClick={() => openCompleteModal(task, 'pending')} className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-900 text-white border border-gray-300 rounded text-xs font-medium transition-colors">
                    <CheckCircle className="w-3 h-3" /><span>Complete</span>
                  </button>
                  <button onClick={() => openStartModal(task)} className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
                    <ChevronRight className="w-3 h-3" /><span>Start</span>
                  </button>
                  <button onClick={() => openEditModal(task, 'pending')} className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-950 rounded text-xs font-medium transition-colors">
                    <Edit className="w-3 h-3" /><span>Edit</span>
                  </button>
                  <button onClick={() => openDeleteModal(task, 'pending')} className="p-1.5 border border-red-300 hover:bg-red-50 text-red-600 rounded transition-colors">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}

          </div>
        </>
      )}

      {/* ── IN PROGRESS TASKS ── */}
      {activeTab === 'inProgress' && (
        <>
          {/* ── TABLE (lg+) ── */}
          <div className="hidden lg:block bg-white border border-gray-200 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide text-xs">Task</th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide text-xs">Patient</th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide text-xs">Priority</th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide text-xs">Category</th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide text-xs">Started</th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide text-xs w-40">Progress</th>
                  <th className="px-5 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide text-xs">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredList(tasks.inProgress).length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-14 text-center">
                      {searchTerm.trim() ? (
                        <div className="flex flex-col items-center gap-2">
                          <Search className="w-10 h-10 text-gray-300" />
                          <p className="text-gray-600 font-medium">No results for &ldquo;<span className="text-gray-800">{searchTerm}</span>&rdquo;</p>
                          <p className="text-sm text-gray-400">Try a different name, patient ID, or category.</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <AlertCircle className="w-10 h-10 text-gray-300" />
                          <p className="text-gray-500 font-medium">No tasks in progress</p>
                          <p className="text-sm text-gray-400">Start a pending task to see it here.</p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
                {filteredList(tasks.inProgress).map((task) => (
                  <tr key={task.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-5 py-4 max-w-[220px]">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-gray-800 leading-snug">{task.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{task.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-800">{task.patient}</p>
                      <p className="text-xs text-gray-400">{task.patientId}</p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(task.priority)}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryColor()}`}>
                        {task.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-gray-700">
                      {new Date(task.startedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-5 py-4 w-40">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${task.progress}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-gray-600 w-8 text-right">{task.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        <button onClick={() => openCompleteModal(task, 'inProgress')} className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-900 text-white border border-gray-300 rounded text-xs font-medium transition-colors">
                          <CheckCircle className="w-3 h-3" /><span>Complete</span>
                        </button>
                        <button onClick={() => openEditModal(task, 'inProgress')} className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-950 rounded text-xs font-medium transition-colors">
                          <Edit className="w-3 h-3" /><span>Update</span>
                        </button>
                        <button onClick={() => openDeleteModal(task, 'inProgress')} className="p-1.5 border border-red-300 hover:bg-red-50 text-red-600 rounded transition-colors">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── CARDS (< lg) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {filteredList(tasks.inProgress).length === 0 && (
              <div className="col-span-2 flex flex-col items-center gap-2 py-12">
                {searchTerm.trim() ? (
                  <>
                    <Search className="w-10 h-10 text-gray-300" />
                    <p className="text-gray-600 font-medium">No results for &ldquo;<span className="text-gray-800">{searchTerm}</span>&rdquo;</p>
                    <p className="text-sm text-gray-400">Try a different name, patient ID, or category.</p>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-10 h-10 text-gray-300" />
                    <p className="text-gray-500 font-medium">No tasks in progress</p>
                    <p className="text-sm text-gray-400">Start a pending task to see it here.</p>
                  </>
                )}
              </div>
            )}
            {filteredList(tasks.inProgress).map((task) => (
              <div key={task.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-800 leading-snug">{task.title}</h3>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor()}`}>
                      {task.category}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{task.description}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-start gap-1.5 text-gray-700">
                    <User className="w-4 h-4 mt-0.5 text-blue-600 shrink-0" />
                    <div>
                      <p className="font-medium leading-tight">{task.patient}</p>
                      <p className="text-xs text-gray-400">{task.patientId}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1.5 text-gray-700">
                    <Calendar className="w-4 h-4 mt-0.5 text-blue-600 shrink-0" />
                    <div>
                      <p className="font-medium leading-tight">
                        {new Date(task.startedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      <p className="text-xs text-gray-400">Started</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                    <span>Progress</span><span>{task.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${task.progress}%` }} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100">
                  <button onClick={() => openCompleteModal(task, 'inProgress')} className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-900 text-white border border-gray-300 rounded text-xs font-medium transition-colors">
                    <CheckCircle className="w-3 h-3" /><span>Complete</span>
                  </button>
                  <button onClick={() => openEditModal(task, 'inProgress')} className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-950 rounded text-xs font-medium transition-colors">
                    <Edit className="w-3 h-3" /><span>Update</span>
                  </button>
                  <button onClick={() => openDeleteModal(task, 'inProgress')} className="p-1.5 border border-red-300 hover:bg-red-50 text-red-600 rounded transition-colors">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}

          </div>
        </>
      )}

      {/* ── COMPLETED TASKS ── */}
      {activeTab === 'completed' && (
        <>
          {/* ── TABLE (lg+) ── */}
          <div className="hidden lg:block bg-white border border-gray-200 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold text-gray-800 uppercase tracking-wide text-xs">Task</th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-800 uppercase tracking-wide text-xs">Patient</th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-800 uppercase tracking-wide text-xs">Category</th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-800 uppercase tracking-wide text-xs">Completed</th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-800 uppercase tracking-wide text-xs">Notes</th>
                  <th className="px-5 py-3 text-center font-semibold text-gray-800 uppercase tracking-wide text-xs">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredList(tasks.completed).length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-14 text-center">
                      {searchTerm.trim() ? (
                        <div className="flex flex-col items-center gap-2">
                          <Search className="w-10 h-10 text-gray-300" />
                          <p className="text-gray-600 font-medium">No results for &ldquo;<span className="text-gray-800">{searchTerm}</span>&rdquo;</p>
                          <p className="text-sm text-gray-400">Try a different name, patient ID, or category.</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <CheckCircle className="w-10 h-10 text-gray-300" />
                          <p className="text-gray-500 font-medium">No completed tasks yet</p>
                          <p className="text-sm text-gray-400">Completed tasks will appear here.</p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
                {filteredList(tasks.completed).map((task) => (
                  <tr key={task.id} className="hover:bg-green-50/40 transition-colors">
                    <td className="px-5 py-4 max-w-[200px]">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <p className="font-semibold text-gray-800 leading-snug">{task.title}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-800">{task.patient}</p>
                      <p className="text-xs text-gray-400">{task.patientId}</p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryColor(task.category)}`}>
                        {task.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-gray-700">
                      {new Date(task.completedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-5 py-4 text-gray-600 max-w-xs">{task.notes}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-center">
                        <button onClick={() => openDeleteModal(task, 'completed')} className="p-1.5 border border-red-300 hover:bg-red-50 text-red-600 rounded transition-colors">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>

          {/* ── CARDS (< lg) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {filteredList(tasks.completed).length === 0 && (
              <div className="col-span-2 flex flex-col items-center gap-2 py-12">
                {searchTerm.trim() ? (
                  <>
                    <Search className="w-10 h-10 text-gray-300" />
                    <p className="text-gray-600 font-medium">No results for &ldquo;<span className="text-gray-800">{searchTerm}</span>&rdquo;</p>
                    <p className="text-sm text-gray-400">Try a different name, patient ID, or category.</p>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-10 h-10 text-gray-300" />
                    <p className="text-gray-500 font-medium">No completed tasks yet</p>
                    <p className="text-sm text-gray-400">Completed tasks will appear here.</p>
                  </>
                )}
              </div>
            )}
            {filteredList(tasks.completed).map((task) => (
              <div key={task.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-800 leading-snug">{task.title}</h3>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor()}`}>
                      {task.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-1.5 text-sm text-gray-700">
                  <User className="w-4 h-4 mt-0.5 text-blue-600 shrink-0" />
                  <div>
                    <p className="font-medium leading-tight">{task.patient}</p>
                    <p className="text-xs text-gray-400">{task.patientId}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-700 pt-2 border-t border-gray-100 space-y-1">
                  <p>
                    <span className="font-semibold">Completed:</span>{' '}
                    {new Date(task.completedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                  <p className="text-gray-600"><span className="font-semibold">Notes:</span> {task.notes}</p>
                </div>
                <div className="pt-1 border-t border-gray-100">
                  <button onClick={() => openDeleteModal(task, 'completed')} className="flex items-center gap-1 px-3 py-1.5 border border-red-300 hover:bg-red-50 text-red-600 rounded text-xs font-medium transition-colors">
                    <Trash2 className="w-3 h-3" /><span>Delete</span>
                  </button>
                </div>
              </div>
            ))}

          </div>
        </>
      )}

     

      {/* NEW TASK MODAL */}
      {newTaskModal.open && (
        <Modal
          title="Add New Task"
          icon={Plus}
          subtitle="Fill in the details to create a new task"
          onClose={() => setNewTaskModal({ open: false, form: emptyForm, errors: {} })}
          footer={
            <>
              <button className={btnSecondary} onClick={() => setNewTaskModal({ open: false, form: emptyForm, errors: {} })}>
                <X className="w-4 h-4" /><span>Cancel</span>
              </button>
              <button className={btnPrimary} onClick={handleNewTaskSubmit}>
                <Save className="w-4 h-4" /><span>Add Task</span>
              </button>
            </>
          }
        >
          <form onSubmit={handleNewTaskSubmit} noValidate>
            <TaskFormFields form={newTaskModal.form} errors={newTaskModal.errors} onChange={handleNewTaskChange} isEdit={false} />
          </form>
        </Modal>
      )}

      {/* EDIT / UPDATE MODAL */}
      {editModal.open && (
        <Modal
          title={editModal.tab === 'inProgress' ? 'Update Task' : 'Edit Task'}
          icon={Edit}
          subtitle="Update task information and details"
          onClose={() => setEditModal({ open: false, task: null, tab: null, form: emptyForm, errors: {} })}
          footer={
            <>
              <button className={btnSecondary} onClick={() => setEditModal({ open: false, task: null, tab: null, form: emptyForm, errors: {} })}>
                <X className="w-4 h-4" /><span>Cancel</span>
              </button>
              <button className={btnPrimary} onClick={handleEditSubmit}>
                <Save className="w-4 h-4" /><span>Save Changes</span>
              </button>
            </>
          }
        >
          <form onSubmit={handleEditSubmit} noValidate>
            <TaskFormFields form={editModal.form} errors={editModal.errors} onChange={handleEditChange} isEdit />
            {editModal.tab === 'inProgress' && (
              <div className="mt-6">
                <hr className="border-gray-200 mb-6" />
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" /> Progress
                </p>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Completion Progress (%)</label>
                <input
                  type="number" min="0" max="100"
                  value={editModal.form.progress ?? editModal.task?.progress ?? 0}
                  onChange={(e) => setEditModal(prev => ({
                    ...prev,
                    form: { ...prev.form, progress: Math.min(100, Math.max(0, Number(e.target.value))) }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                />
              </div>
            )}
          </form>
        </Modal>
      )}

      {/* START MODAL */}
      {startModal.open && startModal.task && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur px-4">
          <div className="bg-white shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-blue-600" />
                Start Task
              </h3>
              <button onClick={() => setStartModal({ open: false, task: null })} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-0.5">
              Move <span className="font-semibold text-gray-800">{startModal.task.title}</span> to{' '}
              <span className="font-semibold text-blue-600">In Progress</span>?
            </p>
            <p className="text-xs text-gray-400 mb-4">{startModal.task.patientId} &middot; {startModal.task.category}</p>
            <div className="bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800 space-y-0.5 mb-6">
              <p><span className="font-semibold">Patient:</span> {startModal.task.patient}</p>
              <p><span className="font-semibold">Category:</span> {startModal.task.category}</p>
              <p><span className="font-semibold">Due:</span> {new Date(startModal.task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {startModal.task.dueTime}</p>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setStartModal({ open: false, task: null })} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={handleStartConfirm} className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <ChevronRight className="w-4 h-4" />
                Start Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPLETE MODAL */}
      {completeModal.open && completeModal.task && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur px-4">
          <div className="bg-white shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Mark as Completed
              </h3>
              <button onClick={() => setCompleteModal({ open: false, task: null, tab: null, notes: '' })} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-0.5">
              Completing <span className="font-semibold text-gray-800">{completeModal.task.title}</span> for <span className="font-semibold text-gray-800">{completeModal.task.patient}</span>.
            </p>
            <p className="text-xs text-gray-400 mb-4">{completeModal.task.patientId} &middot; {completeModal.task.category}</p>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Completion Notes (optional)</label>
            <textarea
              rows={3}
              placeholder="Describe the outcome, observations, or follow-up needed..."
              value={completeModal.notes}
              onChange={e => setCompleteModal(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-yes"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setCompleteModal({ open: false, task: null, tab: null, notes: '' })} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={handleCompleteSubmit} className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                <CheckCircle className="w-4 h-4" />
                Mark Complete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal.open && deleteModal.task && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur px-4">
          <div className="bg-white shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-blue-600" />
                Delete Task
              </h3>
              <button onClick={() => setDeleteModal({ open: false, task: null, tab: null })} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-0.5">
              Are you sure you want to delete <span className="font-semibold text-gray-800">{deleteModal.task.title}</span>? This action cannot be undone.
            </p>
            <p className="text-xs text-gray-400 mb-4">{deleteModal.task.patientId} &middot; {deleteModal.task.category}</p>
            <div className="bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800 space-y-0.5 mb-6">
              <p><span className="font-semibold">Patient:</span> {deleteModal.task.patient}</p>
              <p><span className="font-semibold">Category:</span> {deleteModal.task.category}</p>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleteModal({ open: false, task: null, tab: null })} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksFollowups;
