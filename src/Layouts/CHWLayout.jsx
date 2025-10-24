import { Outlet } from 'react-router-dom';
import CHWSidebar from '../Components/CHWSidebar';
import CHWNavbar from '../Components/CHWNavbar';

const CHWLayout = () => {
  return (
    // Match admin/patient layout structure: fixed navbar and sidebar
    <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
      <CHWNavbar />
      <CHWSidebar />
      <main className="flex-1 p-6 overflow-y-auto ml-64 mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default CHWLayout;
