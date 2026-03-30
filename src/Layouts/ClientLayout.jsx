import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PatientSidebar from '../Components/PatientSidebar';
import PatientNavbar from '../Components/PatientNavbar';

const ClientLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
      <PatientNavbar onMenuClick={() => setSidebarOpen((open) => !open)} />
      <PatientSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 px-2 py-3 sm:p-6 overflow-y-auto md:ml-64 mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;
