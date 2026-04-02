import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { authApi } from '../API/endpoints/authApi.js';

const Login = () => {
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
    setLoading(true);

    try {
      const response = await authApi.login({
        username: username.trim(),
        password: password.trim(),
      });

      setUser({
        id: response.id,
        username: response.username,
        role: response.role.toLowerCase(),
        token: response.token,
      });

      const role = response.role.toLowerCase();
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'chw') navigate('/client/chw/dashboard');
      else if (role === 'patient') navigate('/client/patient/emergency');
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

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
          required
        />

        <div className="relative mb-3">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="p-2 border rounded w-full pr-10"
            required
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(v => !v)}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
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