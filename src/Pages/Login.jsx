import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Activity, Shield, Users } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import { authApi } from '../API/endpoints/authApi.js';
import { setTokens } from '../API/index.js';

const Login = () => {
  const [role, setRole]               = useState('');
  const [username, setUsername]       = useState('');
  const [password, setPassword]       = useState('');
  const [error, setError]             = useState('');
  const [loading, setLoading]         = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useAuth();
  const navigate    = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!role) return setError('Please select your role');

    setLoading(true);
    try {
      const response = await authApi.login({
        username: username.trim(),
        password: password.trim(),
        role:     role.toUpperCase(),
      });

      console.log('Login response:', response);

      const returnedRole = (response.role ?? '').toLowerCase();

      if (!returnedRole)
        throw new Error('Account has no role assigned. Contact support.');

      if (returnedRole !== role.toLowerCase())
        throw new Error('Selected role does not match your account');

      setTokens({ accessToken: response.accessToken, refreshToken: response.refreshToken });

      setUser({
        id:       response.userId,
        username: response.username,
        role:     returnedRole,
        token:    response.accessToken,
      });

      if (returnedRole === 'admin')        navigate('/admin/dashboard');
      else if (returnedRole === 'chw')     navigate('/client/chw/dashboard');
      else if (returnedRole === 'patient') navigate('/client/patient/emergency');
      else setError('Unknown role. Please contact support.');

    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: <Shield size={16} />,   text: 'Secure & private records'    },
    { icon: <Users size={16} />,    text: 'CHW-driven care delivery'     },
    { icon: <Activity size={16} />, text: 'Real-time health monitoring'  },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">

      {/* ── Left hero panel (hidden on mobile) ── */}
      <div
        className="hidden md:flex md:w-[45%] relative overflow-hidden items-center justify-center"
        style={{ background: '#172554' }}
      >
        {/* Content */}
        <div className="relative z-10 p-12 max-w-sm">

          {/* Brand */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <Activity size={26} color="#fff" strokeWidth={2.5} />
            </div>
            <span className="text-white text-2xl font-bold tracking-tight">MediLink</span>
          </div>

          {/* Headline */}
          <div className="mb-10">
            <h1 className="text-white text-5xl font-bold leading-tight tracking-tight mb-4">
              Healthcare,<br />connected.
            </h1>
            <p className="text-white/75 text-base leading-relaxed">
              A unified platform for patients, community health workers, and
              administrators — bringing care closer to communities across Kenya.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-col gap-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                <span className="text-blue-200 flex items-center">{f.icon}</span>
                <span className="text-white/90 text-sm font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative rings */}
        <div className="absolute w-96 h-96 rounded-full border border-white/[0.08] -bottom-20 -right-20 z-0" />
        <div className="absolute w-[560px] h-[560px] rounded-full border border-white/[0.05] -bottom-40 -right-40 z-0" />
      </div>

      {/* ── Right form panel ── */}
      <div className="flex flex-1 items-center justify-center px-6 py-10 md:px-10">
        <div className="w-full max-w-sm animate-fadeIn">

          {/* Mobile-only brand */}
          <div className="flex md:hidden items-center justify-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-blue-950 flex items-center justify-center">
              <Activity size={18} color="#fff" strokeWidth={2.5} />
            </div>
            <span className="text-blue-700 text-xl font-bold tracking-tight">MediLink</span>
          </div>

          {/* Header */}
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">Welcome back</h2>
            <p className="text-gray-500 text-sm">Sign in to access your dashboard</p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3.5 py-3 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Role */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">Role</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-900 bg-white appearance-none cursor-pointer focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition"
                  required
                >
                  <option value="" disabled>Select your role</option>
                  <option value="patient">Patient</option>
                  <option value="chw">Community Health Worker</option>
                  <option value="admin">Admin</option>
                </select>
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">▾</span>
              </div>
            </div>

            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-11 border border-gray-300 rounded-xl text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition"
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition p-0.5"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full py-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-700/25 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-700/30 transition-all duration-150"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : 'Sign in'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-700 font-semibold hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;