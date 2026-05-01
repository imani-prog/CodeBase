import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  Lock,
  Shield,
  Stethoscope,
  Users,
  UserCheck,
  Settings,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  AlertTriangle,
  Loader2,
  Eye,
  EyeOff,
  MapPin,
  Calendar,
  ChevronDown,
} from 'lucide-react';
import { userApi } from '../../../API/endpoints/userApi.js';


const ROLES = ['ADMIN', 'DOCTOR', 'NURSE', 'CHW', 'TECHNICIAN', 'PATIENT'];
const STATUSES = ['ACTIVE', 'INACTIVE', 'PENDING', 'SUSPENDED'];

const ROLE_META = {
  ADMIN:      { icon: Shield,      label: 'Administrator' },
  DOCTOR:     { icon: Stethoscope, label: 'Doctor' },
  NURSE:      { icon: UserCheck,   label: 'Nurse' },
  CHW:        { icon: Users,       label: 'Community Health Worker' },
  TECHNICIAN: { icon: Settings,    label: 'Technician' },
  PATIENT:    { icon: Activity,    label: 'Patient' },
};

const STATUS_META = {
  ACTIVE:    { icon: CheckCircle, color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-200',  label: 'Active' },
  INACTIVE:  { icon: XCircle,     color: 'text-red-600',    bg: 'bg-red-50',    border: 'border-red-200',    label: 'Inactive' },
  PENDING:   { icon: Clock,       color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', label: 'Pending' },
  SUSPENDED: { icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', label: 'Suspended' },
};


function Modal({ open, onClose, title, subtitle, children, width = 'max-w-lg' }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`bg-white rounded-xl shadow-2xl w-full ${width} max-h-[90vh] flex flex-col`}>
        {/* Header */}
        <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
            {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}


function Field({ label, icon: Icon, required, error, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        )}
        {children}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

const inputCls = (hasIcon, error) =>
  `w-full ${hasIcon ? 'pl-9' : 'pl-3'} pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors ${
    error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
  }`;


function Banner({ type, message }) {
  if (!message) return null;
  const styles = {
    error:   'bg-red-50 border-red-200 text-red-700',
    success: 'bg-green-50 border-green-200 text-green-700',
  };
  return (
    <div className={`text-xs px-4 py-2 border rounded-lg mb-1 ${styles[type]}`}>
      {message}
    </div>
  );
}


export function AddUserModal({ open, onClose, onSuccess }) {
  const initial = { username: '', email: '', fullName: '', phone: '', password: '', role: 'PATIENT' };
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setErrors(errs => ({ ...errs, [field]: '' }));
    setApiError('');
  };

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = 'Username is required';
    if (!form.email.trim())    e.email    = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.password)        e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    setApiError('');
    try {
      await userApi.create({
        username: form.username.trim(),
        email:    form.email.trim(),
        fullName: form.fullName.trim(),
        phone:    form.phone.trim() || null,
        password: form.password,
        role:     form.role,
      });
      setForm(initial);
      onSuccess?.();
      onClose();
    } catch (err) {
      setApiError(err.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => { setForm(initial); setErrors({}); setApiError(''); onClose(); };

  return (
    <Modal open={open} onClose={handleClose} title="Add New User" subtitle="Create a new user account in the system">
      <div className="px-5 py-4 space-y-3">
        <Banner type="error" message={apiError} />

        <div className="grid grid-cols-2 gap-3">
          <Field label="Full Name" icon={User} required error={errors.fullName}>
            <input
              className={inputCls(true, errors.fullName)}
              placeholder="Jane Doe"
              value={form.fullName}
              onChange={set('fullName')}
            />
          </Field>
          <Field label="Username" required error={errors.username}>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</span>
              <input
                className={`w-full pl-7 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors ${errors.username ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                placeholder="jdoe"
                value={form.username}
                onChange={set('username')}
              />
            </div>
            {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username}</p>}
          </Field>
        </div>

        <Field label="Email Address" icon={Mail} required error={errors.email}>
          <input
            type="email"
            className={inputCls(true, errors.email)}
            placeholder="jane@example.com"
            value={form.email}
            onChange={set('email')}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Phone" icon={Phone} error={errors.phone}>
            <input
              className={inputCls(true, errors.phone)}
              placeholder="+254 700 000000"
              value={form.phone}
              onChange={set('phone')}
            />
          </Field>

          <Field label="Role" required>
            <div className="relative">
              <select
                value={form.role}
                onChange={set('role')}
                className="w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none bg-white"
              >
                {ROLES.map(r => (
                  <option key={r} value={r}>{ROLE_META[r]?.label ?? r}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
          </Field>
        </div>

        <Field label="Password" icon={Lock} required error={errors.password}>
          <input
            type={showPass ? 'text' : 'password'}
            className={`w-full pl-9 pr-9 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
            placeholder="Min. 6 characters"
            value={form.password}
            onChange={set('password')}
          />
          <button
            type="button"
            onClick={() => setShowPass(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
        </Field>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2 px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
        <button
          onClick={handleClose}
          className="px-4 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors"
        >
          {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          Create User
        </button>
      </div>
    </Modal>
  );
}

export function ViewUserModal({ open, onClose, user }) {
  if (!user) return null;

  const roleKey   = (user.role   || '').toUpperCase();
  const statusKey = (user.status || '').toUpperCase();
  const RoleIcon   = ROLE_META[roleKey]?.icon   ?? Users;
  const StatusIcon = STATUS_META[statusKey]?.icon ?? AlertCircle;
  const statusMeta = STATUS_META[statusKey] ?? { color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', label: statusKey };

  const Row = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
      <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-blue-600" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 leading-none mb-0.5">{label}</p>
        <p className="text-sm text-gray-800 font-medium truncate">{value || <span className="text-gray-400 font-normal">—</span>}</p>
      </div>
    </div>
  );

  return (
    <Modal open={open} onClose={onClose} title="User Details" subtitle={`ID: ${user.id}`}>
      <div className="px-5 pt-4 pb-1">
        {/* Avatar + name block */}
        <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-lg shrink-0">
            {(user.name || user.username || '?')[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">@{user.username}</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusMeta.bg} ${statusMeta.border} ${statusMeta.color}`}>
                <StatusIcon className="w-3 h-3" />
                {statusMeta.label}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border bg-blue-50 border-blue-200 text-blue-700">
                <RoleIcon className="w-3 h-3" />
                {ROLE_META[roleKey]?.label ?? roleKey}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-0">
          <Row icon={Mail}     label="Email"       value={user.email} />
          <Row icon={Phone}    label="Phone"       value={user.phone} />
          <Row icon={MapPin}   label="Location"    value={user.location} />
          <Row icon={Stethoscope} label="Specialization" value={user.specialization} />
          <Row icon={Users}    label="Department"  value={user.department} />
          <Row icon={Calendar} label="Member Since" value={user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : null} />
          <Row icon={Clock}    label="Last Login"  value={user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'} />
        </div>
      </div>

      <div className="flex justify-end px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
        <button
          onClick={onClose}
          className="px-4 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}

export function EditUserModal({ open, onClose, user, onSuccess }) {
  const [form, setForm]     = useState({ fullName: '', email: '', phone: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (user) {
      setForm({ fullName: user.name || '', email: user.email || '', phone: user.phone || '', password: '' });
      setErrors({}); setApiError('');
    }
  }, [user]);

  if (!user) return null;

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setErrors(errs => ({ ...errs, [field]: '' }));
    setApiError('');
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.trim())    e.email    = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (form.password && form.password.length < 6) e.password = 'Minimum 6 characters';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    setApiError('');
    try {
      const payload = {
        fullName: form.fullName.trim(),
        email:    form.email.trim(),
        phone:    form.phone.trim() || null,
        username: user.username,
      };
      if (form.password) payload.password = form.password;

      await userApi.update(user.id, payload);
      onSuccess?.();
      onClose();
    } catch (err) {
      setApiError(err.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit User" subtitle={`Editing @${user.username}`}>
      <div className="px-5 py-4 space-y-3">
        <Banner type="error" message={apiError} />

        <Field label="Full Name" icon={User} required error={errors.fullName}>
          <input
            className={inputCls(true, errors.fullName)}
            placeholder="Jane Doe"
            value={form.fullName}
            onChange={set('fullName')}
          />
        </Field>

        <Field label="Email Address" icon={Mail} required error={errors.email}>
          <input
            type="email"
            className={inputCls(true, errors.email)}
            value={form.email}
            onChange={set('email')}
          />
        </Field>

        <Field label="Phone" icon={Phone} error={errors.phone}>
          <input
            className={inputCls(true, errors.phone)}
            placeholder="+254 700 000000"
            value={form.phone}
            onChange={set('phone')}
          />
        </Field>

        <Field label="New Password" icon={Lock} error={errors.password}>
          <input
            type={showPass ? 'text' : 'password'}
            className={`w-full pl-9 pr-9 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
            placeholder="Leave blank to keep current"
            value={form.password}
            onChange={set('password')}
          />
          <button
            type="button"
            onClick={() => setShowPass(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
        </Field>

        <p className="text-xs text-gray-400 -mt-1">
          Username and role can be changed via dedicated actions.
        </p>
      </div>

      <div className="flex justify-end gap-2 px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
        <button
          onClick={onClose}
          className="px-4 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors"
        >
          {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          Save Changes
        </button>
      </div>
    </Modal>
  );
}


export function ChangeRoleModal({ open, onClose, user, onSuccess }) {
  const [role, setRole]       = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (user) { setRole((user.role || 'PATIENT').toUpperCase()); setApiError(''); }
  }, [user]);

  if (!user) return null;

  const currentRole = (user.role || '').toUpperCase();

  const handleSubmit = async () => {
    if (role === currentRole) { onClose(); return; }
    setLoading(true);
    setApiError('');
    try {
      await userApi.updateRole(user.id, role);
      onSuccess?.();
      onClose();
    } catch (err) {
      setApiError(err.message || 'Failed to update role');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Change Role" subtitle={`@${user.username} · ${user.name}`} width="max-w-sm">
      <div className="px-5 py-4 space-y-3">
        <Banner type="error" message={apiError} />

        <div className="grid grid-cols-1 gap-2">
          {ROLES.map(r => {
            const Icon = ROLE_META[r]?.icon ?? Users;
            const selected = role === r;
            return (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all ${
                  selected
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${selected ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <Icon className={`w-3.5 h-3.5 ${selected ? 'text-blue-600' : 'text-gray-500'}`} />
                </div>
                <span className="text-sm font-medium flex-1">{ROLE_META[r]?.label ?? r}</span>
                {r === currentRole && (
                  <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Current</span>
                )}
                {selected && (
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end gap-2 px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
        <button
          onClick={onClose}
          className="px-4 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors"
        >
          {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          Apply Role
        </button>
      </div>
    </Modal>
  );
}


export function ChangeStatusModal({ open, onClose, user, onSuccess }) {
  const [status, setStatus]   = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (user) { setStatus((user.status || 'ACTIVE').toUpperCase()); setApiError(''); }
  }, [user]);

  if (!user) return null;

  const currentStatus = (user.status || '').toUpperCase();

  const handleSubmit = async () => {
    if (status === currentStatus) { onClose(); return; }
    setLoading(true);
    setApiError('');
    try {
      await userApi.updateStatus(user.id, status);
      onSuccess?.();
      onClose();
    } catch (err) {
      setApiError(err.message || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Change Status" subtitle={`@${user.username} · ${user.name}`} width="max-w-sm">
      <div className="px-5 py-4 space-y-2">
        <Banner type="error" message={apiError} />

        {STATUSES.map(s => {
          const meta = STATUS_META[s] ?? { icon: AlertCircle, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', label: s };
          const Icon = meta.icon;
          const selected = status === s;
          return (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg border text-left transition-all ${
                selected
                  ? `${meta.bg} ${meta.border} ${meta.color} font-medium`
                  : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${selected ? meta.color : 'text-gray-400'}`} />
              <span className="text-sm flex-1">{meta.label}</span>
              {s === currentStatus && (
                <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Current</span>
              )}
              {selected && <CheckCircle className={`w-4 h-4 ${meta.color}`} />}
            </button>
          );
        })}
      </div>

      <div className="flex justify-end gap-2 px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
        <button
          onClick={onClose}
          className="px-4 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors"
        >
          {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          Apply Status
        </button>
      </div>
    </Modal>
  );
}


export function DeleteUserModal({ open, onClose, user, onSuccess }) {
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => { if (open) { setConfirm(''); setApiError(''); } }, [open]);

  if (!user) return null;

  const handleDelete = async () => {
    setLoading(true);
    setApiError('');
    try {
      await userApi.delete(user.id);
      onSuccess?.();
      onClose();
    } catch (err) {
      setApiError(err.message || 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  const confirmed = confirm === user.username;

  return (
    <Modal open={open} onClose={onClose} title="Delete User" width="max-w-sm">
      <div className="px-5 py-4 space-y-4">
        <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="text-sm text-red-700">
            <p className="font-medium mb-0.5">This action is irreversible</p>
            <p className="text-xs leading-relaxed text-red-600">
              Deleting <strong>{user.name}</strong> will permanently remove their account, settings, and all associated data.
            </p>
          </div>
        </div>

        <Banner type="error" message={apiError} />

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Type <span className="font-mono font-semibold text-gray-900 bg-gray-100 px-1 rounded">{user.username}</span> to confirm
          </label>
          <input
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder={user.username}
            value={confirm}
            onChange={e => { setConfirm(e.target.value); setApiError(''); }}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
        <button
          onClick={onClose}
          className="px-4 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={loading || !confirmed}
          className="flex items-center gap-2 px-4 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-40 transition-colors"
        >
          {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          Delete User
        </button>
      </div>
    </Modal>
  );
}


export function ActionsDropdown({ user, onView, onEdit, onChangeRole, onChangeStatus, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const action = (fn) => () => { fn(user); setOpen(false); };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        {/* MoreHorizontal icon rendered inline to avoid extra import */}
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg border border-gray-200 shadow-lg z-30 py-1 text-sm">
          <button onClick={action(onView)}         className="flex items-center gap-2 w-full px-3 py-1.5 text-gray-700 hover:bg-gray-50 transition-colors">
            <Eye           className="w-3.5 h-3.5 text-blue-500" /> View Profile
          </button>
          <button onClick={action(onEdit)}         className="flex items-center gap-2 w-full px-3 py-1.5 text-gray-700 hover:bg-gray-50 transition-colors">
            <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            Edit Details
          </button>
          <div className="border-t border-gray-100 my-1" />
          <button onClick={action(onChangeRole)}   className="flex items-center gap-2 w-full px-3 py-1.5 text-gray-700 hover:bg-gray-50 transition-colors">
            <Shield        className="w-3.5 h-3.5 text-purple-500" /> Change Role
          </button>
          <button onClick={action(onChangeStatus)} className="flex items-center gap-2 w-full px-3 py-1.5 text-gray-700 hover:bg-gray-50 transition-colors">
            <Activity      className="w-3.5 h-3.5 text-yellow-500" /> Change Status
          </button>
          <div className="border-t border-gray-100 my-1" />
          <button onClick={action(onDelete)}       className="flex items-center gap-2 w-full px-3 py-1.5 text-red-600 hover:bg-red-50 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            Delete User
          </button>
        </div>
      )}
    </div>
  );
}