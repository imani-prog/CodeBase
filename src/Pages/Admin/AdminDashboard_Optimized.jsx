import React from 'react';
import StatsCards from './components/StatsCards';
import QuickActions from './components/QuickActions';
import UserGrowthChart from './components/UserGrowthChart';
import ActivityChart from './components/ActivityChart';
import TopPerformers from './components/TopPerformers';
import RecentRegistrations from './components/RecentRegistrations';
import SystemAlerts from './components/SystemAlerts';
import RecentActivity from './components/RecentActivity';
import SidePanel from './components/SidePanel';
import AdminFeatures from './components/AdminFeatures';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Manage your healthcare platform</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <StatsCards />

        {/* Quick Actions */}
        <QuickActions />

        {/* Analytics Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <UserGrowthChart />
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
    </div>
  );
};

export default AdminDashboard;
