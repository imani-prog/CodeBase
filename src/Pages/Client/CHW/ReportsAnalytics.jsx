import { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import {
  Users, Download, FileText, CheckCircle,
  Clock, AlertCircle, X, ArrowUpRight, ArrowDownRight,
  HeartPulse, Activity,
} from 'lucide-react';

Chart.register(...registerables);

/* ─── data ─── */
const visitData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  visits:      [25, 32, 38, 41, 45, 27, 35, 30, 20, 30, 15, 27],
  assessments: [38, 42, 40, 25, 42, 44, 38, 42, 40, 25, 12, 24],
};

const patientCategories = [
  { category: 'Hypertension', count: 45, color: '#1d4ed8' },
  { category: 'Diabetes',     count: 38, color: '#2563eb' },
  { category: 'Prenatal',     count: 28, color: '#3b82f6' },
  { category: 'Nutrition',    count: 18, color: '#60a5fa' },
  { category: 'Other',        count: 13, color: '#93c5fd' },
];

const stats = [
  { label: 'Patients Served',    value: '142',     change: '+12%', up: true,  icon: Users        },
  { label: 'Visits Completed',   value: '87',      change: '+18%', up: true,  icon: CheckCircle  },
  { label: 'Avg. Response Time', value: '2.3 hrs', change: '-15%', up: false, icon: Clock        },
  { label: 'High Risk Patients', value: '12',      change: '-5%',  up: false, icon: AlertCircle  },
];

const recentReports = [
  { id:1, title:'Monthly Performance Report', period:'October 2024',   generated:'2024-10-24', type:'Performance' },
  { id:2, title:'Patient Outcomes Analysis',  period:'Q3 2024',        generated:'2024-10-20', type:'Outcomes'    },
  { id:3, title:'Home Visits Summary',        period:'October 2024',   generated:'2024-10-18', type:'Activity'    },
  { id:4, title:'Health Assessments Report',  period:'September 2024', generated:'2024-10-01', type:'Assessment'  },
];

const typeColor = {
  Performance: 'bg-blue-50 text-blue-700',
  Outcomes:    'bg-emerald-50 text-emerald-700',
  Activity:    'bg-indigo-50 text-indigo-800',
  Assessment:  'bg-amber-50 text-amber-700',
};

const reportTypes = [
  { id:'overview', label:'Overview' },
  { id:'patients', label:'Patients' },
  { id:'visits',   label:'Visits'   },
  { id:'outcomes', label:'Outcomes' },
];

/* ─── helpers ─── */
const buildCSV = (title, period) => [
  `"${title}"`, `"Period: ${period}"`,
  `"Generated: ${new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}"`,
  '', '"KEY METRICS"', '"Metric","Value","Change"',
  ...stats.map(s => `"${s.label}","${s.value}","${s.change}"`),
  '', '"VISIT TRENDS"', '"Month","Visits","Assessments"',
  ...visitData.labels.map((m,i) => `"${m}","${visitData.visits[i]}","${visitData.assessments[i]}"`),
  '', '"PATIENT CATEGORIES"', '"Category","Count"',
  ...patientCategories.map(p => `"${p.category}","${p.count}"`),
].join('\n');

const dl = (name, content) => {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8;' }));
  a.download = name; document.body.appendChild(a); a.click(); document.body.removeChild(a);
};

/* ─── shared chart tick style (matches AdminDashboard) ─── */
const tick = { color: '#64748b', font: { size: 9 } };

/* ══ Visit Trend Chart — dual-line with fill, same as "Patient Growth Trend" ══ */
function VisitTrendChart() {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const chart = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: visitData.labels,
        datasets: [
          {
            label: 'Visits',
            data: visitData.visits,
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37,99,235,0.14)',
            fill: true,
            tension: 0.42,
            pointRadius: 1.8,
            pointHoverRadius: 3,
            pointBackgroundColor: '#2563eb',
            pointBorderWidth: 0,
            borderWidth: 2.4,
          },
          {
            label: 'Assessments',
            data: visitData.assessments,
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56,189,248,0.07)',
            fill: true,
            tension: 0.42,
            borderDash: [6, 4],
            pointRadius: 1.8,
            pointHoverRadius: 3,
            pointBackgroundColor: '#38bdf8',
            pointBorderWidth: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { display: false },
            ticks: { ...tick, maxRotation: 0 },
            border: { display: false },
          },
          y: {
            grid: { color: 'rgba(148,163,184,0.15)' },
            ticks: { ...tick, maxTicksLimit: 4 },
            border: { display: false },
          },
        },
      },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={canvasRef} />;
}

/* ══ Patient Category Chart — horizontal bar, same as "Patient Operations" ══ */
function PatientCategoryChart() {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const chart = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: patientCategories.map(p => p.category),
        datasets: [{
          data: patientCategories.map(p => p.count),
          backgroundColor: patientCategories.map(p => p.color),
          borderRadius: 0,
          borderSkipped: false,
          barThickness: 14,
        }],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: ctx => `  ${ctx.parsed.x} patients` },
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
            ticks: { color: '#374151', font: { size: 11 } },
            border: { display: false },
          },
        },
      },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={canvasRef} />;
}

