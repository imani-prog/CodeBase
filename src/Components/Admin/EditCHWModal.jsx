import { useState, useEffect } from "react";
import {
  X, Save, User, Mail, Phone, MapPin, Calendar, Activity,
  AlertCircle, CheckCircle2, Edit3, Users, Briefcase
} from "lucide-react";

const EditCHWModal = ({ chw, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (chw) setFormData({
      name: chw.name || "", email: chw.email || "", phone: chw.phone || "",
      region: chw.region || "", patients: chw.patients || "", status: chw.status || "",
      startDate: chw.startDate || "", specialization: chw.specialization || ""
    });
  }, [chw]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const req = ["name", "email", "phone", "region", "status"];
    const newErr = {};
    req.forEach(f => !formData[f]?.trim() && (newErr[f] = `${f[0].toUpperCase() + f.slice(1)} is required`));
    setErrors(newErr);
    return !Object.keys(newErr).length;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setIsSaving(true);
    setTimeout(() => {
      onSave({ ...chw, ...formData, patients: parseInt(formData.patients) || 0 });
      setIsSaving(false);
      onClose();
    }, 1000);
  };

  const renderField = ({ label, name, type = "text", icon: Icon, required, options }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>}
        {options ? (
          <select name={name} value={formData[name] || ""} onChange={handleChange}
            className={`w-full ${Icon ? "pl-10" : "px-4"} pr-4 py-3 border ${
              errors[name] ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-gray-100"
            } rounded-lg focus:ring-2 focus:border-transparent transition-all appearance-none bg-white`}>
            <option value="">Select {label.toLowerCase()}</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            className={`w-full ${Icon ? "pl-10" : "px-4"} pr-4 py-3 border ${
              errors[name] ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-gray-100"
            } rounded-lg focus:ring-2 focus:border-transparent transition-all`}
            placeholder={label}
          />
        )}
        {errors[name] && (
          <div className="absolute -bottom-5 left-0 flex items-center text-xs text-red-600">
            <AlertCircle className="w-3 h-3 mr-1" /> {errors[name]}
          </div>
        )}
      </div>
    </div>
  );

  if (!isOpen || !chw) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl max-w-3xl w-full overflow-hidden">
          <div className="relative px-8 py-6">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm hover:rotate-90 transition-all">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                <Edit3 className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">Edit CHW Profile</h2>
                <p className="text-sm">Update Community Health Worker information</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-gray-50 max-h-[calc(100vh-300px)] overflow-y-auto space-y-6">
            {/* Personal Info */}
            <Section title="Personal Information" icon={User}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderField({ label: "Full Name", name: "name", icon: User, required: true })}
                {renderField({ label: "Phone Number", name: "phone", icon: Phone, type: "tel", required: true })}
                {renderField({ label: "Email Address", name: "email", icon: Mail, type: "email", required: true })}
                {renderField({
                  label: "Assigned Region", name: "region", icon: MapPin, required: true,
                  options: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Machakos"]
                })}
                {renderField({ label: "Start Date", name: "startDate", icon: Calendar, type: "date" })}
              </div>
            </Section>

            {/* Work Info */}
            <Section title="Work Information" icon={Briefcase}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderField({ label: "Patients Assigned", name: "patients", icon: Users, type: "number" })}
                {renderField({
                  label: "Status", name: "status", icon: Activity, required: true,
                  options: ["Active", "On Leave", "Inactive"]
                })}
                {renderField({
                  label: "Specialization", name: "specialization",
                  options: ["General Health", "Maternal Health", "Child Health", "Elderly Care", "Mental Health", "Chronic Diseases"]
                })}
              </div>
            </Section>
          </div>

          {/* Footer */}
          <div className="bg-white border-t border-gray-200 px-8 py-4 flex justify-between items-center">
            <div className="text-sm text-gray-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span className="text-red-500">*</span> Required fields
            </div>
            <div className="flex space-x-3">
              <button onClick={onClose} disabled={isSaving}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                Cancel
              </button>
              <button onClick={handleSubmit} disabled={isSaving}
                className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                      <path fill="currentColor" className="opacity-75"
                        d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4zm2 5.3A8 8 0 014 12H0a12 12 0 003 7.9l3-2.6z" />
                    </svg> Saving...
                  </>
                ) : (<><CheckCircle2 className="w-4 h-4 mr-2" />Save Changes</>)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section Wrapper
const Section = ({ title, icon: Icon, children }) => (
  <div className="shadow-sm border border-gray-200 p-6">
    <div className="flex items-center mb-4">
      <div className="w-8 h-8 flex items-center justify-center mr-3">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    {children}
  </div>
);

export default EditCHWModal;
