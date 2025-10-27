


import AdminSidebar from '../Components/AdminSidebar';
import AdminNavbar from '../Components/AdminNavbar';

const AdminLayout = ({ children }) => (
  // add top padding to account for fixed navbar height (h-16)
  // and left padding/margin to account for fixed sidebar (w-64)
  <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
    <AdminNavbar />
    <AdminSidebar />
    <main className="flex-1 overflow-y-auto ml-64 mt-0 px-6 lg:px-8 py-6">
      {children}
    </main>
    
  </div>
);
export default AdminLayout;
