import { useEffect, useMemo, useRef, useState } from 'react';
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
import { httpClient } from '../../API/clients/httpClient.js';
import ActivityChart from './components/ActivityChart';
import AdminFeatures from './components/AdminFeatures';
import SystemAlerts from './components/SystemAlerts';
import TopPerformers from './components/TopPerformers';
import UserGrowthBarChart from './components/UserGrowthBarChart';

Chart.register(...registerables);

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

const createDoughnutChart = (canvas, data, colors) => {
  if (!canvas) return null;
  return new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: data.map((s) => s.label),
      datasets: [
        {
          data: data.map((s) => s.value),
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: '#ffffff',
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
          callbacks: { label: (ctx) => ` ${ctx.parsed}%` },
        },
      },
    },
  });
};

const iconMap = {
  Users,
  UserCheck,
  CalendarCheck2,
  CreditCard,
  Stethoscope,
  Ambulance,
  ShieldCheck,
  Siren,
};

const defaultData = {
  kpis: [],
  patientTrend: [],
  appointmentSlaTrend: [],
  monthLabels: [],
  serviceMix: [],
  patientCarePipeline: [],
  overdueQueues: [],
  insurancePayerMix: [],
  financeBasics: [],
  financeMonthly: [],
  insuranceClaimStatus: [],
  quickActions: [],
  liveAlerts: [],
  systemHealthSnapshot: [],
};

