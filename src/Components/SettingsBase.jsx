import { useNavigate } from 'react-router-dom';

const SettingsBase = ({ settingsSections }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your account preferences and privacy settings
        </p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settingsSections.map((section, index) => {
          const Icon = section.icon;
          
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">{section.title}</h2>
                  <p className="text-xs text-gray-600">{section.description}</p>
                </div>
              </div>

              {/* Actions/Controls */}
              <div className="space-y-2">
                {section.actions?.map((action, actionIndex) => (
                  <button
                    key={actionIndex}
                    onClick={() => action.onClick ? action.onClick() : navigate(action.path)}
                    className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
                  >
                    {action.label} →
                  </button>
                ))}

                {section.toggles?.map((toggle, toggleIndex) => (
                  <label key={toggleIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg cursor-pointer">
                    <span className="text-sm text-gray-700">{toggle.label}</span>
                    <input
                      type="checkbox"
                      defaultChecked={toggle.defaultChecked}
                      onChange={toggle.onChange}
                      className="w-4 h-4 text-blue-600"
                    />
                  </label>
                ))}

                {section.selects?.map((select, selectIndex) => (
                  <div key={selectIndex}>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {select.label}
                    </label>
                    <select
                      defaultValue={select.defaultValue}
                      onChange={select.onChange}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                    >
                      {select.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsBase;
