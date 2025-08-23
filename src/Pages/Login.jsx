import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const Login = () => {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find(u => u.username === username && u.password === password);
    if (!found) {
      setError('Invalid username or password.');
      return;
    }
    if (!role) {
      setError('Please select a role.');
      return;
    }
    if (found.role !== role) {
      setError('Role does not match registration.');
      return;
    }
    setUser({ username, role });
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else if (role === 'chw') {
      navigate('/client/chw/dashboard');
    } else {
      navigate('/client/patient/dashboard');
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
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="p-2 border rounded w-full pr-10"
            required
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(v => !v)}
            tabIndex={0}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.062-4.675A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.675-.938" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.828-2.828A9.956 9.956 0 0122 12c0 5.523-4.477 10-10 10S2 17.523 2 12c0-2.21.714-4.253 1.928-5.928M4.222 4.222l15.556 15.556" /></svg>
            )}
          </span>
        </div>
        <select value={role} onChange={e => setRole(e.target.value)} className="mb-3 p-2 border rounded w-full">
          <option value="" disabled>Choose login or signup option</option>
          <option value="patient">Patient</option>
          <option value="chw">Community Health Worker (CHW)</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
        <div className="mt-3 text-sm text-center">
          Don't have an account? <Link to="/register" className="text-blue-700 underline">Register here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
