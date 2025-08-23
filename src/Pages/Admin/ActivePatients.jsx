
const dummyPatients = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', lastVisit: '2025-08-20' },
  { id: 2, name: 'Mary Wambui', email: 'maryw@example.com', status: 'Active', lastVisit: '2025-08-21' },
  { id: 3, name: 'Ali Hassan', email: 'alih@example.com', status: 'Active', lastVisit: '2025-08-19' },
];

const ActivePatients = () => (
  <div className="max-w-3xl mx-auto p-6">
    <h1 className="text-2xl font-bold mb-4">Active Patients</h1>
    <table className="w-full border-collapse bg-white rounded shadow">
      <thead>
        <tr className="bg-blue-100">
          <th className="py-2 px-3">Name</th>
          <th className="py-2 px-3">Email</th>
          <th className="py-2 px-3">Status</th>
          <th className="py-2 px-3">Last Visit</th>
        </tr>
      </thead>
      <tbody>
        {dummyPatients.map(p => (
          <tr key={p.id} className="border-b hover:bg-blue-50">
            <td className="py-2 px-3">{p.name}</td>
            <td className="py-2 px-3">{p.email}</td>
            <td className="py-2 px-3">{p.status}</td>
            <td className="py-2 px-3">{p.lastVisit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default ActivePatients;
