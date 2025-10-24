import { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Activity,
  AlertCircle,
  Heart,
  Eye,
  Edit,
  Plus,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MyPatients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample patient data - replace with actual API data
  const patients = [
    {
      id: 'PT-2023-001',
      name: 'Sarah Wanjiru',
      age: 34,
      gender: 'Female',
      location: 'Kibera, Plot 45',
      phone: '+254 712 345 678',
      email: 'sarah.w@email.com',
      status: 'active',
      lastVisit: '2024-10-20',
      nextVisit: '2024-10-27',
      conditions: ['Hypertension', 'Diabetes'],
      riskLevel: 'medium'
    },
    {
      id: 'PT-2023-045',
      name: 'John Kamau',
      age: 45,
      gender: 'Male',
      location: 'Mathare, House 12',
      phone: '+254 723 456 789',
      email: 'john.k@email.com',
      status: 'active',
      lastVisit: '2024-10-18',
      nextVisit: '2024-10-25',
      conditions: ['Asthma'],
      riskLevel: 'low'
    },
    {
      id: 'PT-2023-089',
      name: 'Mary Njoki',
      age: 28,
      gender: 'Female',
      location: 'Kawangware, Block C',
      phone: '+254 734 567 890',
      email: 'mary.n@email.com',
      status: 'active',
      lastVisit: '2024-10-22',
      nextVisit: '2024-10-29',
      conditions: ['Pregnant - 2nd Trimester'],
      riskLevel: 'high'
    },
    {
      id: 'PT-2023-112',
      name: 'Peter Omondi',
      age: 52,
      gender: 'Male',
      location: 'Kibera, Plot 78',
      phone: '+254 745 678 901',
      email: 'peter.o@email.com',
      status: 'inactive',
      lastVisit: '2024-09-15',
      nextVisit: null,
      conditions: ['Hypertension', 'High Cholesterol'],
      riskLevel: 'high'
    },
    {
      id: 'PT-2023-156',
      name: 'Grace Akinyi',
      age: 19,
      gender: 'Female',
      location: 'Mathare, House 45',
      phone: '+254 756 789 012',
      email: 'grace.a@email.com',
      status: 'active',
      lastVisit: '2024-10-21',
      nextVisit: '2024-10-28',
      conditions: ['Malnutrition'],
      riskLevel: 'medium'
    }
  ];

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: 'Total Patients', value: patients.length, color: 'blue' },
    { label: 'Active', value: patients.filter(p => p.status === 'active').length, color: 'green' },
    { label: 'High Risk', value: patients.filter(p => p.riskLevel === 'high').length, color: 'red' },
    { label: 'Visits This Week', value: 5, color: 'purple' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Patients</h1>
          <p className="text-gray-600 mt-2">
            Manage and monitor patients assigned to you
          </p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-md">
          <Plus className="w-5 h-5" />
          <span>Add New Patient</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or patient ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Patients</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Patients List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Conditions
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Next Visit
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-600">{patient.id}</p>
                      <p className="text-sm text-gray-500">{patient.age} yrs, {patient.gender}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {patient.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      {patient.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {patient.conditions.map((condition, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full mr-1"
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {patient.nextVisit ? (
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(patient.nextVisit).toLocaleDateString()}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Not scheduled</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          patient.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {patient.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                      {patient.riskLevel === 'high' && (
                        <div className="flex items-center text-xs text-red-600">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          High Risk
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No patients found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default MyPatients;