/* ══ MAIN ══ */
export default function ReportsAnalytics() {
  const [showExport, setShowExport]     = useState(false);
  const [showGenerate, setShowGenerate] = useState(false);
  const [exportFmt, setExportFmt]       = useState('csv');
  const [exportType, setExportType]     = useState('overview');
  const [form, setForm] = useState({
    name:'', from:'', to:'', type:'overview', fmt:'csv',
    metrics: ['visits','assessments','demographics','response'],
  });

  const toggleMetric = m => setForm(f => ({
    ...f, metrics: f.metrics.includes(m) ? f.metrics.filter(x => x !== m) : [...f.metrics, m],
  }));

  const handleDownloadReport = r =>
    dl(`${r.title.replace(/\s+/g,'_')}.csv`, buildCSV(r.title, r.period));

  const handleExport = () => {
    const lbl = reportTypes.find(t => t.id === exportType)?.label ?? 'Report';
    dl(`MediLink_${lbl}_Report.${exportFmt==='pdf'?'txt':'csv'}`,
       buildCSV(`${lbl} Report`, 'Current Period'));
    setShowExport(false);
  };

  const handleGenerate = () => {
    if (!form.from || !form.to) return;
    const lbl = reportTypes.find(t => t.id === form.type)?.label ?? 'Report';
    dl(`${(form.name||lbl).replace(/\s+/g,'_')}.${form.fmt==='pdf'?'txt':'csv'}`,
       buildCSV(form.name || `${lbl} Report`, `${form.from} to ${form.to}`));
    setShowGenerate(false);
    setForm({ name:'', from:'', to:'', type:'overview', fmt:'csv',
              metrics:['visits','assessments','demographics','response'] });
  };

  return (
    <div className="space-y-4 pb-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Reports &amp; Analytics</h1>
          {/* <p className="text-xs text-gray-500 mt-0.5">Community health performance overview</p> */}
        </div>
        <button onClick={() => setShowExport(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold text-sm shadow transition-colors">
          <Download className="w-4 h-4"/> Export
        </button>
      </div>

      
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <article key={s.label} className="bg-white border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[11px] font-semibold text-gray-800 leading-tight">{s.label}</p>
                <Icon className="w-3.5 h-3.5 text-blue-700"/>
              </div>
              <p className="text-lg font-bold text-gray-950 leading-tight">{s.value}</p>
              <p className={`text-[11px] mt-0.5 flex items-center gap-0.5 font-semibold ${s.up ? 'text-green-600' : 'text-red-600'}`}>
                {s.up ? <ArrowUpRight className="w-3 h-3"/> : <ArrowDownRight className="w-3 h-3"/>}
                {s.change} vs last month
              </p>
            </article>
          );
        })}
      </section>

      {/* ── Charts Row ── */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">

        {/* Visit & Assessment Trend */}
        <article className="xl:col-span-7 bg-white border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900">Visit &amp; Assessment Trends</h2>
            <HeartPulse className="w-4 h-4 text-blue-600"/>
          </div>
          <div className="relative w-full h-36">
            <VisitTrendChart/>
          </div>
          <div className="flex items-center gap-4 mt-1 text-[10px] text-gray-500 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded inline-block" style={{background:'#2563eb'}}/>
              Visits <span className="font-semibold text-blue-700 ml-1">87</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 inline-block" style={{borderTop:'2px dashed #38bdf8'}}/>
              Assessments <span className="font-semibold text-sky-500 ml-1">74</span>
            </span>
            <span className="ml-auto">Jan – Dec 2025</span>
          </div>
        </article>

        {/* Patient Categories */}
        <article className="xl:col-span-5 bg-white border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900">Patient Categories</h2>
            <Activity className="w-4 h-4 text-blue-600"/>
          </div>
          <div className="relative w-full h-36">
            <PatientCategoryChart/>
          </div>
          <div className="flex items-center justify-between mt-1 pt-2 border-t border-gray-100">
            <span className="text-[10px] text-gray-500">Total Active Patients</span>
            <span className="text-sm font-bold text-blue-700">142</span>
          </div>
        </article>
      </section>

      {/* ── Recent Reports ── */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Recent Reports</h2>
          <span className="text-[11px] text-gray-400">{recentReports.length} reports</span>
        </div>

        {/* table — lg */}
        <div className="hidden lg:block">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Report','Period','Generated','Type','Action'].map(h => (
                  <th key={h} className={`px-5 py-2.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider ${h==='Action'?'text-center':''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentReports.map(r => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0"/>
                      <span className="font-semibold text-gray-800 text-sm">{r.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-500">{r.period}</td>
                  <td className="px-5 py-3 text-xs text-gray-500 whitespace-nowrap">
                    {new Date(r.generated).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${typeColor[r.type]}`}>{r.type}</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button onClick={() => handleDownloadReport(r)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-medium transition-colors">
                      <Download className="w-3 h-3"/> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* cards — mobile */}
        <div className="lg:hidden divide-y divide-gray-50">
          {recentReports.map(r => (
            <div key={r.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
              <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5"/>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{r.title}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {r.period} · {new Date(r.generated).toLocaleDateString('en-US',{month:'short',day:'numeric'})}
                </p>
                <span className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${typeColor[r.type]}`}>{r.type}</span>
              </div>
              <button onClick={() => handleDownloadReport(r)}
                className="shrink-0 self-center p-1.5 border border-gray-200 hover:bg-gray-50 transition-colors">
                <Download className="w-3.5 h-3.5 text-gray-500"/>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Generate CTA banner ── */}
      <div className="bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-gray-200">
        <div>
          <h2 className="text-sm font-bold text-gray-800 ">Generate Custom Report</h2>
          <p className="text-xs text-gray-600 mt-0.5">Custom date ranges and specific metrics</p>
        </div>
        <button onClick={() => setShowGenerate(true)}
          className="self-start sm:self-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold text-sm transition-colors border border-gray-200 whitespace-nowrap">
          Create Report
        </button>
      </div>

      {/* ══ Export Modal ══ */}
      {showExport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowExport(false)}/>
          <div className="relative bg-white shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-blue-950 px-6 py-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Download className="w-4 h-4 text-white"/>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-sm">Export Report</h3>
                <p className="text-blue-300 text-xs">Download report to your device</p>
              </div>
              <button onClick={() => setShowExport(false)} className="text-blue-400 hover:text-white transition-colors">
                <X className="w-4 h-4"/>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Report Type</label>
                <select value={exportType} onChange={e => setExportType(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {reportTypes.map(t => <option key={t.id} value={t.id}>{t.label} Report</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Format</label>
                <div className="flex gap-2">
                  {['csv','excel','pdf'].map(f => (
                    <button key={f} onClick={() => setExportFmt(f)}
                      className={`flex-1 py-2 text-xs font-bold border transition-colors ${exportFmt===f?'bg-blue-600 text-white border-blue-600':'bg-white text-gray-500 border-gray-200 hover:border-blue-300'}`}>
                      {f.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <button onClick={() => setShowExport(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleExport}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
                  <Download className="w-4 h-4"/> Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ Generate Modal ══ */}
      {showGenerate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowGenerate(false)}/>
          <div className="relative bg-white shadow-2xl w-full max-w-lg overflow-hidden" style={{maxHeight:'92vh',overflowY:'auto'}}>
            <div className="bg-blue-950 px-6 py-4 flex items-center gap-3 sticky top-0 z-10">
              <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-white"/>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-sm">Generate Custom Report</h3>
                <p className="text-blue-300 text-xs">Configure and download your report</p>
              </div>
              <button onClick={() => setShowGenerate(false)} className="text-blue-400 hover:text-white transition-colors">
                <X className="w-4 h-4"/>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Report Name</label>
                <input type="text" placeholder="e.g. October Community Health Summary"
                  value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                  className="w-full border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"/>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Date Range</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-400 mb-1 block">From</label>
                    <input type="date" value={form.from} onChange={e => setForm(f => ({...f, from: e.target.value}))}
                      className="w-full border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-400 mb-1 block">To</label>
                    <input type="date" value={form.to} onChange={e => setForm(f => ({...f, to: e.target.value}))}
                      className="w-full border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Report Type</label>
                <select value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))}
                  className="w-full border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {reportTypes.map(t => <option key={t.id} value={t.id}>{t.label} Report</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Include Metrics</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {id:'visits',label:'Home Visits'},{id:'assessments',label:'Assessments'},
                    {id:'demographics',label:'Demographics'},{id:'response',label:'Response Times'},
                  ].map(m => (
                    <label key={m.id} className="flex items-center gap-2 p-2.5 border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
                      <input type="checkbox" checked={form.metrics.includes(m.id)} onChange={() => toggleMetric(m.id)} className="accent-blue-600 w-4 h-4"/>
                      <span className="text-xs text-gray-700">{m.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Format</label>
                <div className="flex gap-2">
                  {['csv','excel','pdf'].map(f => (
                    <button key={f} onClick={() => setForm(ff => ({...ff, fmt: f}))}
                      className={`flex-1 py-2 text-xs font-bold border transition-colors ${form.fmt===f?'bg-blue-600 text-white border-blue-600':'bg-white text-gray-500 border-gray-200 hover:border-blue-300'}`}>
                      {f.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <button onClick={() => setShowGenerate(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleGenerate} disabled={!form.from || !form.to}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
                  <Download className="w-4 h-4"/> Generate &amp; Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}