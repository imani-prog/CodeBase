import React from 'react';
import StatsCards from './components/StatsCards';
import QuickActions from './components/QuickActions';
import UserGrowthBarChart from './components/UserGrowthBarChart';
import ActivityChart from './components/ActivityChart';
import TopPerformers from './components/TopPerformers';
import RecentRegistrations from './components/RecentRegistrations';
import SystemAlerts from './components/SystemAlerts';
import RecentActivity from './components/RecentActivity';
import SidePanel from './components/SidePanel';
import AdminFeatures from './components/AdminFeatures';
import OverallOperations from '../../Components/Admin/OverallOperations';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Quick Actions */}
      <QuickActions />


      {/* Stats Cards */}
      <StatsCards />

      {/* Overall Operations */}
      <OverallOperations />

      

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <UserGrowthBarChart />
        <ActivityChart />
      </div>

      {/* Data Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <TopPerformers />
        <RecentRegistrations />
        <SystemAlerts />
      </div>

      {/* Recent Activity and Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <RecentActivity />
        <SidePanel />
      </div>

      {/* Admin Features Grid */}
      <AdminFeatures />
    </div>
  );
};

export default AdminDashboard;
