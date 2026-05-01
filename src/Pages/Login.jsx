import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import { authApi } from '../API/endpoints/authApi.js';
import { setTokens } from '../API/index.js';

const Login = () => {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!role) {
    return setError('Please select your role');
  }

  setLoading(true);

  try {
    const response = await authApi.login({
      username: username.trim(),
      password: password.trim(),
      role: role.toUpperCase(),
    });

    console.log('Login response:', response);

    // ✅ was response.role.toLowerCase() — crashes if role is null
    const returnedRole = (response.role ?? '').toLowerCase();

    if (!returnedRole) {
      throw new Error('Account has no role assigned. Contact support.');
    }

    if (returnedRole !== role.toLowerCase()) {
      throw new Error('Selected role does not match your account');
    }

    setTokens({
      accessToken:  response.accessToken,
      refreshToken: response.refreshToken,
    });

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
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        {error && <div className="mb-3 text-red-600 text-sm">{error}</div>}

        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
          required
        >
          <option value="" disabled>
            Select your role
          </option>
          <option value="patient">Patient</option>
          <option value="chw">Community Health Worker</option>
          <option value="admin">Admin</option>
        </select>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
          required
        />

        <div className="relative mb-3">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded w-full pr-10"
            required
          />
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="mt-3 text-sm text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-700 underline">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;