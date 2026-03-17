import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const toTitleCase = (value = '') =>
  value
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');

const formatNameFromUsername = (username = '') => {
  const normalized = username.replace(/[._-]+/g, ' ').trim();
  if (!normalized) return 'User';
  return toTitleCase(normalized);
};

const computeInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('') || 'U';

const Login = () => {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const buildAuthenticatedUser = (foundUser, normalizedRole) => {
    const usernameValue = foundUser.username?.trim() || username.trim();
    const roleDefaults = {
      admin: {
        name: 'Dr. Timothy Imani',
        title: 'Chief Administrator',
        department: 'Healthcare Operations',
        email: 'timothy.imani@medilink.com',
        phone: '+254 700 123456',
      },
      chw: {
        name: 'Jane Wanjiru',
        title: 'Community Health Worker',
        chwLevel: 'Level 2 Community Health Worker',
        specialization: 'Maternal & Child Health',
        email: 'jane.wanjiru@medilink.co.ke',
        phone: '+254 712 345 678',
      },
      patient: {
        name: formatNameFromUsername(usernameValue),
        title: 'Patient',
      },
    };

    const fallbackName = formatNameFromUsername(usernameValue);
    const fallbackEmail = usernameValue ? `${usernameValue.toLowerCase()}@medilink.org` : '';
    const defaults = roleDefaults[normalizedRole] || roleDefaults.patient;
    const fullName = foundUser.name?.trim() || defaults.name || fallbackName;

    return {
      ...foundUser,
      username: usernameValue,
      role: normalizedRole,
      name: fullName,
      email: foundUser.email?.trim() || defaults.email || fallbackEmail,
      phone: foundUser.phone?.trim() || defaults.phone || '',
      title: foundUser.title?.trim() || defaults.title || '',
      chwLevel: foundUser.chwLevel?.trim() || defaults.chwLevel || '',
      specialization: foundUser.specialization?.trim() || defaults.specialization || '',
      initials: computeInitials(fullName),
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear any previous errors
    setError('');
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Debug logging (remove in production)
    console.log('All users:', users);
    console.log('Login attempt - Username:', username, 'Role:', role);
    
    const found = users.find(u => u.username === username && u.password === password);
    
    if (!found) {
      setError('Invalid username or password.');
      return;
    }
    
    // Debug logging
    console.log('Found user:', found);
    console.log('User role:', `"${found.role}"`, 'Selected role:', `"${role}"`);
    console.log('Role comparison:', found.role === role);
    
    if (!role) {
      setError('Please select a role.');
      return;
    }
    
    // Normalize roles to handle any whitespace issues and treat client/patient as same
    const userRole = found.role?.toString().trim().toLowerCase();
    const selectedRole = role?.toString().trim().toLowerCase();
    
    // Normalize client/patient to be the same
    const normalizeRole = (role) => {
      if (role === 'client' || role === 'patient') return 'patient';
      return role;
    };
    
    const normalizedUserRole = normalizeRole(userRole);
    const normalizedSelectedRole = normalizeRole(selectedRole);
    
    console.log('Role normalization:');
    console.log('  Original user role:', userRole);
    console.log('  Original selected role:', selectedRole);
    console.log('  Normalized user role:', normalizedUserRole);
    console.log('  Normalized selected role:', normalizedSelectedRole);
    console.log('  Roles match:', normalizedUserRole === normalizedSelectedRole);
    
    if (normalizedUserRole !== normalizedSelectedRole) {
      setError(`Role does not match registration. You registered as "${found.role}" but selected "${role}".`);
      return;
    }
    
    // Set user with normalized role and profile fields used across the app.
    const finalRole = normalizeRole(found.role?.toString().trim().toLowerCase());
    setUser(buildAuthenticatedUser(found, finalRole));
    
    // Navigate based on the normalized role
    if (finalRole === 'admin') {
      navigate('/admin/dashboard');
    } else if (finalRole === 'chw') {
      navigate('/client/chw/dashboard');
    } else if (finalRole === 'patient') {
      navigate('/client/patient/emergency');
    } else {
      setError('Invalid role detected. Please contact support.');
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
          <option value="patient">Patient/Client</option>
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
