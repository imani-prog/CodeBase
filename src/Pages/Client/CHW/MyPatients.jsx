import { useState } from 'react';
import {
  Users, Search, Filter, MapPin, Phone, Mail, Droplet,
  Eye, Edit, Plus, Download,
} from 'lucide-react';
import AddPatientModal    from '../../../Components/Admin/AddPatientModal';
import EditPatientModal   from '../../../Components/Admin/EditPatientModal';
import PatientDetailsModal from '../../../Components/Admin/PatientDetailsModal';



const calcAge = (dob) => {
  if (!dob) return '—';
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

const formatBloodType = (bt) => {
  if (!bt) return '—';
  return bt.replace('_POS', '+').replace('_NEG', '-');
};

const genderLabel = (g) => {
  if (!g) return '—';
  if (g === 'MALE') return 'Male';
  if (g === 'FEMALE') return 'Female';
  if (g === 'OTHER') return 'Other';
  return 'Unknown';
};

const statusConfig = {
  ACTIVE:   { label: 'Active',   cls: 'text-green-800' },
  INACTIVE: { label: 'Inactive', cls: 'text-gray-700'  },
  DECEASED: { label: 'Deceased', cls: 'text-red-800'   },
};

const AVATAR_COLORS = [
  'bg-blue-600',
  
];



const MyPatients = () => {
  const [searchTerm, setSearchTerm]     = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewPatient, setViewPatient]   = useState(null);
  const [editPatient, setEditPatient]   = useState(null);

  const [patients, setPatients] = useState([
    {
      id: 1,
      firstName: 'Sarah', middleName: '', lastName: 'Wanjiru',
      gender: 'FEMALE', dateOfBirth: '1990-03-15',
      phone: '+254 712 345 678', email: 'sarah.w@email.com',
      addressLine1: 'Plot 45', city: 'Kibera', country: 'Kenya',
      nationalId: '34230001',
      chronicConditions: 'Hypertension, Diabetes',
      bloodType: 'A_POS', status: 'ACTIVE',
      maritalStatus: 'MARRIED',
    },
    {
      id: 2,
      firstName: 'John', middleName: 'Mwangi', lastName: 'Kamau',
      gender: 'MALE', dateOfBirth: '1979-07-22',
      phone: '+254 723 456 789', email: 'john.k@email.com',
      addressLine1: 'House 12', city: 'Mathare', country: 'Kenya',
      nationalId: '45670045',
      chronicConditions: 'Asthma',
      bloodType: 'O_POS', status: 'ACTIVE',
      maritalStatus: 'MARRIED',
    },
    {
      id: 3,
      firstName: 'Mary', middleName: '', lastName: 'Njoki',
      gender: 'FEMALE', dateOfBirth: '1996-11-05',
      phone: '+254 734 567 890', email: 'mary.n@email.com',
      addressLine1: 'Block C', city: 'Kawangware', country: 'Kenya',
      nationalId: '56780089',
      chronicConditions: 'Pregnant – 2nd Trimester',
      bloodType: 'B_POS', status: 'ACTIVE',
      maritalStatus: 'MARRIED',
    },
    {
      id: 4,
      firstName: 'Peter', middleName: '', lastName: 'Omondi',
      gender: 'MALE', dateOfBirth: '1972-02-18',
      phone: '+254 745 678 901', email: 'peter.o@email.com',
      addressLine1: 'Plot 78', city: 'Kibera', country: 'Kenya',
      nationalId: '67890112',
      chronicConditions: 'Hypertension, High Cholesterol',
      bloodType: 'AB_NEG', status: 'INACTIVE',
      maritalStatus: 'DIVORCED',
    },
    {
      id: 5,
      firstName: 'Grace', middleName: '', lastName: 'Akinyi',
      gender: 'FEMALE', dateOfBirth: '2005-08-30',
      phone: '+254 756 789 012', email: 'grace.a@email.com',
      addressLine1: 'House 45', city: 'Mathare', country: 'Kenya',
      nationalId: '78901156',
      chronicConditions: 'Malnutrition',
      bloodType: 'O_NEG', status: 'ACTIVE',
      maritalStatus: 'SINGLE',
    },
  ]);

 
  const handleAddSave = (form) => {
    const newId = Math.max(0, ...patients.map((p) => p.id)) + 1;
    setPatients((prev) => [...prev, { ...form, id: newId }]);
    setShowAddModal(false);
  };

  const handleEditSave = (form) => {
    setPatients((prev) => prev.map((p) => (p.id === form.id ? form : p)));
    setEditPatient(null);
  };

  const handleViewToEdit = () => {
    setEditPatient(viewPatient);
    setViewPatient(null);
  };

  const filtered = patients.filter((p) => {
    const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
    const matchSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      String(p.id).includes(searchTerm) ||
      (p.nationalId || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'ALL' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = [
    { label: 'Total Patients', value: patients.length },
    { label: 'Active',         value: patients.filter((p) => p.status === 'ACTIVE').length },
    { label: 'Inactive',       value: patients.filter((p) => p.status === 'INACTIVE').length },
    { label: 'Deceased',       value: patients.filter((p) => p.status === 'DECEASED').length },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">My Patients</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and monitor patients assigned to you</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Patient</span>
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-white shadow-sm border border-gray-200 px-4 py-4 sm:px-5">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-blue-600">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── Search & Filter ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="relative flex-1 sm:max-w-md">
          
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, ID or national ID…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-1 sm:flex-none">
            <Filter className="w-4 h-4 text-gray-500 shrink-0" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 sm:flex-none text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="ALL">All Patients</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="DECEASED">Deceased</option>
            </select>
          </div>
          <button className="flex items-center gap-2 text-sm px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* ── Mobile Cards (< md) ── */}
      <div className="md:hidden space-y-3">
        {filtered.map((p) => {
          const sc = statusConfig[p.status] ?? statusConfig.INACTIVE;
          const conditions = p.chronicConditions
            ? p.chronicConditions.split(',').map((c) => c.trim()).filter(Boolean)
            : [];
          const initials = ((p.firstName?.[0] ?? '') + (p.lastName?.[0] ?? '')).toUpperCase();
          const avatarBg = AVATAR_COLORS[p.id % AVATAR_COLORS.length];
          return (
            <div key={p.id} className="bg-white border rounded-lg border-gray-200 p-4">
              {/* Card header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0 ${avatarBg}`}>
                    {initials || '?'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 leading-tight">
                      {p.firstName} {p.middleName ? `${p.middleName} ` : ''}{p.lastName}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      #{p.id} · {calcAge(p.dateOfBirth)} yrs · {genderLabel(p.gender)}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${sc.cls}`}>
                  {sc.label}
                </span>
              </div>

              {/* Contact & location */}
              <div className="space-y-1.5 text-sm mb-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{p.phone || '—'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 min-w-0">
                  <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="truncate">{p.email || '—'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{[p.city, p.addressLine1].filter(Boolean).join(', ') || '—'}</span>
                </div>
              </div>

              {/* Conditions + blood type */}
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <div className="flex flex-wrap gap-1">
                  {conditions.length
                    ? conditions.map((c, i) => (
                        <span key={i} className="px-2 py-0.5  text-blue-700 text-xs rounded-full border border-blue-100 whitespace-nowrap">{c}</span>
                      ))
                    : <span className="text-xs text-gray-400">No conditions</span>}
                </div>
                {p.bloodType && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 shrink-0">
                    <Droplet className="w-3 h-3" />{formatBloodType(p.bloodType)}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => setViewPatient(p)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg font-medium transition-colors"
                >
                  <Eye className="w-4 h-4" /> View
                </button>
                <button
                  onClick={() => setEditPatient(p)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Desktop Table (≥ md) ── */}
      <div className="hidden md:block bg-white shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-800">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Age</th>
                <th className="px-4 py-3 text-left">Gender</th>
                <th className="px-4 py-3 text-left">National ID</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Chronic Conditions</th>
                <th className="px-4 py-3 text-left">Blood Type</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p) => {
                const sc = statusConfig[p.status] ?? statusConfig.INACTIVE;
                const conditions = p.chronicConditions
                  ? p.chronicConditions.split(',').map((c) => c.trim()).filter(Boolean)
                  : [];
                return (
                  <tr key={p.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-gray-400 text-xs">#{p.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-semibold text-gray-900">
                      {p.firstName} {p.middleName ? `${p.middleName} ` : ''}{p.lastName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-800">{calcAge(p.dateOfBirth)} yrs</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-800">{genderLabel(p.gender)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                      {p.nationalId || <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 shrink-0 text-gray-400" />{p.phone}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 shrink-0 text-gray-400" />{p.email}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                        {[p.city, p.addressLine1].filter(Boolean).join(', ')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {conditions.length
                          ? conditions.map((c, i) => (
                              <span key={i} className="px-2 py-0.5 text-blue-700 text-xs whitespace-nowrap">{c}</span>
                            ))
                          : <span className="text-gray-300 text-xs">None</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {p.bloodType ? (
                        <span className="inline-flex items-center gap-1 text-red-700 text-xs font-semibold">
                          <Droplet className="w-3 h-3" />{formatBloodType(p.bloodType)}
                        </span>
                      ) : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${sc.cls}`}>
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <button
                          title="View patient"
                          onClick={() => setViewPatient(p)}
                          className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          title="Edit patient"
                          onClick={() => setEditPatient(p)}
                          className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Empty State ── */}
      {filtered.length === 0 && (
        <div className="bg-white border border-gray-200 p-10 sm:p-14 text-center">
          <Users className="w-12 h-12 sm:w-14 sm:h-14 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-700">No patients found</h3>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search or status filter</p>
        </div>
      )}

      {/* ── Modals ── */}
      <AddPatientModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        onSavePatient={handleAddSave}
      />

      <PatientDetailsModal
        patient={viewPatient}
        isOpen={!!viewPatient}
        onClose={() => setViewPatient(null)}
        onEdit={handleViewToEdit}
      />

      <EditPatientModal
        patient={editPatient}
        isOpen={!!editPatient}
        onClose={() => setEditPatient(null)}
        onSave={handleEditSave}
      />

    </div>
  );
};

export default MyPatients;
