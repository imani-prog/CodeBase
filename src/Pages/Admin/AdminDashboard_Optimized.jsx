import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import {
  Activity,
  AlertTriangle,
  Ambulance,
  CalendarCheck2,
  Clock3,
  CreditCard,
  HeartPulse,
  ShieldCheck,
  Siren,
  Stethoscope,
  UserCheck,
  Users,
} from 'lucide-react';
import ActivityChart from './components/ActivityChart';
import AdminFeatures from './components/AdminFeatures';

import RecentActivity from './components/RecentActivity';
import RecentRegistrations from './components/RecentRegistrations';
import SystemAlerts from './components/SystemAlerts';
import TopPerformers from './components/TopPerformers';
import UserGrowthBarChart from './components/UserGrowthBarChart';

Chart.register(...registerables);

const kpis = [
  { label: 'Active Patients', value: '12,484', delta: '+3.8%', icon: Users, tone: 'text-blue-700' },
  { label: 'Active CHWs', value: '326', delta: '+1.1%', icon: UserCheck, tone: 'text-blue-700' },
  { label: 'Live Appointments', value: '148', delta: '+9.4%', icon: CalendarCheck2, tone: 'text-blue-700' },
  { label: 'Open Claims', value: '892', delta: '-2.3%', icon: CreditCard, tone: 'text-blue-700' },
  { label: 'Telemedicine', value: '214', delta: '+6.5%', icon: Stethoscope, tone: 'text-blue-700' },
  { label: 'Ambulance Active', value: '38', delta: '+0.9%', icon: Ambulance, tone: 'text-blue-700' },
  { label: 'Pending Reviews', value: '72', delta: '-4.2%', icon: ShieldCheck, tone: 'text-blue-700' },
  { label: 'Critical Alerts', value: '7', delta: '+2', icon: Siren, tone: 'text-blue-700' },
];

const patientTrend = [42, 48, 45, 52, 57, 54, 62, 67, 63, 71, 74, 79];
const appointmentSlaTrend = [92, 89, 91, 94, 93, 95, 92, 96, 97, 94, 95, 96];
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const serviceMix = [
  { label: 'CHW Home Visits', value: 36, color: '#2563eb' },
  { label: 'CHW online Appointments', value: 28, color: '#059669' },
  { label: 'Telemedicine', value: 21, color: '#f59e0b' },
  { label: 'Ambulance Emergency', value: 15, color: '#dc2626' },
];

const patientCarePipeline = [
  { stage: 'Patient registration requests (pending)', count: 24, progress: 100, tone: 'bg-blue-600' },
  { stage: 'Approved patient onboardings', count: 18, progress: 75, tone: 'bg-blue-600' },
  { stage: 'CHW work items in progress', count: 62, progress: 51, tone: 'bg-blue-600' },
  { stage: 'Appointments confirmed/booked', count: 107, progress: 72, tone: 'bg-blue-600' },
  { stage: 'Insurance claims under review', count: 557, progress: 62, tone: 'bg-blue-600' },
];

const overdueQueues = [
  { queue: 'Follow-up appointments overdue', count: 14, severity: 'high' },
  { queue: 'Insurance claims pending > 72h', count: 22, severity: 'medium' },
  { queue: 'Unclosed ambulance incidents', count: 5, severity: 'high' },
  { queue: 'Unreviewed CHW task completions', count: 9, severity: 'low' },
];

const insurancePayerMix = [
  { label: 'SHA', value: 38, color: '#1d4ed8' },
  { label: 'NHIF', value: 29, color: '#0f766e' },
  { label: 'Private Insurance', value: 21, color: '#f59e0b' },
  { label: 'Corporate Plans', value: 12, color: '#dc2626' },
];

const financeBasics = [
  { label: 'Monthly Revenue', value: 'Ksh 2.45M', tone: '' },
  { label: 'Monthly Expenses', value: 'Ksh 1.68M', tone: '' },
  { label: 'Pending Payments', value: 'Ksh 125K', tone: '' },
  { label: 'Claims Value', value: 'Ksh 567K', tone: '' },
];

const financeMonthly = [
  { month: 'Mar', revenue: 2.4, expenses: 1.8 },
  { month: 'Apr', revenue: 2.6, expenses: 1.9 },
  { month: 'May', revenue: 2.8, expenses: 2.0 },
  { month: 'Jun', revenue: 3.0, expenses: 2.2 },
];

const insuranceClaimStatus = [
  { label: 'Approved', value: 64, color: '#16a34a' },
  { label: 'Pending', value: 23, color: '#f59e0b' },
  { label: 'Rejected', value: 13, color: '#dc2626' },
];

