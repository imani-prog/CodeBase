import React from 'react';
import { 
  Users, 
  DollarSign, 
  Truck, 
  Video, 
  GraduationCap, 
  Shield,
  ArrowUp, 
  ArrowDown, 
  Minus, 
  CheckCircle, 
  Clock, 
  Star,
  UserCheck,
  Building2
} from 'lucide-react';

const OverallOperations = () => {
  // System overview data
  const systemOverview = {
    totalPatients: 15847,
    activePatients: 2847,
    newPatientsThisMonth: 456,
    totalRevenue: 125670000, // KES
    monthlyRevenue: 8940000, // KES
    revenueGrowth: 12.8,
    totalClaims: 3421,
    claimsApproved: 3298,
    claimsValue: 45670000, // KES
    ambulanceFleet: 15,
    activeAmbulances: 12,
    totalTrips: 1847,
    emergencyResponse: 4.2, // minutes
    telemedicineSessions: 2341,
    activeDoctors: 45,
    sessionCompletionRate: 94.5,
    trainingPrograms: 23,
    enrolledStudents: 1245,
    completionRate: 87.3,
  };

  // Performance metrics data
  const performanceMetrics = [
    {
      id: 1,
      category: 'Patient Management',
      icon: Users,
      color: 'blue',
      metrics: [
        { label: 'Total Patients', value: systemOverview.totalPatients.toLocaleString(), change: '+5.2%', trend: 'up' },
        { label: 'Active Patients', value: systemOverview.activePatients.toLocaleString(), change: '-3.4%', trend: 'down' },
        { label: 'New This Month', value: systemOverview.newPatientsThisMonth.toLocaleString(), change: '+12.3%', trend: 'up' },
        { label: 'Patient Satisfaction', value: '4.7/5', change: '-0.1', trend: 'down' }
      ]
    },
    {
      id: 2,
      category: 'Financial Performance',
      icon: DollarSign,
      color: 'blue',
      metrics: [
        { label: 'Total Revenue', value: `KES ${(systemOverview.totalRevenue / 1000000).toFixed(1)}M`, change: '+15.4%', trend: 'up' },
        { label: 'Monthly Revenue', value: `KES ${(systemOverview.monthlyRevenue / 1000000).toFixed(1)}M`, change: '+12.8%', trend: 'up' },
        { label: 'Claims Value', value: `KES ${(systemOverview.claimsValue / 1000000).toFixed(1)}M`, change: '+7.8%', trend: 'up' },
        { label: 'Profit Margin', value: '23.4%', change: '-1.3%', trend: 'down' }
      ]
    },
    {
      id: 3,
      category: 'Ambulance Operations',
      icon: Truck,
      color: 'blue',
      metrics: [
        { label: 'Fleet Size', value: systemOverview.ambulanceFleet.toString(), change: '+2', trend: 'up' },
        { label: 'Active Units', value: systemOverview.activeAmbulances.toString(), change: '-1', trend: 'down' },
        { label: 'Total Trips', value: systemOverview.totalTrips.toLocaleString(), change: '+18.7%', trend: 'up' },
        { label: 'Response Time', value: `${systemOverview.emergencyResponse} min`, change: '+0.5 min', trend: 'down' }
      ]
    },
    {
      id: 4,
      category: 'Telemedicine',
      icon: Video,
      color: 'blue',
      metrics: [
        { label: 'Total Sessions', value: systemOverview.telemedicineSessions.toLocaleString(), change: '-6.3%', trend: 'down' },
        { label: 'Active Doctors', value: systemOverview.activeDoctors.toString(), change: '+5', trend: 'up' },
        { label: 'Completion Rate', value: `${systemOverview.sessionCompletionRate}%`, change: '-2.4%', trend: 'down' },
        { label: 'Avg Session Time', value: '28 min', change: '+2 min', trend: 'up' }
      ]
    },
    {
      id: 5,
      category: 'Training Programs',
      icon: GraduationCap,
      color: 'blue',
      metrics: [
        { label: 'Programs Active', value: systemOverview.trainingPrograms.toString(), change: '+3', trend: 'up' },
        { label: 'Enrolled Students', value: systemOverview.enrolledStudents.toLocaleString(), change: '-5.7%', trend: 'down' },
        { label: 'Completion Rate', value: `${systemOverview.completionRate}%`, change: '+3.1%', trend: 'up' },
        { label: 'Certification Rate', value: '91.2%', change: '-2.8%', trend: 'down' }
      ]
    },
    {
      id: 6,
      category: 'Insurance Management',
      icon: Shield,
      color: 'blue',
      metrics: [
        { label: 'Total Claims', value: systemOverview.totalClaims.toLocaleString(), change: '+11.4%', trend: 'up' },
        { label: 'Approval Rate', value: `${((systemOverview.claimsApproved / systemOverview.totalClaims) * 100).toFixed(1)}%`, change: '+2.3%', trend: 'up' },
        { label: 'Claims Value', value: `KES ${(systemOverview.claimsValue / 1000000).toFixed(1)}M`, change: '-4.2%', trend: 'down' },
        { label: 'Processing Time', value: '6.2 days', change: '-1.1 days', trend: 'down' }
      ]    },
    {
      id: 7,
      category: 'Community Health Workers',
      icon: UserCheck,
      color: 'blue',
      metrics: [
        { label: 'Total CHWs', value: '342', change: '+8.5%', trend: 'up' },
        { label: 'Active CHWs', value: '318', change: '-2.1%', trend: 'down' },
        { label: 'Patients Served', value: '12,456', change: '+14.2%', trend: 'up' },
        { label: 'Service Rating', value: '4.6/5', change: '-0.3', trend: 'down' }
      ]
    },
    {
      id: 8,
      category: 'Hospital Coverage',
      icon: Building2,
      color: 'blue',
      metrics: [
        { label: 'Partner Hospitals', value: '47', change: '+5', trend: 'up' },
        { label: 'Bed Capacity', value: '3,240', change: '+7.8%', trend: 'up' },
        { label: 'Occupancy Rate', value: '78.5%', change: '-3.2%', trend: 'down' },
        { label: 'Avg Wait Time', value: '32 min', change: '+4 min', trend: 'down' }
      ]    }

  ];

  // Helper functions
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-600" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-600" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-900" />;
      default: return <Minus className="w-4 h-4 text-gray-900" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Operations Title */}
      <div>
        <h2 className="text-2xl font-bold">Overall Operations</h2>
        {/* <p className="text-gray-600 mt-1">Comprehensive view of all operational metrics</p> */}
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.id} className="border border-gray-200 p-6 bg-white">
              <div className="flex items-center mb-4">
                <Icon className={`w-8 h-8 text-${category.color}-600 mr-3`} />
                <h4 className="font-semibold">{category.category}</h4>
              </div>
              <div className="space-y-3">
                {category.metrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{metric.label}:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{metric.value}</span>
                      {getTrendIcon(metric.trend)}
                      <span className={`text-xs ${getTrendColor(metric.trend)}`}>{metric.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default OverallOperations;
