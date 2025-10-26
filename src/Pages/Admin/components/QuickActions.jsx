import React from 'react';
import { UserPlus, Users, CheckSquare, Ambulance, Video, DollarSign, GraduationCap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { 
      icon: UserPlus, 
      label: 'Add Patient', 
      color: 'blue',
      action: () => navigate('/admin/add-patient')
    },
    { 
      icon: Users, 
      label: 'Add CHW', 
      color: 'blue',
      action: () => navigate('/admin/add-chw')
    },
    { 
      icon: CheckSquare, 
      label: 'Approve Requests', 
      color: 'blue',
      action: () => navigate('/admin/approve-requests')
    },
    { 
      icon: Ambulance, 
      label: 'Ambulances', 
      color: 'blue',
      action: () => navigate('/admin/ambulance-management')
    },
    { 
      icon: Video, 
      label: 'Telemedicine', 
      color: 'blue',
      action: () => navigate('/admin/telemedicine-management')
    },
    { 
      icon: DollarSign, 
      label: 'Financial', 
      color: 'blue',
      action: () => navigate('/admin/financial-management')
    },
    { 
      icon: GraduationCap, 
      label: 'Training', 
      color: 'blue',
      action: () => navigate('/admin/training-management')
    },
    { 
      icon: Shield, 
      label: 'Insurance', 
      color: 'blue',
      action: () => navigate('/admin/insurance-management')
    }
  ];

  return (
    <div className="bg-white p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button 
              key={index}
              onClick={action.action}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-blue-50 transition-all duration-200 group border border-transparent hover:border-blue-200 hover:shadow-md"
            >
              <div className={`w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-all duration-200`}>
                <Icon className={`w-10 h-10 text-blue-600`} />
              </div>
              <span className="text-sm font-medium text-gray-700 mt-2 text-center group-hover:text-blue-600 transition-colors">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
