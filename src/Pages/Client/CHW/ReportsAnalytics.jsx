import { useState } from 'react';
import {
  TrendingUp,
  Users,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingDown,
  X
} from 'lucide-react';
import {
  ComposedChart,
  Area,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

const ReportsAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReportType, setSelectedReportType] = useState('overview');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportTypeSelected, setExportTypeSelected] = useState('overview');
  const [generateForm, setGenerateForm] = useState({
    name: '',
    dateFrom: '',
    dateTo: '',
    reportType: 'overview',
    format: 'csv',
    metrics: ['visits', 'assessments', 'demographics', 'response']
  });

  const downloadFile = (filename, content) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const buildReportCSV = (title, period) => {
    const lines = [
      `"${title}"`,
      `"Period: ${period}"`,
      `"Generated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}"`,
      '',
      '"KEY METRICS"',
      '"Metric","Value","Change"',
      ...stats.map(s => `"${s.label}","${s.value}","${s.change}"`),
      '',
      '"VISIT & ASSESSMENT TRENDS (Jan-Jun)"',
      '"Month","Visits","Assessments"',
      ...visitStats.map(v => `"${v.month}","${v.visits}","${v.assessments}"`),
      '',
      '"PATIENT CATEGORIES"',
      '"Category","Count","Percentage"',
      ...patientCategories.map(p => `"${p.category}","${p.count}","${p.percentage}%"`),
    ];
    return lines.join('\n');
  };

  const handleDownloadReport = (report) => {
    const content = buildReportCSV(report.title, report.period);
    downloadFile(`${report.title.replace(/\s+/g, '_')}.csv`, content);
  };

  const handleExport = () => {
    const typeLabel = reportTypes.find(t => t.id === exportTypeSelected)?.label ?? 'Report';
    const periodLabel = periods.find(p => p.id === selectedPeriod)?.label ?? '';
    const content = buildReportCSV(`${typeLabel} Report`, periodLabel);
    const ext = exportFormat === 'pdf' ? 'txt' : 'csv';
    downloadFile(`MediLink_${typeLabel}_Report.${ext}`, content);
    setShowExportModal(false);
  };

  const handleGenerate = () => {
    if (!generateForm.dateFrom || !generateForm.dateTo) return;
    const typeLabel = reportTypes.find(t => t.id === generateForm.reportType)?.label ?? 'Report';
    const period = `${generateForm.dateFrom} to ${generateForm.dateTo}`;
    const content = buildReportCSV(generateForm.name || `${typeLabel} Report`, period);
    const ext = generateForm.format === 'pdf' ? 'txt' : 'csv';
    const filename = (generateForm.name || typeLabel).replace(/\s+/g, '_');
    downloadFile(`${filename}.${ext}`, content);
    setShowGenerateModal(false);
    setGenerateForm({ name: '', dateFrom: '', dateTo: '', reportType: 'overview', format: 'csv', metrics: ['visits', 'assessments', 'demographics', 'response'] });
  };

  const toggleMetric = (metric) => {
    setGenerateForm(f => ({
      ...f,
      metrics: f.metrics.includes(metric) ? f.metrics.filter(m => m !== metric) : [...f.metrics, metric]
    }));
  };

  // Sample analytics data
  const stats = [
    {
      label: 'Total Patients Served',
      value: '142',
      change: '+12%',
      trend: 'up',
      color: 'blue',
      icon: Users
    },
    {
      label: 'Home Visits Completed',
      value: '87',
      change: '+18%',
      trend: 'up',
      color: 'blue',
      icon: CheckCircle
    },
    {
      label: 'Avg. Response Time',
      value: '2.3 hrs',
      change: '-15%',
      trend: 'down',
      color: 'blue',
      icon: Clock
    },
    {
      label: 'High Risk Patients',
      value: '12',
      change: '-5%',
      trend: 'down',
      color: 'blue',
      icon: AlertCircle
    }
  ];

  const visitStats = [
    { month: 'Jan', visits: 45, assessments: 38 },
    { month: 'Feb', visits: 52, assessments: 42 },
    { month: 'Mar', visits: 48, assessments: 40 },
    { month: 'Apr', visits: 61, assessments: 51 },
    { month: 'May', visits: 73, assessments: 62 },
    { month: 'Jun', visits: 87, assessments: 74 }
  ];

  const patientCategories = [
    { category: 'Hypertension', count: 45, percentage: 32, color: 'blue' },
    { category: 'Diabetes', count: 38, percentage: 27, color: 'blue' },
    { category: 'Prenatal Care', count: 28, percentage: 20, color: 'blue' },
    { category: 'Nutrition Support', count: 18, percentage: 13, color: 'blue' },
    { category: 'Other', count: 13, percentage: 8, color: 'blue' }
  ];

  const recentReports = [
    {
      id: 1,
      title: 'Monthly Performance Report',
      period: 'October 2024',
      generated: '2024-10-24',
      type: 'Performance',
      status: 'Ready'
    },
    {
      id: 2,
      title: 'Patient Outcomes Analysis',
      period: 'Q3 2024',
      generated: '2024-10-20',
      type: 'Outcomes',
      status: 'Ready'
    },
    {
      id: 3,
      title: 'Home Visits Summary',
      period: 'October 2024',
      generated: '2024-10-18',
      type: 'Activity',
      status: 'Ready'
    },
    {
      id: 4,
      title: 'Health Assessments Report',
      period: 'September 2024',
      generated: '2024-10-01',
      type: 'Assessment',
      status: 'Ready'
    }
  ];

  const reportTypes = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'visits', label: 'Visits', icon: Calendar },
    { id: 'outcomes', label: 'Outcomes', icon: TrendingUp }
  ];

  const periods = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' }
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reports &amp; Analytics</h1>
          
        </div>
        <button onClick={() => setShowExportModal(true)} className="self-start sm:self-auto flex items-center gap-2 px-4 sm:px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-md text-sm">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Period filter + Custom Filter */}
      <div className="px-2 sm:px-4 py-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0 sm:gap-1 overflow-x-auto scrollbar-hide min-w-0">
            <span className="text-xs font-semibold text-gray-800 uppercase tracking-wider whitespace-nowrap shrink-0 pr-2">Period:</span>
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`py-2.5 px-2 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap shrink-0 transition-colors ${
                  selectedPeriod === period.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-800 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <span className="sm:hidden">{period.label.replace('This ', '')}</span>
                <span className="hidden sm:inline">{period.label}</span>
              </button>
            ))}
          </div>
          <div className="shrink-0 ml-2">
            <button className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs sm:text-sm text-gray-600 font-medium transition-colors">
              <Filter className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Custom Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white border border-gray-200 p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="h-9 w-9 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up'
                    ? <TrendingUp className="w-3.5 h-3.5" />
                    : <TrendingDown className="w-3.5 h-3.5" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600 mb-0.5">{stat.value}</p>
              <p className="text-xs sm:text-sm text-gray-800 leading-snug">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Report Type Tabs */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max">
          {reportTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedReportType(type.id)}
                className={`flex items-center gap-1 py-2 px-3 sm:px-5 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
                  selectedReportType === type.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-800 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Visit Trends — Area Chart */}
        <div className="bg-white border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Visit &amp; Assessment Trends</h2>
              <p className="text-xs text-gray-800 mt-0.5">Jan – Jun activity overview</p>
            </div>
            <div className="h-9 w-9 flex items-center justify-center shrink-0">
              <LineChart className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={visitStats} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
              <defs>
                <linearGradient id="gradVisitsDark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e3a8a" stopOpacity={0.55} />
                  <stop offset="60%" stopColor="#1d4ed8" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="#e8edf5" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px -4px rgb(0 0 0 / 0.35)',
                  fontSize: '12px',
                  padding: '10px 14px'
                }}
                labelStyle={{ fontWeight: 700, color: '#e2e8f0', marginBottom: 4 }}
                itemStyle={{ color: '#94a3b8' }}
                cursor={{ stroke: '#334155', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Legend
                wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }}
                iconType="circle"
                iconSize={8}
              />
              {/* Visits — dark blue filled area */}
              <Area
                type="monotone"
                dataKey="visits"
                stroke="#1d4ed8"
                strokeWidth={2.5}
                fill="url(#gradVisitsDark)"
                dot={{ fill: '#1e3a8a', r: 4, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7, stroke: '#1d4ed8', strokeWidth: 2.5, fill: '#fff' }}
                name="Visits"
              />
              {/* Assessments — light sky-blue dashed line, no fill */}
              <Line
                type="monotone"
                dataKey="assessments"
                stroke="#38bdf8"
                strokeWidth={2.5}
                strokeDasharray="7 4"
                dot={{ fill: '#38bdf8', r: 5, strokeWidth: 0 }}
                activeDot={{ r: 7, stroke: '#38bdf8', strokeWidth: 2.5, fill: '#fff' }}
                name="Assessments"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Patient Categories — Vertical Bar */}
        <div className="bg-white border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Patient Categories</h2>
              <p className="text-xs text-gray-800 mt-0.5">Distribution by condition</p>
            </div>
            <div className="h-9 w-9 flex items-center justify-center shrink-0">
              <PieChart className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <RechartsBarChart data={patientCategories}
              margin={{ top: 4, right: 8, left: -20, bottom: 36 }} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="category"
                tick={{ fill: '#374151', fontSize: 10, fontWeight: 500 }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
                interval={0}
                angle={-35}
                textAnchor="end"
                tickFormatter={(val) => {
                  const abbr = { 'Hypertension': 'Hypert.', 'Prenatal Care': 'Prenatal', 'Nutrition Support': 'Nutrition', 'Diabetes': 'Diabetes', 'Other': 'Other' };
                  return abbr[val] ?? val;
                }}
              />
              <YAxis
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                domain={[0, 60]}
                ticks={[0, 15, 30, 45, 60]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff', border: '1px solid #e5e7eb',
                  borderRadius: '12px', boxShadow: '0 4px 12px -2px rgb(0 0 0 / 0.08)',
                  fontSize: '12px', padding: '10px 14px'
                }}
                cursor={{ fill: '#f9fafb' }}
                formatter={(value) => [`${value} patients`, 'Patients']}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} name="Patients" maxBarSize={48}>
                {patientCategories.map((_, i) => (
                  <Cell key={`cell-${i}`}
                    fill={['#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'][i]} />
                ))}
              </Bar>
            </RechartsBarChart>
          </ResponsiveContainer>
          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Total Active Patients</span>
            <span className="text-2xl font-bold text-blue-600">142</span>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">Recent Reports</h2>
        </div>

        {/* TABLE — large screens */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Report</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Generated</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-semibold text-gray-800">{report.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{report.period}</td>
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                    {new Date(report.generated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      report.type === 'Performance' ? ' text-blue-700' :
                      report.type === 'Outcomes'    ? ' text-green-700' :
                      report.type === 'Activity'    ? 'text-blue-950' :
                                                      'text-amber-700'
                    }`}>{report.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-xs font-semibold text-blue-600">
                      <CheckCircle className="w-3.5 h-3.5" />{report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => handleDownloadReport(report)} className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-medium transition-colors">
                      <Download className="w-3.5 h-3.5" /><span>Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CARDS — small/medium screens */}
        <div className="lg:hidden divide-y divide-gray-100 ">
          {recentReports.map((report) => (
            <div key={report.id} className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors">
              <div className="h-9 w-9 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{report.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{report.period} &middot; Generated {new Date(report.generated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    report.type === 'Performance' ? ' text-blue-700' :
                    report.type === 'Outcomes'    ? 'text-green-700' :
                    report.type === 'Activity'    ? 'text-blue-950' :
                                                    'text-amber-700'
                  }`}>{report.type}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                    <CheckCircle className="w-3 h-3" />{report.status}
                  </span>
                </div>
              </div>
              <button onClick={() => handleDownloadReport(report)} className="shrink-0 self-center flex items-center gap-1 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 rounded-lg text-xs font-medium text-gray-700 transition-colors">
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Custom Report */}
      <div className="shadow-sm border border-gray-100 p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Generate Custom Report</h2>
            <p className="text-sm text-gray-500">Create detailed reports with custom date ranges and specific metrics</p>
          </div>
          <button onClick={() => setShowGenerateModal(true)} className="self-start sm:self-auto px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-semibold transition-colors shadow-md text-sm whitespace-nowrap">
            Create Report
          </button>
        </div>
      </div>

      {/* ── Export Report Modal ── */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowExportModal(false)} />
          <div className="relative bg-white shadow-2xl w-full max-w-md overflow-hidden">
            {/* Header */}
            <div className="bg-blue-950 px-6 py-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-base">Export Report</h3>
                <p className="text-blue-200 text-xs mt-0.5">Download a report to your device</p>
              </div>
              <button onClick={() => setShowExportModal(false)} className="text-blue-300 hover:text-white transition-colors shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Body */}
            <div className="p-6 space-y-5">
              {/* Report Type */}
              <div>
                <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">Report Type</label>
                <select
                  value={exportTypeSelected}
                  onChange={e => setExportTypeSelected(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {reportTypes.map(t => <option key={t.id} value={t.id}>{t.label} Report</option>)}
                </select>
              </div>
              {/* Period (read-only) */}
              <div>
                <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">Period</label>
                <p className="text-sm text-gray-700 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-200">
                  {periods.find(p => p.id === selectedPeriod)?.label ?? '—'}
                </p>
              </div>
              {/* Format */}
              <div>
                <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">File Format</label>
                <div className="flex gap-2">
                  {['csv', 'excel', 'pdf'].map(fmt => (
                    <button
                      key={fmt}
                      onClick={() => setExportFormat(fmt)}
                      className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-colors ${
                        exportFormat === fmt
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {fmt.toUpperCase()}
                    </button>
                  ))}
                </div>
                {exportFormat === 'pdf' && (
                  <p className="text-xs text-gray-400 mt-2">PDF exports are saved as a structured text file (.txt) — open in any text editor.</p>
                )}
              </div>
              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button onClick={() => setShowExportModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={handleExport} className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
                  <Download className="w-4 h-4" /> Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Generate Custom Report Modal ── */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowGenerateModal(false)} />
          <div className="relative bg-white shadow-2xl w-full max-w-lg overflow-hidden" style={{ maxHeight: '92vh', overflowY: 'auto' }}>
            {/* Header */}
            <div className="bg-blue-950 px-6 py-5 flex items-center gap-4 sticky top-0 z-10">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-base">Generate Custom Report</h3>
                <p className="text-blue-200 text-xs mt-0.5">Configure and download your report</p>
              </div>
              <button onClick={() => setShowGenerateModal(false)} className="text-blue-300 hover:text-white transition-colors shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Body */}
            <div className="p-6 space-y-5">
              {/* Report Name */}
              <div>
                <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">Report Name</label>
                <input
                  type="text"
                  placeholder="e.g. October Community Health Summary"
                  value={generateForm.name}
                  onChange={e => setGenerateForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                />
              </div>
              {/* Date Range */}
              <div>
                <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">Date Range</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">From</label>
                    <input
                      type="date"
                      value={generateForm.dateFrom}
                      onChange={e => setGenerateForm(f => ({ ...f, dateFrom: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">To</label>
                    <input
                      type="date"
                      value={generateForm.dateTo}
                      onChange={e => setGenerateForm(f => ({ ...f, dateTo: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              {/* Report Type */}
              <div>
                <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">Report Type</label>
                <select
                  value={generateForm.reportType}
                  onChange={e => setGenerateForm(f => ({ ...f, reportType: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {reportTypes.map(t => <option key={t.id} value={t.id}>{t.label} Report</option>)}
                </select>
              </div>
              {/* Metrics */}
              <div>
                <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">Include Metrics</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'visits', label: 'Home Visits' },
                    { id: 'assessments', label: 'Assessments' },
                    { id: 'demographics', label: 'Patient Demographics' },
                    { id: 'response', label: 'Response Times' }
                  ].map(metric => (
                    <label key={metric.id} className="flex items-center gap-2.5 p-2.5 rounded-xl border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={generateForm.metrics.includes(metric.id)}
                        onChange={() => toggleMetric(metric.id)}
                        className="accent-blue-600 w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{metric.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Format */}
              <div>
                <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">File Format</label>
                <div className="flex gap-2">
                  {['csv', 'excel', 'pdf'].map(fmt => (
                    <button
                      key={fmt}
                      onClick={() => setGenerateForm(f => ({ ...f, format: fmt }))}
                      className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-colors ${
                        generateForm.format === fmt
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {fmt.toUpperCase()}
                    </button>
                  ))}
                </div>
                {generateForm.format === 'pdf' && (
                  <p className="text-xs text-gray-400 mt-2">PDF exports are saved as a structured text file (.txt).</p>
                )}
              </div>
              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button onClick={() => setShowGenerateModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={!generateForm.dateFrom || !generateForm.dateTo}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" /> Generate &amp; Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsAnalytics;