const quickActions = [
  'Review Critical Alerts',
  'Approve Pending CHW Requests',
  'Check Overdue Follow-ups',
  'Dispatch Ambulance Queue',
  'Run Daily Ops Report',
  'Audit Telemedicine Sessions',
];

const insurancePayerGradient = insurancePayerMix
  .map((segment) => segment.color)
  .join(', ');

const axisTickStyle = { color: '#64748b', font: { size: 9 } };

const chartBaseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        ...axisTickStyle,
        maxTicksLimit: 6,
        maxRotation: 0,
        autoSkip: true,
      },
      border: { display: false },
    },
    y: {
      display: true,
      grid: { color: 'rgba(148, 163, 184, 0.15)' },
      ticks: {
        ...axisTickStyle,
        maxTicksLimit: 4,
      },
      border: { display: false },
    },
  },
};

const createMiniLineChart = (canvas, labels, values, color, fillColor) => {
  if (!canvas) return null;

  return new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          data: values,
          borderColor: color,
          backgroundColor: fillColor,
          fill: true,
          tension: 0.42,
          pointRadius: 1.8,
          pointHoverRadius: 2.2,
          pointBackgroundColor: color,
          pointBorderWidth: 0,
          borderWidth: 2.4,
        },
      ],
    },
    options: chartBaseOptions,
  });
};