const AdminDashboard = () => {
  const donutChartRef = useRef(null);
  const patientTrendCanvasRef = useRef(null);
  const appointmentSlaCanvasRef = useRef(null);
  const insurancePayerChartRef = useRef(null);
  const patientOpsChartRef = useRef(null);
  const financeChartRef = useRef(null);

  const donutChartInstanceRef = useRef(null);
  const insurancePayerChartInstanceRef = useRef(null);
  const patientChartInstanceRef = useRef(null);
  const appointmentChartInstanceRef = useRef(null);
  const patientOpsChartInstanceRef = useRef(null);
  const financeChartInstanceRef = useRef(null);

  const [dashboard, setDashboard] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError('');
        const payload = await httpClient.get('/api/admin/dashboard', { signal: controller.signal });
        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
          throw new Error('Dashboard API returned invalid data.');
        }
        setDashboard({ ...defaultData, ...payload });
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to load dashboard');
          setDashboard(defaultData);
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();

    return () => controller.abort();
  }, []);

  const monthLabels = useMemo(
    () => (dashboard.monthLabels && dashboard.monthLabels.length ? dashboard.monthLabels : []),
    [dashboard.monthLabels]
  );

  useEffect(() => {
    if (donutChartInstanceRef.current) donutChartInstanceRef.current.destroy();
    if (insurancePayerChartInstanceRef.current) insurancePayerChartInstanceRef.current.destroy();
    if (patientChartInstanceRef.current) patientChartInstanceRef.current.destroy();
    if (appointmentChartInstanceRef.current) appointmentChartInstanceRef.current.destroy();
    if (patientOpsChartInstanceRef.current) patientOpsChartInstanceRef.current.destroy();
    if (financeChartInstanceRef.current) financeChartInstanceRef.current.destroy();

    if (dashboard.serviceMix.length) {
      donutChartInstanceRef.current = createDoughnutChart(
        donutChartRef.current,
        dashboard.serviceMix,
        dashboard.serviceMix.map((s) => s.color)
      );
    }

    if (dashboard.insurancePayerMix.length) {
      insurancePayerChartInstanceRef.current = createDoughnutChart(
        insurancePayerChartRef.current,
        dashboard.insurancePayerMix,
        dashboard.insurancePayerMix.map((s) => s.color)
      );
    }

    if (monthLabels.length && dashboard.patientTrend.length) {
      patientChartInstanceRef.current = createMiniLineChart(
        patientTrendCanvasRef.current,
        monthLabels,
        dashboard.patientTrend,
        '#2563eb',
        'rgba(37, 99, 235, 0.16)'
      );
    }

    if (monthLabels.length && dashboard.appointmentSlaTrend.length) {
      appointmentChartInstanceRef.current = createMiniLineChart(
        appointmentSlaCanvasRef.current,
        monthLabels,
        dashboard.appointmentSlaTrend,
        '#2563eb',
        'rgba(37, 99, 235, 0.16)'
      );
    }

    if (patientOpsChartRef.current && dashboard.patientCarePipeline.length) {
      patientOpsChartInstanceRef.current = new Chart(patientOpsChartRef.current, {
        type: 'bar',
        data: {
          labels: dashboard.patientCarePipeline.map((i) => i.stage),
          datasets: [
            {
              data: dashboard.patientCarePipeline.map((i) => i.count),
              backgroundColor: '#2563eb',
              borderRadius: 0,
              borderSkipped: false,
              barThickness: 16,
            },
          ],
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: { label: (ctx) => `  ${ctx.parsed.x.toLocaleString()} items` },
            },
          },
          scales: {
            x: {
              grid: { color: 'rgba(148,163,184,0.15)' },
              ticks: { color: '#64748b', font: { size: 9 }, maxTicksLimit: 5 },
              border: { display: false },
            },
            y: {
              grid: { display: false },
              ticks: {
                color: '#374151',
                font: { size: 11 },
                callback: (val, i) => dashboard.patientCarePipeline[i].stage,
              },
              border: { display: false },
            },
          },
        },
      });
    }

    if (financeChartRef.current && dashboard.financeMonthly.length) {
      financeChartInstanceRef.current = new Chart(financeChartRef.current, {
        type: 'bar',
        data: {
          labels: dashboard.financeMonthly.map((i) => i.month),
          datasets: [
            {
              label: 'Revenue',
              data: dashboard.financeMonthly.map((i) => i.revenue),
              backgroundColor: '#16A34A',
              borderRadius: 2,
              borderSkipped: false,
              barThickness: 6,
            },
            {
              label: 'Expenses',
              data: dashboard.financeMonthly.map((i) => i.expenses),
              backgroundColor: '#e11d48',
              borderRadius: 2,
              borderSkipped: false,
              barThickness: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `  Ksh ${ctx.parsed.y.toFixed(2)}M`,
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#64748b', font: { size: 10 } },
              border: { display: false },
            },
            y: {
              grid: { color: 'rgba(148,163,184,0.15)' },
              ticks: {
                color: '#64748b',
                font: { size: 10 },
                maxTicksLimit: 4,
                callback: (v) => `${v}M`,
              },
              border: { display: false },
            },
          },
        },
      });
    }

    return () => {
      if (donutChartInstanceRef.current) donutChartInstanceRef.current.destroy();
      if (insurancePayerChartInstanceRef.current) insurancePayerChartInstanceRef.current.destroy();
      if (patientChartInstanceRef.current) patientChartInstanceRef.current.destroy();
      if (appointmentChartInstanceRef.current) appointmentChartInstanceRef.current.destroy();
      if (patientOpsChartInstanceRef.current) patientOpsChartInstanceRef.current.destroy();
      if (financeChartInstanceRef.current) financeChartInstanceRef.current.destroy();
    };
  }, [dashboard, monthLabels]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-5 space-y-4">
      {loading && <div className="text-xs text-gray-500">Loading dashboard...</div>}
      {error && <div className="text-xs text-red-600">{error}</div>}

      {/* ── KPI Strip ── */}
      <section className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
        {dashboard.kpis.map((kpi) => {
          const Icon = iconMap[kpi.icon] || Users;
          return (
            <article key={kpi.label} className="bg-white border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[11px] font-semibold text-gray-800 leading-tight">{kpi.label}</p>
                <Icon className={`w-3.5 h-3.5 ${kpi.tone || 'text-blue-700'}`} />
              </div>
              <p className="text-lg font-bold text-gray-950 leading-tight">{kpi.value}</p>
              <p className="text-[11px] text-gray-700 mt-0.5">{kpi.delta} vs last week</p>
            </article>
          );
        })}
      </section>

      {/* ── Charts Row 1 ── */}
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
              {dashboard.serviceMix.map((segment) => (
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

      {/* ── Operations Row ── */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <article className="xl:col-span-5 bg-white border border-gray-200 p-3">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Patient Operations</h2>
          <div className="relative w-full h-44">
            <canvas ref={patientOpsChartRef} />
          </div>
        </article>

        <article className="xl:col-span-4 bg-white border border-gray-200 p-3">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Operational Queues</h2>
          <div className="space-y-2">
            {dashboard.overdueQueues.map((queue) => (
              <div key={queue.queue} className="p-2 border border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-700 leading-tight pr-2">{queue.queue}</p>
                  <span
                    className={`text-xs font-semibold ${
                      queue.severity === 'high'
                        ? 'text-red-700'
                        : queue.severity === 'medium'
                        ? 'text-amber-700'
                        : 'text-green-700'
                    }`}
                  >
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
            {dashboard.quickActions.map((action) => (
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

      {/* ── Finance Row ── */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <article className="xl:col-span-5 bg-white border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900">Finances Overview</h2>
            <CreditCard className="w-4 h-4 text-blue-700" />
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {dashboard.financeBasics.map((item) => (
              <div key={item.label} className="border border-gray-300 p-2">
                <p className="text-[10px] text-gray-500">{item.label}</p>
                <p className={`text-sm font-semibold ${item.tone}`}>{item.value}</p>
              </div>
            ))}
          </div>
          <div className="relative w-full h-36">
            <canvas ref={financeChartRef} />
          </div>
          <div className="flex items-center justify-end gap-4 mt-2 text-[10px] text-gray-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-600 inline-block" />Revenue</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-600 inline-block" />Expenses</span>
          </div>
        </article>

        {/* ── Insurance Providers — now Chart.js doughnut ── */}
        <article className="xl:col-span-3 bg-white border border-gray-200 p-3 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900">Insurance Providers</h2>
            <ShieldCheck className="w-4 h-4 text-indigo-700" />
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="relative w-36 h-36">
              <canvas ref={insurancePayerChartRef} />
            </div>
            <div className="w-full mt-3 space-y-1.5">
              {dashboard.insurancePayerMix.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 flex-shrink-0" style={{ backgroundColor: item.color }} />
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
            {dashboard.insuranceClaimStatus.map((item) => (
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

      {/* ── Alerts & Health ── */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <article className="bg-white border border-gray-200 p-3">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Live Alerts</h2>
          <div className="space-y-2 max-h-48 overflow-auto pr-1">
            {dashboard.liveAlerts.map((item) => (
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
            {dashboard.systemHealthSnapshot.map((metric) => (
              <div key={metric.label} className="p-2.5 border border-gray-200 bg-gray-50">
                <p className="text-[11px] text-gray-500">{metric.label}</p>
                <p className={`text-sm font-bold mt-0.5 ${metric.ok ? 'text-green-700' : 'text-red-700'}`}>
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* ── Sub-components ── */}
      <section className="space-y-3">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 items-start">
          <div className="xl:col-span-7 space-y-3">
            <ActivityChart compact />
            <AdminFeatures compact />
            <SystemAlerts compact />
          </div>
          <div className="xl:col-span-5 space-y-3">
            <UserGrowthBarChart compact />
            <TopPerformers compact />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;