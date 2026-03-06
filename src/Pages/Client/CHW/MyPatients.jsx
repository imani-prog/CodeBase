import { useState } from 'react';
import {
  Users, Search, Filter, MapPin, Phone, Mail, Droplet,
  Eye, Edit, Plus, Download,
} from 'lucide-react';
import AddPatientModal    from '../../../Components/Admin/AddPatientModal';
import EditPatientModal   from '../../../Components/Admin/EditPatientModal';
import PatientDetailsModal from '../../../Components/Admin/PatientDetailsModal';

// ── helpers ───────────────────────────────────────────────────────────────────

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
  INACTIVE: { label: 'Inactive', cls: 'text-gray-700'   },
  DECEASED: { label: 'Deceased', cls: 'text-red-800'     },
};

// ── MyPatients page ───────────────────────────────────────────────────────────

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

  // open edit from view modal
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
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Patients</h1>
          <p className="mt-1 text-gray-500">Manage and monitor patients assigned to you</p>
        </div>
        <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow"
          >
          <Plus className="w-4 h-4" />
          Add New Patient
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white shadow-sm border border-gray-200 px-5 py-4">
            <p className="text-xs text-gray-800 mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-blue-600">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── Search & Filter ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, ID or national ID…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="ALL">All Patients</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="DECEASED">Deceased</option>
            </select>
          </div>
          <button className="flex items-center gap-2 text-sm px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
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
                    <td className="px-4 py-3 whitespace-nowrap text-gray-400 text-xs">
                      #{p.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-semibold text-gray-900">
                      {p.firstName} {p.middleName ? `${p.middleName} ` : ''}{p.lastName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                      {calcAge(p.dateOfBirth)} yrs
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                      {genderLabel(p.gender)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                      {p.nationalId || <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                      <span className="flex items-center gap-1">
                        
                        {p.phone}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 shrink-0 text-gray-800" />
                        {p.email}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-800" />
                        {[p.city, p.addressLine1].filter(Boolean).join(', ')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {conditions.length ? conditions.map((c, i) => (
                          <span key={i} className="px-2 py-0.5 text-blue-700 text-xs  whitespace-nowrap">
                            {c}
                          </span>
                        )) : <span className="text-gray-300 text-xs">None</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {p.bloodType ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-red-700 text-xs font-semibold ">
                          <Droplet className="w-3 h-3" />
                          {formatBloodType(p.bloodType)}
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Users className="w-14 h-14 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-700">No patients found</h3>
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
