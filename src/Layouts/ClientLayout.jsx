import { Outlet } from 'react-router-dom';
import PatientSidebar from '../Components/PatientSidebar';
import PatientNavbar from '../Components/PatientNavbar';

const ClientLayout = () => {
  return (
    // Match admin layout structure: fixed navbar and sidebar, add top padding to account for fixed navbar height (h-16)
    // and left margin to account for fixed sidebar (w-64)
    <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
      <PatientNavbar />
      <PatientSidebar />
      <main className="flex-1 p-6 overflow-y-auto ml-64 mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;
