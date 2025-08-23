
const dummyCHWs = [
  { id: 1, name: 'Grace Achieng', email: 'grace@chw.com', region: 'Nairobi', patients: 32, status: 'Active' },
  { id: 2, name: 'Peter Njoroge', email: 'peter@chw.com', region: 'Mombasa', patients: 18, status: 'Active' },
  { id: 3, name: 'Lucy Wanjiku', email: 'lucy@chw.com', region: 'Kisumu', patients: 25, status: 'Active' },
];

const ActiveCHW = () => (
  <div className="max-w-3xl mx-auto p-6">
    <h1 className="text-2xl font-bold mb-4">Active Community Health Workers</h1>
    <table className="w-full border-collapse bg-white rounded shadow">
      <thead>
        <tr className="bg-green-100">
          <th className="py-2 px-3">Name</th>
          <th className="py-2 px-3">Email</th>
          <th className="py-2 px-3">Region</th>
          <th className="py-2 px-3">Patients</th>
          <th className="py-2 px-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {dummyCHWs.map(c => (
          <tr key={c.id} className="border-b hover:bg-green-50">
            <td className="py-2 px-3">{c.name}</td>
            <td className="py-2 px-3">{c.email}</td>
            <td className="py-2 px-3">{c.region}</td>
            <td className="py-2 px-3">{c.patients}</td>
            <td className="py-2 px-3">{c.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default ActiveCHW;