const AdminDashboard = () => {
  const donutChartRef = useRef(null);
  const patientTrendCanvasRef = useRef(null);
  const appointmentSlaCanvasRef = useRef(null);

  useEffect(() => {
    const labels = monthLabels;

    const donutChart = donutChartRef.current
      ? new Chart(donutChartRef.current, {
          type: 'doughnut',
          data: {
            labels: serviceMix.map((segment) => segment.label),
            datasets: [
              {
                data: serviceMix.map((segment) => segment.value),
                backgroundColor: serviceMix.map((segment) => segment.color),
                borderWidth: 0,
                hoverOffset: 4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (ctx) => ` ${ctx.parsed}%`,
                },
              },
            },
          },
        })
      : null;

    const patientChart = createMiniLineChart(
      patientTrendCanvasRef.current,
      labels,
      patientTrend,
      '#2563eb',
      'rgba(37, 99, 235, 0.16)'
    );

    const appointmentChart = createMiniLineChart(
      appointmentSlaCanvasRef.current,
      labels,
      appointmentSlaTrend,
      '#2563eb',
      'rgba(37, 99, 235, 0.16)'
    );

    return () => {
      if (donutChart) donutChart.destroy();
      if (patientChart) patientChart.destroy();
      if (appointmentChart) appointmentChart.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-5 space-y-4">
      <section className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <article key={kpi.label} className="bg-white border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[11px] font-semibold text-gray-800 leading-tight">{kpi.label}</p>
                <Icon className={`w-3.5 h-3.5 ${kpi.tone}`} />
              </div>
              <p className="text-lg font-bold text-gray-950 leading-tight">{kpi.value}</p>
              <p className="text-[11px] text-gray-700 mt-0.5">{kpi.delta} vs last week</p>
            </article>
          );
        })}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <article className="xl:col-span-4 bg-white border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900">Patient Growth Trend</h2>
            <HeartPulse className="w-4 h-4 text-blue-600" />
          </div>
          <div className="relative w-full h-20">
            <canvas ref={patientTrendCanvasRef} />
          </div>
          <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-800 flex-wrap">
            <span>New Today <span className="font-semibold text-blue-700">+84</span></span>
            <span>High Risk <span className="font-semibold text-blue-700">152</span></span>
            <span>Recovered <span className="font-semibold text-blue-700">71</span></span>
          </div>
        </article>

        <article className="xl:col-span-4 bg-white border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900">Services Overview</h2>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 flex-shrink-0">
              <canvas ref={donutChartRef} />
            </div>
            <div className="flex-1 space-y-1.5">
              {serviceMix.map((segment) => (
                <div key={segment.label} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 flex items-center gap-2">
                    <span className="w-2.5 h-2.5" style={{ backgroundColor: segment.color }} />
                    {segment.label}
                  </span>
                  <span className="font-semibold text-gray-900">{segment.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="xl:col-span-4 bg-white border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900">Appointment SLA</h2>
            <Clock3 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="relative w-full h-20">
            <canvas ref={appointmentSlaCanvasRef} />
          </div>
          <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-800 flex-wrap">
            <span>Current SLA completion <span className="font-semibold text-gray-900">96%</span></span>
            <span>Overdue follow-ups <span className="font-semibold text-red-700">14</span></span>
          </div>
        </article>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <article className="xl:col-span-5 bg-white border border-gray-200 p-3">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Patient Operations</h2>
          <div className="space-y-2.5">
            {patientCarePipeline.map((item) => (
              <div key={item.stage}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-700 truncate pr-3">{item.stage}</span>
                  <span className="font-semibold text-gray-900">{item.count.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-100 h-2">
                  <div className={`h-2 ${item.tone}`} style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="xl:col-span-4 bg-white border border-gray-200 p-3">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Operational Queues</h2>
          <div className="space-y-2">
            {overdueQueues.map((queue) => (
              <div key={queue.queue} className="p-2 border border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-700 leading-tight pr-2">{queue.queue}</p>
                  <span className={`text-xs font-semibold ${queue.severity === 'high' ? 'text-red-700' : queue.severity === 'medium' ? 'text-amber-700' : 'text-green-700'}`}>
                    {queue.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="xl:col-span-3 bg-white border border-gray-200 p-3">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Quick Actions</h2>
          <div className="space-y-1.5">
            {quickActions.map((action) => (
              <button
                key={action}
                type="button"
                className="w-full text-left text-xs px-2.5 py-2 cursor-pointer text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <article className="xl:col-span-5 bg-white border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900">Finances Overview</h2>
            <CreditCard className="w-4 h-4 text-blue-700" />
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {financeBasics.map((item) => (
              <div key={item.label} className="border border-gray-300 p-2">
                <p className="text-[10px] text-gray-500">{item.label}</p>
                <p className={`text-sm font-semibold ${item.tone}`}>{item.value}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {financeMonthly.map((item) => (
              <div key={item.month} className="grid grid-cols-[28px_1fr_1fr] gap-1 items-center">
                <span className="text-[10px] text-gray-500">{item.month}</span>
                <div className="h-2 bg-emerald-100">
                  <div className="h-2 bg-emerald-600" style={{ width: `${(item.revenue / 3.2) * 100}%` }} />
                </div>
                <div className="h-2 bg-rose-100">
                  <div className="h-2 bg-rose-600" style={{ width: `${(item.expenses / 3.2) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end gap-4 mt-2 text-[10px] text-gray-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-600" />Revenue</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-rose-600" />Expenses</span>
          </div>
        </article>

        <article className="xl:col-span-3 bg-white border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900">Insurance Providers</h2>
            <ShieldCheck className="w-4 h-4 text-indigo-700" />
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-20 h-20 rounded-full"
              style={{ backgroundImage: `radial-gradient(circle, #fff 0 38%, transparent 39%), conic-gradient(${insurancePayerGradient})` }}
            />
            <div className="flex-1 space-y-1.5">
              {insurancePayerMix.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 flex items-center gap-1.5">
                    <span className="w-2 h-2" style={{ backgroundColor: item.color }} />
                    {item.label}
                  </span>
                  <span className="font-semibold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="xl:col-span-4 bg-white border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900">Insurance Claims Status</h2>
            <AlertTriangle className="w-4 h-4 text-amber-700" />
          </div>
          <div className="space-y-2.5">
            {insuranceClaimStatus.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-semibold text-gray-900">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2">
                  <div className="h-2" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <article className="bg-white border border-gray-200 p-3">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Live Alerts</h2>
          <div className="space-y-2 max-h-48 overflow-auto pr-1">
            {[
              'Critical: Ambulance dispatch lag in Nairobi East zone',
              'Warning: 22 claims pending review beyond SLA',
              'Notice: CHW onboarding batch awaiting final approval',
              'Warning: Telemedicine session drop-rate above threshold',
              'Info: New partner hospital synced successfully',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-xs p-2 border border-gray-200 bg-gray-50">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 leading-tight">{item}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="bg-white border border-gray-200 p-3">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">System Health Snapshot</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: 'API Uptime', value: '99.94%', ok: true },
              { label: 'Queue Throughput', value: '1.8k/hr', ok: true },
              { label: 'DB Load', value: '68%', ok: true },
              { label: 'Failed Jobs', value: '12', ok: false },
              { label: 'Notification Delay', value: '42s', ok: true },
              { label: 'Incident Tickets', value: '6', ok: false },
            ].map((metric) => (
              <div key={metric.label} className="p-2.5 border border-gray-200 bg-gray-50">
                <p className="text-[11px] text-gray-500">{metric.label}</p>
                <p className={`text-sm font-bold mt-0.5 ${metric.ok ? 'text-green-700' : 'text-red-700'}`}>{metric.value}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="space-y-3">
        

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 items-start">
          <div className="xl:col-span-7 space-y-3">
            <ActivityChart compact />
            {/* <RecentActivity compact /> */}
            
            <AdminFeatures compact />
            <SystemAlerts compact />
          </div>

          <div className="xl:col-span-5 space-y-3">
            <UserGrowthBarChart compact />
            {/* <RecentRegistrations compact /> */}
            <TopPerformers compact />
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
