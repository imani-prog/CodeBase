import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CHWSidebar from '../Components/CHWSidebar';
import CHWNavbar from '../Components/CHWNavbar';

const CHWLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
      <CHWNavbar onMenuClick={() => setSidebarOpen((o) => !o)} />
      <CHWSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto md:ml-64 mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default CHWLayout;
