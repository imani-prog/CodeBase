import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check, Save } from 'lucide-react';

/* ── Section header ── */
const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-gray-200">
    {Icon && <Icon className="w-4 h-4 text-blue-600 flex-shrink-0" />}
    <div className="min-w-0">
      <h2 className="text-sm font-semibold text-gray-800 leading-tight">{title}</h2>
      {subtitle && <p className="text-xs text-gray-500 leading-tight mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

/* ── Toggle row ── */
const ToggleRow = ({ label, checked, onChange }) => {
  const [on, setOn] = useState(!!checked);
  const handleChange = (val) => {
    setOn(val);
    onChange && onChange(val);
  };
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-gray-100 last:border-b-0">
      <p className="text-sm text-gray-700 leading-tight">{label}</p>
      <button
        onClick={() => handleChange(!on)}
        className={`relative inline-flex h-5 w-9 rounded-full transition-colors flex-shrink-0 ${on ? 'bg-blue-600' : 'bg-gray-300'}`}
      >
        <span className={`inline-block w-3.5 h-3.5 mt-0.5 ml-0.5 transform bg-white rounded-full shadow-sm transition-transform ${on ? 'translate-x-4' : 'translate-x-0'}`} />
      </button>
    </div>
  );
};

/* ── Select row ── */
const SelectRow = ({ label, defaultValue, onChange, options }) => (
  <div className="px-4 py-2.5 border-b border-gray-100 last:border-b-0">
    <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
    <select
      defaultValue={defaultValue}
      onChange={(e) => onChange && onChange(e.target.value)}
      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-800"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

/* ── Action row ── */
const ActionRow = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between w-full px-4 py-2.5 border-b border-gray-100 last:border-b-0 hover:bg-blue-50 transition-colors group text-left"
  >
    <span className="text-sm text-gray-700 group-hover:text-blue-700">{label}</span>
    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 flex-shrink-0" />
  </button>
);

/* ── Section wrapper ── */
const Section = ({ children }) => (
  <div className="border border-gray-200 overflow-hidden">
    {children}
  </div>
);

/* ── Main SettingsBase ── */
const SettingsBase = ({ settingsSections = [] }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-0 sm:px-4 py-4 sm:py-6">

        {/* ── Page Header ── */}
        <div className="flex items-center justify-between mb-4 px-4 sm:px-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 hidden sm:block">
              Manage your account preferences and privacy settings
            </p>
          </div>
          <button
            onClick={handleSave}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex-shrink-0 ${
              saved ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {saved
              ? <><Check className="w-3.5 h-3.5" /><span>Saved</span></>
              : <><Save className="w-3.5 h-3.5" /><span>Save</span></>
            }
          </button>
        </div>

        {/* ── Sections ── */}
        <div className="space-y-2 sm:space-y-4">
          {settingsSections.map((section, index) => (
            <Section key={index}>
              <SectionHeader
                icon={section.icon}
                title={section.title}
                subtitle={section.description}
              />

              {/* Action rows */}
              {section.actions?.map((action, i) => (
                <ActionRow
                  key={i}
                  label={action.label}
                  onClick={() => action.onClick ? action.onClick() : navigate(action.path)}
                />
              ))}

              {/* Toggle rows */}
              {section.toggles?.map((toggle, i) => (
                <ToggleRow
                  key={i}
                  label={toggle.label}
                  checked={toggle.defaultChecked}
                  onChange={toggle.onChange}
                />
              ))}

              {/* Select rows */}
              {section.selects?.map((select, i) => (
                <SelectRow
                  key={i}
                  label={select.label}
                  defaultValue={select.defaultValue}
                  onChange={select.onChange}
                  options={select.options}
                />
              ))}
            </Section>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SettingsBase;