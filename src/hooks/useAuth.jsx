import { useContext, createContext, useState } from 'react';

const AuthContext = createContext();

const defaultAdmin = {
  role: 'admin',
  name: 'Dr. Timothy Imani',
  email: 'timothy.imani@medilink.com',
  phone: '+254 700 123456',
  title: 'Chief Administrator',
  department: 'Healthcare Operations',
  employeeId: 'HCA-2024-001',
  joinDate: 'January 15, 2023',
  location: 'Nairobi, Kenya',
  timezone: 'EAT (UTC+3)',
  language: 'English',
  status: 'Active',
  initials: 'TI',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultAdmin);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
