import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { authApi } from '../API/endpoints/authApi.js';

const Register = () => {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
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
      const response = await authApi.register({
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
        fullName: fullName.trim(),
        phone: phone.trim(),
        role: role.toUpperCase(),
      });

      setUser({
        id: response.id,
        username: response.username,
        role: response.role.toLowerCase(),
        token: response.token,
      });

      const normalizedRole = response.role.toLowerCase();
      if (normalizedRole === 'admin') navigate('/admin/dashboard');
      else if (normalizedRole === 'chw') navigate('/client/chw/dashboard');
      else navigate('/client/patient/emergency');

    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        {error && <div className="mb-3 text-red-600 text-sm">{error}</div>}
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
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

        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="mb-3 p-2 border rounded w-full"
          required
        >
          <option value="" disabled>Select your role</option>
          <option value="patient">Patient</option>
          <option value="chw">Community Health Worker</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <div className="mt-3 text-sm text-center">
          Already registered?{' '}
          <Link to="/login" className="text-blue-700 underline">
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;