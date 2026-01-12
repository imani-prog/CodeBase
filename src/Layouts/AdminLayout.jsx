


import AdminSidebar from '../Components/Admin/AdminSidebar';
import AdminNavbar from '../Components/Admin/AdminNavbar';

const AdminLayout = ({ children }) => (
  
  <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
    <AdminNavbar />
    <AdminSidebar />
    <main className="flex-1 overflow-y-auto ml-64 mt-0 px-6 lg:px-8 py-6">
      {children}
    </main>
    
  </div>
);
export default AdminLayout;
